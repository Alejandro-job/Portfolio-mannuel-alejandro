"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Copy, FileCode } from "lucide-react"

const codeExamples = [
  {
    id: "data-generator",
    title: "Generador de Datos",
    filename: "data_generator.py",
    language: "python",
    description: "Generación de datos sintéticos con distribuciones realistas",
    code: `class WaterSystemGenerator:
    """Generador de datos para sistema de agua purificada."""
    
    def __init__(self, config: WaterSystemConfig):
        self.config = config
        self.rng = np.random.default_rng()
    
    def generate(self, n_samples: int) -> pd.DataFrame:
        """Genera datos sintéticos del sistema de agua."""
        
        # Generar timestamps
        timestamps = pd.date_range(
            start=datetime.now() - timedelta(days=30),
            periods=n_samples,
            freq='H'
        )
        
        # Variables con distribución normal + ruido
        conductivity = self.rng.normal(
            loc=self.config.conductivity_mean,
            scale=self.config.conductivity_std,
            size=n_samples
        )
        
        # Agregar correlación temporal (autocorrelación)
        conductivity = self._add_temporal_correlation(
            conductivity, 
            correlation=0.8
        )
        
        # Inyectar anomalías controladas
        anomaly_mask = self.rng.random(n_samples) < 0.05
        conductivity[anomaly_mask] *= self.rng.uniform(1.5, 2.5)
        
        return pd.DataFrame({
            'timestamp': timestamps,
            'conductivity': conductivity,
            'is_anomaly': anomaly_mask
        })`
  },
  {
    id: "anomaly-detector",
    title: "Detector de Anomalías",
    filename: "ml_models.py",
    language: "python",
    description: "Ensemble de modelos para detección de anomalías",
    code: `class EnsembleAnomalyDetector:
    """Detector de anomalías usando ensemble de modelos."""
    
    def __init__(self, contamination: float = 0.05):
        self.models = {
            'isolation_forest': IsolationForest(
                contamination=contamination,
                random_state=42,
                n_estimators=100
            ),
            'lof': LocalOutlierFactor(
                contamination=contamination,
                novelty=True,
                n_neighbors=20
            ),
            'one_class_svm': OneClassSVM(
                kernel='rbf',
                nu=contamination,
                gamma='auto'
            )
        }
        self.scaler = StandardScaler()
        self.weights = {'isolation_forest': 0.4, 'lof': 0.3, 'one_class_svm': 0.3}
    
    def fit(self, X: np.ndarray) -> 'EnsembleAnomalyDetector':
        """Entrena todos los modelos del ensemble."""
        X_scaled = self.scaler.fit_transform(X)
        
        for name, model in self.models.items():
            model.fit(X_scaled)
            print(f"[OK] {name} entrenado")
        
        return self
    
    def predict(self, X: np.ndarray) -> np.ndarray:
        """Predice anomalías usando votación ponderada."""
        X_scaled = self.scaler.transform(X)
        predictions = {}
        
        for name, model in self.models.items():
            predictions[name] = model.predict(X_scaled)
        
        # Votación ponderada
        weighted_sum = sum(
            self.weights[name] * (pred == -1).astype(float)
            for name, pred in predictions.items()
        )
        
        return np.where(weighted_sum > 0.5, -1, 1)`
  },
  {
    id: "alert-system",
    title: "Sistema de Alertas",
    filename: "alerts.py",
    language: "python",
    description: "Motor de alertas con múltiples niveles de severidad",
    code: `class AlertEngine:
    """Motor de generación y gestión de alertas."""
    
    SEVERITY_LEVELS = {
        'CRITICAL': {'priority': 1, 'color': 'red', 'notify': True},
        'MAJOR': {'priority': 2, 'color': 'orange', 'notify': True},
        'MINOR': {'priority': 3, 'color': 'yellow', 'notify': False}
    }
    
    def __init__(self, config: AlertConfig):
        self.config = config
        self.alerts: List[Alert] = []
        self.notifier = AlertNotifier()
    
    def evaluate_thresholds(
        self, 
        data: pd.DataFrame, 
        thresholds: Dict[str, Tuple[float, float]]
    ) -> List[Alert]:
        """Evalúa datos contra umbrales definidos."""
        new_alerts = []
        
        for column, (lower, upper) in thresholds.items():
            if column not in data.columns:
                continue
            
            # Detectar violaciones
            violations = data[
                (data[column] < lower) | (data[column] > upper)
            ]
            
            for idx, row in violations.iterrows():
                severity = self._calculate_severity(
                    value=row[column],
                    lower=lower,
                    upper=upper
                )
                
                alert = Alert(
                    timestamp=row.get('timestamp', datetime.now()),
                    variable=column,
                    value=row[column],
                    threshold=(lower, upper),
                    severity=severity,
                    message=f"{column} fuera de rango: {row[column]:.3f}"
                )
                
                new_alerts.append(alert)
                
                if self.SEVERITY_LEVELS[severity]['notify']:
                    self.notifier.send(alert)
        
        self.alerts.extend(new_alerts)
        return new_alerts`
  },
  {
    id: "dashboard",
    title: "Dashboard Streamlit",
    filename: "dashboard.py",
    language: "python",
    description: "Dashboard interactivo para visualización en tiempo real",
    code: `import streamlit as st
import plotly.express as px
import plotly.graph_objects as go

def main():
    st.set_page_config(
        page_title="Pharma Monitor",
        page_icon="🏭",
        layout="wide"
    )
    
    st.title("Sistema de Monitoreo Farmacéutico")
    
    # Sidebar - Filtros
    with st.sidebar:
        st.header("Filtros")
        date_range = st.date_input(
            "Rango de fechas",
            value=(datetime.now() - timedelta(days=7), datetime.now())
        )
        systems = st.multiselect(
            "Sistemas",
            ["Agua", "Tabletas", "Ambiente"],
            default=["Agua", "Tabletas", "Ambiente"]
        )
    
    # KPIs
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Muestras Analizadas", "21,600", "+1,200")
    with col2:
        st.metric("Anomalías Detectadas", "156", "-12")
    with col3:
        st.metric("Alertas Activas", "8", "+2")
    with col4:
        st.metric("Cumplimiento GMP", "98.5%", "+0.3%")
    
    # Gráfico de series temporales
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=data['timestamp'],
        y=data['conductivity'],
        mode='lines',
        name='Conductividad',
        line=dict(color='#00D4AA')
    ))
    
    # Marcar anomalías
    anomalies = data[data['is_anomaly']]
    fig.add_trace(go.Scatter(
        x=anomalies['timestamp'],
        y=anomalies['conductivity'],
        mode='markers',
        name='Anomalías',
        marker=dict(color='red', size=10)
    ))
    
    st.plotly_chart(fig, use_container_width=True)`
  },
]

