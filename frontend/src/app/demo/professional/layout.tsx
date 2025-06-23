'use client'

import { AppSidebar } from '@/components/layout/sidebar'
import { useRouter } from 'next/navigation'
import {
    BarChart3, Brain, Settings, Building, Users,
    ClipboardCheck, PieChart
} from 'lucide-react'

export default function DemoProfessionalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    const groups = [
        {
            label: 'Principal',
            items: [
                { label: 'Dashboard', href: '/demo/professional', icon: BarChart3 },
                { label: 'Organizações', href: '/demo/professional/organizations', icon: Building },
                { label: 'Pacientes', href: '/demo/professional/patients', icon: Users },
            ],
        },
        {
            label: 'Ferramentas',
            items: [
                { label: 'Fatores de Risco', href: '/demo/professional/risk-factors', icon: Brain },
                { label: 'Avaliações', href: '/demo/professional/assessments', icon: ClipboardCheck },
                { label: 'Relatórios', href: '/demo/professional/analytics', icon: PieChart },
            ],
        },
    ]

    const footerItems = [
        { label: 'Configurações', href: '/demo/professional/settings', icon: Settings },
    ]

    return (
        <><div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white text-center py-2 text-sm font-medium">
            Modo Demo: dados e rotas são fictícios.
        </div>
            <AppSidebar
                groups={groups}
                footerItems={footerItems}
                onLogout={() => router.push('/')}
            >
                {children}
            </AppSidebar></>
    )
}
