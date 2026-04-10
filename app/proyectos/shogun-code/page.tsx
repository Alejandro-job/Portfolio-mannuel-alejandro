"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  ArrowLeft, TrendingUp, TrendingDown, Search, Plus, Bell, 
  DollarSign, PieChart, BarChart3, Wallet, RefreshCw, Zap
} from 'lucide-react'

// Datos simulados de acciones
const stocksData = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.32, change: 12.45, changePercent: 1.44, sector: 'Tecnología' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 178.72, change: -2.15, changePercent: -1.19, sector: 'Tecnología' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 415.50, change: 5.23, changePercent: 1.27, sector: 'Tecnología' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.80, change: 8.90, changePercent: 3.76, sector: 'Automotriz' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25, change: 3.12, changePercent: 1.78, sector: 'E-commerce' },
  { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', price: 485.60, change: 2.45, changePercent: 0.51, sector: 'ETF' },
  { symbol: 'BTC-USD', name: 'Bitcoin USD', price: 67250.00, change: 1520.00, changePercent: 2.31, sector: 'Crypto' },
]

const currencies = [
  { pair: 'USD/MXN', buy: 17.25, sell: 17.45, change: 0.15 },
  { pair: 'EUR/MXN', buy: 18.72, sell: 18.95, change: -0.08 },
  { pair: 'GBP/MXN', buy: 21.85, sell: 22.10, change: 0.22 },
  { pair: 'JPY/MXN', buy: 0.115, sell: 0.118, change: 0.002 },
  { pair: 'CAD/MXN', buy: 12.65, sell: 12.82, change: -0.05 },
]

// Generar datos de velas simulados
function generateCandlestickData(basePrice: number, days: number = 30) {
  const data = []
  let currentPrice = basePrice
  
  for (let i = days; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    
    const volatility = currentPrice * 0.03
    const open = currentPrice
    const close = open + (Math.random() - 0.5) * volatility * 2
    const high = Math.max(open, close) + Math.random() * volatility
    const low = Math.min(open, close) - Math.random() * volatility
    
    data.push({
      date: date.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    })
    
    currentPrice = close
  }
  
  return data
}

// Componente de gráfico de velas simplificado
function CandlestickChart({ data, width = 600, height = 300 }: { data: any[], width?: number, height?: number }) {
  const padding = 40
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2
  
  const prices = data.flatMap(d => [d.high, d.low])
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceRange = maxPrice - minPrice
  
  const candleWidth = chartWidth / data.length * 0.7
  const gap = chartWidth / data.length * 0.3
  
  const scaleY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * chartHeight + padding
  }
  
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
        <g key={i}>
          <line
            x1={padding}
            y1={padding + chartHeight * ratio}
            x2={width - padding}
            y2={padding + chartHeight * ratio}
            stroke="currentColor"
            strokeOpacity={0.1}
          />
          <text
            x={padding - 5}
            y={padding + chartHeight * ratio + 4}
            textAnchor="end"
            className="text-[10px] fill-muted-foreground"
          >
            ${(maxPrice - priceRange * ratio).toFixed(2)}
          </text>
        </g>
      ))}
      
      {/* Candles */}
      {data.map((candle, i) => {
        const x = padding + i * (candleWidth + gap) + gap / 2
        const isGreen = candle.close >= candle.open
        const color = isGreen ? '#22c55e' : '#ef4444'
        
        const bodyTop = scaleY(Math.max(candle.open, candle.close))
        const bodyBottom = scaleY(Math.min(candle.open, candle.close))
        const bodyHeight = Math.max(bodyBottom - bodyTop, 1)
        
        return (
          <g key={i}>
            {/* Wick */}
            <line
              x1={x + candleWidth / 2}
              y1={scaleY(candle.high)}
              x2={x + candleWidth / 2}
              y2={scaleY(candle.low)}
              stroke={color}
              strokeWidth={1}
            />
            {/* Body */}
            <rect
              x={x}
              y={bodyTop}
              width={candleWidth}
              height={bodyHeight}
              fill={isGreen ? color : color}
              stroke={color}
              rx={1}
            />
          </g>
        )
      })}
      
      {/* X-axis labels */}
      {data.filter((_, i) => i % 5 === 0).map((candle, i) => (
        <text
          key={i}
          x={padding + (i * 5) * (candleWidth + gap) + candleWidth / 2}
          y={height - 10}
          textAnchor="middle"
          className="text-[9px] fill-muted-foreground"
        >
          {candle.date}
        </text>
      ))}
    </svg>
  )
}

