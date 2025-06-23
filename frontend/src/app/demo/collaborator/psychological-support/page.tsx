// File: src/app/demo/collaborator/well-being/psychological-support/page.tsx
'use client';

import React, { useState } from 'react';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info, Calendar, Users, Phone } from 'lucide-react';

const mockServices = [
    {
        id: 1,
        title: 'Consulta Online Individual',
        description: 'Sessões particulares com psicólogos especializados em saúde mental corporativa',
        icon: Phone,
        available: true,
    },
    {
        id: 2,
        title: 'Grupo de Apoio',
        description: 'Encontros semanais em grupo para discussão e apoio mútuo',
        icon: Users,
        available: true,
    },
    {
        id: 3,
        title: 'Atendimento de Urgência',
        description: 'Suporte imediato para situações de crise emocional',
        icon: Calendar,
        available: true,
    },
    {
        id: 4,
        title: 'Workshop de Mindfulness',
        description: 'Técnicas para redução do estresse',
        icon: Info,
        available: false,
    },
];

export default function DemoPsychologicalSupportPage() {
    const [showModal, setShowModal] = useState(false);
    const [serviceName, setServiceName] = useState('');

    const handleSchedule = (name: string) => {
        setServiceName(name);
        setShowModal(true);
    };

    return (

        <div className="max-w-4xl mx-auto py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-mental-purple mb-2">Apoio Psicológico</h1>
                <p className="text-mental-gray">
                    Acesse nossos serviços de saúde mental com total confidencialidade e profissionalismo.
                    Nossos psicólogos estão prontos para te ajudar a qualquer momento.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockServices.map(service => {
                    const Icon = service.icon;
                    return (
                        <Card key={service.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-mental-purple-light rounded-lg">
                                        <Icon className="h-6 w-6 text-mental-purple" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg text-mental-gray-dark">
                                            {service.title}
                                        </CardTitle>
                                        <div className="mt-1">
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full ${service.available
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                {service.available ? 'Disponível' : 'Em breve'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="mb-4 text-mental-gray">
                                    {service.description}
                                </CardDescription>
                                <Button
                                    className="w-full bg-mental-purple text-white hover:bg-mental-purple-dark"
                                    disabled={!service.available}
                                    onClick={() => handleSchedule(service.title)}
                                >
                                    {service.available ? 'Agendar Sessão' : 'Em breve'}
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <Card className="bg-mental-purple-light border-mental-purple-light">
                <CardHeader>
                    <CardTitle className="text-mental-purple">Informações Importantes</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-mental-purple-dark">
                        <li>• Todos os atendimentos são confidenciais</li>
                        <li>• Não há custos para o colaborador</li>
                        <li>• Disponível 24/7 para emergências</li>
                        <li>• Psicólogos especializados em saúde corporativa</li>
                    </ul>
                </CardContent>
            </Card>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Agendamento Realizado</h3>
                        <p className="text-mental-gray mb-4">
                            Sua solicitação para <strong>{serviceName}</strong> foi enviada! Em breve você receberá
                            um e-mail com as instruções para o agendamento da sessão.
                        </p>
                        <Button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-mental-purple text-white hover:bg-mental-purple-dark"
                        >
                            Fechar
                        </Button>
                    </div>
                </div>
            )}
        </div>

    );
}
