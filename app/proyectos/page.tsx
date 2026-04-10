import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, ExternalLink, Activity, BarChart3, Brain, Shield, Database, Cpu, TrendingUp, Cog } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Proyectos | Tu Nombre',
  description: 'Portfolio de proyectos de ciencia de datos, machine learning e inteligencia artificial.',
}

const projects = [
  {
    slug: 'sistema-farmaceutico',
    title: 'Sistema de Monitoreo Farmacéutico Industrial',
    description: 'Sistema completo de simulación y monitoreo para entornos farmacéuticos industriales con ML para detección de anomalías.',
    longDescription: 'Incluye generación de datos sintéticos de 3 fuentes (agua, tabletas, ambiente), análisis exploratorio, dashboard interactivo en Streamlit y 4 algoritmos de ML con ensemble learning.',
    tags: ['Python', 'Scikit-learn', 'Streamlit', 'Plotly', 'TensorFlow'],
    metrics: [
      { label: 'Precisión ML', value: '98.5%' },
      { label: 'Líneas de código', value: '5,000+' },
    ],
    icon: Activity,
    featured: true,
    demoUrl: 'https://tu-streamlit-app.streamlit.app',
    githubUrl: 'https://github.com/mannuelalejandro/pharma-monitoring',
  },
  {
    slug: 'shogun-code',
    title: 'ShogunCode - Sistema de Monitoreo de Inversiones',
    description: 'Aplicación web para seguimiento de inversiones reales con datos en tiempo real de Yahoo Finance.',
    longDescription: 'Tracker de portafolio real para brokers mexicanos (GBM, Kuspit, Bursanet). Incluye gráficos de velas OHLC, alertas basadas en RSI, acciones fraccionadas, ETFs, Bonos, CETES y divisas con convertidor en tiempo real.',
    tags: ['Next.js', 'React', 'Recharts', 'Yahoo Finance API', 'Tailwind CSS'],
    metrics: [
      { label: 'Categorías', value: '5' },
      { label: 'Actualización', value: 'Real-time' },
    ],
    icon: TrendingUp,
    featured: false,
    demoUrl: '/proyectos/shogun-code',
    githubUrl: 'https://github.com/mannuelalejandro/shogun-code',
  },
  {
    slug: 'automatizacion',
    title: 'Simuladores CNC y PLC',
    description: 'Simuladores industriales interactivos de programación CNC G-Code y diagramas Ladder PLC.',
    longDescription: 'Incluye simulador CNC con mecanizado de piezas reales (tornillo, engranaje, brida, eje) y simulador PLC con línea de producción automatizada, sensores, actuadores y diagrama Ladder funcional.',
    tags: ['React', 'Canvas API', 'G-Code', 'Ladder Logic', 'Automatización'],
    metrics: [
      { label: 'Piezas CNC', value: '4' },
      { label: 'Rungs PLC', value: '5' },
    ],
    icon: Cog,
    featured: false,
    demoUrl: '/proyectos/automatizacion',
    githubUrl: 'https://github.com/mannuelalejandro/cnc-plc-simulator',
  },
  {
    slug: 'prediccion-ventas',
    title: 'Sistema de Predicción de Ventas',
    description: 'Modelo de forecasting con series temporales para predecir ventas usando Prophet y redes LSTM.',
    longDescription: 'Implementación de modelos de series temporales con validación cruzada temporal, feature engineering avanzado y API REST para producción.',
    tags: ['Python', 'Prophet', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
    metrics: [
      { label: 'MAPE', value: '8.2%' },
      { label: 'Horizonte', value: '90 días' },
    ],
    icon: BarChart3,
    githubUrl: 'https://github.com/tu-usuario/sales-forecast',
  },
  {
    slug: 'clasificador-documentos',
    title: 'Clasificador de Documentos con NLP',
    description: 'Sistema de clasificación automática de documentos usando transformers y técnicas de procesamiento de lenguaje natural.',
    longDescription: 'Fine-tuning de modelos BERT para clasificación multiclase, pipeline de preprocesamiento de texto y despliegue con Docker.',
    tags: ['Python', 'Transformers', 'spaCy', 'Docker', 'Hugging Face'],
    metrics: [
      { label: 'Accuracy', value: '94%' },
      { label: 'Categorías', value: '15' },
    ],
    icon: Brain,
    githubUrl: 'https://github.com/tu-usuario/doc-classifier',
  },
  {
    slug: 'deteccion-fraude',
    title: 'Sistema de Detección de Fraude',
    description: 'Modelo de detección de transacciones fraudulentas con técnicas de ensemble y manejo de datos desbalanceados.',
    longDescription: 'Implementación de XGBoost con SMOTE, validación con métricas de negocio y sistema de monitoreo de drift.',
    tags: ['Python', 'XGBoost', 'SMOTE', 'MLflow', 'AWS'],
    metrics: [
      { label: 'F1-Score', value: '96%' },
      { label: 'Recall', value: '98%' },
    ],
    icon: Shield,
    githubUrl: 'https://github.com/tu-usuario/fraud-detection',
  },
  {
    slug: 'etl-pipeline',
    title: 'Pipeline ETL Automatizado',
    description: 'Sistema de extracción, transformación y carga de datos con orquestación y monitoreo.',
    longDescription: 'Pipeline construido con Apache Airflow, procesamiento en Spark y almacenamiento en data warehouse.',
    tags: ['Python', 'Airflow', 'Spark', 'PostgreSQL', 'Docker'],
    metrics: [
      { label: 'Datos/día', value: '10M+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    icon: Database,
  },
  {
    slug: 'chatbot-soporte',
    title: 'Chatbot de Soporte con IA',
    description: 'Asistente virtual inteligente para atención al cliente con comprensión de lenguaje natural.',
    longDescription: 'Implementación de chatbot con Rasa, integración con bases de conocimiento y análisis de sentimiento.',
    tags: ['Python', 'Rasa', 'NLP', 'FastAPI', 'Redis'],
    metrics: [
      { label: 'Resolución', value: '85%' },
      { label: 'Tiempo resp.', value: '<2s' },
    ],
    icon: Cpu,
  },
]

export default function ProjectsPage() {
  const featuredProject = projects.find(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Portfolio
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Mis Proyectos
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una colección de proyectos de ciencia de datos y machine learning 
            que demuestran mi experiencia en diferentes dominios.
          </p>
        </div>
      </section>

      {/* Featured Project */}
      {featuredProject && (
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Proyecto Destacado</h2>
            
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 overflow-hidden">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        Destacado
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                      {featuredProject.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredProject.longDescription}
                    </p>

                    <div className="flex gap-6 mb-6">
                      {featuredProject.metrics.map((metric, i) => (
                        <div key={i}>
                          <div className="text-2xl font-bold text-primary">{metric.value}</div>
                          <div className="text-sm text-muted-foreground">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {featuredProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-sm bg-secondary rounded-full text-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Link href={`/proyectos/${featuredProject.slug}`}>
                        <Button className="gap-2">
                          Ver Detalles
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      {featuredProject.demoUrl && (
                        <a href={featuredProject.demoUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Demo
                          </Button>
                        </a>
                      )}
                      {featuredProject.githubUrl && (
                        <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" className="gap-2">
                            <Github className="w-4 h-4" />
                            Código
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="hidden lg:flex items-center justify-center">
                    <div className="p-8 rounded-2xl bg-card border border-border">
                      <featuredProject.icon className="w-32 h-32 text-primary/50" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Other Projects */}
      <section className="py-12 lg:py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Otros Proyectos</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card 
                key={project.slug}
                className="group bg-background border-border hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <project.icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex gap-4 mb-4">
                    {project.metrics.map((metric, i) => (
                      <div key={i}>
                        <div className="text-lg font-bold text-accent">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-xs bg-secondary rounded text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-secondary rounded text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="secondary" size="sm" className="w-full gap-1">
                          <Github className="w-4 h-4" />
                          Código
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
