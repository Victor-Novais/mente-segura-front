'use client';

import React from 'react';

import StatusCard from '@/components/professional/StatusCard';
import NextSessionsList from '@/components/professional//nextSessionsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Activity, Star } from 'lucide-react';

const mockSessions = [
    { name: 'Maria Oliveira', datetime: 'Amanhã às 14:00' },
    { name: 'Pedro Santos', datetime: 'Quinta-feira às 10:00' },
    { name: 'Ana Silva', datetime: 'Sexta-feira às 09:30' },
];

export default function ProfessionalDashboardPage() {
    return (

        <div className="space-y-6 p-6">
            {/* Cabeçalho */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard do Profissional</h1>
                <p className="text-gray-600 mt-1">Acompanhe suas atividades e pacientes</p>
            </div>

            {/* Cards de Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatusCard
                    title="Total de Pacientes"
                    value={45}
                    legend="+5 novos pacientes este mês"
                    icon={Users}
                    iconBg="bg-blue-100"
                />
                <StatusCard
                    title="Avaliações Pendentes"
                    value={12}
                    legend="3 avaliações com prazo próximo"
                    icon={FileText}
                    iconBg="bg-yellow-100"
                />
                <StatusCard
                    title="Sessões Realizadas"
                    value={78}
                    legend="+15% em relação ao mês anterior"
                    icon={Activity}
                    iconBg="bg-green-100"
                />
                <StatusCard
                    title="Média de Satisfação"
                    value="4.9"
                    legend="+0.3 em relação ao mês anterior"
                    icon={Star}
                    iconBg="bg-purple-100"
                />
            </div>

            {/* Visão Geral e Próximas Sessões */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visão Geral */}
                <Card>
                    <CardHeader>
                        <CardTitle>Visão Geral</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">
                            Bem-vindo ao dashboard do profissional! Aqui você pode acompanhar suas atividades e pacientes.
                        </p>
                        <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                            <p className="text-sm text-purple-700">
                                <strong>Dica:</strong> Use o menu lateral para navegar entre as diferentes seções do portal.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Lista de Próximas Sessões */}
                <NextSessionsList sessions={mockSessions} />
            </div>
        </div>

    );
}
