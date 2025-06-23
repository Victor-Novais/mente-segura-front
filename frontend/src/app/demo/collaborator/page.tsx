'use client';

import React from 'react';
import DemoCollaboratorLayout from './layout';
import StatusCards from '@/components/patient-portal/StatusCards';
import RecursosDisponiveis from '@/components/patient-portal/RecursosDisponiveis';
import ProximaAvaliacao from '@/components/patient-portal/NextEvaluation';

// Mock de “paciente” para demo
const mockPaciente = {
    nome: 'Demo Colaborador',
    nivelBemEstar: { texto: 'Bom', percent: 75, legenda: 'Melhor que 75% da média' },
    proximaAvaliacao: { dias: 3, data: '15/05/2025' },
    nivelEstresse: { texto: 'Moderado', legenda: 'Redução de 10% no mês' },
    comunicacoes: { novas: 2, legenda: 'Atualizado hoje' },
    recursos: [
        { titulo: 'Programa de Apoio Psicológico', descricao: 'Acesso a psicólogos e consultas online ou presenciais.', icone: <></>, iconColor: 'bg-blue-100' },
        { titulo: 'Canal de Diálogo e Denúncia', descricao: 'Relate situações de forma anônima e confidencial.', icone: <></>, iconColor: 'bg-purple-100' },
        { titulo: 'Pesquisas de Clima', descricao: 'Questionários para monitorar o bem-estar na empresa.', icone: <></>, iconColor: 'bg-green-100' },
        { titulo: 'Treinamentos e Campanhas', descricao: 'Workshops e palestras sobre saúde mental.', icone: <></>, iconColor: 'bg-orange-100' },
    ],
    proximaAvaliacaoDetalhe: {
        dataCompleta: '15 de maio de 2025',
        titulo: 'Avaliação de Riscos Psicossociais',
        descricao: 'Esta avaliação ajuda a identificar fatores que podem estar afetando seu bem-estar mental no ambiente de trabalho.',
        duracao: '15 minutos',
    },
};

export default function DemoColaboradorPage() {
    return (

        <div className="flex-1 flex flex-col">
            {/* Header personalizado */}
            <HeaderBemVindoOverride nome={mockPaciente.nome} />

            {/* Conteúdo principal */}
            <main className="p-6 space-y-8 overflow-y-auto">
                <StatusCards
                    nivelBemEstar={mockPaciente.nivelBemEstar}
                    proximaAvaliacao={mockPaciente.proximaAvaliacao}
                    nivelEstresse={mockPaciente.nivelEstresse}
                    comunicacoes={mockPaciente.comunicacoes}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <RecursosDisponiveis recursos={mockPaciente.recursos} />
                    </div>
                    <div className="lg:col-span-1">
                        <ProximaAvaliacao detalhes={mockPaciente.proximaAvaliacaoDetalhe} />
                    </div>
                </div>
            </main>
        </div>

    );
}

/** Override do header */
function HeaderBemVindoOverride({ nome }: { nome: string }) {
    return (
        <div className="bg-white border-b border-gray-200 px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-800">Olá, {nome}</h1>
            <p className="mt-1 text-base text-gray-600">Bem-vindo(a) ao seu portal de bem-estar</p>
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                <div className="bg-blue-100 p-1 rounded-full">
                    {/* ícone Info */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 1020 0 10 10 0 10-20 0z" />
                    </svg>
                </div>
                <div>
                    <p className="text-blue-800 font-semibold text-sm">Bem-vindo ao seu portal de saúde mental</p>
                    <p className="text-blue-700 text-sm mt-1">
                        Aqui você encontra recursos para apoiar seu bem-estar e acompanhar sua jornada de saúde mental.
                    </p>
                </div>
            </div>
        </div>
    );
}
