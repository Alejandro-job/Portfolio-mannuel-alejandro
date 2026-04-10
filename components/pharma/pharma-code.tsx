"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'

const codeExamples = [
  {
    id: 'anomaly',
    title: 'Detección de Anomalías',
    filename: 'ml_models.py',
    code: `class AnomalyDetectionEnsemble:
    """Ensemble de modelos para detección de anomalías."""
    
    def __init__(self, contamination: float = 0.05):
        self.models = {
            'isolation_forest': IsolationForest(
                contamination=contamination,
                n_estimators=100,
                random_state=42
            ),
            'local_outlier_factor': LocalOutlierFactor(
                n_neighbors=20,
                contamination=contamination,
                novelty=True
            ),
            'one_class_svm': OneClassSVM(
                kernel='rbf',
                nu=contamination,
                gamma='auto'
            )
        }
        self.scaler = StandardScaler()
        
    def fit(self, X: np.ndarray) -> 'AnomalyDetectionEnsemble':
        """Entrena todos los modelos del ensemble."""
        X_scaled = self.scaler.fit_transform(X)
        for model in self.models.values():
            model.fit(X_scaled)
        return self
        
    def predict_ensemble(self, X: np.ndarray) -> np.ndarray:
        """Predicción por votación mayoritaria."""
        X_scaled = self.scaler.transform(X)
        predictions = []
        for model in self.models.values():
            pred = model.predict(X_scaled)
            predictions.append((pred == -1).astype(int))
        return (np.mean(predictions, axis=0) > 0.5).astype(int)`
  },
  {
    id: 'alerts',
    title: 'Sistema de Alertas',
    filename: 'alerts.py',
    code: `class AlertSystem:
    """Sistema de alertas con múltiples niveles de severidad."""
    
    def __init__(self, config: AlertConfig):
        self.config = config
        self.active_alerts: List[Alert] = []
        self.alert_history: List[Alert] = []
        
    def evaluate_thresholds(
        self, 
        data: pd.DataFrame, 
        thresholds: Dict[str, ThresholdConfig]
    ) -> List[Alert]:
        """Evalúa datos contra umbrales configurados."""
        alerts = []
        
        for column, threshold in thresholds.items():
            if column not in data.columns:
                continue
                
            values = data[column].values
            
            # Verificar límites críticos
            critical_mask = (values < threshold.critical_low) | \\
                           (values > threshold.critical_high)
            if critical_mask.any():
                alerts.append(Alert(
                    severity=AlertSeverity.CRITICAL,
                    parameter=column,
                    message=f"Valor fuera de límites críticos",
                    timestamp=datetime.now()
                ))
                
            # Verificar límites de advertencia
            warning_mask = (values < threshold.warning_low) | \\
                          (values > threshold.warning_high)
            if warning_mask.any() and not critical_mask.any():
                alerts.append(Alert(
                    severity=AlertSeverity.MAJOR,
                    parameter=column,
                    message=f"Valor fuera de límites de advertencia"
                ))
                
        return alerts`
  },
  {
    id: 'generator',
    title: 'Generador de Datos',
    filename: 'data_generator.py',
    code: `class WaterSystemGenerator:
    """Generador de datos para sistema de agua purificada."""
    
    def __init__(self, config: WaterSystemConfig):
        self.config = config
        
    def generate(
        self, 
        n_samples: int,
        anomaly_rate: float = 0.02
    ) -> pd.DataFrame:
        """Genera datos sintéticos de sistema de agua."""
        
        # Generar datos normales
        data = {
            'timestamp': pd.date_range(
                start='2024-01-01',
                periods=n_samples,
                freq='5min'
            ),
            'conductivity': np.random.normal(
                self.config.conductivity_mean,
                self.config.conductivity_std,
                n_samples
            ),
            'toc': np.random.lognormal(
                np.log(self.config.toc_mean),
                0.3,
                n_samples
            ),
            'ph': np.random.normal(
                self.config.ph_mean,
                self.config.ph_std,
                n_samples
            ),
            'temperature': np.random.normal(
                self.config.temp_mean,
                self.config.temp_std,
                n_samples
            )
        }
        
        df = pd.DataFrame(data)
        
        # Inyectar anomalías
        n_anomalies = int(n_samples * anomaly_rate)
        anomaly_indices = np.random.choice(
            n_samples, n_anomalies, replace=False
        )
        
        for idx in anomaly_indices:
            param = np.random.choice(['conductivity', 'toc', 'ph'])
            df.loc[idx, param] *= np.random.uniform(1.5, 3.0)
            
        return df`
  },
  {
    id: 'dashboard',
    title: 'Dashboard Streamlit',
    filename: 'dashboard.py',
    code: `def render_kpi_metrics(data: pd.DataFrame, alerts: List[Alert]):
    """Renderiza métricas KPI principales."""
    
    st.subheader("Indicadores Clave de Rendimiento")
    
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        critical_count = sum(
            1 for a in alerts 
            if a.severity == AlertSeverity.CRITICAL
        )
        st.metric(
            "Alertas Críticas",
            critical_count,
            delta=None,
            delta_color="inverse"
        )
        
    with col2:
        compliance_rate = calculate_compliance_rate(data)
        st.metric(
            "Tasa de Cumplimiento",
            f"{compliance_rate:.1f}%",
            delta=f"{compliance_rate - 95:.1f}%"
        )
        
    with col3:
        anomaly_rate = calculate_anomaly_rate(data)
        st.metric(
            "Tasa de Anomalías",
            f"{anomaly_rate:.2f}%",
            delta=f"-{anomaly_rate:.2f}%",
            delta_color="inverse"
        )
        
    with col4:
        uptime = calculate_system_uptime()
        st.metric(
            "Tiempo Activo",
            f"{uptime:.1f}%",
            delta="Estable"
        )


def render_realtime_charts(data: pd.DataFrame, source: str):
    """Renderiza gráficos en tiempo real."""
    
    st.subheader(f"Monitoreo en Tiempo Real - {source}")
    
    fig = make_subplots(
        rows=2, cols=2,
        subplot_titles=data.columns[1:5]
    )
    
    for i, col in enumerate(data.columns[1:5]):
        row, col_idx = divmod(i, 2)
        fig.add_trace(
            go.Scatter(
                x=data['timestamp'],
                y=data[col],
                mode='lines',
                name=col
            ),
            row=row+1, col=col_idx+1
        )
        
    st.plotly_chart(fig, use_container_width=True)`
  }
]

