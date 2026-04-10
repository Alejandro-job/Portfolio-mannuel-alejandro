"use client"

import { useState } from 'react'
import { QrCode, Download, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function QRDinosaur() {
  const [isHovered, setIsHovered] = useState(false)
  
  // URL del portfolio - cambiar cuando tengas la URL final de Vercel
  const portfolioUrl = "https://portfolio-mannuel-alejandro.vercel.app"
  
  // Generar QR usando API de QR Server
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(portfolioUrl)}&bgcolor=0a0a0a&color=22d3ee`

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322d3ee' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
          <Smartphone className="w-4 h-4" />
          <span className="text-sm font-medium">Escanea y Conecta</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
          Mi Portfolio en tu{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Bolsillo
          </span>
        </h2>

        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          Escanea el codigo QR con tu telefono para acceder a mi portfolio completo
        </p>

        {/* QR Container with Dinosaur */}
        <div 
          className="relative inline-block"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Glow Effect */}
          <div className={`absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-50'}`} />
          
          {/* Main Card */}
          <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
            {/* Dinosaur SVG */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <svg 
                width="120" 
                height="100" 
                viewBox="0 0 120 100" 
                className={`transition-transform duration-500 ${isHovered ? 'scale-110 -translate-y-2' : ''}`}
              >
                {/* T-Rex Body */}
                <ellipse cx="60" cy="65" rx="30" ry="20" fill="#22d3ee" />
                
                {/* Head */}
                <ellipse cx="85" cy="45" rx="18" ry="14" fill="#22d3ee" />
                
                {/* Mouth */}
                <path d="M95 48 L110 50 L95 52 Z" fill="#22d3ee" />
                <line x1="95" y1="48" x2="108" y2="50" stroke="#0a0a0a" strokeWidth="1.5" />
                <line x1="95" y1="52" x2="108" y2="50" stroke="#0a0a0a" strokeWidth="1.5" />
                
                {/* Teeth */}
                <path d="M98 49 L100 50 L98 51" fill="#fff" />
                <path d="M102 49 L104 50 L102 51" fill="#fff" />
                
                {/* Eye */}
                <circle cx="90" cy="42" r="4" fill="#0a0a0a" />
                <circle cx="91" cy="41" r="1.5" fill="#fff" />
                
                {/* Arms (tiny T-Rex arms!) */}
                <ellipse cx="70" cy="58" rx="6" ry="3" fill="#1aa3b8" transform="rotate(-30 70 58)" />
                <ellipse cx="50" cy="58" rx="6" ry="3" fill="#1aa3b8" transform="rotate(30 50 58)" />
                
                {/* Legs */}
                <ellipse cx="45" cy="80" rx="8" ry="12" fill="#1aa3b8" />
                <ellipse cx="75" cy="80" rx="8" ry="12" fill="#1aa3b8" />
                
                {/* Feet */}
                <ellipse cx="42" cy="92" rx="10" ry="4" fill="#22d3ee" />
                <ellipse cx="78" cy="92" rx="10" ry="4" fill="#22d3ee" />
                
                {/* Toes */}
                <circle cx="35" cy="92" r="2" fill="#1aa3b8" />
                <circle cx="40" cy="94" r="2" fill="#1aa3b8" />
                <circle cx="45" cy="94" r="2" fill="#1aa3b8" />
                <circle cx="71" cy="94" r="2" fill="#1aa3b8" />
                <circle cx="76" cy="94" r="2" fill="#1aa3b8" />
                <circle cx="81" cy="92" r="2" fill="#1aa3b8" />
                
                {/* Tail */}
                <path d="M30 65 Q10 60 5 70 Q10 65 30 68" fill="#22d3ee" />
                
                {/* Spikes on back */}
                <path d="M40 50 L45 40 L50 50" fill="#1aa3b8" />
                <path d="M50 48 L55 38 L60 48" fill="#1aa3b8" />
                <path d="M60 47 L65 38 L70 47" fill="#1aa3b8" />
                
                {/* Belly pattern */}
                <ellipse cx="60" cy="70" rx="20" ry="10" fill="#a5f3fc" opacity="0.3" />
              </svg>
            </div>

            {/* QR Code */}
            <div className="mt-8 p-4 bg-white rounded-xl">
              <img 
                src={qrUrl} 
                alt="QR Code para portfolio"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>

            {/* Info */}
            <div className="mt-6 space-y-2">
              <p className="text-sm font-medium text-foreground">Manuel Alejandro Olivares Morales</p>
              <p className="text-xs text-muted-foreground">Ing. Computacion | IA | CNC/PLC</p>
            </div>

            {/* Speech Bubble */}
            <div className={`absolute -right-4 top-8 bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
              Escanea!
              <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/cv-mannuel-alejandro.pdf" download className="w-full sm:w-auto">
            <Button size="lg" className="gap-2 w-full">
              <Download className="w-5 h-5" />
              Descargar CV
            </Button>
          </a>
          <a 
            href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(portfolioUrl)}&bgcolor=ffffff&color=000000&format=png`}
            download="qr-portfolio-mannuel.png"
            className="w-full sm:w-auto"
          >
            <Button size="lg" variant="outline" className="gap-2 w-full">
              <QrCode className="w-5 h-5" />
              Descargar QR
            </Button>
          </a>
        </div>

        {/* Instructions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { step: '1', text: 'Abre la camara de tu telefono' },
            { step: '2', text: 'Apunta al codigo QR' },
            { step: '3', text: 'Toca la notificacion para abrir' },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                {item.step}
              </div>
              <p className="text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
