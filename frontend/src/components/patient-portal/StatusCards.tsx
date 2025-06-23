'use client';

import React from 'react';
import { Heart, Calendar, Bell, MessageCircle } from 'lucide-react';

interface CardInfo {
    label: string;
    value: string;
    percent: number;
    legend: string;
    icon: React.ReactNode;
    iconBg: string;
    barColor: string;
}

interface StatusCardsProps {
    nivelBemEstar: {
        texto: string;
        percent: number;
        legenda: string;
    };
    proximaAvaliacao: {
        dias: number;
        data: string;
    };
    nivelEstresse: {
        texto: string;
        legenda: string;
    };
    comunicacoes: {
        novas: number;
        legenda: string;
    };
}

export default function StatusCards({
    nivelBemEstar,
    proximaAvaliacao,
    nivelEstresse,
    comunicacoes,
}: StatusCardsProps) {
    const cards: CardInfo[] = [
        {
            label: 'Nível de Bem-Estar',
            value: nivelBemEstar.texto,
            percent: nivelBemEstar.percent,
            legend: nivelBemEstar.legenda,
            icon: <Heart className="h-5 w-5 text-emerald-600" />,
            iconBg: 'bg-emerald-100',
            barColor: 'bg-emerald-500',
        },
        {
            label: 'Próxima Avaliação',
            value: `${proximaAvaliacao.dias} dias`,
            percent: 60,
            legend: proximaAvaliacao.data,
            icon: <Calendar className="h-5 w-5 text-blue-600" />,
            iconBg: 'bg-blue-100',
            barColor: 'bg-blue-500',
        },
        {
            label: 'Nível de Estresse',
            value: nivelEstresse.texto,
            percent: 40,
            legend: nivelEstresse.legenda,
            icon: <Bell className="h-5 w-5 text-yellow-600" />,
            iconBg: 'bg-yellow-100',
            barColor: 'bg-yellow-500',
        },
        {
            label: 'Comunicações',
            value: `${comunicacoes.novas} novas`,
            percent: 90,
            legend: comunicacoes.legenda,
            icon: <MessageCircle className="h-5 w-5 text-purple-600" />,
            iconBg: 'bg-purple-100',
            barColor: 'bg-purple-500',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card) => (
                <div
                    key={card.label}
                    className="bg-white shadow-sm border border-gray-100 rounded-lg p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-600">{card.label}</p>
                            <h3 className="mt-2 text-2xl font-bold text-gray-800">{card.value}</h3>
                        </div>
                        <div className={`${card.iconBg} p-3 rounded-full`}>
                            {card.icon}
                        </div>
                    </div>

                    {/* Barra de progresso */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div
                            className={`${card.barColor} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${card.percent}%` }}
                        />
                    </div>

                    <p className="text-xs text-gray-500">{card.legend}</p>
                </div>
            ))}
        </div>
    );
}
