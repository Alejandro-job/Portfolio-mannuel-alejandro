"use client"

import { Navigation } from '@/components/portfolio/navigation'
import { Footer } from '@/components/portfolio/footer'
import { AutomationOverview } from '@/components/automation/automation-overview'
import { CNCSimulator } from '@/components/automation/cnc-simulator'
import { PLCSimulator } from '@/components/automation/plc-simulator'
import { Cpu, Cog, Wrench, BookOpen } from 'lucide-react'

export default function AutomatizacionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        <AutomationOverview />
        
        {/* CNC Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Cog className="w-4 h-4" />
                Simulador Interactivo
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Control Numérico Computarizado (CNC)
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
                Simulador de mecanizado CNC con intérprete de G-Code. Visualiza en tiempo real 
                cómo se ejecutan las instrucciones de corte, movimientos rápidos y trayectorias 
                de herramienta.
              </p>
            </div>
            
            <CNCSimulator />
            
            {/* CNC Info Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-6 rounded-xl bg-card border border-border">
                <Wrench className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">G-Code</h3>
                <p className="text-sm text-muted-foreground">
                  Lenguaje estándar para programación de máquinas CNC. Controla movimientos, 
                  velocidades y operaciones de mecanizado.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <Cpu className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Interpolación</h3>
                <p className="text-sm text-muted-foreground">
                  Cálculo de trayectorias lineales (G01) y circulares (G02/G03) para 
                  generar contornos precisos en la pieza.
                </p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border">
                <BookOpen className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Aplicaciones</h3>
                <p className="text-sm text-muted-foreground">
                  Fresado, torneado, corte por láser, impresión 3D, y cualquier proceso 
                  que requiera control de movimiento preciso.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PLC Section */}
        <section className="py-16 lg:py-24 bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                <Cpu className="w-4 h-4" />
                Lógica de Escalera
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Controlador Lógico Programable (PLC)
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
                Simulador de PLC con diagrama Ladder interactivo. Activa las entradas y observa 
                cómo la lógica de escalera controla las salidas en tiempo real, simulando 
                un sistema de control industrial real.
              </p>
            </div>
            
            <PLCSimulator />
            
            {/* PLC Info */}
            <div className="mt-12 p-6 rounded-xl bg-background border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Características del Simulador PLC
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-1.5" />
                  <div>
                    <div className="font-medium text-foreground">6 Entradas Digitales</div>
                    <div className="text-muted-foreground">Start, Stop, Sensores, Emergencia</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <div className="font-medium text-foreground">5 Salidas</div>
                    <div className="text-muted-foreground">Motor, Válvula, Lámparas, Alarma</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-1.5" />
                  <div>
                    <div className="font-medium text-foreground">Lógica de Enclavamiento</div>
                    <div className="text-muted-foreground">Control Start/Stop con memoria</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <div className="font-medium text-foreground">Tiempo Real</div>
                    <div className="text-muted-foreground">Ciclo de scan visible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge Section */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Conocimientos en Automatización Industrial
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Programación CNC</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Programación manual y CAM (Manufactura Asistida por Computadora)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Códigos G (preparatorios) y M (auxiliares)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Compensación de herramienta y ciclos fijos
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Interpolación lineal, circular y helicoidal
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">•</span>
                    Subprogramas y programación paramétrica
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent">Programación PLC</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Diagrama Ladder (Lógica de Escalera)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Bloques de función (FBD) y texto estructurado (ST)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Temporizadores TON, TOF, TP y contadores
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Comunicación industrial (Modbus, Profinet, OPC)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Integración con sistemas SCADA y HMI
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
