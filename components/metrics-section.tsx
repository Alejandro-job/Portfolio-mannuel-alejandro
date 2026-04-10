"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const performanceMetrics = [
  { 
    label: "Precisión Global", 
    value: 98.5, 
    suffix: "%",
    description: "Detección de anomalías"
  },
  { 
    label: "Recall", 
    value: 97.8, 
    suffix: "%",
    description: "Sensibilidad del modelo"
  },
  { 
    label: "F1-Score", 
    value: 98.1, 
    suffix: "%",
    description: "Media armónica"
  },
  { 
    label: "Especificidad", 
    value: 99.2, 
    suffix: "%",
    description: "Tasa de verdaderos negativos"
  },
]

const systemMetrics = [
  { label: "Muestras Procesadas", value: "720K+", trend: "+15%" },
  { label: "Variables Monitoreadas", value: "50+", trend: "Estable" },
  { label: "Alertas Generadas", value: "2.3K", trend: "-8%" },
  { label: "Tiempo de Respuesta", value: "<100ms", trend: "-12%" },
]

const modelComparison = [
  { model: "Isolation Forest", precision: 94.2, recall: 92.1, f1: 93.1 },
  { model: "Local Outlier Factor", precision: 91.8, recall: 89.5, f1: 90.6 },
  { model: "One-Class SVM", precision: 89.5, recall: 88.2, f1: 88.8 },
  { model: "Autoencoder", precision: 96.1, recall: 95.4, f1: 95.7 },
  { model: "Ensemble (Votación)", precision: 98.5, recall: 97.8, f1: 98.1 },
]

export function MetricsSection() {
  return (
    <section id="metrics" className="py-24 bg-background relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Métricas
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Rendimiento del Sistema
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Métricas de rendimiento validadas con datos de prueba y 
            evaluación cruzada k-fold.
          </p>
        </div>
        
        {/* Performance Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {performanceMetrics.map((metric) => (
            <Card key={metric.label} className="bg-card/50 border-border text-center">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {metric.value}
                  <span className="text-2xl">{metric.suffix}</span>
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.description}
                </div>
                <Progress value={metric.value} className="mt-4 h-1" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* System Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {systemMetrics.map((stat) => (
            <div 
              key={stat.label}
              className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border"
            >
              <div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
              </div>
              <Badge 
                variant={stat.trend.startsWith('-') ? 'default' : stat.trend === 'Estable' ? 'secondary' : 'outline'}
                className="text-xs"
              >
                {stat.trend}
              </Badge>
            </div>
          ))}
        </div>
        
        {/* Model Comparison Table */}
        <Card className="bg-card/50 border-border">
          <CardHeader>
            <CardTitle className="text-xl">Comparación de Modelos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Modelo
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                      Precisión
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                      Recall
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">
                      F1-Score
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                      Performance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {modelComparison.map((row, index) => (
                    <tr 
                      key={row.model} 
                      className={`border-b border-border/50 ${
                        index === modelComparison.length - 1 ? 'bg-primary/5' : ''
                      }`}
                    >
                      <td className="py-3 px-4">
                        <span className={`font-medium ${
                          index === modelComparison.length - 1 ? 'text-primary' : 'text-foreground'
                        }`}>
                          {row.model}
                        </span>
                      </td>
                      <td className="text-center py-3 px-4 font-mono text-sm">
                        {row.precision}%
                      </td>
                      <td className="text-center py-3 px-4 font-mono text-sm">
                        {row.recall}%
                      </td>
                      <td className="text-center py-3 px-4 font-mono text-sm">
                        {row.f1}%
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Progress value={row.f1} className="w-20 h-2" />
                          <span className="text-xs text-muted-foreground w-10 text-right">
                            {row.f1}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* ROC Curve Simulation */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Curva ROC - Ensemble</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative bg-muted/20 rounded-lg p-4">
                {/* Simulated ROC curve */}
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Grid */}
                  {[0, 25, 50, 75, 100].map((v) => (
                    <g key={v}>
                      <line 
                        x1={v} y1="0" x2={v} y2="100" 
                        stroke="currentColor" 
                        strokeOpacity="0.1"
                      />
                      <line 
                        x1="0" y1={v} x2="100" y2={v} 
                        stroke="currentColor" 
                        strokeOpacity="0.1"
                      />
                    </g>
                  ))}
                  
                  {/* Diagonal (random classifier) */}
                  <line 
                    x1="0" y1="100" x2="100" y2="0" 
                    stroke="currentColor" 
                    strokeOpacity="0.3" 
                    strokeDasharray="4"
                  />
                  
                  {/* ROC Curve */}
                  <path
                    d="M 0 100 Q 5 20, 15 10 T 40 3 T 70 1 T 100 0"
                    fill="none"
                    stroke="oklch(0.72 0.15 185)"
                    strokeWidth="2"
                  />
                  
                  {/* AUC fill */}
                  <path
                    d="M 0 100 Q 5 20, 15 10 T 40 3 T 70 1 T 100 0 L 100 100 Z"
                    fill="oklch(0.72 0.15 185)"
                    fillOpacity="0.1"
                  />
                </svg>
                
                {/* Labels */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  Tasa de Falsos Positivos
                </div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
                  Tasa de Verdaderos Positivos
                </div>
                
                {/* AUC value */}
                <div className="absolute top-4 right-4 text-right">
                  <div className="text-2xl font-bold text-primary">0.992</div>
                  <div className="text-xs text-muted-foreground">AUC Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border-border">
            <CardHeader>
              <CardTitle className="text-lg">Matriz de Confusión</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square relative">
                <div className="grid grid-cols-2 gap-2 h-full">
                  <div className="bg-accent/20 rounded-lg flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold text-accent">4,521</div>
                    <div className="text-sm text-muted-foreground">Verdaderos Positivos</div>
                  </div>
                  <div className="bg-destructive/10 rounded-lg flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold text-destructive">67</div>
                    <div className="text-sm text-muted-foreground">Falsos Positivos</div>
                  </div>
                  <div className="bg-destructive/10 rounded-lg flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold text-destructive">98</div>
                    <div className="text-sm text-muted-foreground">Falsos Negativos</div>
                  </div>
                  <div className="bg-primary/20 rounded-lg flex flex-col items-center justify-center p-4">
                    <div className="text-3xl font-bold text-primary">15,314</div>
                    <div className="text-sm text-muted-foreground">Verdaderos Negativos</div>
                  </div>
                </div>
                
                {/* Axis labels */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  Predicho
                </div>
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
                  Real
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