export function CodeShowcase() {
  const [activeTab, setActiveTab] = useState(codeExamples[0].id)
  const [copied, setCopied] = useState(false)
  
  const activeExample = codeExamples.find(e => e.id === activeTab)!
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(activeExample.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <section id="code" className="py-24 bg-muted/20 relative">
      <div className="absolute inset-0 grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Código Fuente
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ejemplos de Implementación
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Código Python limpio, documentado y siguiendo mejores prácticas de 
            desarrollo de software.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {codeExamples.map((example) => (
            <Button
              key={example.id}
              variant={activeTab === example.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(example.id)}
              className="gap-2"
            >
              <FileCode className="h-4 w-4" />
              {example.title}
            </Button>
          ))}
        </div>
        
        {/* Code Display */}
        <Card className="bg-card border-border overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-chart-4/80" />
                  <div className="w-3 h-3 rounded-full bg-accent/80" />
                </div>
                <CardTitle className="text-sm font-mono text-muted-foreground">
                  {activeExample.filename}
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-accent" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-4 bg-card overflow-x-auto">
              <pre className="font-mono text-sm leading-relaxed">
                <code>
                  {activeExample.code.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-muted-foreground w-8 text-right mr-4 select-none">
                        {i + 1}
                      </span>
                      <SyntaxHighlightedLine line={line} />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </CardContent>
        </Card>
        
        {/* Description */}
        <div className="mt-6 text-center">
          <p className="text-muted-foreground">{activeExample.description}</p>
        </div>
      </div>
    </section>
  )
}

function SyntaxHighlightedLine({ line }: { line: string }) {
  // Simple Python syntax highlighting
  const highlightPython = (code: string) => {
    // Comments
    if (code.trim().startsWith('#')) {
      return <span className="text-muted-foreground">{code}</span>
    }
    
    // String detection
    if (code.includes('"""') || code.includes("'''")) {
      return <span className="text-accent">{code}</span>
    }
    
    // Keywords
    const keywords = ['class', 'def', 'return', 'if', 'else', 'for', 'in', 'import', 'from', 'as', 'with', 'True', 'False', 'None', 'self', 'async', 'await', 'try', 'except', 'finally', 'raise', 'and', 'or', 'not', 'is', 'lambda']
    
    // Split by spaces while preserving indentation
    const parts = code.split(/(\s+|[()[\]{}:,=<>+\-*/])/g)
    
    return (
      <>
        {parts.map((part, i) => {
          if (keywords.includes(part)) {
            return <span key={i} className="text-chart-3">{part}</span>
          }
          // Strings
          if (part.startsWith('"') || part.startsWith("'") || part.startsWith('f"') || part.startsWith("f'")) {
            return <span key={i} className="text-accent">{part}</span>
          }
          // Numbers
          if (/^\d+\.?\d*$/.test(part)) {
            return <span key={i} className="text-chart-4">{part}</span>
          }
          // Function calls (word followed by parenthesis)
          if (i < parts.length - 1 && parts[i + 1] === '(') {
            return <span key={i} className="text-primary">{part}</span>
          }
          // Decorators
          if (part.startsWith('@')) {
            return <span key={i} className="text-chart-5">{part}</span>
          }
          return <span key={i} className="text-foreground">{part}</span>
        })}
      </>
    )
  }
  
  return <span>{highlightPython(line)}</span>
}
