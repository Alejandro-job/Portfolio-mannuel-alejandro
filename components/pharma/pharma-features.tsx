import { Card, CardContent } from '@/components/ui/card'
import { 
  Brain, 
  BarChart3, 
  Bell, 
  Gauge, 
  LineChart, 
  Settings,
  Layers,
  Clock
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: "4 Algoritmos de ML",
    description: "Isolation Forest, Local Outlier Factor, One-Class SVM y Autoencoder para detección robusta de anomalías.",
    highlight: "Ensemble Learning"
  },
  {
    icon: BarChart3,
    title: "Dashboard Interactivo",
    description: "Interfaz Streamlit con 7 secciones: KPIs, gráficos en tiempo real, filtros avanzados y exportación de datos.",
    highlight: "Streamlit"
  },
  {
    icon: Bell,
    title: "Sistema de Alertas",
    description: "3 niveles de severidad (crítica, mayor, menor) con evaluación por umbrales y predicciones ML.",
    highlight: "Tiempo Real"
  },
  {
    icon: Gauge,
    title: "Monitoreo GMP",
    description: "Cumplimiento con Good Manufacturing Practices para industria farmacéutica regulada.",
    highlight: "Compliance"
  },
  {
    icon: LineChart,
    title: "Análisis de Tendencias",
    description: "Detección de patrones, correlaciones y análisis estadístico avanzado de series temporales.",
    highlight: "Predictivo"
  },
  {
    icon: Settings,
    title: "Configuración Flexible",
    description: "Umbrales personalizables, parámetros de sensibilidad y reglas de negocio adaptables.",
    highlight: "Personalizable"
  },
  {
    icon: Layers,
    title: "Arquitectura Modular",
    description: "Diseño desacoplado con módulos independientes para datos, análisis, ML y alertas.",
    highlight: "Escalable"
  },
  {
    icon: Clock,
    title: "Datos Sintéticos",
    description: "Generación de datos realistas con distribuciones industriales y anomalías controladas para testing.",
    highlight: "Simulación"
  },
]

export function PharmaFeatures() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Características
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Funcionalidades Principales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un sistema completo diseñado para cumplir con los más altos estándares de la industria farmacéutica.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group bg-card border-border hover:border-primary/50 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
