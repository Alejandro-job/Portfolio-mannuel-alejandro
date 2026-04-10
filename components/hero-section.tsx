"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Play, Terminal } from "lucide-react"
import Link from "next/link"

const codeLines = [
  { text: "from pharma_monitor import PharmaMonitoringSystem", delay: 0 },
  { text: "", delay: 100 },
  { text: "# Inicializar sistema de monitoreo", delay: 200 },
  { text: "system = PharmaMonitoringSystem()", delay: 300 },
  { text: "", delay: 400 },
  { text: "# Generar datos sintéticos", delay: 500 },
  { text: "system.generate_data(days=30, anomaly_rate=0.05)", delay: 600 },
  { text: "", delay: 700 },
  { text: "# Entrenar modelos de detección de anomalías", delay: 800 },
  { text: "system.train_models()", delay: 900 },
  { text: "", delay: 1000 },
  { text: "# Ejecutar pipeline completo", delay: 1100 },
  { text: "result = system.run_full_pipeline()", delay: 1200 },
  { text: "", delay: 1300 },
  { text: ">>> Pipeline completado: 98.5% precisión", delay: 1400 },
]

function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (visibleLines < codeLines.length) {
      const line = codeLines[visibleLines]
      if (currentChar < line.text.length && isTyping) {
        const timer = setTimeout(() => {
          setCurrentChar((prev) => prev + 1)
        }, 30)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setVisibleLines((prev) => prev + 1)
          setCurrentChar(0)
        }, 150)
        return () => clearTimeout(timer)
      }
    } else {
      const timer = setTimeout(() => {
        setVisibleLines(0)
        setCurrentChar(0)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [visibleLines, currentChar, isTyping])

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-2xl glow">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-chart-4/80" />
          <div className="w-3 h-3 rounded-full bg-accent/80" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-muted-foreground font-mono">
            pharma_monitor.py
          </span>
        </div>
        <Terminal className="w-4 h-4 text-muted-foreground" />
      </div>
      
      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm leading-relaxed min-h-[320px] overflow-hidden">
        {codeLines.slice(0, visibleLines + 1).map((line, index) => (
          <div key={index} className="flex">
            <span className="text-muted-foreground w-6 text-right mr-4 select-none">
              {index + 1}
            </span>
            <span>
              {index < visibleLines ? (
                <CodeLine text={line.text} />
              ) : (
                <>
                  <CodeLine text={line.text.slice(0, currentChar)} />
                  <span className="cursor-blink text-primary">|</span>
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CodeLine({ text }: { text: string }) {
  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    if (code.startsWith("#") || code.startsWith(">>>")) {
      return <span className="text-muted-foreground">{code}</span>
    }
    
    // Keywords
    const keywords = ["from", "import", "def", "class", "return", "if", "else", "for", "in", "True", "False", "None"]
    let result = code
    
    // Highlight strings
    const stringRegex = /(["'])(.*?)\1/g
    result = result.replace(stringRegex, '<string>"$2"</string>')
    
    // Highlight numbers
    const numberRegex = /\b(\d+\.?\d*)\b/g
    result = result.replace(numberRegex, '<number>$1</number>')
    
    const parts = result.split(/(<\/?(?:string|number)>)/)
    
    return (
      <>
        {parts.map((part, i) => {
          if (part === '<string>' || part === '</string>') return null
          if (part === '<number>' || part === '</number>') return null
          
          // Check previous part to determine type
          const prevPart = parts[i - 1]
          if (prevPart === '<string>') {
            return <span key={i} className="text-accent">{`"${part}"`}</span>
          }
          if (prevPart === '<number>') {
            return <span key={i} className="text-chart-4">{part}</span>
          }
          
          // Highlight keywords
          const words = part.split(/(\s+)/)
          return words.map((word, j) => {
            if (keywords.includes(word)) {
              return <span key={`${i}-${j}`} className="text-chart-3">{word}</span>
            }
            if (word.includes("(") || word.includes(")") || word.includes("=")) {
              return <span key={`${i}-${j}`} className="text-foreground">{word}</span>
            }
            return <span key={`${i}-${j}`} className="text-foreground">{word}</span>
          })
        })}
      </>
    )
  }
  
  return <>{highlightCode(text)}</>
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden"
    >
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono text-primary">
                  Proyecto de Portafolio
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Pharma Industrial{" "}
                <span className="text-primary">Monitoring System</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
                Sistema completo de monitoreo farmacéutico industrial con generación 
                de datos sintéticos, análisis exploratorio, machine learning para 
                detección de anomalías y alertas automatizadas.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="glow" asChild>
                <Link href="#overview">
                  <Play className="mr-2 h-4 w-4" />
                  Ver Sistema
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Código Fuente
                </a>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-primary">6+</div>
                <div className="text-sm text-muted-foreground">Módulos Python</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">4</div>
                <div className="text-sm text-muted-foreground">Algoritmos ML</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-chart-4">3</div>
                <div className="text-sm text-muted-foreground">Fuentes de Datos</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Terminal */}
          <div className="lg:pl-8">
            <TerminalAnimation />
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Scroll para explorar</span>
          <ArrowDown className="h-4 w-4 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  )
}
