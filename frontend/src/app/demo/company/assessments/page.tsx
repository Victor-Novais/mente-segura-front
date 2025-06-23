'use client';

import React from 'react';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export default function DemoRiskAssessmentPage() {
    // Dados fake para demo
    const stats = {
        high: { count: 23, change: '+12%', color: 'text-red-600', icon: <TrendingUp className="h-4 w-4" /> },
        medium: { count: 45, change: '+5%', color: 'text-yellow-600', icon: <TrendingUp className="h-4 w-4" /> },
        low: { count: 156, change: '-8%', color: 'text-green-600', icon: <TrendingDown className="h-4 w-4" /> },
    };

    const recent = [
        { name: 'Ana Costa', date: '20/03/2025', risk: 'Alto', status: 'Em Acompanhamento' },
        { name: 'Carlos Mendes', date: '19/03/2025', risk: 'Médio', status: 'Resolvido' },
        { name: 'Juliana Lima', date: '18/03/2025', risk: 'Baixo', status: 'Resolvido' },
    ];

    return (

        <div className="max-w-4xl mx-auto py-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-mental-purple">Avaliação de Riscos</h2>
                <Button className="bg-mental-purple text-white hover:bg-mental-purple-dark">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Nova Avaliação
                </Button>
            </div>

            {/* Estatísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Alto */}
                <Card>
                    <CardHeader>
                        <CardTitle>Riscos Altos</CardTitle>
                        <CardDescription>Total de colaboradores com riscos altos</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${stats.high.color}`}>{stats.high.count}</div>
                        <div className={`flex items-center text-sm ${stats.high.color}`}>{stats.high.icon}<span className="ml-1">{stats.high.change} em relação ao mês anterior</span></div>
                    </CardContent>
                </Card>

                {/* Médio */}
                <Card>
                    <CardHeader>
                        <CardTitle>Riscos Médios</CardTitle>
                        <CardDescription>Total de colaboradores com riscos médios</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${stats.medium.color}`}>{stats.medium.count}</div>
                        <div className={`flex items-center text-sm ${stats.medium.color}`}>{stats.medium.icon}<span className="ml-1">{stats.medium.change} em relação ao mês anterior</span></div>
                    </CardContent>
                </Card>

                {/* Baixo */}
                <Card>
                    <CardHeader>
                        <CardTitle>Riscos Baixos</CardTitle>
                        <CardDescription>Total de colaboradores com riscos baixos</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-2xl font-bold ${stats.low.color}`}>{stats.low.count}</div>
                        <div className={`flex items-center text-sm ${stats.low.color}`}>{stats.low.icon}<span className="ml-1">{stats.low.change} em relação ao mês anterior</span></div>
                    </CardContent>
                </Card>
            </div>

            {/* Últimas Avaliações */}
            <Card>
                <CardHeader>
                    <CardTitle>Últimas Avaliações</CardTitle>
                    <CardDescription>Acompanhe as últimas avaliações de risco realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead className="bg-muted/50">
                                <tr>
                                    <th className="h-12 px-4 text-left font-medium text-mental-gray">Colaborador</th>
                                    <th className="h-12 px-4 text-left font-medium text-mental-gray">Data</th>
                                    <th className="h-12 px-4 text-left font-medium text-mental-gray">Nível de Risco</th>
                                    <th className="h-12 px-4 text-left font-medium text-mental-gray">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent.map((row, i) => (
                                    <tr key={i} className="border-b">
                                        <td className="p-4 text-mental-gray">{row.name}</td>
                                        <td className="p-4 text-mental-gray">{row.date}</td>
                                        <td className="p-4"><span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.risk === 'Alto' ? 'bg-red-100 text-red-800' : row.risk === 'Médio' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{row.risk}</span></td>
                                        <td className="p-4"><span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.status === 'Em Acompanhamento' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{row.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>

    );
}
