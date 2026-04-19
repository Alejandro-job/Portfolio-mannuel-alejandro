"use client"

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Database, 
  Table, 
  ArrowRight, 
  Key, 
  Link2, 
  CheckCircle,
  Play,
  RotateCcw,
  Layers
} from 'lucide-react'
import Link from 'next/link'

// Datos de ejemplo para normalización
const unnormalizedData = [
  { id: 1, cliente: 'Juan Perez', telefono: '555-1234, 555-5678', producto: 'Laptop HP', precio: 15000, fecha: '2024-01-15' },
  { id: 2, cliente: 'Maria Garcia', telefono: '555-9999', producto: 'Mouse Logitech', precio: 500, fecha: '2024-01-16' },
  { id: 3, cliente: 'Juan Perez', telefono: '555-1234, 555-5678', producto: 'Teclado Mecanico', precio: 2000, fecha: '2024-01-17' },
]

const normalizedClientes = [
  { id_cliente: 1, nombre: 'Juan Perez' },
  { id_cliente: 2, nombre: 'Maria Garcia' },
]

const normalizedTelefonos = [
  { id_telefono: 1, id_cliente: 1, telefono: '555-1234' },
  { id_telefono: 2, id_cliente: 1, telefono: '555-5678' },
  { id_telefono: 3, id_cliente: 2, telefono: '555-9999' },
]

const normalizedProductos = [
  { id_producto: 1, nombre: 'Laptop HP', precio: 15000 },
  { id_producto: 2, nombre: 'Mouse Logitech', precio: 500 },
  { id_producto: 3, nombre: 'Teclado Mecanico', precio: 2000 },
]

const normalizedVentas = [
  { id_venta: 1, id_cliente: 1, id_producto: 1, fecha: '2024-01-15' },
  { id_venta: 2, id_cliente: 2, id_producto: 2, fecha: '2024-01-16' },
  { id_venta: 3, id_cliente: 1, id_producto: 3, fecha: '2024-01-17' },
]

// Datos SAP de ejemplo
const sapModules = [
  { code: 'MM', name: 'Materials Management', color: 'bg-blue-500', description: 'Gestion de materiales y compras' },
  { code: 'SD', name: 'Sales & Distribution', color: 'bg-green-500', description: 'Ventas y distribucion' },
  { code: 'FI', name: 'Financial Accounting', color: 'bg-yellow-500', description: 'Contabilidad financiera' },
  { code: 'PP', name: 'Production Planning', color: 'bg-purple-500', description: 'Planificacion de produccion' },
  { code: 'QM', name: 'Quality Management', color: 'bg-red-500', description: 'Gestion de calidad' },
  { code: 'WM', name: 'Warehouse Management', color: 'bg-cyan-500', description: 'Gestion de almacenes' },
]

const sapTransactions = [
  { tcode: 'MM01', module: 'MM', description: 'Crear material', type: 'Master Data' },
  { tcode: 'MM03', module: 'MM', description: 'Visualizar material', type: 'Master Data' },
  { tcode: 'ME21N', module: 'MM', description: 'Crear pedido de compra', type: 'Purchasing' },
  { tcode: 'MIGO', module: 'MM', description: 'Movimiento de mercancias', type: 'Inventory' },
  { tcode: 'VA01', module: 'SD', description: 'Crear pedido de venta', type: 'Sales' },
  { tcode: 'VL01N', module: 'SD', description: 'Crear entrega', type: 'Shipping' },
  { tcode: 'FB01', module: 'FI', description: 'Contabilizar documento', type: 'Posting' },
  { tcode: 'CO01', module: 'PP', description: 'Crear orden de produccion', type: 'Production' },
]

