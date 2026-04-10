"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Database, 
  LineChart, 
  Brain, 
  Bell, 
  Shield, 
  FileText,
  Zap,
  RefreshCw,
  BarChart2,
  Layers
} from "lucide-react"

const features = [
  {
    icon: Database,
    title: "Generación de Datos Sintéticos",
    description: "Simulación realista de datos de producción farmacéutica con patrones temporales, estacionalidad y anomalías controladas.",
    highlights: ["Distribuciones estadísticas reales", "Inyección de anomalías configurable", "Correlaciones entre variables"],
    category: "Datos"
  },
  {
    icon: LineChart,
    title: "Análisis Exploratorio",
    description: "Análisis estadístico completo con visualizaciones interactivas y detección de patrones en series temporales.",
    highlights: ["Estadísticas descriptivas", "Análisis de tendencias", "Correlaciones cruzadas"],
    category: "Análisis"
  },
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Ensemble de algoritmos de detección de anomalías: Isolation Forest, LOF, One-Class SVM y Autoencoder.",
    highlights: ["4 algoritmos integrados", "Ensemble voting", "Ajuste automático"],
    category: "ML"
  },
  {
    icon: Bell,
    title: "Sistema de Alertas",
    description: "Alertas en tiempo real basadas en umbrales definidos y predicciones de modelos ML con tres niveles de severidad.",
    highlights: ["Alertas en cascada", "Notificaciones configurables", "Historial de eventos"],
    category: "Alertas"
  },
  {
    icon: Shield,
    title: "Cumplimiento GMP",
    description: "Verificación automática de cumplimiento con regulaciones FDA 21 CFR Part 11 y EU GMP Annex 11.",
    highlights: ["Auditoría automática", "Trazabilidad completa", "Reportes de conformidad"],
    category: "Compliance"
  },
  {
    icon: FileText,
    title: "Reportes Automatizados",
    description: "Generación de informes ejecutivos, técnicos y de calidad con métricas clave y recomendaciones.",
    highlights: ["Exportación múltiple", "Plantillas personalizables", "Programación automática"],
    category: "Reportes"
  },
]

const capabilities = [
  { icon: Zap, label: "Tiempo Real", value: "Procesamiento streaming" },
  { icon: RefreshCw, label: "Actualización", value: "Cada 5 segundos" },
  { icon: BarChart2, label: "Métricas", value: "+50 variables" },
  { icon: Layers, label: "Integración", value: "API REST" },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/20 relative">
      <div className="absolute inset-0 grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Funcionalidades
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Capacidades del Sistema
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Un sistema completo que cubre todo el ciclo de monitoreo farmacéutico, 
            desde la adquisición de datos hasta la generación de informes.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <Card 
              key={feature.title}
              className="bg-card/50 backdrop-blur border-border hover:border-primary/30 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {feature.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-1">
                      {feature.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Capabilities Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {capabilities.map((cap) => (
            <div 
              key={cap.label}
              className="flex items-center gap-3 p-4 rounded-xl bg-card/50 border border-border"
            >
              <div className="p-2 rounded-lg bg-accent/10">
                <cap.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{cap.label}</div>
                <div className="text-xs text-muted-foreground">{cap.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
