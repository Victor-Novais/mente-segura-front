'use client';

import React from 'react';
import { Info, MessageCircle, FileText, Users } from 'lucide-react';

interface Recurso {
    titulo: string;
    descricao: string;
    icone: React.ReactNode;
    iconColor: string;
}

interface RecursosDisponiveisProps {
    recursos: Recurso[];
}

export default function RecursosDisponiveis({ recursos }: RecursosDisponiveisProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">Recursos Disponíveis</h2>
            <p className="text-sm text-gray-600 mb-6">
                Programas e ferramentas para apoiar seu bem-estar
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recursos.map((rec) => (
                    <div
                        key={rec.titulo}
                        className="flex items-start border border-gray-100 rounded-lg p-4 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer"
                    >
                        <div className={`${rec.iconColor} mr-4 p-2 rounded-full`}>
                            {rec.icone}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 text-sm mb-1">{rec.titulo}</h3>
                            <p className="text-xs text-gray-600 leading-relaxed">{rec.descricao}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
