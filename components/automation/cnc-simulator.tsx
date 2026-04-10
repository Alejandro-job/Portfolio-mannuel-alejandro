"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Pause, RotateCcw, Zap, Settings, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Point {
  x: number
  y: number
  z: number
  rapid?: boolean
  type?: 'cut' | 'drill' | 'thread'
}

// Pieza: TORNILLO M10 completo con cabeza hexagonal y roscado
const TORNILLO_M10: Point[] = (() => {
  const points: Point[] = []
  
  // Aproximación rápida
  points.push({ x: 0, y: 0, z: 5, rapid: true })
  
  // Mecanizado de la cabeza hexagonal (vista superior)
  const headR = 18
  const cx = 50, cy = 50
  for (let i = 0; i <= 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 6
    points.push({ 
      x: cx + headR * Math.cos(angle), 
      y: cy + headR * Math.sin(angle), 
      z: i === 0 ? 5 : -2,
      rapid: i === 0,
      type: 'cut'
    })
  }
  
  // Bajar al cuerpo del tornillo
  points.push({ x: cx + 8, y: cy, z: -2, rapid: true })
  
  // Torneado del cuerpo cilíndrico
  for (let i = 0; i <= 40; i++) {
    const angle = (i / 40) * Math.PI * 2
    points.push({ 
      x: cx + 8 * Math.cos(angle), 
      y: cy + 8 * Math.sin(angle), 
      z: -3,
      type: 'cut'
    })
  }
  
  // Roscado (espiral)
  for (let i = 0; i <= 80; i++) {
    const angle = (i / 20) * Math.PI * 2
    const r = 7 + Math.sin(i * 0.5) * 0.8
    const yOffset = (i / 80) * 25
    points.push({ 
      x: cx + r * Math.cos(angle), 
      y: cy + yOffset - 12 + r * Math.sin(angle) * 0.3, 
      z: -4,
      type: 'thread'
    })
  }
  
  // Retorno
  points.push({ x: 0, y: 0, z: 10, rapid: true })
  
  return points
})()

// Pieza: ENGRANAJE de 12 dientes
const ENGRANAJE: Point[] = (() => {
  const points: Point[] = []
  const cx = 50, cy = 50
  const outerR = 35, innerR = 28, teethCount = 12
  
  points.push({ x: cx + outerR, y: cy, z: 5, rapid: true })
  points.push({ x: cx + outerR, y: cy, z: -3 })
  
  // Dientes del engranaje
  for (let i = 0; i <= teethCount; i++) {
    const baseAngle = (i / teethCount) * Math.PI * 2
    
    // Punta del diente
    const tipAngle = baseAngle
    points.push({ 
      x: cx + outerR * Math.cos(tipAngle), 
      y: cy + outerR * Math.sin(tipAngle), 
      z: -3,
      type: 'cut'
    })
    
    // Bajada al valle
    const valleyAngle1 = baseAngle + (0.3 / teethCount) * Math.PI * 2
    points.push({ 
      x: cx + innerR * Math.cos(valleyAngle1), 
      y: cy + innerR * Math.sin(valleyAngle1), 
      z: -3,
      type: 'cut'
    })
    
    // Valle
    const valleyAngle2 = baseAngle + (0.7 / teethCount) * Math.PI * 2
    points.push({ 
      x: cx + innerR * Math.cos(valleyAngle2), 
      y: cy + innerR * Math.sin(valleyAngle2), 
      z: -3,
      type: 'cut'
    })
  }
  
  // Agujero central
  points.push({ x: cx + 10, y: cy, z: 5, rapid: true })
  for (let i = 0; i <= 30; i++) {
    const angle = (i / 30) * Math.PI * 2
    points.push({ 
      x: cx + 10 * Math.cos(angle), 
      y: cy + 10 * Math.sin(angle), 
      z: -5,
      type: 'drill'
    })
  }
  
  // Chavetero
  points.push({ x: cx + 10, y: cy - 3, z: -5 })
  points.push({ x: cx + 15, y: cy - 3, z: -6, type: 'cut' })
  points.push({ x: cx + 15, y: cy + 3, z: -6, type: 'cut' })
  points.push({ x: cx + 10, y: cy + 3, z: -5, type: 'cut' })
  
  points.push({ x: 0, y: 0, z: 10, rapid: true })
  
  return points
})()

