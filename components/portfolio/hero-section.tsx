"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Phone, Download } from 'lucide-react'
import Link from 'next/link'

const roles = [
  "Ingeniero en Computación",
  "Desarrollador Python",
  "Especialista en IA",
  "Desarrollador Flutter",
  "Analista de Datos",
  "Programador CNC/PLC"
]

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Floating Particles - Fixed positions to avoid hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { left: 10, top: 15, delay: 0.5, duration: 3 },
          { left: 25, top: 80, delay: 1.2, duration: 4 },
          { left: 40, top: 30, delay: 0.8, duration: 3.5 },
          { left: 55, top: 70, delay: 1.5, duration: 2.5 },
          { left: 70, top: 20, delay: 2.0, duration: 4.5 },
          { left: 85, top: 60, delay: 0.3, duration: 3.2 },
          { left: 15, top: 45, delay: 1.8, duration: 2.8 },
          { left: 30, top: 90, delay: 2.5, duration: 3.8 },
          { left: 60, top: 10, delay: 0.7, duration: 4.2 },
          { left: 80, top: 85, delay: 1.0, duration: 3.0 },
          { left: 5, top: 55, delay: 2.2, duration: 3.6 },
          { left: 45, top: 40, delay: 1.4, duration: 4.0 },
          { left: 90, top: 25, delay: 0.9, duration: 2.6 },
          { left: 20, top: 65, delay: 2.8, duration: 3.4 },
          { left: 75, top: 50, delay: 0.4, duration: 4.8 },
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="text-sm text-primary">Disponible para nuevos proyectos</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in stagger-1">
          <span className="text-foreground">Hola, soy </span>
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Mannuel Alejandro
          </span>
        </h1>

        {/* Animated Role */}
        <div className="h-12 sm:h-14 mb-8 fade-in stagger-2">
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground">
            <span className="text-foreground font-mono">
              {displayText}
              <span className="cursor-blink text-primary">|</span>
            </span>
          </p>
        </div>

        {/* Description */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 fade-in stagger-3 text-pretty">
          Ingeniero en Computación del <span className="text-primary">Instituto Politécnico Nacional</span>. 
          Especializado en <span className="text-accent">Inteligencia Artificial</span>, 
          <span className="text-primary"> redes neuronales</span>, 
          <span className="text-accent"> automatización industrial (CNC/PLC)</span> y 
          desarrollo de software con <span className="text-primary">Python, C++, React y Flutter</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 fade-in stagger-4">
          <Link href="/proyectos/sistema-farmaceutico">
            <Button size="lg" className="gap-2 glow">
              <Sparkles className="w-5 h-5" />
              Ver Sistema Farmacéutico ML
            </Button>
          </Link>
          <Link href="/proyectos/automatizacion">
            <Button size="lg" variant="outline" className="gap-2">
              <span className="font-mono">CNC/PLC</span>
              Automatización Industrial
            </Button>
          </Link>
        </div>

        {/* Download CV Button */}
        <div className="flex items-center justify-center gap-4 mb-12 fade-in stagger-4">
          <a href="/cv-mannuel-alejandro.pdf" download>
            <Button size="lg" variant="secondary" className="gap-2">
              <Download className="w-5 h-5" />
              Descargar CV
            </Button>
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 fade-in stagger-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary" />
            +52 55 3669 5246
          </span>
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-primary" />
            ale_program_smurf@hotmail.com
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-4 fade-in stagger-5">
          <a
            href="https://github.com/Alejandro-job"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/mannuelalejandro"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <Link
            href="/contacto"
            className="p-3 rounded-full bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in stagger-5">
          <div className="flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
