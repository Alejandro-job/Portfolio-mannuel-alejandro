"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  ExternalLink,
  MapPin,
  Briefcase,
  GraduationCap
} from "lucide-react"

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
    username: "@tunombre"
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/tunombre",
    username: "/in/tunombre"
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:tucorreo@email.com",
    username: "tucorreo@email.com"
  },
]

const skills = [
  "Python", "Machine Learning", "Data Analysis", "SQL", 
  "Pandas", "NumPy", "Scikit-learn", "TensorFlow",
  "Streamlit", "Plotly", "Git", "Docker"
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-background relative">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Contacto
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Hablemos de tu Proyecto
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Estoy buscando oportunidades en ciencia de datos, machine learning 
            e inteligencia artificial aplicada a la industria.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Profile Card */}
          <Card className="bg-card/50 border-border">
            <CardContent className="p-8">
              {/* Avatar & Name */}
              <div className="flex items-start gap-6 mb-8">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">TN</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">Tu Nombre</h3>
                  <p className="text-primary font-medium">Data Scientist</p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Ciudad, País</span>
                  </div>
                </div>
              </div>
              
              {/* Bio */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Científico de datos apasionado por resolver problemas complejos usando 
                machine learning y análisis avanzado. Experiencia en industria farmacéutica, 
                manufactura y IoT industrial.
              </p>
              
              {/* Experience & Education */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Briefcase className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Experiencia</div>
                    <div className="text-sm text-muted-foreground">X+ años en Data Science</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <GraduationCap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Educación</div>
                    <div className="text-sm text-muted-foreground">Ingeniería / Maestría en...</div>
                  </div>
                </div>
              </div>
              
              {/* Skills */}
              <div className="mb-8">
                <div className="text-sm font-medium text-foreground mb-3">Habilidades</div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Download CV Button */}
              <Button className="w-full glow" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Descargar CV
              </Button>
            </CardContent>
          </Card>
          
          {/* Contact Options */}
          <div className="space-y-6">
            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all group"
                >
                  <div className="p-3 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                    <link.icon className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground">{link.label}</div>
                    <div className="text-sm text-muted-foreground">{link.username}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
            
            {/* Project Stats */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-4">
                  Este Proyecto en Números
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-primary">5,000+</div>
                    <div className="text-xs text-muted-foreground">Líneas de código</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">6</div>
                    <div className="text-xs text-muted-foreground">Módulos Python</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-chart-3">4</div>
                    <div className="text-xs text-muted-foreground">Algoritmos ML</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-chart-4">98.5%</div>
                    <div className="text-xs text-muted-foreground">Precisión</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* CTA */}
            <div className="p-6 rounded-xl bg-muted/30 border border-border text-center">
              <p className="text-muted-foreground mb-4">
                ¿Interesado en colaborar o tienes un proyecto similar?
              </p>
              <Button variant="outline" className="gap-2" asChild>
                <a href="mailto:tucorreo@email.com">
                  <Mail className="h-4 w-4" />
                  Enviar mensaje
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
