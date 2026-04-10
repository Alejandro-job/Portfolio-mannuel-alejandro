import { Card, CardContent } from '@/components/ui/card'
import { Droplets, Pill, Wind, AlertTriangle, TrendingUp, Database } from 'lucide-react'

const dataSources = [
  {
    icon: Droplets,
    title: "Sistema de Agua",
    description: "Monitoreo de calidad del agua purificada con parámetros de conductividad, TOC, pH, temperatura y flujo.",
    metrics: ["Conductividad", "TOC", "pH", "Temperatura", "Flujo"],
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
  },
  {
    icon: Pill,
    title: "Producción de Tabletas",
    description: "Control de calidad en la producción de tabletas con mediciones de peso, dureza, friabilidad y disolución.",
    metrics: ["Peso", "Dureza", "Friabilidad", "Disolución", "Espesor"],
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  {
    icon: Wind,
    title: "Monitoreo Ambiental",
    description: "Seguimiento de condiciones ambientales en áreas de producción con partículas, temperatura y humedad.",
    metrics: ["Partículas", "Temperatura", "Humedad", "Presión Diferencial"],
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
]

const capabilities = [
  {
    icon: Database,
    title: "Generación de Datos Sintéticos",
    description: "Creación de datasets realistas con distribuciones industriales y anomalías controladas.",
  },
  {
    icon: TrendingUp,
    title: "Análisis Exploratorio",
    description: "Estadísticas descriptivas, análisis de tendencias y correlaciones entre variables.",
  },
  {
    icon: AlertTriangle,
    title: "Sistema de Alertas",
    description: "Alertas automáticas basadas en umbrales y predicciones ML con 3 niveles de severidad.",
  },
]

export function PharmaOverview() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Visión General
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Arquitectura del Sistema
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Sistema modular que integra múltiples fuentes de datos industriales con análisis avanzado 
            y detección de anomalías en tiempo real.
          </p>
        </div>

        {/* Data Sources */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {dataSources.map((source, index) => (
            <Card key={index} className="bg-background border-border hover:border-primary/50 transition-all duration-300 group">
              <CardContent className="p-6">
                <div className={`p-3 rounded-xl ${source.bgColor} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <source.icon className={`w-6 h-6 ${source.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">{source.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{source.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {source.metrics.map((metric) => (
                    <span key={metric} className="px-2 py-1 text-xs bg-secondary rounded text-muted-foreground">
                      {metric}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Capabilities */}
        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => (
            <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-background border border-border">
              <div className="p-2 rounded-lg bg-accent/10">
                <cap.icon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{cap.title}</h3>
                <p className="text-sm text-muted-foreground">{cap.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
