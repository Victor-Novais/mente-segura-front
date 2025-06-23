'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/layout/sidebar';
import {
    Heart,
    Clipboard,
    Info,
    MessageCircle,
    BarChart2,
    Users,
    FileText,
    Settings,
} from 'lucide-react';

export default function DemoCollaboratorLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const groups = [
        {
            label: 'Principal',
            items: [
                { label: 'Meu Bem-Estar', href: '/demo/collaborator', icon: Heart },
                { label: 'Minhas Avaliações', href: '/demo/collaborator/assessments', icon: Clipboard },
            ],
        },
        {
            label: 'Recursos',
            items: [
                { label: 'Apoio Psicológico', href: '/demo/collaborator/psychological-support', icon: Info },
                { label: 'Canal de Denúncias', href: '/demo/collaborator/report-channel', icon: MessageCircle },
                { label: 'Pesquisas', href: '/demo/collaborator/surveys', icon: BarChart2 },
                { label: 'Treinamentos', href: '/demo/collaborator/trainings', icon: Users },

                {
                    label: "Assistente Virtual",
                    href: "/demo/collaborator/assistant",
                    icon: MessageCircle,
                },
            ],
        },
    ];

    const footerItems = [
        { label: 'Configurações', href: '/demo/collaborator/settings', icon: Settings },
    ];

    return (
        <>

            <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white text-center py-2 text-sm font-medium">
                Modo Demo: dados e rotas são fictícios.
            </div>

            <AppSidebar
                groups={groups}
                footerItems={footerItems}
                onLogout={() => router.push('/demo')}
            >
                {children}
            </AppSidebar>
        </>
    );
}
