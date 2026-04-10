import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Tu Nombre',
  description: 'Artículos sobre ciencia de datos, machine learning y desarrollo de software.',
}

const blogPosts = [
  {
    slug: 'deteccion-anomalias-industria',
    title: 'Detección de Anomalías en Entornos Industriales con Machine Learning',
    excerpt: 'Una guía completa sobre cómo implementar sistemas de detección de anomalías para monitoreo industrial usando técnicas de machine learning no supervisado.',
    date: '2024-03-15',
    readTime: '12 min',
    tags: ['Machine Learning', 'Anomaly Detection', 'Industry 4.0'],
    featured: true,
  },
  {
    slug: 'ensemble-learning-practica',
    title: 'Ensemble Learning en la Práctica: Combinando Modelos para Mejor Precisión',
    excerpt: 'Aprende a combinar múltiples algoritmos de ML para crear sistemas de predicción más robustos y precisos.',
    date: '2024-02-28',
    readTime: '10 min',
    tags: ['Machine Learning', 'Ensemble', 'Python'],
  },
  {
    slug: 'streamlit-dashboards-datos',
    title: 'Creando Dashboards Interactivos con Streamlit para Data Science',
    excerpt: 'Tutorial paso a paso para crear dashboards profesionales de visualización de datos con Streamlit.',
    date: '2024-02-10',
    readTime: '8 min',
    tags: ['Streamlit', 'Data Visualization', 'Python'],
  },
  {
    slug: 'series-temporales-prophet',
    title: 'Predicción de Series Temporales con Prophet y Python',
    excerpt: 'Cómo usar Facebook Prophet para crear modelos de forecasting precisos y fáciles de interpretar.',
    date: '2024-01-25',
    readTime: '15 min',
    tags: ['Time Series', 'Prophet', 'Forecasting'],
  },
  {
    slug: 'mlops-produccion',
    title: 'MLOps: Llevando Modelos de ML a Producción',
    excerpt: 'Mejores prácticas para desplegar y mantener modelos de machine learning en entornos de producción.',
    date: '2024-01-10',
    readTime: '14 min',
    tags: ['MLOps', 'DevOps', 'Production'],
  },
  {
    slug: 'nlp-transformers',
    title: 'Introducción a Transformers para NLP',
    excerpt: 'Entiende la arquitectura transformer y cómo usar modelos pre-entrenados para tareas de procesamiento de lenguaje natural.',
    date: '2023-12-20',
    readTime: '18 min',
    tags: ['NLP', 'Transformers', 'Deep Learning'],
  },
]

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function BlogPage() {
  const featuredPost = blogPosts.find(p => p.featured)
  const otherPosts = blogPosts.filter(p => !p.featured)

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-accent/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Blog
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Artículos y Tutoriales
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comparto mis conocimientos sobre ciencia de datos, machine learning 
            y las mejores prácticas de la industria.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Artículo Destacado</h2>
            
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="group bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(featuredPost.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime} de lectura
                    </span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-sm bg-secondary rounded-full text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <span className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Leer artículo
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>
      )}

      {/* Other Posts */}
      <section className="py-12 lg:py-20 bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8">Todos los Artículos</h2>
          
          <div className="space-y-6">
            {otherPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="group bg-background border-border hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 px-2 py-0.5 text-xs bg-secondary rounded text-muted-foreground">
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="hidden md:flex items-center">
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Suscríbete al Newsletter
          </h2>
          <p className="text-muted-foreground mb-6">
            Recibe nuevos artículos y recursos sobre data science directamente en tu correo.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-2 rounded-lg bg-card border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
