'use client';

import { TourProvider, useTour } from '@reactour/tour';
import { PropsWithChildren, useEffect } from 'react';

export function OnboardingProvider({ children }: PropsWithChildren) {
    const steps = [
        {
            selector: '.sidebar',
            content: '🗺️ Este é o menu principal da plataforma. Aqui você acessa todos os módulos do MenteSegura.',
        },
        {
            selector: '.menu-dashboard',
            content: '📊 Dashboard: Veja um resumo completo da saúde mental da sua empresa.',
        },
        {
            selector: '.menu-organizations',
            content: '🏢 Organizações: Gerencie dados das suas organizações e suas unidades.',
        },
        {
            selector: '.menu-employees',
            content: '👥 Colaboradores: Gerencie os colaboradores cadastrados na sua empresa.',
        },
        {
            selector: '.menu-assessments',
            content: '📝 Avaliações: Crie e acompanhe avaliações de riscos psicossociais.',
        },
        {
            selector: '.menu-analytics',
            content: '📑 Relatórios: Consulte análises detalhadas e dados da sua empresa.',
        },
        {
            selector: '.menu-settings',
            content: '⚙️ Configurações: Defina preferências, usuários, empresas e notificações.',
        },
        {
            selector: '.dashboard-overview',
            content: '📊 Aqui você vê o resumo geral da saúde mental da sua empresa.',
        },
        {
            selector: '.risk-chart',
            content: '🚩 Acompanhe os principais fatores de risco psicossociais identificados.',
        },
        {
            selector: '.productivity-chart',
            content: '📈 Veja como está a produtividade de cada departamento.',
        },
        {
            selector: '.plans-section',
            content: '📝 Gerencie os Planos de Ação, Preventivos e Contingenciais para mitigar os riscos.',
        },
        {
            selector: '.dashboard-overview',
            content: '🎉 Perfeito! Agora você conhece sua plataforma MenteSegura. 🚀',
        },
    ];

    const { setIsOpen } = useTour();

    useEffect(() => {
        const hasCompleted = localStorage.getItem('hasCompletedTour');
        if (!hasCompleted) {
            setIsOpen(true);
            localStorage.setItem('hasCompletedTour', 'true');
        }
    }, [setIsOpen]);

    return (
        <TourProvider
            steps={steps}
            showBadge
            showDots
            showCloseButton
            styles={{
                popover: (base, { current }) => {
                    const step = steps[current] || {};
                    const selector = step.selector || '';

                    const sidebarSelectors = [
                        '.sidebar',
                        '.menu-dashboard',
                        '.menu-organizations',
                        '.menu-employees',
                        '.menu-assessments',
                        '.menu-analytics',
                        '.menu-settings',
                    ];

                    const isSidebarStep = sidebarSelectors.includes(selector);

                    return {
                        ...base,
                        borderRadius: 16,
                        padding: 20,
                        backgroundColor: '#F8F4FF',
                        color: '#1E1E1E',
                        border: '2px solid #8B5CF6',
                        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                        maxWidth: 420,
                        fontFamily: 'inherit',
                        marginLeft: 24,
                    };
                },
                maskArea: (base) => ({
                    ...base,
                    rx: 8,
                }),
                badge: (base) => ({
                    ...base,
                    backgroundColor: '#8B5CF6',
                    color: '#fff',
                    fontWeight: 'bold',
                }),
                dot: (base, { status }) => ({
                    ...base,
                    backgroundColor: status === 'current' ? '#8B5CF6' : '#E5E7EB',
                }),
                close: (base) => ({
                    ...base,
                    color: '#8B5CF6',
                    top: 8,
                    right: 8,
                }),
                controls: (base) => ({
                    ...base,
                    marginTop: 12,
                }),
            }}
        >
            {children}
        </TourProvider>
    );
}
