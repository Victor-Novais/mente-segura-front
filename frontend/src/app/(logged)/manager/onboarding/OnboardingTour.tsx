'use client';

import { TourProvider, useTour } from '@reactour/tour';
import { PropsWithChildren, useEffect } from 'react';

export function OnboardingProvider({ children }: PropsWithChildren) {
    const steps = [
        {
            selector: '.sidebar',
            content: 'Aqui você navega pelos módulos da plataforma.',
        },
        {
            selector: '.dashboard-overview',
            content: 'Aqui você vê o resumo da saúde mental da sua empresa.',
        },
        {
            selector: '.risk-chart',
            content: 'Fatores de risco psicossociais aparecem aqui.',
        },
        {
            selector: '.productivity-chart',
            content: 'Veja como está a produtividade dos departamentos.',
        },
        {
            selector: '.plans-section',
            content: 'Gerencie os planos de ação, preventivos e contingenciais.',
        },
        {
            selector: '.menu-analytics',
            content: 'Acesse os relatórios e análises detalhadas.',
        },
        {
            selector: '.menu-settings',
            content: 'Configure a sua organização, usuários e notificações.',
        },
        {
            selector: '.dashboard-header',
            content: 'Tudo certo! Agora você conhece sua plataforma. 🚀',
        },
    ];

    return (
        <TourProvider
            steps={steps}
            showBadge
            showCloseButton
            showDots
            styles={{
                popover: (base) => ({
                    ...base,
                    borderRadius: 12,
                    padding: 16,
                    backgroundColor: '#fff',
                    color: '#1E1E1E',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }),
                maskArea: (base) => ({ ...base, rx: 8 }),
            }}
        >
            {children}
        </TourProvider>
    );
}
