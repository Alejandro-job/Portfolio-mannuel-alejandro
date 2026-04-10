"use client"

import { Briefcase, Calendar, MapPin, GraduationCap } from 'lucide-react'

const experiences = [
  {
    title: "Ingeniería en Computación",
    company: "Instituto Politécnico Nacional",
    location: "Ciudad de México, CDMX",
    period: "Agosto 2020 - Marzo 2025",
    type: "education",
    description: "Formación integral en desarrollo de software, inteligencia artificial, redes neuronales y sistemas computacionales.",
    achievements: [
      "Desarrollo de software con C, C++, Python, React y Flutter",
      "Especialización en Inteligencia Artificial y redes neuronales",
      "Conocimientos en administración y diseño de bases de datos",
      "Formación en ingeniería de redes y sistemas distribuidos",
      "Proyectos de automatización industrial con CNC y PLC"
    ],
    technologies: ["Python", "C", "C++", "React", "Flutter", "PyTorch", "PL/SQL", "VBA"]
  },
  {
    title: "Analista de Hojas de Cálculo",
    company: "Solaris Farma",
    location: "Ciudad de México, CDMX",
    period: "Febrero 2017 - Enero 2020",
    type: "work",
    description: "Responsable del análisis, limpieza y optimización de datos. Automatización de procesos y apoyo en gestión de Recursos Humanos.",
    achievements: [
      "Análisis, limpieza y optimización de datos en hojas de cálculo",
      "Automatización de procesos mediante macros en Excel (VBA)",
      "Reducción significativa de errores y tiempos operativos",
      "Gestión de nómina: cálculo, validación de pagos y análisis de incidencias",
      "Apoyo integral al área de Recursos Humanos"
    ],
    technologies: ["Microsoft Excel", "VBA", "Microsoft Office", "Análisis de Datos"]
  }
]

export function ExperienceSection() {
  return (
    <section id="experiencia" className="py-20 lg:py-32 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Trayectoria
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Educación y Experiencia
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mi formación académica y experiencia profesional en el área de tecnología y análisis de datos.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <div 
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full border-4 border-background -translate-x-1/2 md:-translate-x-1/2 mt-1.5 ${
                exp.type === 'education' ? 'bg-accent' : 'bg-primary'
              }`} />

              {/* Content */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-8 md:pl-0`}>
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      exp.type === 'education' 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {exp.period}
                    </span>
                    {exp.type === 'education' && (
                      <GraduationCap className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
                  
                  <div className={`flex flex-wrap gap-4 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                  {/* Achievements */}
                  <ul className={`space-y-2 mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className={`text-sm text-muted-foreground flex items-start gap-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <span className="text-accent mt-0.5">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 py-1 text-xs bg-secondary rounded text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