export function PharmaCode() {
  const [activeTab, setActiveTab] = useState('anomaly')
  
  const activeExample = codeExamples.find(ex => ex.id === activeTab)

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Código
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Ejemplos de Implementación
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fragmentos de código que muestran las principales funcionalidades del sistema.
          </p>
        </div>

        {/* Code Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {codeExamples.map((example) => (
            <button
              key={example.id}
              onClick={() => setActiveTab(example.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === example.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {example.title}
            </button>
          ))}
        </div>

        {/* Code Display */}
        {activeExample && (
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-secondary border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <span className="ml-2 text-sm text-muted-foreground font-mono">
                  {activeExample.filename}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">Python</span>
            </div>
            
            {/* Code */}
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <code className="text-foreground">
                  {activeExample.code.split('\n').map((line, i) => (
                    <div key={i} className="flex">
                      <span className="w-8 text-muted-foreground text-right mr-4 select-none">
                        {i + 1}
                      </span>
                      <span 
                        className="flex-1"
                        dangerouslySetInnerHTML={{
                          __html: highlightPython(line)
                        }}
                      />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function highlightPython(line: string): string {
  // Simple syntax highlighting
  return line
    .replace(/(class|def|return|import|from|as|if|for|in|and|or|not|True|False|None)\b/g, '<span class="text-chart-3">$1</span>')
    .replace(/(".*?"|'.*?')/g, '<span class="text-accent">$1</span>')
    .replace(/(#.*$)/g, '<span class="text-muted-foreground">$1</span>')
    .replace(/\b(self|np|pd|st)\b/g, '<span class="text-primary">$1</span>')
    .replace(/(\d+\.?\d*)/g, '<span class="text-chart-4">$1</span>')
}
