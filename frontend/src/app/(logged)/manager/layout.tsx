'use client'

import { AppSidebar } from '@/components/layout/sidebar'
import { OnboardingProvider } from './onboarding/OnboardingProvider'
import { StartTourButton } from '@/components/StartTourButton'
import { useRouter } from 'next/navigation'
import {
  BarChart3,
  Building,
  Users,
  FileText,
  PieChart,
  Settings,
} from 'lucide-react'

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const groups = [
    {
      label: 'Principal',
      items: [
        {
          label: 'Dashboard',
          href: '/manager/dashboard',
          icon: BarChart3,
          className: 'menu-dashboard sidebar', // Dashboard + Sidebar geral para o tour
        },
        {
          label: 'Organizações',
          href: '/manager/organizations',
          icon: Building,
          className: 'menu-organizations', // Adiciona para o tour
        }, {
          label: 'Departamentos',
          href: '/manager/departments',
          icon: Building,
          className: 'menu-departments',
        },
        {
          label: 'Colaboradores',
          href: '/manager/employees',
          icon: Users,
          className: 'menu-employees', // Adiciona para o tour
        },
      ],
    },
    {
      label: 'Ferramentas',
      items: [
        {
          label: 'Avaliações',
          href: '/manager/assessments',
          icon: FileText,
          className: 'menu-assessments', // Adiciona para o tour
        },
        {
          label: 'Relatórios',
          href: '/manager/analytics',
          icon: PieChart,
          className: 'menu-analytics', // Já estava correto
        },
      ],
    },
  ]

  const footerItems = [
    {
      label: 'Configurações',
      href: '/manager/settings',
      icon: Settings,
      className: 'menu-settings', // Para o tour
    },
  ]

  return (
    <OnboardingProvider>
      <AppSidebar
        groups={groups}
        footerItems={footerItems}
        onLogout={() => router.push('/')}
      >
        {/* Header com botão de iniciar tour */}
        <div className="flex items-center justify-between border-b p-4 dashboard-header">
          <div />
          {/* <StartTourButton /> */}
        </div>

        {/* Conteúdo da página */}
        {children}
      </AppSidebar>
    </OnboardingProvider>
  )
}
