"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Database, 
  Cpu, 
  BarChart3, 
  Bell, 
  FileText, 
  Settings,
  ArrowRight,
  Layers,
  Monitor
} from "lucide-react"

const modules = [
  {
    icon: Settings,
    name: "config.py",
    description: "Configuración centralizada del sistema",
    lines: "300+",
    features: ["Dataclasses", "Validación", "Constantes GMP"]
  },
  {
    icon: Database,
    name: "data_generator.py",
    description: "Generación de datos sintéticos",
    lines: "570+",
    features: ["Distribuciones", "Correlaciones", "Anomalías"]
  },
  {
    icon: BarChart3,
    name: "analysis.py",
    description: "Análisis estadístico y exploratorio",
    lines: "880+",
    features: ["Estadísticas", "Tendencias", "Visualización"]
  },
  {
    icon: Cpu,
    name: "ml_models.py",
    description: "Modelos de machine learning",
    lines: "835+",
    features: ["4 Algoritmos", "Ensemble", "Métricas"]
  },
  {
    icon: Bell,
    name: "alerts.py",
    description: "Sistema de alertas y notificaciones",
    lines: "796+",
    features: ["3 Severidades", "Umbrales", "Historial"]
  },
  {
    icon: Monitor,
    name: "dashboard.py",
    description: "Dashboard interactivo Streamlit",
    lines: "1700+",
    features: ["KPIs", "Gráficos", "Filtros"]
  },
]

const projectStructure = `pharma_system/
├── config.py           # Configuración del sistema
├── data_generator.py   # Generación de datos sintéticos
├── analysis.py         # Análisis estadístico
├── ml_models.py        # Modelos de ML
├── alerts.py           # Sistema de alertas
├── dashboard.py        # Dashboard Streamlit
├── main.py             # Script principal
├── requirements.txt    # Dependencias
└── output/
    ├── data/           # Datos generados
    ├── analysis/       # Resultados de análisis
    ├── models/         # Modelos entrenados
    ├── alerts/         # Registro de alertas
    └── reports/        # Informes generados`

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 bg-muted/20 relative">
      <div className="absolute inset-0 grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Arquitectura
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Estructura del Proyecto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Arquitectura modular con separación clara de responsabilidades, 
            siguiendo principios SOLID y mejores prácticas de Python.
          </p>
        </div>
        
        {/* Pipeline Flow */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-foreground mb-8 text-center">
            Pipeline de Procesamiento
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            <PipelineStep 
              icon={Database} 
              label="Datos" 
              sublabel="Generación"
            />
            <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
            <PipelineStep 
              icon={BarChart3} 
              label="Análisis" 
              sublabel="EDA"
            />
            <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
            <PipelineStep 
              icon={Cpu} 
              label="ML" 
              sublabel="Entrenamiento"
            />
            <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
            <PipelineStep 
              icon={Bell} 
              label="Alertas" 
              sublabel="Evaluación"
            />
            <ArrowRight className="h-5 w-5 text-muted-foreground hidden sm:block" />
            <PipelineStep 
              icon={FileText} 
              label="Reportes" 
              sublabel="Generación"
            />
          </div>
        </div>
        
        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {modules.map((module) => (
            <Card key={module.name} className="bg-card/50 border-border hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <module.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-mono">{module.name}</CardTitle>
                    <div className="text-xs text-muted-foreground">{module.lines} líneas</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                <div className="flex flex-wrap gap-1">
                  {module.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Project Structure */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <Layers className="h-5 w-5 text-accent" />
              </div>
              <CardTitle className="text-lg">Estructura de Archivos</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-4 overflow-x-auto">
              <pre className="font-mono text-sm text-foreground whitespace-pre">
                {projectStructure}
              </pre>
            </div>
          </CardContent>
        </Card>
        
        {/* Design Patterns */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-card/30 border border-border">
            <h4 className="font-semibold text-foreground mb-2">Patrones de Diseño</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                Factory Pattern (Generadores)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                Strategy Pattern (Algoritmos ML)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                Observer Pattern (Alertas)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                Pipeline Pattern (Procesamiento)
              </li>
            </ul>
          </div>
          
          <div className="p-6 rounded-xl bg-card/30 border border-border">
            <h4 className="font-semibold text-foreground mb-2">Principios SOLID</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" />
                Single Responsibility
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" />
                Open/Closed Principle
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" />
                Dependency Injection
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-accent" />
                Interface Segregation
              </li>
            </ul>
          </div>
          
          <div className="p-6 rounded-xl bg-card/30 border border-border">
            <h4 className="font-semibold text-foreground mb-2">Best Practices</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-chart-4" />
                Type Hints completos
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-chart-4" />
                Docstrings detallados
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-chart-4" />
                Logging estructurado
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-chart-4" />
                Exception handling
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function PipelineStep({ 
  icon: Icon, 
  label, 
  sublabel 
}: { 
  icon: React.ElementType
  label: string
  sublabel: string 
}) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors min-w-[100px]">
      <div className="p-2 rounded-lg bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="text-sm font-medium text-foreground">{label}</div>
      <div className="text-xs text-muted-foreground">{sublabel}</div>
    </div>
  )
}
