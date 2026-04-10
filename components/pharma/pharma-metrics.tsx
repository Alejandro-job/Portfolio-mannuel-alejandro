"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const modelMetrics = [
  {
    model: "Isolation Forest",
    metrics: {
      precision: 0.97,
      recall: 0.95,
      f1: 0.96,
      auc: 0.98
    }
  },
  {
    model: "Local Outlier Factor",
    metrics: {
      precision: 0.94,
      recall: 0.92,
      f1: 0.93,
      auc: 0.96
    }
  },
  {
    model: "One-Class SVM",
    metrics: {
      precision: 0.93,
      recall: 0.91,
      f1: 0.92,
      auc: 0.95
    }
  },
  {
    model: "Autoencoder",
    metrics: {
      precision: 0.96,
      recall: 0.94,
      f1: 0.95,
      auc: 0.97
    }
  },
  {
    model: "Ensemble (Votación)",
    metrics: {
      precision: 0.98,
      recall: 0.97,
      f1: 0.975,
      auc: 0.99
    },
    highlighted: true
  }
]

const confusionMatrix = {
  truePositive: 485,
  falsePositive: 12,
  trueNegative: 9488,
  falseNegative: 15
}

export function PharmaMetrics() {
  const total = confusionMatrix.truePositive + confusionMatrix.falsePositive + 
                confusionMatrix.trueNegative + confusionMatrix.falseNegative

  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Resultados
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Métricas de Rendimiento
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Evaluación detallada de los modelos de machine learning con datos de prueba.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Model Comparison Table */}
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Comparación de Modelos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Modelo</th>
                      <th className="text-center py-3 px-2 text-muted-foreground font-medium">Precisión</th>
                      <th className="text-center py-3 px-2 text-muted-foreground font-medium">Recall</th>
                      <th className="text-center py-3 px-2 text-muted-foreground font-medium">F1</th>
                      <th className="text-center py-3 px-2 text-muted-foreground font-medium">AUC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelMetrics.map((item, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-border/50 ${item.highlighted ? 'bg-primary/5' : ''}`}
                      >
                        <td className={`py-3 px-2 ${item.highlighted ? 'font-semibold text-primary' : 'text-foreground'}`}>
                          {item.model}
                        </td>
                        <td className="text-center py-3 px-2 text-foreground">
                          {(item.metrics.precision * 100).toFixed(1)}%
                        </td>
                        <td className="text-center py-3 px-2 text-foreground">
                          {(item.metrics.recall * 100).toFixed(1)}%
                        </td>
                        <td className="text-center py-3 px-2 text-foreground">
                          {(item.metrics.f1 * 100).toFixed(1)}%
                        </td>
                        <td className="text-center py-3 px-2 text-accent font-semibold">
                          {(item.metrics.auc * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Confusion Matrix */}
          <Card className="bg-background border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Matriz de Confusión (Ensemble)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {/* Matrix Grid */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {/* True Positive */}
                  <div className="w-32 h-32 bg-accent/20 border border-accent/40 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-accent">{confusionMatrix.truePositive}</span>
                    <span className="text-xs text-muted-foreground mt-1">Verdadero Positivo</span>
                  </div>
                  {/* False Positive */}
                  <div className="w-32 h-32 bg-destructive/10 border border-destructive/30 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-destructive">{confusionMatrix.falsePositive}</span>
                    <span className="text-xs text-muted-foreground mt-1">Falso Positivo</span>
                  </div>
                  {/* False Negative */}
                  <div className="w-32 h-32 bg-destructive/10 border border-destructive/30 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-destructive">{confusionMatrix.falseNegative}</span>
                    <span className="text-xs text-muted-foreground mt-1">Falso Negativo</span>
                  </div>
                  {/* True Negative */}
                  <div className="w-32 h-32 bg-accent/20 border border-accent/40 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-accent">{confusionMatrix.trueNegative}</span>
                    <span className="text-xs text-muted-foreground mt-1">Verdadero Negativo</span>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                  <div className="text-center p-3 rounded-lg bg-secondary">
                    <div className="text-lg font-bold text-primary">
                      {((confusionMatrix.truePositive + confusionMatrix.trueNegative) / total * 100).toFixed(2)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary">
                    <div className="text-lg font-bold text-accent">
                      {total.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Muestras</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ROC Curve Visualization */}
        <Card className="mt-8 bg-background border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Curva ROC - Comparación de Modelos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 w-full max-w-2xl mx-auto">
              {/* Grid */}
              <div className="absolute inset-0 border border-border rounded">
                {/* Grid lines */}
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute left-0 right-0 border-t border-border/30"
                    style={{ top: `${(i + 1) * 20}%` }}
                  />
                ))}
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute top-0 bottom-0 border-l border-border/30"
                    style={{ left: `${(i + 1) * 20}%` }}
                  />
                ))}
                
                {/* Diagonal line (random classifier) */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full">
                    <line 
                      x1="0" y1="100%" x2="100%" y2="0" 
                      stroke="currentColor" 
                      strokeDasharray="4"
                      className="text-muted-foreground/50"
                    />
                    {/* ROC Curves */}
                    <path 
                      d="M 0 256 Q 30 30, 100 20 T 200 15 T 300 10 T 400 8 T 512 0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary"
                    />
                  </svg>
                </div>

                {/* Labels */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                  Tasa de Falsos Positivos
                </div>
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
                  Tasa de Verdaderos Positivos
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-6 mt-12">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-primary" />
                <span className="text-xs text-muted-foreground">Ensemble (AUC: 0.99)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 border-t border-dashed border-muted-foreground" />
                <span className="text-xs text-muted-foreground">Clasificador Aleatorio</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
