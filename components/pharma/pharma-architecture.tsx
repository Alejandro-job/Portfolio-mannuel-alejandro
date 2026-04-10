import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Database, Cpu, BarChart3, Bell, Github, ExternalLink } from 'lucide-react'

const architectureLayers = [
  {
    icon: Database,
    title: "Capa de Datos",
    components: ["data_generator.py", "config.py"],
    description: "Generación y configuración de datos sintéticos"
  },
  {
    icon: BarChart3,
    title: "Capa de Análisis",
    components: ["analysis.py"],
    description: "Análisis estadístico y exploratorio"
  },
  {
    icon: Cpu,
    title: "Capa de ML",
    components: ["ml_models.py"],
    description: "Modelos de detección de anomalías"
  },
  {
    icon: Bell,
    title: "Capa de Alertas",
    components: ["alerts.py", "dashboard.py"],
    description: "Notificaciones y visualización"
  }
]

const files = [
  { name: "config.py", lines: 300, description: "Configuración del sistema" },
  { name: "data_generator.py", lines: 570, description: "Generación de datos" },
  { name: "analysis.py", lines: 880, description: "Análisis estadístico" },
  { name: "ml_models.py", lines: 835, description: "Modelos de ML" },
  { name: "alerts.py", lines: 796, description: "Sistema de alertas" },
  { name: "dashboard.py", lines: 1700, description: "Dashboard Streamlit" },
  { name: "main.py", lines: 712, description: "Script principal" },
  { name: "requirements.txt", lines: 70, description: "Dependencias" },
]

export function PharmaArchitecture() {
  const totalLines = files.reduce((acc, f) => acc + f.lines, 0)

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Arquitectura
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Estructura del Proyecto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Diseño modular para máxima mantenibilidad y escalabilidad.
          </p>
        </div>

        {/* Architecture Flow */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {architectureLayers.map((layer, index) => (
            <div key={index} className="relative">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors h-full">
                <CardContent className="p-6">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                    <layer.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{layer.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{layer.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {layer.components.map((comp) => (
                      <span key={comp} className="px-2 py-1 text-xs bg-secondary rounded font-mono text-muted-foreground">
                        {comp}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Arrow */}
              {index < architectureLayers.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 z-10 -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-primary/30" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* File Structure */}
        <Card className="bg-card border-border mb-12">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="font-mono text-primary">pharma_system/</span>
              <span className="text-sm text-muted-foreground">- {totalLines.toLocaleString()} líneas de código</span>
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {files.map((file) => (
                <div 
                  key={file.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div>
                    <span className="font-mono text-sm text-foreground">{file.name}</span>
                    <p className="text-xs text-muted-foreground">{file.description}</p>
                  </div>
                  <span className="text-xs text-primary font-mono">{file.lines}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Explora el código completo
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Todo el código está disponible en GitHub con documentación detallada y ejemplos de uso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://github.com/tu-usuario/pharma-monitoring" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                <Github className="w-5 h-5" />
                Ver en GitHub
              </Button>
            </a>
            <a href="https://tu-streamlit-app.streamlit.app" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="gap-2">
                <ExternalLink className="w-5 h-5" />
                Demo en Streamlit Cloud
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
