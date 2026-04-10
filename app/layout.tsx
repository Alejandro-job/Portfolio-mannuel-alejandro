import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/portfolio/navigation'
import { Footer } from '@/components/portfolio/footer'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  title: 'Mannuel Alejandro Olivares Morales | Ing. Computación & IA',
  description: 'Ingeniero en Computación especializado en Inteligencia Artificial, Machine Learning, Automatización Industrial (CNC/PLC) y Desarrollo de Software. IPN - ESCOM.',
  keywords: ['Inteligencia Artificial', 'Machine Learning', 'Python', 'CNC', 'PLC', 'Automatización Industrial', 'Data Science', 'IPN', 'ESCOM'],
  authors: [{ name: 'Mannuel Alejandro Olivares Morales' }],
  openGraph: {
    title: 'Mannuel Alejandro Olivares Morales | Ing. Computación & IA',
    description: 'Ingeniero en Computación especializado en IA, ML y Automatización Industrial',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="dark" data-scroll-behavior="smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
