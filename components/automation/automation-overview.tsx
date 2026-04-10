"use client"

import { Cpu, Settings, Zap, Server, Monitor, Cog } from 'lucide-react'

export function AutomationOverview() {
  const technologies = [
    {
      icon: Cpu,
      title: "Programación PLC",
      description: "Diagrama Ladder, Texto Estructurado, Bloques de Función, Modbus",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Settings,
      title: "Maquinado CNC",
      description: "G-Code, Programación CAM, Interpolación, Ciclos de Mecanizado",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Monitor,
      title: "SCADA / HMI",
      description: "Visualización en Tiempo Real, Alarmas, Tendencias, Reportes",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Control de Procesos",
      description: "Sensores, Actuadores, PID, Lazos de Control",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Server,
      title: "Comunicaciones",
      description: "Profinet, OPC-UA, Modbus TCP/RTU, Ethernet Industrial",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Cog,
      title: "Industria 4.0",
      description: "IoT Industrial, Edge Computing, Gemelos Digitales",
      color: "from-teal-500 to-cyan-500"
    }
  ]

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Automatización Industrial
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            CNC, PLC y Control de Procesos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Conocimientos en automatización industrial aplicados a la manufactura. 
            Programación de máquinas CNC, controladores lógicos programables (PLC) 
            y sistemas de supervisión para optimización de procesos productivos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={tech.title}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mb-4`}>
                <tech.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{tech.title}</h3>
              <p className="text-sm text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