// Pieza: BRIDA con patrón de agujeros
const BRIDA: Point[] = (() => {
  const points: Point[] = []
  const cx = 50, cy = 50
  
  // Contorno exterior
  points.push({ x: cx + 38, y: cy, z: 5, rapid: true })
  for (let i = 0; i <= 60; i++) {
    const angle = (i / 60) * Math.PI * 2
    points.push({ 
      x: cx + 38 * Math.cos(angle), 
      y: cy + 38 * Math.sin(angle), 
      z: -2,
      type: 'cut'
    })
  }
  
  // Agujero central grande
  points.push({ x: cx + 15, y: cy, z: 5, rapid: true })
  for (let i = 0; i <= 40; i++) {
    const angle = (i / 40) * Math.PI * 2
    points.push({ 
      x: cx + 15 * Math.cos(angle), 
      y: cy + 15 * Math.sin(angle), 
      z: -4,
      type: 'drill'
    })
  }
  
  // Patrón de 6 agujeros de montaje
  const holeRadius = 28
  const holeSize = 4
  for (let h = 0; h < 6; h++) {
    const holeAngle = (h / 6) * Math.PI * 2
    const holeCx = cx + holeRadius * Math.cos(holeAngle)
    const holeCy = cy + holeRadius * Math.sin(holeAngle)
    
    points.push({ x: holeCx + holeSize, y: holeCy, z: 5, rapid: true })
    for (let i = 0; i <= 20; i++) {
      const angle = (i / 20) * Math.PI * 2
      points.push({ 
        x: holeCx + holeSize * Math.cos(angle), 
        y: holeCy + holeSize * Math.sin(angle), 
        z: -6,
        type: 'drill'
      })
    }
  }
  
  points.push({ x: 0, y: 0, z: 10, rapid: true })
  
  return points
})()

// Pieza: EJE ESCALONADO con ranuras
const EJE_ESCALONADO: Point[] = (() => {
  const points: Point[] = []
  const cx = 50, cy = 50
  
  // Sección mayor (D=30mm)
  points.push({ x: cx + 15, y: cy - 20, z: 5, rapid: true })
  for (let i = 0; i <= 30; i++) {
    const angle = (i / 30) * Math.PI * 2
    const y = cy - 20
    points.push({ 
      x: cx + 15 * Math.cos(angle), 
      y: y + 15 * Math.sin(angle) * 0.3, 
      z: -2,
      type: 'cut'
    })
  }
  
  // Transición cónica
  for (let i = 0; i <= 10; i++) {
    const progress = i / 10
    const r = 15 - progress * 5
    const y = cy - 20 + progress * 15
    points.push({ 
      x: cx + r, 
      y: y, 
      z: -3,
      type: 'cut'
    })
  }
  
  // Sección media (D=20mm)
  for (let i = 0; i <= 30; i++) {
    const angle = (i / 30) * Math.PI * 2
    const y = cy - 5
    points.push({ 
      x: cx + 10 * Math.cos(angle), 
      y: y + 10 * Math.sin(angle) * 0.3, 
      z: -2,
      type: 'cut'
    })
  }
  
  // Ranura circular
  points.push({ x: cx + 8, y: cy + 5, z: 5, rapid: true })
  for (let i = 0; i <= 30; i++) {
    const angle = (i / 30) * Math.PI * 2
    points.push({ 
      x: cx + 8 * Math.cos(angle), 
      y: cy + 5 + 8 * Math.sin(angle) * 0.3, 
      z: -4,
      type: 'cut'
    })
  }
  
  // Sección menor con roscado (D=16mm)
  for (let i = 0; i <= 40; i++) {
    const angle = (i / 10) * Math.PI * 2
    const r = 8 + Math.sin(i * 0.8) * 0.5
    const y = cy + 10 + (i / 40) * 20
    points.push({ 
      x: cx + r * Math.cos(angle), 
      y: y + r * Math.sin(angle) * 0.2, 
      z: -3,
      type: 'thread'
    })
  }
  
  points.push({ x: 0, y: 0, z: 10, rapid: true })
  
  return points
})()

