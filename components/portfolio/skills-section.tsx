"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'

const skillCategories = [
  {
    id: 'ai',
    name: 'Inteligencia Artificial',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'PyTorch', level: 85 },
      { name: 'Modelos de IA', level: 85 },
      { name: 'Redes Neuronales', level: 80 },
      { name: 'Análisis de Datos', level: 90 },
      { name: 'Machine Learning', level: 85 },
    ]
  },
  {
    id: 'dev',
    name: 'Desarrollo de Software',
    skills: [
      { name: 'C', level: 85 },
      { name: 'C++', level: 85 },
      { name: 'Python', level: 90 },
      { name: 'Flutter', level: 80 },
      { name: 'React', level: 75 },
      { name: 'Diseño Web', level: 75 },
    ]
  },
  {
    id: 'data',
    name: 'Bases de Datos',
    skills: [
      { name: 'PL/SQL', level: 85 },
      { name: 'Administración de BD', level: 80 },
      { name: 'Diseño de BD', level: 80 },
      { name: 'Análisis Web', level: 75 },
      { name: 'VBA', level: 85 },
      { name: 'Microsoft Excel', level: 95 },
    ]
  },
  {
    id: 'industrial',
    name: 'Automatización Industrial',
    skills: [
      { name: 'CNC', level: 80 },
      { name: 'PLC', level: 80 },
      { name: 'Automatización', level: 75 },
      { name: 'Control de Procesos', level: 75 },
      { name: 'Ingeniería de Redes', level: 70 },
      { name: 'Sistemas Industriales', level: 75 },
    ]
  },
  {
    id: 'tools',
    name: 'Herramientas',
    skills: [
      { name: 'Microsoft Office', level: 95 },
      { name: 'Excel Avanzado', level: 95 },
      { name: 'Macros VBA', level: 85 },
      { name: 'Git', level: 80 },
      { name: 'Linux', level: 75 },
      { name: 'VS Code', level: 85 },
    ]
  }
]

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState('ai')

  const currentCategory = skillCategories.find(cat => cat.id === activeCategory)

  return (
    <section id="habilidades" className="py-20 lg:py-32 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Habilidades Técnicas
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Stack Tecnológico
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones de software, IA y automatización industrial.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              )}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {currentCategory?.skills.map((skill, index) => (
            <div
              key={skill.name}
              className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-foreground">{skill.name}</span>
                <span className="text-sm text-primary font-mono">{skill.level}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-4">Idiomas:</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="px-4 py-2 bg-secondary rounded-lg">
              <span className="text-foreground font-medium">Español</span>
              <span className="text-muted-foreground ml-2">- Nativo</span>
            </div>
            <div className="px-4 py-2 bg-secondary rounded-lg">
              <span className="text-foreground font-medium">Inglés</span>
              <span className="text-muted-foreground ml-2">- Intermedio (lectura técnica)</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">Otras habilidades:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              'Análisis de Datos', 'Gestión de Personal', 'Análisis Organizacional',
              'Trabajo en Equipo', 'Resolución de Problemas', 'Optimización de Procesos',
              'Documentación Técnica', 'Metodologías Ágiles'
            ].map((skill) => (
              <span 
                key={skill}
                className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
