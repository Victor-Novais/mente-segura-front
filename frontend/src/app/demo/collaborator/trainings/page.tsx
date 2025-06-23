// File: src/app/demo/collaborator/well-being/trainings/page.tsx
'use client';

import React, { useState } from 'react';

import { Users, Clock, Calendar, BookOpen, Play } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const mockTrainings = [
    {
        id: 1,
        title: 'Workshop de Mindfulness',
        description: 'Aprenda técnicas de mindfulness para reduzir o estresse e aumentar o foco no trabalho',
        instructor: 'Dra. Maria Silva',
        duration: '2 horas',
        date: '18/12/2024',
        time: '14:00',
        participants: 23,
        maxParticipants: 30,
        category: 'Bem-estar',
        type: 'Presencial',
        enrolled: false,
    },
    {
        id: 2,
        title: 'Webinar: Resiliência Emocional',
        description: 'Desenvolva habilidades para lidar com pressão e adversidades no ambiente profissional',
        instructor: 'Prof. João Santos',
        duration: '1.5 horas',
        date: '20/12/2024',
        time: '16:00',
        participants: 45,
        maxParticipants: 50,
        category: 'Desenvolvimento',
        type: 'Online',
        enrolled: true,
    },
    {
        id: 3,
        title: 'Comunicação Não-Violenta',
        description: 'Melhore suas habilidades de comunicação e resolução de conflitos interpessoais',
        instructor: 'Dra. Ana Costa',
        duration: '3 horas',
        date: '22/12/2024',
        time: '09:00',
        participants: 12,
        maxParticipants: 25,
        category: 'Comunicação',
        type: 'Presencial',
        enrolled: false,
    },
    {
        id: 4,
        title: 'Gestão do Tempo e Produtividade',
        description: 'Técnicas para organizar melhor seu tempo e aumentar a produtividade sem comprometer o bem-estar',
        instructor: 'Carlos Oliveira',
        duration: '2.5 horas',
        date: '28/12/2024',
        time: '10:00',
        participants: 8,
        maxParticipants: 20,
        category: 'Produtividade',
        type: 'Híbrido',
        enrolled: false,
    },
];

const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        'Bem-estar': 'bg-green-100 text-green-800',
        'Desenvolvimento': 'bg-blue-100 text-blue-800',
        'Comunicação': 'bg-purple-100 text-purple-800',
        'Produtividade': 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
};

const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
        'Online': 'bg-blue-100 text-blue-800',
        'Presencial': 'bg-green-100 text-green-800',
        'Híbrido': 'bg-purple-100 text-purple-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
};

export default function DemoTrainingsPage() {
    const [showModal, setShowModal] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState<any>(null);

    const handleEnroll = (training: any) => {
        setSelectedTraining(training);
        setShowModal(true);
    };

    return (

        <div className="max-w-6xl mx-auto py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-mental-purple mb-2">Treinamentos e Campanhas</h1>
                <p className="text-mental-gray">
                    Participe de nossos treinamentos e workshops para desenvolver habilidades de bem-estar, comunicação e produtividade. Invista no seu crescimento pessoal e profissional.
                </p>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-purple-50 border-purple-200">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <BookOpen className="h-8 w-8 text-purple-600" />
                            <div>
                                <p className="text-2xl font-bold text-purple-800">{mockTrainings.length}</p>
                                <p className="text-sm text-purple-600">Disponíveis</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <Calendar className="h-8 w-8 text-blue-600" />
                            <div>
                                <p className="text-2xl font-bold text-blue-800">{mockTrainings.filter(t => t.enrolled).length}</p>
                                <p className="text-sm text-blue-600">Inscrições</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <Users className="h-8 w-8 text-green-600" />
                            <div>
                                <p className="text-2xl font-bold text-green-800">{mockTrainings.reduce((acc, t) => acc + t.participants, 0)}</p>
                                <p className="text-sm text-green-600">Participantes</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                            <Clock className="h-8 w-8 text-yellow-600" />
                            <div>
                                <p className="text-2xl font-bold text-yellow-800">{mockTrainings.reduce((acc, t) => acc + parseFloat(t.duration), 0).toFixed(1)}h</p>
                                <p className="text-sm text-yellow-600">Total Horas</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Training Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTrainings.map(training => (
                    <Card key={training.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="space-y-2">
                            <div className="flex space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(training.category)}`}>{training.category}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(training.type)}`}>{training.type}</span>
                            </div>
                            <CardTitle className="text-lg text-mental-gray-dark">{training.title}</CardTitle>
                            <CardDescription className="text-mental-gray-dark">{training.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 mb-4">
                                <div className="flex items-center space-x-2 text-sm text-mental-gray">
                                    <Users className="h-4 w-4" />
                                    <span>Instrutor: {training.instructor}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-mental-gray">
                                    <Clock className="h-4 w-4" />
                                    <span>Duração: {training.duration}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-mental-gray">
                                    <Calendar className="h-4 w-4" />
                                    <span>{training.date} às {training.time}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm text-mental-gray">
                                    <span>Vagas:</span>
                                    <span>{training.participants}/{training.maxParticipants}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <div className="bg-mental-purple h-2 rounded-full" style={{ width: `${(training.participants / training.maxParticipants) * 100}%` }} />
                                </div>
                            </div>
                            <Button
                                className={`w-full ${training.enrolled ? 'bg-green-600 hover:bg-green-700' : 'bg-mental-purple text-white hover:bg-mental-purple-dark'}`}
                                onClick={() => handleEnroll(training)}
                            >
                                <Play className="h-4 w-4 mr-2" />
                                {training.enrolled ? 'Ver Detalhes' : 'Inscrever-se'}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Modal de Inscrição */}
            {showModal && selectedTraining && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">
                            {selectedTraining.enrolled ? 'Detalhes do Treinamento' : 'Confirmar Inscrição'}
                        </h3>
                        <div className="mb-4 space-y-2 text-sm text-mental-gray">
                            <p><strong>Título:</strong> {selectedTraining.title}</p>
                            <p><strong>Instrutor:</strong> {selectedTraining.instructor}</p>
                            <p><strong>Data:</strong> {selectedTraining.date} às {selectedTraining.time}</p>
                            <p><strong>Duração:</strong> {selectedTraining.duration}</p>
                            <p><strong>Modalidade:</strong> {selectedTraining.type}</p>
                        </div>
                        <div className="flex space-x-3">
                            <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Fechar</Button>
                            <Button className="flex-1 bg-mental-purple text-white hover:bg-mental-purple-dark" onClick={() => setShowModal(false)}>
                                {selectedTraining.enrolled ? 'Acessar Treinamento' : 'Confirmar Inscrição'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}
