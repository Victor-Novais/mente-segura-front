'use client';

import React from 'react';

import HeaderBemVindo from './HeaderBemVindo';
import StatusCards from './StatusCards';
import FormulariosCard from './FormulariosCard';
import ProximaAvaliacao from './NextEvaluation';

export default function PacientePortalPage() {
    // Dados mock para demonstração
    const paciente = {
        nome: 'Carlos',
        nivelBemEstar: {
            texto: 'Bom',
            percent: 75,
            legenda: 'Melhor que 75% da média',
        },
        proximaAvaliacao: {
            dias: 3,
            data: '15/05/2025',
        },
        nivelEstresse: {
            texto: 'Moderado',
            legenda: 'Redução de 10% no mês',
        },
        comunicacoes: {
            novas: 2,
            legenda: 'Atualizado hoje',
        },
        proximaAvaliacaoDetalhe: {
            dataCompleta: '15 de maio de 2025',
            titulo: 'Avaliação de Riscos Psicossociais',
            descricao:
                'Esta avaliação ajuda a identificar fatores que podem estar afetando seu bem-estar mental no ambiente de trabalho.',
            duracao: '15 minutos',
        },
    };

    return (
        <div className="flex min-h-screen bg-gray-50">


            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col">
                {/* Header de boas-vindas */}
                <HeaderBemVindo />

                {/* Área de conteúdo rolável */}
                <main className="p-6 space-y-8 overflow-y-auto">
                    {/* Cards de status */}
                    <StatusCards
                        nivelBemEstar={paciente.nivelBemEstar}
                        proximaAvaliacao={paciente.proximaAvaliacao}
                        nivelEstresse={paciente.nivelEstresse}
                        comunicacoes={paciente.comunicacoes}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cards de formulários mockados (colspan 2 em desktop) */}
                        <div className="lg:col-span-2">
                            <FormulariosCard />
                        </div>

                        {/* Próxima Avaliação (colspan 1 em desktop) */}
                        <div className="lg:col-span-1">
                            <ProximaAvaliacao detalhes={paciente.proximaAvaliacaoDetalhe} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
