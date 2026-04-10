"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Brain, Code2, Cpu, GraduationCap, Cog, Database } from 'lucide-react'

const highlights = [
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    description: "Desarrollo de modelos de IA, redes neuronales y sistemas de detección de anomalías con PyTorch y TensorFlow."
  },
  {
    icon: Code2,
    title: "Desarrollo de Software",
    description: "Aplicaciones con Python, C, C++, React y Flutter. Soluciones tecnológicas orientadas a optimización."
  },
  {
    icon: Cpu,
    title: "Automatización Industrial",
    description: "Programación CNC y PLC para control de procesos industriales y manufactura automatizada."
  }
]

const stats = [
  { value: "2017", label: "Inicio en análisis de datos" },
  { value: "IPN", label: "Instituto Politécnico Nacional" },
  { value: "2025", label: "Egreso Ing. Computación" },
  { value: "5+", label: "Lenguajes de programación" }
]

export function AboutSection() {
  return (
    <section id="sobre-mi" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Sobre Mí
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Mannuel Alejandro Olivares Morales
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Ingeniero en Computación con pasión por la tecnología, automatización y la inteligencia artificial.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div>
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                Soy <span className="text-foreground font-medium">Ingeniero en Computación</span> egresado del 
                <span className="text-primary font-medium"> Instituto Politécnico Nacional</span>, con experiencia 
                real en análisis de datos desde 2017 cuando trabajé en <span className="text-foreground">Solaris Farma</span>.
              </p>
              <p className="leading-relaxed">
                Mi experiencia incluye el desarrollo de software utilizando <span className="text-foreground">C, C++, 
                Python, React y Flutter</span>. Tengo conocimientos sólidos en 
                <span className="text-primary"> Inteligencia Artificial</span>, redes neuronales y procesamiento de datos, 
                así como en <span className="text-accent">automatización industrial con CNC y PLC</span>.
              </p>
              <p className="leading-relaxed">
                En mi rol anterior en Solaris Farma, fui responsable del análisis, limpieza y optimización de datos 
                en hojas de cálculo, automatización de procesos mediante <span className="text-foreground">macros en Excel</span>, 
                y apoyo en gestión de nómina incluyendo cálculo, validación de pagos y análisis de incidencias.
              </p>
              <p className="leading-relaxed">
                Poseo nivel de <span className="text-foreground">inglés intermedio</span> (lectura técnica y comprensión) 
                y capacidad para trabajar en proyectos multidisciplinarios combinando tecnología y gestión empresarial.
              </p>
            </div>

            {/* Credentials */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                <GraduationCap className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">Ing. Computación - IPN</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                <Cog className="w-5 h-5 text-accent" />
                <span className="text-sm text-foreground">CNC / PLC</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary">
                <Database className="w-5 h-5 text-primary" />
                <span className="text-sm text-foreground">Bases de Datos</span>
              </div>
            </div>
          </div>

          {/* Right - Stats & Highlights */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-primary mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
