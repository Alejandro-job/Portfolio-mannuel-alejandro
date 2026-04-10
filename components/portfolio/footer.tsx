import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter, MapPin, Calendar } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com/mannuelalejandro', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/mannuelalejandro', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://twitter.com/mannuelalejandro', icon: Twitter, label: 'Twitter' },
  { href: 'mailto:ale_program_smurf@hotmail.com', icon: Mail, label: 'Email' },
]

const quickLinks = [
  { href: '/', label: 'Sobre Mí' },
  { href: '/proyectos', label: 'Proyectos' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                MA
              </div>
              <div>
                <p className="font-semibold text-foreground">Mannuel Alejandro</p>
                <p className="text-xs text-muted-foreground">Ing. Computación & IA</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-md mb-4">
              Ingeniero en Computación del IPN especializado en IA, Machine Learning, 
              Automatización Industrial (CNC/PLC) y desarrollo de software.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Ciudad de México, México
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Disponible para proyectos
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Conecta</h3>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Tecnologías favoritas:</p>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Flutter', 'React', 'CNC/PLC'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 text-xs bg-secondary rounded-md text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} Mannuel Alejandro Olivares Morales. Hecho con Next.js y desplegado en Vercel.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Disponible para oportunidades
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
