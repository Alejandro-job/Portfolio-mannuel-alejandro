"use client"

import { Briefcase, Calendar, MapPin, GraduationCap } from 'lucide-react'

const experiences = [
  {
    title: "Desarrollador de Inteligencia Artificial Jr",
    company: "Independiente",
    location: "Ciudad de Mexico",
    period: "Julio 2024 - Enero 2025",
    type: "work",
    description: "Desarrollo de soluciones de IA con Python. Implementacion de modelos de vision por computadora y procesamiento de imagenes.",
    achievements: [
      "Implementacion de modelos YOLO y CNN (ResNet, VGG)",
      "Procesamiento de imagenes con OpenCV (Sobel, Canny, segmentacion)",
      "Analisis de datos con Pandas",
      "Entrenamiento de modelos con TensorFlow y PyTorch",
      "Desarrollo de prototipos para automatizacion y reconocimiento de patrones"
    ],
    technologies: ["Python", "YOLO", "CNN", "TensorFlow", "PyTorch", "OpenCV", "Pandas"]
  },
  {
    title: "Programador CNC",
    company: "Freelance",
    location: "Ciudad de Mexico",
    period: "Mayo 2021 - Junio 2023",
    type: "work",
    description: "Programacion de maquinas CNC y supervision de procesos productivos con control de calidad.",
    achievements: [
      "Programacion mediante codigos G y M",
      "Interpretacion de planos y especificaciones tecnicas",
      "Ajuste de parametros de mecanizado para optimizar tiempos y precision",
      "Supervision de procesos productivos y control de calidad",
      "Mantenimiento basico y solucion de fallas en equipos"
    ],
    technologies: ["G-Code", "M-Code", "CAD/CAM", "Metrologia", "Control de Calidad"]
  },
  {
    title: "Analista de Datos",
    company: "Freelance",
    location: "Ciudad de Mexico",
    period: "Febrero 2021 - Enero 2023",
    type: "work",
    description: "Analisis de datos con Python y desarrollo de dashboards interactivos para visualizacion de KPIs.",
    achievements: [
      "Analisis de datos con Python (Pandas)",
      "Limpieza, transformacion y estructuracion de bases de datos",
      "Desarrollo de dashboards interactivos en Power BI",
      "Uso de Excel avanzado con macros",
      "Analisis estadistico y automatizacion de reportes con R"
    ],
    technologies: ["Python", "Pandas", "Power BI", "Excel", "R", "SQL"]
  },
  {
    title: "Programador / Analista de Datos",
    company: "Freelance",
    location: "Ciudad de Mexico",
    period: "Enero 2017 - Febrero 2019",
    type: "work",
    description: "Automatizacion de procesos mediante macros y apoyo en gestion de Recursos Humanos.",
    achievements: [
      "Analisis, depuracion y organizacion de hojas de calculo",
      "Desarrollo de macros para automatizacion de procesos",
      "Apoyo en nomina: calculo, validacion y control de pagos",
      "Deteccion de inconsistencias en la informacion",
      "Mejora en la gestion de datos empresariales"
    ],
    technologies: ["Excel", "VBA", "Macros", "Nomina", "Microsoft Office"]
  }
]

const education = [
  {
    title: "Ingenieria en Computacion",
    company: "ESIME Culhuacan - IPN",
    location: "Ciudad de Mexico",
    period: "Agosto 2020 - Diciembre 2025",
    type: "education",
    description: "Especializacion en Inteligencia Artificial, Machine Learning, desarrollo de software y automatizacion industrial.",
    achievements: [
      "Desarrollo con Python, C, C++, React y Flutter",
      "Especializacion en IA y redes neuronales",
      "Proyectos de vision por computadora",
      "Automatizacion industrial con CNC y PLC",
      "Administracion de bases de datos"
    ],
    technologies: ["Python", "C", "C++", "React", "Flutter", "PyTorch", "SQL"]
  },
  {
    title: "Educacion Profesional Tecnica",
    company: "Colegio de Bachilleres",
    location: "Ciudad de Mexico",
    period: "Agosto 2018 - Marzo 2019",
    type: "education",
    description: "Formacion tecnica en programacion y sistemas computacionales.",
    achievements: [
      "Fundamentos de programacion",
      "Sistemas computacionales",
      "Logica de programacion"
    ],
    technologies: ["Programacion", "Sistemas", "Logica"]
  }
]

export function ExperienceSection() {
  return (
    <section id="experiencia" className="py-20 lg:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Trayectoria
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Experiencia y Educacion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            +7 anos de experiencia en analisis de datos, programacion CNC e inteligencia artificial.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">Experiencia Laboral</h3>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className="relative pl-6 border-l-2 border-primary/30 hover:border-primary transition-colors"
                >
                  <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-background border-4 border-primary" />
                  
                  <div className="p-5 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <div className="flex items-center gap-2 text-xs text-primary font-medium mb-2">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>
                    
                    <h4 className="text-lg font-bold text-foreground mb-1">{exp.title}</h4>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>

                    <ul className="space-y-1 mb-4">
                      {exp.achievements.slice(0, 3).map((achievement, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">&#8226;</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.slice(0, 5).map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Column */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-accent/10">
                <GraduationCap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">Educacion</h3>
            </div>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="relative pl-6 border-l-2 border-accent/30 hover:border-accent transition-colors"
                >
                  <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-background border-4 border-accent" />
                  
                  <div className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                    <div className="flex items-center gap-2 text-xs text-accent font-medium mb-2">
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </div>
                    
                    <h4 className="text-lg font-bold text-foreground mb-1">{edu.title}</h4>
                    
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <GraduationCap className="w-3 h-3" />
                        {edu.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{edu.description}</p>

                    <ul className="space-y-1 mb-4">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-accent mt-0.5">&#8226;</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {edu.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Cards */}
            <div className="mt-8 grid gap-4">
              <div className="p-4 rounded-xl bg-card border border-border">
                <h4 className="font-semibold mb-3 text-foreground">Idiomas</h4>
                <div className="flex gap-4">
                  <div className="flex-1 p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-sm font-medium">Espanol</p>
                    <p className="text-xs text-primary">Nativo</p>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-sm font-medium">Ingles</p>
                    <p className="text-xs text-muted-foreground">Intermedio</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border">
                <h4 className="font-semibold mb-3 text-foreground">Informacion Adicional</h4>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <span>Licencia tipo A</span>
                  <span>Vehiculo propio</span>
                  <span>CDMX, Iztapalapa</span>
                  <span>Disponible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