export default function ShogunCodePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStock, setSelectedStock] = useState(stocksData[0])
  const [candleData, setCandleData] = useState<any[]>([])
  const [portfolio, setPortfolio] = useState([
    { symbol: 'NVDA', shares: 2.5, avgPrice: 750.00 },
    { symbol: 'VOO', shares: 5, avgPrice: 450.00 },
    { symbol: 'AAPL', shares: 10, avgPrice: 165.00 },
  ])
  const [isLive, setIsLive] = useState(true)
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'buy', symbol: 'TSLA', message: 'RSI bajo (28) - Posible sobreventa', time: 'Hace 5 min' },
    { id: 2, type: 'sell', symbol: 'NVDA', message: 'RSI alto (72) + Ganancia 16.7%', time: 'Hace 12 min' },
  ])
  
  useEffect(() => {
    setCandleData(generateCandlestickData(selectedStock.price))
  }, [selectedStock])
  
  // Simular actualización en tiempo real
  useEffect(() => {
    if (!isLive) return
    
    const interval = setInterval(() => {
      setCandleData(prev => {
        if (prev.length === 0) return prev
        const lastCandle = { ...prev[prev.length - 1] }
        const change = (Math.random() - 0.5) * selectedStock.price * 0.005
        lastCandle.close = +(lastCandle.close + change).toFixed(2)
        lastCandle.high = Math.max(lastCandle.high, lastCandle.close)
        lastCandle.low = Math.min(lastCandle.low, lastCandle.close)
        return [...prev.slice(0, -1), lastCandle]
      })
    }, 2000)
    
    return () => clearInterval(interval)
  }, [isLive, selectedStock])
  
  const filteredStocks = stocksData.filter(s => 
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  
  const totalPortfolioValue = portfolio.reduce((sum, item) => {
    const stock = stocksData.find(s => s.symbol === item.symbol)
    return sum + (stock ? stock.price * item.shares : 0)
  }, 0)
  
  const totalInvested = portfolio.reduce((sum, item) => sum + item.avgPrice * item.shares, 0)
  const totalGain = totalPortfolioValue - totalInvested
  const totalGainPercent = (totalGain / totalInvested) * 100
  
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-orange-500/10 to-background py-8 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/proyectos" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver a Proyectos
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-orange-500/20">
                  <Zap className="w-8 h-8 text-orange-500" />
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">ShogunCode</h1>
                {isLive && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-medium animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    EN VIVO
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">Sistema de Monitoreo de Inversiones en Tiempo Real</p>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsLive(!isLive)}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLive ? 'animate-spin' : ''}`} />
                {isLive ? 'Pausar' : 'Reanudar'}
              </Button>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Inversión
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Wallet className="w-4 h-4" />
                <span className="text-sm">Valor Total</span>
              </div>
              <p className="text-2xl font-bold text-foreground">${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Invertido</span>
              </div>
              <p className="text-2xl font-bold text-foreground">${totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                {totalGain >= 0 ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
                <span className="text-sm">Ganancia/Pérdida</span>
              </div>
              <p className={`text-2xl font-bold ${totalGain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {totalGain >= 0 ? '+' : ''}{totalGainPercent.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <PieChart className="w-4 h-4" />
                <span className="text-sm">Posiciones</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{portfolio.length}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Buscar acciones (NVDA, AAPL, TSLA, VOO...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border"
              />
              
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-10 max-h-64 overflow-auto">
                  {filteredStocks.map(stock => (
                    <button
                      key={stock.symbol}
                      onClick={() => {
                        setSelectedStock(stock)
                        setSearchQuery('')
                      }}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary transition-colors"
                    >
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{stock.symbol}</p>
                        <p className="text-sm text-muted-foreground">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">${stock.price.toFixed(2)}</p>
                        <p className={`text-sm ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Chart Card */}
            <Card className="bg-card border-border overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {selectedStock.symbol}
                      <span className="text-sm font-normal text-muted-foreground">
                        {selectedStock.name}
                      </span>
                    </CardTitle>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-3xl font-bold">${selectedStock.price.toFixed(2)}</span>
                      <span className={`flex items-center gap-1 text-lg ${selectedStock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {selectedStock.change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                        {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {['1D', '1S', '1M', '3M', '1A'].map(period => (
                      <Button key={period} variant="ghost" size="sm" className="text-xs">
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[350px] p-4">
                  {candleData.length > 0 && (
                    <CandlestickChart data={candleData} width={700} height={320} />
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Portfolio Holdings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-orange-500" />
                  Mi Portafolio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {portfolio.map(item => {
                    const stock = stocksData.find(s => s.symbol === item.symbol)
                    if (!stock) return null
                    
                    const currentValue = stock.price * item.shares
                    const invested = item.avgPrice * item.shares
                    const gain = currentValue - invested
                    const gainPercent = (gain / invested) * 100
                    
                    return (
                      <div key={item.symbol} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
                            {item.symbol.slice(0, 2)}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{item.symbol}</p>
                            <p className="text-sm text-muted-foreground">{item.shares} acciones @ ${item.avgPrice.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">${currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                          <p className={`text-sm ${gain >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {gain >= 0 ? '+' : ''}${gain.toFixed(2)} ({gainPercent.toFixed(2)}%)
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-500" />
                  Alertas Inteligentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map(alert => (
                  <div 
                    key={alert.id}
                    className={`p-3 rounded-lg border ${
                      alert.type === 'buy' 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : 'bg-red-500/10 border-red-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        alert.type === 'buy' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {alert.type === 'buy' ? 'COMPRA' : 'VENTA'}
                      </span>
                      <span className="font-semibold text-foreground">{alert.symbol}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Currency Exchange */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-orange-500" />
                  Tipo de Cambio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {currencies.map(currency => (
                    <div key={currency.pair} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <span className="font-medium text-foreground">{currency.pair}</span>
                      <div className="text-right">
                        <p className="text-sm">
                          <span className="text-green-500">{currency.buy.toFixed(3)}</span>
                          {' / '}
                          <span className="text-red-500">{currency.sell.toFixed(3)}</span>
                        </p>
                        <p className={`text-xs ${currency.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {currency.change >= 0 ? '+' : ''}{currency.change.toFixed(3)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Categories */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Categorías</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {['Acciones', 'ETFs', 'Bonos', 'CETES', 'Divisas'].map(cat => (
                    <Button key={cat} variant="outline" size="sm" className="justify-start">
                      {cat}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Tech Stack */}
        <Card className="mt-8 bg-gradient-to-r from-orange-500/10 to-cyan-500/10 border-orange-500/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Stack Tecnológico</h3>
            <div className="flex flex-wrap gap-2">
              {['Next.js 16', 'React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Yahoo Finance API', 'SWR', 'shadcn/ui'].map(tech => (
                <span key={tech} className="px-3 py-1 rounded-full bg-background/50 text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
