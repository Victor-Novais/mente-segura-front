// File: src/app/demo/company/layout.tsx
'use client';

import React from 'react';
import { AppSidebar } from '@/components/layout/sidebar';
import { useRouter } from 'next/navigation';
import {
    BarChart3,
    Building,
    Users,
    FileText,
    PieChart,
    Settings,
} from 'lucide-react';

export default function DemoCompanyLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const groups = [
        {
            label: 'Principal',
            items: [
                { label: 'Dashboard', href: '/demo/company', icon: BarChart3 },
                { label: 'Organizações', href: '/demo/company/organizations', icon: Building },
                { label: 'Colaboradores', href: '/demo/company/team', icon: Users },
            ],
        },
        {
            label: 'Ferramentas',
            items: [
                { label: 'Avaliações', href: '/demo/company/assessments', icon: FileText },
                { label: 'Relatórios', href: '/demo/company/analytics', icon: PieChart },
            ],
        },
    ];

    const footerItems = [
        { label: 'Configurações', href: '/demo/company/settings', icon: Settings },
    ];

    const handleItemClick = (href: string) => {
        router.push(href);
    };

    return (<>
        <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white text-center py-2 text-sm font-medium">
            Modo Demo: dados e rotas são fictícios.
        </div>
        <AppSidebar
            groups={groups}
            footerItems={footerItems}
            onItemClick={handleItemClick}
            onLogout={() => router.push('/')}
        >
            {children}
        </AppSidebar></>
    );
}
