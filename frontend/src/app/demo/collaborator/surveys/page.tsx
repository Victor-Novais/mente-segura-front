// File: src/app/demo/collaborator/well-being/surveys/page.tsx
'use client';

import React, { useState } from 'react';

import { BarChart2, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockSurveys = [
    {
        id: 1,
        title: 'Pesquisa de Clima Organizacional 2024',
        description: 'Avalie o ambiente de trabalho e contribua para melhorias',
        progress: 75,
        status: 'Em andamento',
        deadline: '15/12/2024',
        completed: false,
    },
    {
        id: 2,
        title: 'Avaliação de Liderança',
        description: 'Compartilhe sua opinião sobre a gestão e liderança',
        progress: 100,
        status: 'Concluída',
        deadline: '30/11/2024',
        completed: true,
    },
    {
        id: 3,
        title: 'Pesquisa de Bem-Estar Mental',
        description: 'Ajude-nos a entender melhor as necessidades de saúde mental',
        progress: 0,
        status: 'Nova',
        deadline: '20/12/2024',
        completed: false,
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Nova': return 'bg-blue-100 text-blue-800';
        case 'Em andamento': return 'bg-yellow-100 text-yellow-800';
        case 'Concluída': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export default function DemoSurveysPage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState<string>('');

    const handleRespond = (title: string) => {
        setSelectedSurvey(title);
        setShowModal(true);
    };

    return (

        <div className="max-w-4xl mx-auto py-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-mental-purple mb-2">Pesquisas de Clima</h1>
                <p className="text-mental-gray">
                    Suas opiniões são fundamentais para melhorar nosso ambiente de trabalho. Participe das pesquisas e contribua para um workplace mais saudável.
                </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <BarChart2 className="h-8 w-8 text-purple-600" />
                            <div>
                                <p className="text-2xl font-bold text-purple-800">{mockSurveys.length}</p>
                                <p className="text-sm text-purple-600">Total</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <Clock className="h-8 w-8 text-blue-600" />
                            <div>
                                <p className="text-2xl font-bold text-blue-800">{mockSurveys.filter(s => !s.completed).length}</p>
                                <p className="text-sm text-blue-600">Pendentes</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                            <div>
                                <p className="text-2xl font-bold text-green-800">{mockSurveys.filter(s => s.completed).length}</p>
                                <p className="text-sm text-green-600">Concluídas</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <ArrowRight className="h-8 w-8 text-yellow-600" />
                            <div>
                                <p className="text-2xl font-bold text-yellow-800">{Math.round(mockSurveys.reduce((acc, s) => acc + s.progress, 0) / mockSurveys.length)}%</p>
                                <p className="text-sm text-yellow-600">Progresso Médio</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Survey List or Empty */}
            {mockSurveys.length ? (
                <div className="space-y-4">
                    {mockSurveys.map(survey => (
                        <Card key={survey.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg mb-2 text-mental-gray-dark">{survey.title}</CardTitle>
                                        <CardDescription className="mb-3 text-mental-gray">{survey.description}</CardDescription>
                                        <div className="flex items-center space-x-4 text-sm text-mental-gray">
                                            <span>Prazo: {survey.deadline}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(survey.status)}`}>{survey.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-sm text-mental-gray mb-2"><span>Progresso</span><span>{survey.progress}%</span></div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"><div className="bg-mental-purple h-2 rounded-full" style={{ width: `${survey.progress}%` }} /></div>
                                </div>
                                <Button
                                    className={`w-full ${survey.completed ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-mental-purple text-white hover:bg-mental-purple-dark'}`}
                                    disabled={survey.completed}
                                    onClick={() => handleRespond(survey.title)}
                                >
                                    {survey.completed ? 'Concluída' : 'Responder Pesquisa'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="text-center py-12">
                    <CardContent>
                        <BarChart2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <CardTitle className="text-lg font-medium text-mental-gray mb-2">Nenhuma pesquisa disponível no momento</CardTitle>
                        <CardDescription className="text-mental-gray-dark">Novas pesquisas aparecerão aqui quando estiverem disponíveis.</CardDescription>
                    </CardContent>
                </Card>
            )}

            {/* Modal de Resposta */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Iniciar Pesquisa</h3>
                        <p className="text-mental-gray mb-4">Você será redirecionado para responder: "{selectedSurvey}"</p>
                        <div className="flex space-x-3">
                            <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancelar</Button>
                            <Button className="flex-1 bg-mental-purple text-white hover:bg-mental-purple-dark" onClick={() => setShowModal(false)}>Iniciar</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}
