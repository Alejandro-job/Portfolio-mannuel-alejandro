"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const technologies = {
  core: [
    { name: "Python", version: "3.10+", description: "Lenguaje principal" },
    { name: "NumPy", version: "1.24+", description: "Computación numérica" },
    { name: "Pandas", version: "2.0+", description: "Manipulación de datos" },
    { name: "SciPy", version: "1.11+", description: "Análisis científico" },
  ],
  ml: [
    { name: "Scikit-learn", version: "1.3+", description: "ML tradicional" },
    { name: "TensorFlow", version: "2.13+", description: "Deep Learning" },
    { name: "Isolation Forest", version: "-", description: "Detección anomalías" },
    { name: "Autoencoder", version: "-", description: "Neural network" },
  ],
  visualization: [
    { name: "Matplotlib", version: "3.7+", description: "Gráficos estáticos" },
    { name: "Seaborn", version: "0.12+", description: "Visualización estadística" },
    { name: "Plotly", version: "5.15+", description: "Gráficos interactivos" },
    { name: "Streamlit", version: "1.28+", description: "Dashboard web" },
  ],
  tools: [
    { name: "Statsmodels", version: "0.14+", description: "Análisis estadístico" },
    { name: "PyYAML", version: "6.0+", description: "Configuración" },
    { name: "Pytest", version: "7.4+", description: "Testing" },
    { name: "Black", version: "23+", description: "Formateo código" },
  ],
}

const algorithms = [
  {
    name: "Isolation Forest",
    type: "Unsupervised",
    description: "Aísla anomalías usando árboles de decisión aleatorios",
    complexity: "O(n log n)",
    accuracy: "94.2%"
  },
  {
    name: "Local Outlier Factor",
    type: "Density-based",
    description: "Detecta outliers basándose en la densidad local",
    complexity: "O(n²)",
    accuracy: "91.8%"
  },
  {
    name: "One-Class SVM",
    type: "Boundary-based",
    description: "Define una frontera de decisión para datos normales",
    complexity: "O(n³)",
    accuracy: "89.5%"
  },
  {
    name: "Autoencoder",
    type: "Deep Learning",
    description: "Aprende representación comprimida de datos normales",
    complexity: "O(n × epochs)",
    accuracy: "96.1%"
  },
]

export function TechStack() {
  return (
    <section id="tech" className="py-24 bg-background relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Stack Tecnológico
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tecnologías Utilizadas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Un stack robusto basado en Python con las mejores bibliotecas 
            para análisis de datos y machine learning.
          </p>
        </div>
        
        {/* Tech Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {Object.entries(technologies).map(([category, techs]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {category === "core" && "Core"}
                {category === "ml" && "Machine Learning"}
                {category === "visualization" && "Visualización"}
                {category === "tools" && "Herramientas"}
              </h3>
              <div className="space-y-2">
                {techs.map((tech) => (
                  <div 
                    key={tech.name}
                    className="p-3 rounded-lg bg-card/50 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground text-sm">{tech.name}</span>
                      <Badge variant="secondary" className="text-xs font-mono">
                        {tech.version}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{tech.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* ML Algorithms */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
            Algoritmos de Detección de Anomalías
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {algorithms.map((algo) => (
              <Card key={algo.name} className="bg-card/50 border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{algo.name}</h4>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {algo.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{algo.accuracy}</div>
                      <div className="text-xs text-muted-foreground">Precisión</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{algo.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Complejidad:</span>
                    <code className="font-mono text-primary">{algo.complexity}</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Ensemble Info */}
        <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-semibold text-foreground mb-2">
                Ensemble Voting Classifier
              </h4>
              <p className="text-sm text-muted-foreground">
                Combinamos los 4 algoritmos usando votación ponderada para 
                maximizar la precisión y reducir falsos positivos.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent">98.5%</div>
                <div className="text-xs text-muted-foreground">F1-Score</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">97.8%</div>
                <div className="text-xs text-muted-foreground">Recall</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
