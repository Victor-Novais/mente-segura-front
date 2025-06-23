import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Activity } from 'lucide-react';

const mockOrganizacoes = [
    {
        id: 1,
        nome: "Empresa XYZ",
        funcionarios: 250,
        status: "Ativo",
        pacientesAtivos: 45,
        ultimaAvaliacao: "2024-01-10"
    },
    {
        id: 2,
        nome: "TechCorp Ltda",
        funcionarios: 150,
        status: "Ativo",
        pacientesAtivos: 32,
        ultimaAvaliacao: "2024-01-08"
    },
    {
        id: 3,
        nome: "StartupABC",
        funcionarios: 50,
        status: "Pendente",
        pacientesAtivos: 8,
        ultimaAvaliacao: "2024-01-05"
    }
];

export default function OrganizacoesPage() {
    return (

        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Organizações</h1>
                <p className="text-gray-600 mt-1">Gerencie as empresas atendidas</p>
            </div>

            <div className="grid gap-6">
                {mockOrganizacoes.map((org) => (
                    <Card key={org.id}>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <Building2 className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl">{org.nome}</CardTitle>
                                        <p className="text-gray-600">Última avaliação: {org.ultimaAvaliacao}</p>
                                    </div>
                                </div>
                                <Badge variant={org.status === "Ativo" ? "default" : "secondary"}>
                                    {org.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-2">
                                    <Users className="h-5 w-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Funcionários</p>
                                        <p className="font-semibold">{org.funcionarios}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Activity className="h-5 w-5 text-green-600" />
                                    <div>
                                        <p className="text-sm text-gray-600">Pacientes Ativos</p>
                                        <p className="font-semibold">{org.pacientesAtivos}</p>
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
