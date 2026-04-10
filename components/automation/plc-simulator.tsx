"use client"

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Play, Pause, RotateCcw, Lightbulb, Power, Gauge, AlertTriangle, Package, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Input {
  id: string
  name: string
  address: string
  value: boolean
}

interface Output {
  id: string
  name: string
  address: string
  value: boolean
  type: 'lamp' | 'motor' | 'valve' | 'alarm' | 'conveyor'
}

export function PLCSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [cycleTime, setCycleTime] = useState(0)
  const [scanCount, setScanCount] = useState(0)
  const [productCount, setProductCount] = useState(0)
  
  // Posición del producto en la banda
  const [productPosition, setProductPosition] = useState(-30)
  const [productVisible, setProductVisible] = useState(false)
  
  const [inputs, setInputs] = useState<Input[]>([
    { id: 'I0.0', name: 'START', address: 'I0.0', value: false },
    { id: 'I0.1', name: 'STOP', address: 'I0.1', value: false },
    { id: 'I0.2', name: 'Sensor Entrada', address: 'I0.2', value: false },
    { id: 'I0.3', name: 'Sensor Salida', address: 'I0.3', value: false },
    { id: 'I0.4', name: 'EMERGENCIA', address: 'I0.4', value: false },
    { id: 'I0.5', name: 'Auto/Manual', address: 'I0.5', value: false },
  ])

  const [outputs, setOutputs] = useState<Output[]>([
    { id: 'Q0.0', name: 'Motor Banda', address: 'Q0.0', value: false, type: 'conveyor' },
    { id: 'Q0.1', name: 'Pistón', address: 'Q0.1', value: false, type: 'valve' },
    { id: 'Q0.2', name: 'Luz Verde', address: 'Q0.2', value: false, type: 'lamp' },
    { id: 'Q0.3', name: 'Luz Roja', address: 'Q0.3', value: false, type: 'lamp' },
    { id: 'Q0.4', name: 'Alarma', address: 'Q0.4', value: false, type: 'alarm' },
  ])

  const [memory, setMemory] = useState({
    'M0.0': false, // Sistema enclavado
  })

  // Lógica del PLC
  const executeScan = useCallback(() => {
    const startTime = performance.now()
    
    const start = inputs.find(i => i.id === 'I0.0')?.value || false
    const stop = inputs.find(i => i.id === 'I0.1')?.value || false
    const sensorEntrada = inputs.find(i => i.id === 'I0.2')?.value || false
    const sensorSalida = inputs.find(i => i.id === 'I0.3')?.value || false
    const emergency = inputs.find(i => i.id === 'I0.4')?.value || false
    
    const currentMotor = outputs.find(o => o.id === 'Q0.0')?.value || false
    
    // Enclavamiento Start/Stop
    const motorCommand = ((start || currentMotor) && !stop && !emergency)
    
    // Actualizar memoria
    setMemory(prev => ({ ...prev, 'M0.0': motorCommand }))
    
    // Actualizar salidas
    setOutputs(prev => prev.map(output => {
      switch (output.id) {
        case 'Q0.0': // Motor banda
          return { ...output, value: motorCommand }
        case 'Q0.1': // Pistón (se activa cuando sensor entrada detecta)
          return { ...output, value: motorCommand && sensorEntrada && !emergency }
        case 'Q0.2': // Luz verde (sistema activo)
          return { ...output, value: motorCommand && !emergency }
        case 'Q0.3': // Luz roja (sistema detenido o emergencia)
          return { ...output, value: !motorCommand || emergency }
        case 'Q0.4': // Alarma (emergencia)
          return { ...output, value: emergency }
        default:
          return output
      }
    }))
    
    const endTime = performance.now()
    setCycleTime(endTime - startTime)
    setScanCount(prev => prev + 1)
  }, [inputs, outputs])

  // Ciclo del PLC
  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(executeScan, 50)
    return () => clearInterval(interval)
  }, [isRunning, executeScan])

  // Simulación de productos en la banda
  useEffect(() => {
    if (!isRunning) return
    
    const motorOn = outputs.find(o => o.id === 'Q0.0')?.value || false
    
    const interval = setInterval(() => {
      if (motorOn) {
        setProductPosition(prev => {
          const newPos = prev + 3
          
          // Detectar sensor de entrada (posición ~100)
          if (newPos >= 95 && newPos <= 105) {
            setInputs(inp => inp.map(i => 
              i.id === 'I0.2' ? { ...i, value: true } : i
            ))
          } else {
            setInputs(inp => inp.map(i => 
              i.id === 'I0.2' ? { ...i, value: false } : i
            ))
          }
          
          // Detectar sensor de salida (posición ~280)
          if (newPos >= 275 && newPos <= 285) {
            setInputs(inp => inp.map(i => 
              i.id === 'I0.3' ? { ...i, value: true } : i
            ))
          } else {
            setInputs(inp => inp.map(i => 
              i.id === 'I0.3' ? { ...i, value: false } : i
            ))
          }
          
          // Producto sale de la banda
          if (newPos > 350) {
            setProductCount(c => c + 1)
            setProductVisible(true)
            return -30
          }
          
          if (newPos > -20) {
            setProductVisible(true)
          }
          
          return newPos
        })
      }
    }, 50)
    
    return () => clearInterval(interval)
  }, [isRunning, outputs])

  // Renderizar animación
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    
    const motorOn = outputs.find(o => o.id === 'Q0.0')?.value || false
    const pistonOn = outputs.find(o => o.id === 'Q0.1')?.value || false
    const luzVerde = outputs.find(o => o.id === 'Q0.2')?.value || false
    const luzRoja = outputs.find(o => o.id === 'Q0.3')?.value || false
    const sensorEntrada = inputs.find(i => i.id === 'I0.2')?.value || false
    const sensorSalida = inputs.find(i => i.id === 'I0.3')?.value || false

    // Fondo
    ctx.fillStyle = '#0a0f1a'
    ctx.fillRect(0, 0, width, height)

    // Título
    ctx.font = 'bold 14px sans-serif'
    ctx.fillStyle = '#94a3b8'
    ctx.fillText('LÍNEA DE PRODUCCIÓN - SIMULACIÓN PLC', 20, 25)

    // Base de la máquina
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(30, 180, 340, 60)
    
    // Banda transportadora
    ctx.fillStyle = '#334155'
    ctx.fillRect(50, 190, 300, 40)
    
    // Líneas de la banda (animadas)
    ctx.strokeStyle = '#475569'
    ctx.lineWidth = 2
    const bandOffset = motorOn ? (Date.now() / 20) % 30 : 0
    for (let x = 50 + (bandOffset % 30); x < 350; x += 30) {
      ctx.beginPath()
      ctx.moveTo(x, 195)
      ctx.lineTo(x, 225)
      ctx.stroke()
    }

    // Rodillos
    ctx.fillStyle = '#64748b'
    ctx.beginPath()
    ctx.arc(60, 210, 15, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(340, 210, 15, 0, Math.PI * 2)
    ctx.fill()

    // Motor
    ctx.fillStyle = motorOn ? '#22c55e' : '#374151'
    ctx.fillRect(35, 245, 50, 35)
    ctx.fillStyle = '#fff'
    ctx.font = '10px monospace'
    ctx.fillText('MOTOR', 40, 267)
    
    // Indicador de giro del motor
    if (motorOn) {
      const motorAngle = (Date.now() / 100) % 360
      ctx.strokeStyle = '#86efac'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.arc(60, 262, 10, (motorAngle * Math.PI / 180), ((motorAngle + 90) * Math.PI / 180))
      ctx.stroke()
    }

    // Sensor de entrada
    ctx.fillStyle = sensorEntrada ? '#22d3ee' : '#1e3a5f'
    ctx.fillRect(95, 160, 20, 25)
    ctx.fillStyle = '#fff'
    ctx.font = '8px monospace'
    ctx.fillText('S1', 99, 150)
    
    // Rayo del sensor entrada
    if (sensorEntrada) {
      ctx.strokeStyle = '#22d3ee'
      ctx.lineWidth = 2
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(105, 185)
      ctx.lineTo(105, 195)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Pistón/Actuador
    const pistonY = pistonOn ? 175 : 140
    ctx.fillStyle = '#475569'
    ctx.fillRect(145, 100, 30, 40)
    ctx.fillStyle = pistonOn ? '#f59e0b' : '#64748b'
    ctx.fillRect(152, pistonY - 35, 16, 35 + (pistonOn ? 35 : 0))
    ctx.fillStyle = '#fff'
    ctx.font = '8px monospace'
    ctx.fillText('ACT', 150, 95)

    // Sensor de salida
    ctx.fillStyle = sensorSalida ? '#22d3ee' : '#1e3a5f'
    ctx.fillRect(275, 160, 20, 25)
    ctx.fillStyle = '#fff'
    ctx.font = '8px monospace'
    ctx.fillText('S2', 279, 150)
    
    // Rayo del sensor salida
    if (sensorSalida) {
      ctx.strokeStyle = '#22d3ee'
      ctx.lineWidth = 2
      ctx.setLineDash([4, 4])
      ctx.beginPath()
      ctx.moveTo(285, 185)
      ctx.lineTo(285, 195)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Producto en la banda
    if (productVisible && productPosition > -20 && productPosition < 350) {
      // Sombra
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.fillRect(52 + productPosition, 200, 28, 22)
      
      // Caja
      ctx.fillStyle = '#3b82f6'
      ctx.fillRect(50 + productPosition, 195, 28, 22)
      ctx.strokeStyle = '#60a5fa'
      ctx.lineWidth = 2
      ctx.strokeRect(50 + productPosition, 195, 28, 22)
      
      // Líneas de la caja
      ctx.strokeStyle = '#93c5fd'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(50 + productPosition, 206)
      ctx.lineTo(78 + productPosition, 206)
      ctx.stroke()
    }

    // Panel de luces
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(310, 80, 60, 60)
    ctx.strokeStyle = '#334155'
    ctx.lineWidth = 2
    ctx.strokeRect(310, 80, 60, 60)
    
    // Luz verde
    ctx.beginPath()
    ctx.arc(330, 100, 12, 0, Math.PI * 2)
    ctx.fillStyle = luzVerde ? '#22c55e' : '#1f2937'
    ctx.fill()
    if (luzVerde) {
      ctx.shadowColor = '#22c55e'
      ctx.shadowBlur = 15
      ctx.fill()
      ctx.shadowBlur = 0
    }
    ctx.strokeStyle = '#374151'
    ctx.stroke()
    
    // Luz roja
    ctx.beginPath()
    ctx.arc(355, 100, 12, 0, Math.PI * 2)
    ctx.fillStyle = luzRoja ? '#ef4444' : '#1f2937'
    ctx.fill()
    if (luzRoja) {
      ctx.shadowColor = '#ef4444'
      ctx.shadowBlur = 15
      ctx.fill()
      ctx.shadowBlur = 0
    }
    ctx.strokeStyle = '#374151'
    ctx.stroke()

    // Etiquetas
    ctx.fillStyle = '#94a3b8'
    ctx.font = '10px sans-serif'
    ctx.fillText('RUN', 322, 130)
    ctx.fillText('STOP', 345, 130)

    // Contador de productos
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(20, 80, 80, 50)
    ctx.strokeStyle = '#22d3ee'
    ctx.lineWidth = 2
    ctx.strokeRect(20, 80, 80, 50)
    ctx.fillStyle = '#22d3ee'
    ctx.font = '10px monospace'
    ctx.fillText('CONTADOR', 30, 95)
    ctx.font = 'bold 20px monospace'
    ctx.fillText(String(productCount).padStart(4, '0'), 30, 120)

    // Flecha de dirección
    ctx.fillStyle = '#64748b'
    ctx.font = '12px sans-serif'
    ctx.fillText('→ Flujo de producción →', 130, 265)

  }, [productPosition, productVisible, outputs, inputs, isRunning])

  // Re-render para animación continua
  useEffect(() => {
    if (!isRunning) return
    const interval = setInterval(() => {
      setProductPosition(p => p)
    }, 33)
    return () => clearInterval(interval)
  }, [isRunning])

  const toggleInput = (id: string) => {
    // Para START, solo activar momentáneamente
    if (id === 'I0.0') {
      setInputs(prev => prev.map(input => 
        input.id === id ? { ...input, value: true } : input
      ))
      setTimeout(() => {
        setInputs(prev => prev.map(input => 
          input.id === id ? { ...input, value: false } : input
        ))
      }, 200)
      return
    }
    
    setInputs(prev => prev.map(input => 
      input.id === id ? { ...input, value: !input.value } : input
    ))
  }

  const reset = () => {
    setIsRunning(false)
    setScanCount(0)
    setCycleTime(0)
    setProductCount(0)
    setProductPosition(-30)
    setProductVisible(false)
    setInputs(prev => prev.map(i => ({ ...i, value: false })))
    setOutputs(prev => prev.map(o => ({ ...o, value: false })))
    setMemory({ 'M0.0': false })
  }

  const OutputIcon = ({ output }: { output: Output }) => {
    const iconClass = cn(
      "w-5 h-5 transition-colors",
      output.value ? "text-primary" : "text-muted-foreground/50"
    )
    
    switch (output.type) {
      case 'lamp':
        return <Lightbulb className={cn(iconClass, output.value && output.name.includes('Verde') && "text-green-500")} />
      case 'conveyor':
        return <ArrowRight className={cn(iconClass, output.value && "animate-pulse")} />
      case 'valve':
        return <Power className={iconClass} />
      case 'alarm':
        return <AlertTriangle className={cn(iconClass, output.value && "animate-pulse text-red-500")} />
      default:
        return <Gauge className={iconClass} />
    }
  }

  return (
    <div className="space-y-6">
      {/* Animación de la línea de producción */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-foreground">Simulación de Proceso Industrial</CardTitle>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-mono text-foreground">{productCount} piezas</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <canvas
            ref={canvasRef}
            width={400}
            height={290}
            className="w-full rounded-xl border border-border/50"
          />
        </CardContent>
      </Card>

      {/* Panel de Control */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Entradas */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground">Entradas Digitales (I)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {inputs.map(input => (
                <button
                  key={input.id}
                  onClick={() => toggleInput(input.id)}
                  className={cn(
                    "p-3 rounded-lg border text-xs font-mono transition-all text-left",
                    input.value 
                      ? "bg-primary/20 border-primary text-primary" 
                      : "bg-secondary border-border text-muted-foreground hover:border-primary/50",
                    input.id === 'I0.4' && input.value && "bg-red-500/20 border-red-500 text-red-500"
                  )}
                >
                  <div className="font-bold">{input.address}</div>
                  <div className="text-[10px] truncate opacity-70">{input.name}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estado del PLC */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground">Estado del PLC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Modo:</span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold",
                  isRunning ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                )}>
                  {isRunning ? "RUN" : "STOP"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ciclo de Scan:</span>
                <span className="text-xs font-mono text-foreground">{cycleTime.toFixed(2)} ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Scans:</span>
                <span className="text-xs font-mono text-foreground">{scanCount.toLocaleString()}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => setIsRunning(!isRunning)} 
                  size="sm" 
                  variant={isRunning ? "destructive" : "default"}
                  className="flex-1 gap-2"
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRunning ? "Detener" : "Iniciar"}
                </Button>
                <Button onClick={reset} size="sm" variant="outline">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Salidas */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-foreground">Salidas Digitales (Q)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {outputs.map(output => (
                <div
                  key={output.id}
                  className={cn(
                    "p-2 rounded-lg border text-xs font-mono flex items-center gap-3 transition-all",
                    output.value 
                      ? "bg-primary/20 border-primary" 
                      : "bg-secondary border-border"
                  )}
                >
                  <OutputIcon output={output} />
                  <div className="flex-1">
                    <span className={cn("font-bold", output.value ? "text-primary" : "text-muted-foreground")}>
                      {output.address}
                    </span>
                    <span className="text-muted-foreground ml-2">{output.name}</span>
                  </div>
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    output.value ? "bg-green-500" : "bg-muted"
                  )} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Diagrama Ladder simplificado */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Diagrama Ladder - Lógica de Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-[#0a0f1a] rounded-xl p-4 font-mono text-xs overflow-x-auto">
            <div className="min-w-[600px] space-y-4">
              {/* Rung 1 */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-16">Rung 1:</span>
                <div className="flex items-center">
                  <div className="w-1 h-10 bg-muted-foreground/30" />
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded", inputs[0].value ? "border-primary bg-primary/20 text-primary" : "border-muted-foreground/30 text-muted-foreground")}>
                    ] [ I0.0
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded", outputs[0].value ? "border-primary bg-primary/20 text-primary" : "border-muted-foreground/30 text-muted-foreground")}>
                    ] [ Q0.0
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded", !inputs[1].value ? "border-primary bg-primary/20 text-primary" : "border-muted-foreground/30 text-muted-foreground")}>
                    ]/[ I0.1
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded", !inputs[4].value ? "border-primary bg-primary/20 text-primary" : "border-muted-foreground/30 text-muted-foreground")}>
                    ]/[ I0.4
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded-full", outputs[0].value ? "border-green-500 bg-green-500/20 text-green-400" : "border-muted-foreground/30 text-muted-foreground")}>
                    ( ) Q0.0
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className="w-1 h-10 bg-muted-foreground/30" />
                </div>
                <span className="text-muted-foreground ml-4">// Motor con enclavamiento</span>
              </div>

              {/* Rung 2 */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-16">Rung 2:</span>
                <div className="flex items-center">
                  <div className="w-1 h-10 bg-muted-foreground/30" />
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded", outputs[0].value ? "border-primary bg-primary/20 text-primary" : "border-muted-foreground/30 text-muted-foreground")}>
                    ] [ Q0.0
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded", inputs[2].value ? "border-cyan-500 bg-cyan-500/20 text-cyan-400" : "border-muted-foreground/30 text-muted-foreground")}>
                    ] [ I0.2
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded-full", outputs[1].value ? "border-yellow-500 bg-yellow-500/20 text-yellow-400" : "border-muted-foreground/30 text-muted-foreground")}>
                    ( ) Q0.1
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className="w-1 h-10 bg-muted-foreground/30" />
                </div>
                <span className="text-muted-foreground ml-4">// Pistón con sensor</span>
              </div>

              {/* Rung 3 */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-16">Rung 3:</span>
                <div className="flex items-center">
                  <div className="w-1 h-10 bg-muted-foreground/30" />
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded", outputs[0].value ? "border-primary bg-primary/20 text-primary" : "border-muted-foreground/30 text-muted-foreground")}>
                    ] [ Q0.0
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded-full", outputs[2].value ? "border-green-500 bg-green-500/20 text-green-400" : "border-muted-foreground/30 text-muted-foreground")}>
                    ( ) Q0.2
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className="w-1 h-10 bg-muted-foreground/30" />
                </div>
                <span className="text-muted-foreground ml-4">// Luz verde</span>
              </div>

              {/* Rung 4 */}
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground w-16">Rung 4:</span>
                <div className="flex items-center">
                  <div className="w-1 h-10 bg-muted-foreground/30" />
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded", !outputs[0].value ? "border-primary bg-primary/20 text-primary" : "border-muted-foreground/30 text-muted-foreground")}>
                    ]/[ Q0.0
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className={cn("px-2 py-1 border rounded-full", outputs[3].value ? "border-red-500 bg-red-500/20 text-red-400" : "border-muted-foreground/30 text-muted-foreground")}>
                    ( ) Q0.3
                  </div>
                  <div className="w-4 h-0.5 bg-muted-foreground/30" />
                  <div className="w-1 h-10 bg-muted-foreground/30" />
                </div>
                <span className="text-muted-foreground ml-4">// Luz roja</span>
              </div>
            </div>
          </div>
          
          {/* Leyenda */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span><code className="text-primary">] [</code> Contacto NA</span>
            <span><code className="text-primary">]/[</code> Contacto NC</span>
            <span><code className="text-primary">( )</code> Bobina</span>
            <span className="text-green-400">Verde = Activo</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
