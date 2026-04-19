import { Metadata } from 'next'
import { PharmaHero } from '@/components/pharma/pharma-hero'
import { PharmaOverview } from '@/components/pharma/pharma-overview'
import { PharmaFeatures } from '@/components/pharma/pharma-features'
import { PharmaTechStack } from '@/components/pharma/pharma-tech-stack'
import { PharmaCode } from '@/components/pharma/pharma-code'
import { PharmaMetrics } from '@/components/pharma/pharma-metrics'
import { PharmaArchitecture } from '@/components/pharma/pharma-architecture'

export const metadata: Metadata = {
  title: 'Sistema de Monitoreo Farmacéutico | Mannuel Alejandro',
  description: 'Sistema completo de monitoreo industrial con ML para detección de anomalías en producción farmacéutica.',
}

export default function PharmaSystemPage() {
  return (
    <div className="pt-16 lg:pt-20">
      <PharmaHero />
      <PharmaOverview />
      <PharmaFeatures />
      <PharmaTechStack />
      <PharmaCode />
      <PharmaMetrics />
      <PharmaArchitecture />
    </div>
  )
}
