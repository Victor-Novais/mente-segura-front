'use client';

import React from 'react';
import DemoProfessionalLayout from '@/app/demo/professional/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const mockAvaliacoes = [
    {
        id: 1,
        paciente: "Maria Oliveira",
        tipo: "Bem-estar Mensal",
        status: "Pendente",
        prazo: "15/01/2024",
        prioridade: "Alta",
    },
    {
        id: 2,
        paciente: "Pedro Santos",
        tipo: "Avaliação de Estresse",
        status: "Em Andamento",
        prazo: "18/01/2024",
        prioridade: "Média",
    },
    {
        id: 3,
        paciente: "Ana Silva",
        tipo: "Check-up Psicológico",
        status: "Concluída",
        prazo: "10/01/2024",
        prioridade: "Baixa",
    },
    {
        id: 4,
        paciente: "Carlos Pereira",
        tipo: "Avaliação de Risco",
        status: "Atrasada",
        prazo: "12/01/2024",
        prioridade: "Alta",
    },
];

export default function DemoAssessmentsPage() {
    return (

        <div className="space-y-6 p-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Avaliações</h1>
                <p className="text-gray-600 mt-1">Gerencie as avaliações dos seus pacientes</p>
            </div>

            {/* Lista de cards */}
            <div className="grid gap-4">
                {mockAvaliacoes.map((a) => (
                    <Card key={a.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{a.tipo}</CardTitle>
                                        <p className="text-gray-600">{a.paciente}</p>
                                    </div>
                                </div>
                                <Badge
                                    variant={
                                        a.status === 'Concluída'
                                            ? 'default'
                                            : a.status === 'Atrasada'
                                                ? 'destructive'
                                                : a.status === 'Em Andamento'
                                                    ? 'secondary'
                                                    : 'outline'
                                    }
                                >
                                    {a.status === 'Concluída' && <CheckCircle className="h-3 w-3 mr-1" />}
                                    {a.status === 'Atrasada' && <AlertCircle className="h-3 w-3 mr-1" />}
                                    {a.status === 'Em Andamento' && <Clock className="h-3 w-3 mr-1" />}
                                    {a.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        <span>Prazo: {a.prazo}</span>
                                    </div>
                                    <Badge
                                        variant={
                                            a.prioridade === 'Alta'
                                                ? 'destructive'
                                                : a.prioridade === 'Média'
                                                    ? 'secondary'
                                                    : 'outline'
                                        }
                                        size="sm"
                                    >
                                        {a.prioridade}
                                    </Badge>
                                </div>
                                <Button variant="outline" size="sm">
                                    {a.status === 'Concluída' ? 'Ver Resultado' : 'Abrir'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    );
}
