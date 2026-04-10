"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

const navLinks = [
  { name: "Sistema", href: "#overview" },
  { name: "Funcionalidades", href: "#features" },
  { name: "Tecnologías", href: "#tech" },
  { name: "Código", href: "#code" },
  { name: "Métricas", href: "#metrics" },
  { name: "Arquitectura", href: "#architecture" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:email@example.com", label: "Email" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-mono font-bold text-sm">PH</span>
              </div>
              <span className="font-semibold text-foreground">PharmaMonitor</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sistema de monitoreo farmacéutico industrial con machine learning 
              para detección de anomalías y cumplimiento GMP.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Navegación</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Conectar</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Disponible para oportunidades en Data Science y ML.
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} PharmaMonitor. Proyecto de portafolio.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Hecho con <Heart className="h-4 w-4 text-destructive fill-destructive" /> usando Python y Next.js
          </p>
        </div>
      </div>
    </footer>
  )
}