export default function BaseDatosPage() {
  const [activeTab, setActiveTab] = useState<'normalizacion' | 'er' | 'sap'>('normalizacion')
  const [normalizationStep, setNormalizationStep] = useState(0)
  const [selectedSapModule, setSelectedSapModule] = useState<string | null>(null)
  const [queryResult, setQueryResult] = useState<string>('')
  const [isAnimating, setIsAnimating] = useState(false)

  const runNormalization = () => {
    setIsAnimating(true)
    setNormalizationStep(0)
    const steps = [1, 2, 3]
    steps.forEach((step, index) => {
      setTimeout(() => {
        setNormalizationStep(step)
        if (index === steps.length - 1) {
          setIsAnimating(false)
        }
      }, (index + 1) * 1500)
    })
  }

  const runQuery = (query: string) => {
    setQueryResult(query)
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/proyectos" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Volver a proyectos
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-primary/10">
              <Database className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                Bases de Datos y SAP
              </h1>
              <p className="text-muted-foreground">
                Ejemplos interactivos de normalizacion, diagramas ER y transacciones SAP
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>SQL Server</Badge>
            <Badge>MySQL</Badge>
            <Badge>PostgreSQL</Badge>
            <Badge>SAP ERP</Badge>
            <Badge variant="outline">Normalizacion 1NF-3NF</Badge>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 border-b border-border sticky top-16 bg-background/95 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            {[
              { id: 'normalizacion', label: 'Normalizacion', icon: Layers },
              { id: 'er', label: 'Diagrama E-R', icon: Link2 },
              { id: 'sap', label: 'SAP ERP', icon: Table },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className="gap-2"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* NORMALIZACION */}
          {activeTab === 'normalizacion' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Proceso de Normalizacion</h2>
                  <p className="text-muted-foreground">Transformacion de tabla no normalizada a 3FN</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={runNormalization} disabled={isAnimating} className="gap-2">
                    <Play className="w-4 h-4" />
                    {isAnimating ? 'Procesando...' : 'Ejecutar'}
                  </Button>
                  <Button variant="outline" onClick={() => setNormalizationStep(0)} className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>
              </div>

              {/* Tabla Original */}
              <Card className={`transition-all duration-500 ${normalizationStep >= 1 ? 'opacity-50 scale-95' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="destructive">Sin Normalizar</Badge>
                    <span className="text-sm text-muted-foreground">Problemas: redundancia, valores multiples</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 text-foreground">ID</th>
                          <th className="text-left p-3 text-foreground">Cliente</th>
                          <th className="text-left p-3 text-foreground bg-red-500/10">Telefonos</th>
                          <th className="text-left p-3 text-foreground">Producto</th>
                          <th className="text-left p-3 text-foreground">Precio</th>
                          <th className="text-left p-3 text-foreground">Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {unnormalizedData.map((row) => (
                          <tr key={row.id} className="border-b border-border/50">
                            <td className="p-3 text-muted-foreground">{row.id}</td>
                            <td className="p-3 text-foreground">{row.cliente}</td>
                            <td className="p-3 text-red-400 bg-red-500/5">{row.telefono}</td>
                            <td className="p-3 text-foreground">{row.producto}</td>
                            <td className="p-3 text-foreground">${row.precio}</td>
                            <td className="p-3 text-muted-foreground">{row.fecha}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Paso 1: 1NF */}
              {normalizationStep >= 1 && (
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-2 text-primary animate-pulse">
                    <ArrowRight className="w-6 h-6" />
                    <span className="font-medium">Primera Forma Normal (1NF)</span>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              )}

              {/* Paso 2: 2NF - Tablas separadas */}
              {normalizationStep >= 2 && (
                <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <Card className="border-green-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Key className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium text-foreground">Clientes</span>
                        <Badge variant="outline" className="text-xs">2NF</Badge>
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-2 text-yellow-500">id_cliente</th>
                            <th className="text-left p-2 text-foreground">nombre</th>
                          </tr>
                        </thead>
                        <tbody>
                          {normalizedClientes.map((row) => (
                            <tr key={row.id_cliente} className="border-b border-border/50">
                              <td className="p-2 text-yellow-500">{row.id_cliente}</td>
                              <td className="p-2 text-foreground">{row.nombre}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Link2 className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-foreground">Telefonos</span>
                        <Badge variant="outline" className="text-xs">2NF</Badge>
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left p-2 text-yellow-500">id_telefono</th>
                            <th className="text-left p-2 text-blue-500">id_cliente</th>
                            <th className="text-left p-2 text-foreground">telefono</th>
                          </tr>
                        </thead>
                        <tbody>
                          {normalizedTelefonos.map((row) => (
                            <tr key={row.id_telefono} className="border-b border-border/50">
                              <td className="p-2 text-yellow-500">{row.id_telefono}</td>
                              <td className="p-2 text-blue-500">{row.id_cliente}</td>
                              <td className="p-2 text-foreground">{row.telefono}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Paso 3: 3NF - Todas las tablas */}
              {normalizationStep >= 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-center">
                    <Badge className="bg-green-500">Tercera Forma Normal (3NF) - Completado</Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-purple-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Key className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium text-foreground">Productos</span>
                          <Badge variant="outline" className="text-xs">3NF</Badge>
                        </div>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-2 text-yellow-500">id_producto</th>
                              <th className="text-left p-2 text-foreground">nombre</th>
                              <th className="text-left p-2 text-foreground">precio</th>
                            </tr>
                          </thead>
                          <tbody>
                            {normalizedProductos.map((row) => (
                              <tr key={row.id_producto} className="border-b border-border/50">
                                <td className="p-2 text-yellow-500">{row.id_producto}</td>
                                <td className="p-2 text-foreground">{row.nombre}</td>
                                <td className="p-2 text-foreground">${row.precio}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>

                    <Card className="border-cyan-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Table className="w-4 h-4 text-cyan-500" />
                          <span className="font-medium text-foreground">Ventas</span>
                          <Badge variant="outline" className="text-xs">3NF</Badge>
                        </div>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left p-2 text-yellow-500">id_venta</th>
                              <th className="text-left p-2 text-blue-500">id_cliente</th>
                              <th className="text-left p-2 text-purple-500">id_producto</th>
                              <th className="text-left p-2 text-foreground">fecha</th>
                            </tr>
                          </thead>
                          <tbody>
                            {normalizedVentas.map((row) => (
                              <tr key={row.id_venta} className="border-b border-border/50">
                                <td className="p-2 text-yellow-500">{row.id_venta}</td>
                                <td className="p-2 text-blue-500">{row.id_cliente}</td>
                                <td className="p-2 text-purple-500">{row.id_producto}</td>
                                <td className="p-2 text-foreground">{row.fecha}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Beneficios */}
                  <Card className="bg-green-500/5 border-green-500/30">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Beneficios de la Normalizacion
                      </h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 bg-background rounded-lg">
                          <div className="text-2xl font-bold text-green-500">0</div>
                          <div className="text-sm text-muted-foreground">Redundancia de datos</div>
                        </div>
                        <div className="p-4 bg-background rounded-lg">
                          <div className="text-2xl font-bold text-green-500">100%</div>
                          <div className="text-sm text-muted-foreground">Integridad referencial</div>
                        </div>
                        <div className="p-4 bg-background rounded-lg">
                          <div className="text-2xl font-bold text-green-500">4</div>
                          <div className="text-sm text-muted-foreground">Tablas optimizadas</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* DIAGRAMA E-R */}
          {activeTab === 'er' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Diagrama Entidad-Relacion</h2>
                <p className="text-muted-foreground">Sistema de ventas farmaceuticas</p>
              </div>

              <div className="relative bg-card rounded-2xl border border-border p-8 overflow-hidden min-h-[500px]">
                {/* ER Diagram visual */}
                <svg className="w-full h-[500px]" viewBox="0 0 800 500">
                  {/* Lineas de relacion */}
                  <line x1="200" y1="100" x2="400" y2="100" stroke="currentColor" strokeWidth="2" className="text-primary" />
                  <line x1="400" y1="100" x2="600" y2="100" stroke="currentColor" strokeWidth="2" className="text-primary" />
                  <line x1="400" y1="100" x2="400" y2="250" stroke="currentColor" strokeWidth="2" className="text-primary" />
                  <line x1="200" y1="250" x2="400" y2="250" stroke="currentColor" strokeWidth="2" className="text-accent" />
                  <line x1="400" y1="250" x2="600" y2="250" stroke="currentColor" strokeWidth="2" className="text-accent" />
                  <line x1="400" y1="250" x2="400" y2="400" stroke="currentColor" strokeWidth="2" className="text-accent" />

                  {/* Entidad: Cliente */}
                  <g transform="translate(100, 60)">
                    <rect x="0" y="0" width="180" height="80" rx="8" fill="currentColor" className="text-primary/20" stroke="currentColor" strokeWidth="2" className="text-primary" />
                    <text x="90" y="30" textAnchor="middle" className="fill-foreground font-bold text-sm">CLIENTE</text>
                    <text x="90" y="50" textAnchor="middle" className="fill-muted-foreground text-xs">id_cliente (PK)</text>
                    <text x="90" y="65" textAnchor="middle" className="fill-muted-foreground text-xs">nombre, direccion</text>
                  </g>

                  {/* Entidad: Pedido */}
                  <g transform="translate(310, 60)">
                    <rect x="0" y="0" width="180" height="80" rx="8" fill="currentColor" className="text-accent/20" stroke="currentColor" strokeWidth="2" className="text-accent" />
                    <text x="90" y="30" textAnchor="middle" className="fill-foreground font-bold text-sm">PEDIDO</text>
                    <text x="90" y="50" textAnchor="middle" className="fill-muted-foreground text-xs">id_pedido (PK)</text>
                    <text x="90" y="65" textAnchor="middle" className="fill-muted-foreground text-xs">fecha, total</text>
                  </g>

                  {/* Entidad: Producto */}
                  <g transform="translate(520, 60)">
                    <rect x="0" y="0" width="180" height="80" rx="8" fill="currentColor" className="text-chart-3/20" stroke="currentColor" strokeWidth="2" className="text-chart-3" />
                    <text x="90" y="30" textAnchor="middle" className="fill-foreground font-bold text-sm">PRODUCTO</text>
                    <text x="90" y="50" textAnchor="middle" className="fill-muted-foreground text-xs">id_producto (PK)</text>
                    <text x="90" y="65" textAnchor="middle" className="fill-muted-foreground text-xs">nombre, precio</text>
                  </g>

                  {/* Entidad: Proveedor */}
                  <g transform="translate(100, 210)">
                    <rect x="0" y="0" width="180" height="80" rx="8" fill="currentColor" className="text-chart-4/20" stroke="currentColor" strokeWidth="2" className="text-chart-4" />
                    <text x="90" y="30" textAnchor="middle" className="fill-foreground font-bold text-sm">PROVEEDOR</text>
                    <text x="90" y="50" textAnchor="middle" className="fill-muted-foreground text-xs">id_proveedor (PK)</text>
                    <text x="90" y="65" textAnchor="middle" className="fill-muted-foreground text-xs">nombre, contacto</text>
                  </g>

                  {/* Entidad: Inventario */}
                  <g transform="translate(310, 210)">
                    <rect x="0" y="0" width="180" height="80" rx="8" fill="currentColor" className="text-chart-5/20" stroke="currentColor" strokeWidth="2" className="text-chart-5" />
                    <text x="90" y="30" textAnchor="middle" className="fill-foreground font-bold text-sm">INVENTARIO</text>
                    <text x="90" y="50" textAnchor="middle" className="fill-muted-foreground text-xs">id_inventario (PK)</text>
                    <text x="90" y="65" textAnchor="middle" className="fill-muted-foreground text-xs">cantidad, ubicacion</text>
                  </g>

                  {/* Entidad: Lote */}
                  <g transform="translate(520, 210)">
                    <rect x="0" y="0" width="180" height="80" rx="8" fill="currentColor" className="text-destructive/20" stroke="currentColor" strokeWidth="2" className="text-destructive" />
                    <text x="90" y="30" textAnchor="middle" className="fill-foreground font-bold text-sm">LOTE</text>
                    <text x="90" y="50" textAnchor="middle" className="fill-muted-foreground text-xs">id_lote (PK)</text>
                    <text x="90" y="65" textAnchor="middle" className="fill-muted-foreground text-xs">caducidad, cantidad</text>
                  </g>

                  {/* Entidad: Empleado */}
                  <g transform="translate(310, 360)">
                    <rect x="0" y="0" width="180" height="80" rx="8" fill="currentColor" className="text-primary/20" stroke="currentColor" strokeWidth="2" className="text-primary" />
                    <text x="90" y="30" textAnchor="middle" className="fill-foreground font-bold text-sm">EMPLEADO</text>
                    <text x="90" y="50" textAnchor="middle" className="fill-muted-foreground text-xs">id_empleado (PK)</text>
                    <text x="90" y="65" textAnchor="middle" className="fill-muted-foreground text-xs">nombre, puesto</text>
                  </g>

                  {/* Cardinalidades */}
                  <text x="230" y="90" className="fill-primary text-xs font-mono">1</text>
                  <text x="290" y="90" className="fill-primary text-xs font-mono">N</text>
                  <text x="500" y="90" className="fill-primary text-xs font-mono">N</text>
                  <text x="570" y="90" className="fill-primary text-xs font-mono">M</text>
                </svg>

                {/* Leyenda */}
                <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur p-4 rounded-lg border border-border">
                  <div className="text-sm font-medium text-foreground mb-2">Leyenda</div>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="flex items-center gap-1"><Key className="w-3 h-3 text-yellow-500" /> PK: Primary Key</span>
                    <span className="flex items-center gap-1"><Link2 className="w-3 h-3 text-blue-500" /> FK: Foreign Key</span>
                    <span>1:N = Uno a muchos</span>
                    <span>N:M = Muchos a muchos</span>
                  </div>
                </div>
              </div>

              {/* SQL Queries */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4">Consultas SQL de Ejemplo</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { label: 'JOIN Clientes-Pedidos', query: 'SELECT c.nombre, p.fecha, p.total FROM Cliente c INNER JOIN Pedido p ON c.id_cliente = p.id_cliente' },
                      { label: 'Productos con stock bajo', query: 'SELECT pr.nombre, i.cantidad FROM Producto pr JOIN Inventario i ON pr.id_producto = i.id_producto WHERE i.cantidad < 10' },
                      { label: 'Ventas por mes', query: 'SELECT MONTH(fecha) as mes, SUM(total) as ventas FROM Pedido GROUP BY MONTH(fecha)' },
                      { label: 'Lotes proximos a caducar', query: 'SELECT l.id_lote, p.nombre, l.caducidad FROM Lote l JOIN Producto p ON l.id_producto = p.id_producto WHERE l.caducidad < DATEADD(month, 1, GETDATE())' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => runQuery(item.query)}
                        className={`p-4 rounded-lg text-left transition-all ${
                          queryResult === item.query 
                            ? 'bg-primary/10 border-2 border-primary' 
                            : 'bg-secondary hover:bg-secondary/80 border-2 border-transparent'
                        }`}
                      >
                        <div className="font-medium text-foreground mb-1">{item.label}</div>
                        <code className="text-xs text-muted-foreground line-clamp-2">{item.query}</code>
                      </button>
                    ))}
                  </div>

                  {queryResult && (
                    <div className="mt-4 p-4 bg-background rounded-lg border border-border">
                      <div className="text-sm text-muted-foreground mb-2">Query seleccionado:</div>
                      <code className="text-sm text-primary font-mono">{queryResult}</code>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* SAP */}
          {activeTab === 'sap' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">SAP ERP - Modulos y Transacciones</h2>
                <p className="text-muted-foreground">Experiencia en configuracion y uso de SAP en industria farmaceutica</p>
              </div>

              {/* Modulos SAP */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {sapModules.map((module) => (
                  <button
                    key={module.code}
                    onClick={() => setSelectedSapModule(selectedSapModule === module.code ? null : module.code)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      selectedSapModule === module.code 
                        ? 'ring-2 ring-primary scale-105' 
                        : 'hover:scale-105'
                    }`}
                  >
                    <div className={`w-12 h-12 ${module.color} rounded-xl mx-auto mb-2 flex items-center justify-center`}>
                      <span className="text-white font-bold text-lg">{module.code}</span>
                    </div>
                    <div className="text-sm font-medium text-foreground">{module.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{module.description}</div>
                  </button>
                ))}
              </div>

              {/* Transacciones */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-4">
                    Transacciones {selectedSapModule ? `- Modulo ${selectedSapModule}` : '- Todos los modulos'}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 text-foreground">T-Code</th>
                          <th className="text-left p-3 text-foreground">Modulo</th>
                          <th className="text-left p-3 text-foreground">Descripcion</th>
                          <th className="text-left p-3 text-foreground">Tipo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sapTransactions
                          .filter(t => !selectedSapModule || t.module === selectedSapModule)
                          .map((trans) => {
                            const module = sapModules.find(m => m.code === trans.module)
                            return (
                              <tr key={trans.tcode} className="border-b border-border/50 hover:bg-secondary/50">
                                <td className="p-3 font-mono text-primary">{trans.tcode}</td>
                                <td className="p-3">
                                  <span className={`px-2 py-1 rounded text-xs text-white ${module?.color}`}>
                                    {trans.module}
                                  </span>
                                </td>
                                <td className="p-3 text-foreground">{trans.description}</td>
                                <td className="p-3 text-muted-foreground">{trans.type}</td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Flujo SAP */}
              <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5">
                <CardContent className="p-6">
                  <h3 className="font-bold text-foreground mb-6">Flujo de Proceso: Compra de Materiales</h3>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {[
                      { step: 1, tcode: 'ME51N', label: 'Solicitud de pedido' },
                      { step: 2, tcode: 'ME21N', label: 'Pedido de compra' },
                      { step: 3, tcode: 'MIGO', label: 'Entrada de mercancia' },
                      { step: 4, tcode: 'MIRO', label: 'Verificacion de factura' },
                      { step: 5, tcode: 'F-53', label: 'Pago a proveedor' },
                    ].map((item, index) => (
                      <div key={item.step} className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mb-2">
                            <span className="text-primary font-bold">{item.step}</span>
                          </div>
                          <div className="font-mono text-xs text-primary">{item.tcode}</div>
                          <div className="text-xs text-muted-foreground max-w-[100px]">{item.label}</div>
                        </div>
                        {index < 4 && (
                          <ArrowRight className="w-6 h-6 text-primary hidden md:block" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
