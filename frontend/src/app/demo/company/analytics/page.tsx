// File: src/app/demo/collaborator/analytics/page.tsx
'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, BarChart3, Activity, Users, Download } from 'lucide-react';

export default function DemoAnalyticsPage() {
    // Mocked data for demo
    const totalAssessments = 156;
    const totalParticipants = 1234;
    const averageRiskLevel = 'Médio';
    const keyIndicators = [
        { label: 'Absenteísmo', percent: 15, text: '15% - Abaixo da média do setor' },
        { label: 'Presenteísmo', percent: 25, text: '25% - Necessita atenção' },
        { label: 'Turnover', percent: 12, text: '12% - Dentro do esperado' },
        { label: 'Satisfação', percent: 85, text: '85% - Acima da média' },
    ];

    return (

        <div className="max-w-6xl mx-auto py-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-mental-purple">Relatórios e Análises</h2>
                <Button className="bg-mental-purple text-white hover:bg-mental-purple-dark">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar Relatório
                </Button>
            </div>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex justify-between items-center pb-2">
                        <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
                        <PieChart className="h-4 w-4 text-mental-purple" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-mental-gray">{totalAssessments}</div>
                        <p className="text-xs text-mental-gray-dark">Avaliações realizadas</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center pb-2">
                        <CardTitle className="text-sm font-medium">Participantes</CardTitle>
                        <Users className="h-4 w-4 text-mental-purple" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-mental-gray">{totalParticipants}</div>
                        <p className="text-xs text-mental-gray-dark">Total de participantes</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center pb-2">
                        <CardTitle className="text-sm font-medium">Nível de Risco Médio</CardTitle>
                        <Activity className="h-4 w-4 text-mental-purple" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-mental-gray">{averageRiskLevel}</div>
                        <p className="text-xs text-mental-gray-dark">Baseado nas avaliações</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Distribuição de Níveis de Risco</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center text-mental-gray-dark">
                            Placeholder para gráfico de Distribuição de Riscos
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Evolução dos Riscos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center text-mental-gray-dark">
                            Placeholder para gráfico de Evolução dos Riscos
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* More Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Riscos por Departamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center text-mental-gray-dark">
                            Placeholder para gráfico de Riscos por Departamento
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Produtividade vs. Riscos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] flex items-center justify-center text-mental-gray-dark">
                            Placeholder para gráfico de Produtividade vs. Riscos
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Key Indicators */}
            <Card>
                <CardHeader>
                    <CardTitle>Principais Indicadores</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {keyIndicators.map(ind => (
                                <div key={ind.label} className="space-y-2">
                                    <h4 className="font-medium text-mental-gray">{ind.label}</h4>
                                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-2 bg-mental-purple rounded-full" style={{ width: `${ind.percent}%` }} />
                                    </div>
                                    <p className="text-sm text-mental-gray-dark">{ind.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    );
}
