"use client"

import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Github, Download, Activity, Shield, Zap } from 'lucide-react'
import Link from 'next/link'

const highlights = [
  { icon: Activity, label: "Monitoreo Real-Time" },
  { icon: Shield, label: "Detección de Anomalías" },
  { icon: Zap, label: "Alertas Automáticas" },
]

export function PharmaHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Volver al Portfolio
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Proyecto Principal
              </span>
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                Machine Learning
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground text-sm font-medium">
                Python
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Sistema de Monitoreo
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Farmacéutico Industrial
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Sistema completo de simulación y monitoreo para entornos farmacéuticos industriales 
              con generación de datos sintéticos, análisis exploratorio, dashboard interactivo 
              y modelos de machine learning para detección de anomalías.
            </p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-4 mb-8">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <a href="https://tu-streamlit-app.streamlit.app" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Ver Demo en Vivo
                </Button>
              </a>
              <a href="https://github.com/tu-usuario/pharma-monitoring" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2">
                  <Github className="w-5 h-5" />
                  Ver Código
                </Button>
              </a>
              <Button size="lg" variant="ghost" className="gap-2">
                <Download className="w-5 h-5" />
                Descargar
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl opacity-50" />
            
            <div className="relative bg-card border border-border rounded-2xl overflow-hidden shadow-2xl">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">pharma_dashboard.py</span>
              </div>
              
              {/* Terminal Content */}
              <div className="p-6 font-mono text-sm space-y-2 bg-background">
                <p className="text-muted-foreground"># Sistema de Monitoreo Farmacéutico</p>
                <p><span className="text-chart-3">import</span> streamlit <span className="text-chart-3">as</span> st</p>
                <p><span className="text-chart-3">from</span> ml_models <span className="text-chart-3">import</span> AnomalyDetector</p>
                <p><span className="text-chart-3">from</span> alerts <span className="text-chart-3">import</span> AlertSystem</p>
                <p></p>
                <p className="text-muted-foreground"># Configuración de fuentes de datos</p>
                <p>sources = [<span className="text-accent">&quot;agua&quot;</span>, <span className="text-accent">&quot;tabletas&quot;</span>, <span className="text-accent">&quot;ambiente&quot;</span>]</p>
                <p></p>
                <p className="text-muted-foreground"># Inicializar detector de anomalías</p>
                <p>detector = AnomalyDetector(</p>
                <p>    models=[<span className="text-accent">&quot;isolation_forest&quot;</span>,</p>
                <p>            <span className="text-accent">&quot;local_outlier_factor&quot;</span>,</p>
                <p>            <span className="text-accent">&quot;one_class_svm&quot;</span>]</p>
                <p>)</p>
                <p></p>
                <p className="text-muted-foreground"># Entrenar y predecir</p>
                <p>detector.fit(training_data)</p>
                <p>anomalies = detector.predict(live_data)</p>
                <p></p>
                <p className="text-primary">print(<span className="text-accent">f&quot;Anomalías detectadas: </span><span className="text-chart-4">{`{len(anomalies)}`}</span><span className="text-accent">&quot;</span>)</p>
                <p className="text-primary">print(<span className="text-accent">f&quot;Precisión del modelo: 98.5%&quot;</span>)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
