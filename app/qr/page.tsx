"use client"

import { Download, QrCode, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function QRPage() {
  const portfolioUrl = "https://portfolio-mannuel-alejandro.vercel.app"
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(portfolioUrl)}&bgcolor=ffffff&color=000000`
  const qrUrlDark = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(portfolioUrl)}&bgcolor=0a0a0a&color=22d3ee`

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            QR Code de mi{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Portfolio
            </span>
          </h1>
          <p className="text-muted-foreground">
            Descarga el QR para agregarlo a tu CV impreso o compartirlo
          </p>
        </div>

        {/* QR Preview Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Light Version */}
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <h3 className="font-semibold mb-4">Version Clara (para imprimir)</h3>
            <div className="bg-white p-6 rounded-xl inline-block mb-6">
              <img 
                src={qrUrl} 
                alt="QR Code version clara"
                width={200}
                height={200}
              />
            </div>
            <a 
              href={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(portfolioUrl)}&bgcolor=ffffff&color=000000&format=png`}
              download="qr-portfolio-mannuel-claro.png"
            >
              <Button className="gap-2 w-full">
                <Download className="w-4 h-4" />
                Descargar PNG (Alta Res)
              </Button>
            </a>
          </div>

          {/* Dark Version */}
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <h3 className="font-semibold mb-4">Version Oscura (para digital)</h3>
            <div className="bg-[#0a0a0a] p-6 rounded-xl inline-block mb-6">
              <img 
                src={qrUrlDark} 
                alt="QR Code version oscura"
                width={200}
                height={200}
              />
            </div>
            <a 
              href={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(portfolioUrl)}&bgcolor=0a0a0a&color=22d3ee&format=png`}
              download="qr-portfolio-mannuel-oscuro.png"
            >
              <Button variant="outline" className="gap-2 w-full">
                <Download className="w-4 h-4" />
                Descargar PNG (Alta Res)
              </Button>
            </a>
          </div>
        </div>

        {/* Dinosaur QR Preview */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-12">
          <h3 className="font-semibold mb-6 text-center">Preview: QR con Dinosaurio</h3>
          
          <div className="flex justify-center">
            <div className="relative inline-block">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-xl opacity-50" />
              
              {/* Card */}
              <div className="relative bg-[#0a0a0a] border border-border rounded-2xl p-8">
                {/* Dinosaur */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                  <svg width="120" height="100" viewBox="0 0 120 100">
                    <ellipse cx="60" cy="65" rx="30" ry="20" fill="#22d3ee" />
                    <ellipse cx="85" cy="45" rx="18" ry="14" fill="#22d3ee" />
                    <path d="M95 48 L110 50 L95 52 Z" fill="#22d3ee" />
                    <line x1="95" y1="48" x2="108" y2="50" stroke="#0a0a0a" strokeWidth="1.5" />
                    <line x1="95" y1="52" x2="108" y2="50" stroke="#0a0a0a" strokeWidth="1.5" />
                    <path d="M98 49 L100 50 L98 51" fill="#fff" />
                    <path d="M102 49 L104 50 L102 51" fill="#fff" />
                    <circle cx="90" cy="42" r="4" fill="#0a0a0a" />
                    <circle cx="91" cy="41" r="1.5" fill="#fff" />
                    <ellipse cx="70" cy="58" rx="6" ry="3" fill="#1aa3b8" transform="rotate(-30 70 58)" />
                    <ellipse cx="50" cy="58" rx="6" ry="3" fill="#1aa3b8" transform="rotate(30 50 58)" />
                    <ellipse cx="45" cy="80" rx="8" ry="12" fill="#1aa3b8" />
                    <ellipse cx="75" cy="80" rx="8" ry="12" fill="#1aa3b8" />
                    <ellipse cx="42" cy="92" rx="10" ry="4" fill="#22d3ee" />
                    <ellipse cx="78" cy="92" rx="10" ry="4" fill="#22d3ee" />
                    <circle cx="35" cy="92" r="2" fill="#1aa3b8" />
                    <circle cx="40" cy="94" r="2" fill="#1aa3b8" />
                    <circle cx="45" cy="94" r="2" fill="#1aa3b8" />
                    <circle cx="71" cy="94" r="2" fill="#1aa3b8" />
                    <circle cx="76" cy="94" r="2" fill="#1aa3b8" />
                    <circle cx="81" cy="92" r="2" fill="#1aa3b8" />
                    <path d="M30 65 Q10 60 5 70 Q10 65 30 68" fill="#22d3ee" />
                    <path d="M40 50 L45 40 L50 50" fill="#1aa3b8" />
                    <path d="M50 48 L55 38 L60 48" fill="#1aa3b8" />
                    <path d="M60 47 L65 38 L70 47" fill="#1aa3b8" />
                    <ellipse cx="60" cy="70" rx="20" ry="10" fill="#a5f3fc" opacity="0.3" />
                  </svg>
                </div>

                {/* QR */}
                <div className="mt-8 p-4 bg-white rounded-xl">
                  <img src={qrUrl} alt="QR" width={200} height={200} className="mx-auto" />
                </div>

                {/* Info */}
                <div className="mt-6 text-center">
                  <p className="text-sm font-medium text-white">Manuel Alejandro Olivares Morales</p>
                  <p className="text-xs text-gray-400">Ing. Computacion | IA | CNC/PLC</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions for CV */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Como agregar el QR a tu CV
          </h3>
          <ol className="space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <span>Descarga la version clara del QR (PNG alta resolucion)</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <span>Abre tu CV en Word, Google Docs o el editor que uses</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <span>Inserta la imagen del QR en una esquina (recomendado: arriba a la derecha)</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">4</span>
              <span>Ajusta el tamano a aproximadamente 2x2 cm</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold shrink-0">5</span>
              <span>Agrega un texto pequeno debajo: &quot;Escanea para ver mi portfolio&quot;</span>
            </li>
          </ol>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              Volver al Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
