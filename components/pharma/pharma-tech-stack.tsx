const techCategories = [
  {
    name: "Core Python",
    technologies: [
      { name: "Python 3.11+", description: "Lenguaje principal" },
      { name: "NumPy", description: "Computación numérica" },
      { name: "Pandas", description: "Manipulación de datos" },
      { name: "SciPy", description: "Computación científica" },
    ]
  },
  {
    name: "Machine Learning",
    technologies: [
      { name: "Scikit-learn", description: "Modelos ML clásicos" },
      { name: "TensorFlow", description: "Deep Learning (Autoencoder)" },
      { name: "Keras", description: "API de alto nivel" },
      { name: "Joblib", description: "Persistencia de modelos" },
    ]
  },
  {
    name: "Visualización",
    technologies: [
      { name: "Streamlit", description: "Dashboard interactivo" },
      { name: "Plotly", description: "Gráficos interactivos" },
      { name: "Matplotlib", description: "Visualización estática" },
      { name: "Seaborn", description: "Visualización estadística" },
    ]
  },
  {
    name: "Infraestructura",
    technologies: [
      { name: "Streamlit Cloud", description: "Despliegue del dashboard" },
      { name: "GitHub", description: "Control de versiones" },
      { name: "Docker", description: "Contenedorización" },
      { name: "pytest", description: "Testing" },
    ]
  },
]

export function PharmaTechStack() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Tecnologías
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Stack Tecnológico
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Herramientas y librerías utilizadas para construir el sistema de monitoreo.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techCategories.map((category, index) => (
            <div key={index} className="p-6 rounded-xl bg-background border border-border">
              <h3 className="font-semibold text-foreground mb-4 pb-2 border-b border-border">
                {category.name}
              </h3>
              <ul className="space-y-3">
                {category.technologies.map((tech) => (
                  <li key={tech.name} className="flex flex-col">
                    <span className="text-foreground font-medium text-sm">{tech.name}</span>
                    <span className="text-muted-foreground text-xs">{tech.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary mb-1">5,000+</div>
              <div className="text-sm text-muted-foreground">Líneas de código Python</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">8</div>
              <div className="text-sm text-muted-foreground">Módulos independientes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Cobertura de documentación</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
