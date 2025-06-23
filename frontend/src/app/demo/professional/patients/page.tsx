import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Calendar, Clock, TrendingUp } from 'lucide-react';

const mockPacientes = [
    {
        id: 1,
        nome: "Maria Oliveira",
        iniciais: "MO",
        empresa: "Empresa XYZ",
        proximaSessao: "Amanhã às 14:00",
        status: "Ativo",
        risco: "Baixo",
        ultimaAvaliacao: 8.5
    },
    {
        id: 2,
        nome: "Pedro Santos",
        iniciais: "PS",
        empresa: "TechCorp",
        proximaSessao: "Quinta-feira às 10:00",
        status: "Ativo",
        risco: "Médio",
        ultimaAvaliacao: 6.2
    },
    {
        id: 3,
        nome: "Ana Silva",
        iniciais: "AS",
        empresa: "StartupABC",
        proximaSessao: "Sexta-feira às 09:30",
        status: "Pendente",
        risco: "Alto",
        ultimaAvaliacao: 4.1
    }
];

export default function PacientesPage() {
    return (

        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
                <p className="text-gray-600 mt-1">Acompanhe seus pacientes e sessões</p>
            </div>

            <div className="grid gap-6">
                {mockPacientes.map((paciente) => (
                    <Card key={paciente.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarFallback className="bg-blue-100 text-blue-600">
                                            {paciente.iniciais}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-xl">{paciente.nome}</CardTitle>
                                        <p className="text-gray-600">{paciente.empresa}</p>
                                    </div>
                                </div>
                                <Badge variant={paciente.status === "Ativo" ? "default" : "secondary"}>
                                    {paciente.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-5 w-5 text-purple-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Próxima Sessão</p>
                                        <p className="font-semibold">{paciente.proximaSessao}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <TrendingUp className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Última Avaliação</p>
                                        <p className="font-semibold">{paciente.ultimaAvaliacao}/10</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-5 w-5 text-orange-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Nível de Risco</p>
                                        <Badge variant={
                                            paciente.risco === "Baixo" ? "outline" :
                                                paciente.risco === "Médio" ? "secondary" : "destructive"
                                        }>
                                            {paciente.risco}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    );
}