const PROGRAMS = {
  tornillo: {
    name: 'Tornillo M10',
    description: 'Cabeza hexagonal con roscado métrico',
    icon: Wrench,
    points: TORNILLO_M10,
    material: 'Acero 1045',
    tool: 'Fresa HSS 8mm + Macho M10'
  },
  engranaje: {
    name: 'Engranaje Z12',
    description: 'Engranaje recto de 12 dientes con chavetero',
    icon: Settings,
    points: ENGRANAJE,
    material: 'Acero 4140',
    tool: 'Fresa módulo 2'
  },
  brida: {
    name: 'Brida DN50',
    description: 'Brida de conexión con 6 agujeros',
    icon: Settings,
    points: BRIDA,
    material: 'Aluminio 6061-T6',
    tool: 'Fresa 10mm + Broca 8mm'
  },
  eje: {
    name: 'Eje Escalonado',
    description: 'Eje con 3 diámetros y roscado final',
    icon: Wrench,
    points: EJE_ESCALONADO,
    material: 'Acero 4340',
    tool: 'Buril HSS + Macho M16'
  }
}

type ProgramKey = keyof typeof PROGRAMS

export function CNCSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  
  const [selectedProgram, setSelectedProgram] = useState<ProgramKey>('tornillo')
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [speed, setSpeed] = useState(1.5)
  
  const [toolPos, setToolPos] = useState({ x: 0, y: 0, z: 5 })
  const [drawnSegments, setDrawnSegments] = useState<{from: Point, to: Point, type?: string}[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [segmentProgress, setSegmentProgress] = useState(0)
  
  const [spindleOn, setSpindleOn] = useState(false)
  const [spindleRPM] = useState(8000)
  const [chips, setChips] = useState<{x: number, y: number, vx: number, vy: number, life: number}[]>([])

  const scale = 4
  const offsetX = 20
  const offsetY = 20

  const reset = useCallback(() => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    setIsRunning(false)
    setIsPaused(false)
    setProgress(0)
    setCurrentIdx(0)
    setSegmentProgress(0)
    setToolPos({ x: 0, y: 0, z: 5 })
    setDrawnSegments([])
    setSpindleOn(false)
    setChips([])
  }, [])

  const startProgram = useCallback(() => {
    reset()
    setTimeout(() => {
      setIsRunning(true)
      setSpindleOn(true)
    }, 100)
  }, [reset])

  // Animación principal
  useEffect(() => {
    if (!isRunning || isPaused) return

    const program = PROGRAMS[selectedProgram]
    const points = program.points
    let localIdx = currentIdx
    let localProgress = segmentProgress

    const animate = () => {
      if (localIdx >= points.length - 1) {
        setIsRunning(false)
        setSpindleOn(false)
        setProgress(100)
        return
      }

      const from = points[localIdx]
      const to = points[localIdx + 1]
      const isRapid = to.rapid || false

      const stepSize = isRapid ? 0.08 * speed : 0.025 * speed
      localProgress += stepSize

      if (localProgress >= 1) {
        // Segmento completado
        setToolPos({ x: to.x, y: to.y, z: to.z })
        
        if (!isRapid) {
          setDrawnSegments(prev => [...prev, { from, to, type: to.type }])
        }
        
        // Generar virutas si está cortando
        if (!isRapid && to.z < 0) {
          const newChips = Array.from({ length: 3 }, () => ({
            x: to.x,
            y: to.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1
          }))
          setChips(prev => [...prev.slice(-30), ...newChips])
        }
        
        localIdx++
        localProgress = 0
        setCurrentIdx(localIdx)
        setProgress(Math.round((localIdx / (points.length - 1)) * 100))
      } else {
        // Interpolar posición
        const x = from.x + (to.x - from.x) * localProgress
        const y = from.y + (to.y - from.y) * localProgress
        const z = from.z + (to.z - from.z) * localProgress
        setToolPos({ x, y, z })
      }

      setSegmentProgress(localProgress)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isRunning, isPaused, selectedProgram, speed, currentIdx, segmentProgress])

  // Actualizar virutas
  useEffect(() => {
    if (chips.length === 0) return
    const interval = setInterval(() => {
      setChips(prev => prev
        .map(c => ({ ...c, x: c.x + c.vx, y: c.y + c.vy, vy: c.vy + 0.1, life: c.life - 0.05 }))
        .filter(c => c.life > 0)
      )
    }, 50)
    return () => clearInterval(interval)
  }, [chips.length])

  // Renderizado del canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Fondo con efecto metálico
    const bgGradient = ctx.createLinearGradient(0, 0, width, height)
    bgGradient.addColorStop(0, '#0a0f1a')
    bgGradient.addColorStop(1, '#050810')
    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, width, height)

    // Grid más detallado
    ctx.strokeStyle = '#1a2744'
    ctx.lineWidth = 0.3
    for (let i = 0; i <= 100; i += 5) {
      ctx.beginPath()
      ctx.moveTo(offsetX + i * scale, offsetY)
      ctx.lineTo(offsetX + i * scale, height - 20)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(offsetX, offsetY + i * scale)
      ctx.lineTo(width - 20, offsetY + i * scale)
      ctx.stroke()
    }

    // Material base (bloque)
    ctx.fillStyle = '#1e293b'
    ctx.strokeStyle = '#334155'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(offsetX + 10 * scale, offsetY + 10 * scale, 80 * scale, 80 * scale, 4)
    ctx.fill()
    ctx.stroke()

    // Dibujar trayectorias completadas
    drawnSegments.forEach(seg => {
      ctx.beginPath()
      ctx.lineWidth = seg.type === 'thread' ? 1.5 : seg.type === 'drill' ? 3 : 2.5
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      
      // Color según tipo de operación
      if (seg.type === 'thread') {
        ctx.strokeStyle = '#f59e0b'
        ctx.shadowColor = '#f59e0b'
      } else if (seg.type === 'drill') {
        ctx.strokeStyle = '#ef4444'
        ctx.shadowColor = '#ef4444'
      } else {
        ctx.strokeStyle = '#22d3ee'
        ctx.shadowColor = '#22d3ee'
      }
      ctx.shadowBlur = 6
      
      ctx.moveTo(offsetX + seg.from.x * scale, height - 20 - seg.from.y * scale)
      ctx.lineTo(offsetX + seg.to.x * scale, height - 20 - seg.to.y * scale)
      ctx.stroke()
      ctx.shadowBlur = 0
    })

    // Dibujar virutas
    chips.forEach(chip => {
      ctx.beginPath()
      ctx.arc(
        offsetX + chip.x * scale,
        height - 20 - chip.y * scale,
        2,
        0, Math.PI * 2
      )
      ctx.fillStyle = `rgba(234, 179, 8, ${chip.life})`
      ctx.fill()
    })

    // Herramienta
    const toolX = offsetX + toolPos.x * scale
    const toolY = height - 20 - toolPos.y * scale

    // Sombra de profundidad
    if (toolPos.z < 0) {
      ctx.beginPath()
      ctx.arc(toolX, toolY, 15 - toolPos.z * 2, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fill()
    }

    // Glow de corte
    if (spindleOn && toolPos.z < 0) {
      const cutGlow = ctx.createRadialGradient(toolX, toolY, 0, toolX, toolY, 35)
      cutGlow.addColorStop(0, 'rgba(251, 146, 60, 0.6)')
      cutGlow.addColorStop(0.3, 'rgba(251, 146, 60, 0.2)')
      cutGlow.addColorStop(1, 'rgba(251, 146, 60, 0)')
      ctx.fillStyle = cutGlow
      ctx.beginPath()
      ctx.arc(toolX, toolY, 35, 0, Math.PI * 2)
      ctx.fill()
      
      // Chispas de mecanizado
      for (let i = 0; i < 8; i++) {
        const sparkAngle = Math.random() * Math.PI * 2
        const sparkDist = 10 + Math.random() * 20
        ctx.beginPath()
        ctx.arc(
          toolX + Math.cos(sparkAngle) * sparkDist,
          toolY + Math.sin(sparkAngle) * sparkDist,
          1 + Math.random() * 2,
          0, Math.PI * 2
        )
        ctx.fillStyle = `rgba(251, 191, 36, ${0.5 + Math.random() * 0.5})`
        ctx.fill()
      }
    }

    // Cuerpo de la herramienta
    ctx.beginPath()
    ctx.arc(toolX, toolY, 12, 0, Math.PI * 2)
    const toolGradient = ctx.createRadialGradient(toolX - 3, toolY - 3, 0, toolX, toolY, 12)
    toolGradient.addColorStop(0, spindleOn ? '#67e8f9' : '#6b7280')
    toolGradient.addColorStop(1, spindleOn ? '#0891b2' : '#374151')
    ctx.fillStyle = toolGradient
    ctx.fill()
    ctx.strokeStyle = '#0f172a'
    ctx.lineWidth = 2
    ctx.stroke()

    // Filos de corte girando
    if (spindleOn) {
      const time = Date.now() / 30
      ctx.strokeStyle = '#06b6d4'
      ctx.lineWidth = 2
      for (let i = 0; i < 6; i++) {
        const angle = time + (i * Math.PI / 3)
        ctx.beginPath()
        ctx.moveTo(toolX + Math.cos(angle) * 4, toolY + Math.sin(angle) * 4)
        ctx.lineTo(toolX + Math.cos(angle) * 10, toolY + Math.sin(angle) * 10)
        ctx.stroke()
      }
    }

    // Centro
    ctx.beginPath()
    ctx.arc(toolX, toolY, 3, 0, Math.PI * 2)
    ctx.fillStyle = '#1e293b'
    ctx.fill()

    // Ejes con etiquetas
    ctx.font = 'bold 12px monospace'
    ctx.fillStyle = '#22d3ee'
    ctx.fillText('X', width - 30, height - 25)
    ctx.fillStyle = '#10b981'
    ctx.fillText('Y', offsetX + 5, offsetY + 15)

  }, [toolPos, drawnSegments, spindleOn, chips, offsetX, offsetY, scale])

  // Re-render para animación
  useEffect(() => {
    if (!spindleOn) return
    const interval = setInterval(() => {
      setToolPos(p => ({ ...p }))
    }, 33)
    return () => clearInterval(interval)
  }, [spindleOn])

  useEffect(() => {
    reset()
  }, [selectedProgram, reset])

  const program = PROGRAMS[selectedProgram]

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Canvas de Simulación */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-foreground">Centro de Mecanizado CNC</CardTitle>
            {spindleOn && (
              <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 rounded-full animate-pulse">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-xs font-mono text-orange-400">{spindleRPM} RPM</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative bg-[#050810] rounded-xl overflow-hidden border border-border/50">
            <canvas
              ref={canvasRef}
              width={440}
              height={440}
              className="w-full"
            />
            {/* HUD */}
            <div className="absolute top-3 right-3 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 font-mono text-xs border border-border/50">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <span className="text-cyan-400 text-[10px]">X</span>
                  <p className="text-foreground font-bold">{toolPos.x.toFixed(1)}</p>
                </div>
                <div className="text-center">
                  <span className="text-green-400 text-[10px]">Y</span>
                  <p className="text-foreground font-bold">{toolPos.y.toFixed(1)}</p>
                </div>
                <div className="text-center">
                  <span className="text-purple-400 text-[10px]">Z</span>
                  <p className="text-foreground font-bold">{toolPos.z.toFixed(1)}</p>
                </div>
              </div>
            </div>
            
            {/* Leyenda de colores */}
            <div className="absolute top-3 left-3 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 text-[10px] border border-border/50 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-cyan-400 rounded" />
                <span className="text-muted-foreground">Fresado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-amber-400 rounded" />
                <span className="text-muted-foreground">Roscado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-red-400 rounded" />
                <span className="text-muted-foreground">Taladrado</span>
              </div>
            </div>
            
            {/* Estado */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                isRunning && !isPaused ? "bg-green-500/20 text-green-400 animate-pulse" : 
                isPaused ? "bg-yellow-500/20 text-yellow-400" :
                progress === 100 ? "bg-cyan-500/20 text-cyan-400" : "bg-muted text-muted-foreground"
              )}>
                {isRunning ? (isPaused ? "PAUSA" : "MECANIZANDO") : progress === 100 ? "COMPLETADO" : "LISTO"}
              </span>
              <span className="text-xs font-mono text-muted-foreground bg-background/80 px-2 py-1 rounded">
                {program.name}
              </span>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progreso del programa</span>
              <span className="font-mono">{progress}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-amber-500 to-orange-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controles */}
          <div className="flex gap-2">
            {!isRunning ? (
              <Button onClick={startProgram} className="flex-1 gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500">
                <Play className="w-4 h-4" />
                Iniciar Mecanizado
              </Button>
            ) : (
              <Button 
                onClick={() => setIsPaused(!isPaused)} 
                variant="outline" 
                className="flex-1 gap-2"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isPaused ? 'Continuar' : 'Pausar'}
              </Button>
            )}
            <Button onClick={reset} variant="outline" className="gap-2">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Velocidad */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">Velocidad:</span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="flex-1 accent-cyan-500"
            />
            <span className="text-xs font-mono text-foreground w-10">{speed}x</span>
          </div>
        </CardContent>
      </Card>

      {/* Selector de Piezas */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-foreground">Biblioteca de Piezas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(PROGRAMS) as ProgramKey[]).map((key) => {
              const prog = PROGRAMS[key]
              const Icon = prog.icon
              return (
                <button
                  key={key}
                  onClick={() => !isRunning && setSelectedProgram(key)}
                  disabled={isRunning}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left transition-all group",
                    selectedProgram === key
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-border hover:border-cyan-500/50 hover:bg-muted/50",
                    isRunning && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Icon className={cn(
                      "w-8 h-8 transition-colors",
                      selectedProgram === key ? "text-cyan-400" : "text-muted-foreground group-hover:text-cyan-400"
                    )} />
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {prog.points.length} ops
                    </span>
                  </div>
                  <p className="font-semibold text-foreground mb-1">{prog.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-tight">{prog.description}</p>
                </button>
              )
            })}
          </div>

          {/* Detalles de la pieza */}
          <div className="p-4 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-400" />
              Especificaciones de Mecanizado
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Pieza:</span>
                <span className="font-mono text-foreground font-medium">{program.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Material:</span>
                <span className="font-mono text-foreground">{program.material}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Herramienta:</span>
                <span className="font-mono text-foreground text-right">{program.tool}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-border/50">
                <span className="text-muted-foreground">Operaciones:</span>
                <span className="font-mono text-foreground">{program.points.length}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Husillo:</span>
                <span className="font-mono text-cyan-400">{spindleRPM} RPM</span>
              </div>
            </div>
          </div>

          {/* Códigos G/M */}
          <div className="p-4 bg-slate-900/50 rounded-xl">
            <h4 className="text-sm font-medium text-foreground mb-3">Códigos G/M Utilizados</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] font-mono">
              <div className="flex justify-between text-muted-foreground">
                <span className="text-cyan-400">G00</span>
                <span>Posicionamiento</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="text-cyan-400">G01</span>
                <span>Interpolación</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="text-cyan-400">G02/G03</span>
                <span>Arcos CW/CCW</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="text-amber-400">G33</span>
                <span>Roscado</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="text-red-400">G81</span>
                <span>Ciclo taladrado</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span className="text-green-400">M03</span>
                <span>Husillo CW</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
