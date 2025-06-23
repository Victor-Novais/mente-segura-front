'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface ProximaAvaliacaoProps {
    detalhes: {
        dataCompleta: string;
        titulo: string;
        descricao: string;
        duracao: string;
    };
}

export default function ProximaAvaliacao({ detalhes }: ProximaAvaliacaoProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Sua Próxima Avaliação</h2>
            <p className="text-sm text-gray-600 mb-1">{detalhes.dataCompleta}</p>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{detalhes.titulo}</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">{detalhes.descricao}</p>

            <div className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Iniciar Agora
                </Button>
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                    Reagendar
                </Button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">
                    Duração aproximada: {detalhes.duracao}
                </p>
                <p className="text-xs text-gray-500">Suas respostas são confidenciais</p>
            </div>
        </div>
    );
}
