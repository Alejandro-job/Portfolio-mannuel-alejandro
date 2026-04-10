"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Pill, Wind, AlertTriangle, BarChart3, Brain } from "lucide-react"

const dataSources = [
  {
    icon: Droplets,
    title: "Sistema de Agua Purificada",
    description: "Monitoreo continuo de calidad del agua para uso farmacéutico",
    variables: [
      { name: "Conductividad", unit: "μS/cm", range: "0.5 - 1.3" },
      { name: "TOC", unit: "ppb", range: "100 - 500" },
      { name: "pH", unit: "-", range: "5.0 - 7.0" },
      { name: "Temperatura", unit: "°C", range: "20 - 25" },
      { name: "Cloro Residual", unit: "ppm", range: "0.1 - 0.5" },
    ],
    color: "primary",
    compliance: "USP <645>, EP 2.2.38"
  },
  {
    icon: Pill,
    title: "Producción de Tabletas",
    description: "Control de calidad en línea de producción de formas sólidas",
    variables: [
      { name: "Peso", unit: "mg", range: "498 - 502" },
      { name: "Dureza", unit: "N", range: "60 - 120" },
      { name: "Friabilidad", unit: "%", range: "< 1.0" },
      { name: "Espesor", unit: "mm", range: "4.8 - 5.2" },
      { name: "Desintegración", unit: "min", range: "< 30" },
    ],
    color: "accent",
    compliance: "FDA 21 CFR 211"
  },
  {
    icon: Wind,
    title: "Monitoreo Ambiental",
    description: "Control de condiciones en áreas de producción clasificadas",
    variables: [
      { name: "Partículas 0.5μm", unit: "/m³", range: "< 3520" },
      { name: "Partículas 5μm", unit: "/m³", range: "< 29" },
      { name: "Temperatura", unit: "°C", range: "20 - 24" },
      { name: "Humedad", unit: "%RH", range: "40 - 60" },
      { name: "Presión Dif.", unit: "Pa", range: "> 15" },
    ],
    color: "chart-3",
    compliance: "ISO 14644-1, EU GMP Annex 1"
  },
]

export function SystemOverview() {
  return (
    <section id="overview" className="py-24 bg-background relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Fuentes de Datos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Sistema de Monitoreo Integrado
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Integración de múltiples fuentes de datos críticos para la producción 
            farmacéutica, cumpliendo con estándares GMP y regulaciones internacionales.
          </p>
        </div>
        
        {/* Data Sources Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {dataSources.map((source, index) => (
            <Card 
              key={source.title} 
              className="bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg bg-${source.color}/10 text-${source.color} group-hover:scale-110 transition-transform`}>
                    <source.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {index + 1} de 3
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-4">{source.title}</CardTitle>
                <CardDescription>{source.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Variables Table */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Variables Monitoreadas
                  </div>
                  <div className="bg-muted/30 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left px-3 py-2 text-muted-foreground font-medium">Variable</th>
                          <th className="text-right px-3 py-2 text-muted-foreground font-medium">Rango</th>
                        </tr>
                      </thead>
                      <tbody>
                        {source.variables.map((variable) => (
                          <tr key={variable.name} className="border-b border-border/50 last:border-0">
                            <td className="px-3 py-2 font-mono text-xs">{variable.name}</td>
                            <td className="px-3 py-2 text-right font-mono text-xs text-primary">
                              {variable.range} {variable.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Compliance Badge */}
                <div className="pt-4 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    Normativa: <span className="text-foreground font-medium">{source.compliance}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* System Flow */}
        <div className="mt-16 p-8 bg-card/30 rounded-2xl border border-border">
          <h3 className="text-xl font-semibold text-foreground mb-8 text-center">
            Flujo del Sistema
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <FlowStep icon={Droplets} label="Adquisición" description="Sensores IoT" />
            <FlowArrow />
            <FlowStep icon={BarChart3} label="Análisis" description="Estadísticas" />
            <FlowArrow />
            <FlowStep icon={Brain} label="ML" description="Detección" />
            <FlowArrow />
            <FlowStep icon={AlertTriangle} label="Alertas" description="Automatizadas" />
          </div>
        </div>
      </div>
    </section>
  )
}

function FlowStep({ icon: Icon, label, description }: { icon: React.ElementType; label: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/30 border border-border min-w-[120px]">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  )
}

function FlowArrow() {
  return (
    <div className="hidden sm:flex items-center text-muted-foreground">
      <div className="w-8 h-px bg-border" />
      <div className="w-2 h-2 border-t border-r border-border rotate-45 -ml-1" />
    </div>
  )
}
