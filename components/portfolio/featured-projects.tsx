import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Brain, Activity, BarChart3, Shield, ExternalLink, Github, TrendingUp, Cog } from 'lucide-react'

const featuredProjects = [
  {
    slug: 'sistema-farmaceutico',
    title: 'Sistema de Monitoreo Farmacéutico Industrial',
    description: 'Sistema completo de monitoreo con ML para detección de anomalías en producción farmacéutica. Incluye análisis de agua, tabletas y ambiente.',
    image: '/projects/pharma-system.jpg',
    tags: ['Python', 'Scikit-learn', 'Streamlit', 'Plotly'],
    metrics: [
      { label: 'Precisión ML', value: '98.5%' },
      { label: 'Líneas de código', value: '5,000+' },
      { label: 'Fuentes de datos', value: '3' },
    ],
    featured: true,
    icon: Activity,
    demoUrl: 'https://pharma-monitoring-bpo363jw987m9szyqkqjzb.streamlit.app',
    githubUrl: 'https://github.com/Alejandro-job/pharma-monitoring',
  },
  {
    slug: 'shogun-code',
    title: 'ShogunCode - Monitor de Inversiones',
    description: 'Aplicación para seguimiento de inversiones reales con gráficos de velas, alertas inteligentes basadas en RSI.',
    tags: ['Next.js', 'React', 'Yahoo Finance', 'Recharts'],
    metrics: [
      { label: 'Categorías', value: '5' },
      { label: 'Actualización', value: 'Real-time' },
    ],
    icon: TrendingUp,
    demoUrl: '/proyectos/shogun-code',
    githubUrl: 'https://github.com/Alejandro-job/shogun-code',
  },
  {
    slug: 'automatizacion',
    title: 'Simuladores CNC y PLC',
    description: 'Simuladores industriales interactivos de programación CNC G-Code y diagramas Ladder PLC.',
    tags: ['React', 'Canvas API', 'G-Code', 'Ladder'],
    metrics: [
      { label: 'Piezas CNC', value: '4' },
      { label: 'Rungs PLC', value: '5' },
    ],
    icon: Cog,
    demoUrl: '/proyectos/automatizacion',
    githubUrl: 'https://github.com/Alejandro-job/cnc-plc-simulator',
  },
  {
    slug: 'deteccion-fraude',
    title: 'Sistema de Detección de Fraude',
    description: 'Modelo de detección de transacciones fraudulentas con técnicas de ensemble y manejo de datos desbalanceados.',
    tags: ['Python', 'XGBoost', 'SMOTE', 'MLflow'],
    metrics: [
      { label: 'F1-Score', value: '96%' },
      { label: 'Recall', value: '98%' },
    ],
    icon: Shield,
    githubUrl: 'https://github.com/Alejandro-job/fraud-detection',
  },
]

export function FeaturedProjects() {
  const mainProject = featuredProjects.find(p => p.featured)
  const otherProjects = featuredProjects.filter(p => !p.featured)

  return (
    <section id="proyectos" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Proyectos Destacados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una selección de mis trabajos más relevantes en ciencia de datos y machine learning.
          </p>
        </div>

        {/* Featured Project */}
        {mainProject && (
          <div className="mb-12">
            <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image/Visual Side */}
                  <div className="relative h-64 lg:h-auto bg-gradient-to-br from-background to-card flex items-center justify-center p-8">
                    <div className="relative">
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
                      
                      {/* Terminal Mock */}
                      <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl max-w-sm">
                        <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border">
                          <div className="w-3 h-3 rounded-full bg-destructive/60" />
                          <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                          <div className="w-3 h-3 rounded-full bg-accent/60" />
                          <span className="ml-2 text-xs text-muted-foreground font-mono">pharma_monitoring.py</span>
                        </div>
                        <div className="p-4 font-mono text-xs space-y-1">
                          <p><span className="text-chart-3">from</span> <span className="text-primary">ml_models</span> <span className="text-chart-3">import</span> AnomalyDetector</p>
                          <p><span className="text-chart-3">from</span> <span className="text-primary">alerts</span> <span className="text-chart-3">import</span> AlertSystem</p>
                          <p className="text-muted-foreground"># Inicializar sistema</p>
                          <p>detector = AnomalyDetector()</p>
                          <p>alerts = AlertSystem()</p>
                          <p className="text-muted-foreground"># Monitorear en tiempo real</p>
                          <p>detector.fit(training_data)</p>
                          <p>anomalies = detector.predict(live_data)</p>
                          <p className="text-accent">print(f&quot;Accuracy: 98.5%&quot;)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        Proyecto Principal
                      </span>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                      {mainProject.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {mainProject.description}
                    </p>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {mainProject.metrics.map((metric, i) => (
                        <div key={i} className="text-center p-3 rounded-lg bg-background/50">
                          <div className="text-xl font-bold text-primary">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {mainProject.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-xs bg-secondary rounded-full text-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4">
                      <Link href={`/proyectos/${mainProject.slug}`}>
                        <Button className="gap-2">
                          Ver Detalles
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      {mainProject.demoUrl && (
                        <a href={mainProject.demoUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Demo en Vivo
                          </Button>
                        </a>
                      )}
                      {mainProject.githubUrl && (
                        <a href={mainProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" className="gap-2">
                            <Github className="w-4 h-4" />
                            Código
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project) => (
            <Card 
              key={project.slug}
              className="group bg-background border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <project.icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="flex gap-4 mb-4">
                  {project.metrics.map((metric, i) => (
                    <div key={i}>
                      <div className="text-sm font-bold text-accent">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-secondary rounded text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  <Link href={`/proyectos/${project.slug}`} className="flex-1">
                    <Button variant="secondary" size="sm" className="w-full gap-1">
                      Ver más
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm">
                        <Github className="w-4 h-4" />
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link href="/proyectos">
            <Button variant="outline" size="lg" className="gap-2">
              Ver Todos los Proyectos
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
