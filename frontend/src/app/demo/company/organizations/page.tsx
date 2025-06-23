// File: src/app/demo/company/organizations/page.tsx
'use client';

import React, { useState } from 'react';
import DemoLayout from '../layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Plus, Search, Building, Users, Activity } from 'lucide-react';

const mockOrganizations = [
    { id: 1, name: 'Empresa ABC Ltda.', employees: 150, riskLevel: 'Médio', lastAssessment: '15/03/2025', status: 'Ativo' },
    { id: 2, name: 'Tech Solutions', employees: 89, riskLevel: 'Baixo', lastAssessment: '10/04/2025', status: 'Ativo' },
    { id: 3, name: 'Inovação Digital', employees: 234, riskLevel: 'Alto', lastAssessment: '05/02/2025', status: 'Ativo' },
    { id: 4, name: 'Global Corp', employees: 512, riskLevel: 'Médio', lastAssessment: '20/05/2025', status: 'Ativo' },
    { id: 5, name: 'Nexus Comércio', employees: 47, riskLevel: 'Baixo', lastAssessment: '01/06/2025', status: 'Ativo' },
];

export default function DemoOrganizationsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = mockOrganizations.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-mental-purple">Organizações</h2>
                <Button className="bg-mental-purple text-white hover:bg-mental-purple-dark">
                    <Plus className="h-4 w-4 mr-2" />Nova Organização
                </Button>
            </div>

            {/* Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex justify-between items-center pb-2">
                        <CardTitle className="text-sm font-medium">Total de Organizações</CardTitle>
                        <Building className="h-4 w-4 text-mental-purple" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-mental-gray">{mockOrganizations.length}</div>
                        <p className="text-xs text-mental-gray-dark">Organizações ativas</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center pb-2">
                        <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
                        <Users className="h-4 w-4 text-mental-purple" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-mental-gray">
                            {mockOrganizations.reduce((acc, org) => acc + org.employees, 0)}
                        </div>
                        <p className="text-xs text-mental-gray-dark">Colaboradores ativos</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center pb-2">
                        <CardTitle className="text-sm font-medium">Nível de Risco Médio</CardTitle>
                        <Activity className="h-4 w-4 text-mental-purple" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-mental-gray">Médio</div>
                        <p className="text-xs text-mental-gray-dark">Baseado nas avaliações recentes</p>
                    </CardContent>
                </Card>
            </div>

            {/* Busca e filtro */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-mental-gray" />
                    <Input
                        placeholder="Buscar organizações..."
                        className="pl-10 bg-white text-mental-gray"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button variant="outline">Filtrar</Button>
            </div>

            {/* Tabela */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Organizações</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nome</TableHead>
                                <TableHead>Colaboradores</TableHead>
                                <TableHead>Nível de Risco</TableHead>
                                <TableHead>Última Avaliação</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map(org => (
                                <TableRow key={org.id}>
                                    <TableCell>{org.name}</TableCell>
                                    <TableCell>{org.employees}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${org.riskLevel === 'Baixo' ? 'bg-green-100 text-green-800' :
                                            org.riskLevel === 'Médio' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {org.riskLevel}
                                        </span>
                                    </TableCell>
                                    <TableCell>{org.lastAssessment}</TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {org.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Editar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>

    );
}
