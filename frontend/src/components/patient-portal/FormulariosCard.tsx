'use client';

import React from 'react';
import { FileText, Info, Users, MessageCircle } from 'lucide-react';

type StatusForm = 'iniciar' | 'em andamento' | 'concluido' | 'indisponivel';

interface Formulario {
    nome: string;
    status: StatusForm;
    progressoAtual: number;
    progressoTotal: number;
    icone: React.ReactNode;
}

export default function FormulariosCard() {
    // Dados mockados de formulários
    const formulariosMock: Formulario[] = [
        {
            nome: 'Formulário de Riscos',
            status: 'em andamento',
            progressoAtual: 3,
            progressoTotal: 20,
            icone: <Info size={20} />,
        },
        {
            nome: 'Formulário de Evolução',
            status: 'iniciar',
            progressoAtual: 0,
            progressoTotal: 15,
            icone: <Users size={20} />,
        },
        {
            nome: 'Formulário de Feedback',
            status: 'concluido',
            progressoAtual: 10,
            progressoTotal: 10,
            icone: <MessageCircle size={20} />,
        },
        {
            nome: 'Formulário Indisponível',
            status: 'indisponivel',
            progressoAtual: 0,
            progressoTotal: 5,
            icone: <FileText size={20} />,
        },
    ];

    // Mapeamento de classes Tailwind para cada status
    const statusClasses: Record<StatusForm, string> = {
        iniciar: 'bg-blue-100 text-blue-800',
        'em andamento': 'bg-yellow-100 text-yellow-800',
        concluido: 'bg-green-100 text-green-800',
        indisponivel: 'bg-gray-100 text-gray-500',
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Formulários Disponíveis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formulariosMock.map((form) => {
                    // Calcula a porcentagem de progresso (entre 0 e 100)
                    const porcentagem = Math.min(
                        100,
                        Math.max(0, (form.progressoAtual / form.progressoTotal) * 100)
                    );

                    return (
                        <div
                            key={form.nome}
                            className="bg-white border border-gray-100 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer flex flex-col"
                        >
                            {/* Ícone + Título */}
                            <div className="flex items-center mb-2">
                                <div className="mr-3 p-2 bg-indigo-50 rounded-full text-indigo-600">
                                    {form.icone}
                                </div>
                                <h3 className="font-semibold text-gray-800 text-sm">
                                    {form.nome}
                                </h3>
                            </div>

                            {/* Badge de Status + Texto de Progresso */}
                            <div className="flex justify-between items-center mb-2">
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded ${statusClasses[form.status]}`}
                                >
                                    {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                                </span>
                                <span className="text-xs text-gray-600">
                                    {form.progressoAtual}/{form.progressoTotal}
                                </span>
                            </div>

                            {/* Barra de Progresso */}
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-indigo-600 h-full"
                                    style={{ width: `${porcentagem}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
