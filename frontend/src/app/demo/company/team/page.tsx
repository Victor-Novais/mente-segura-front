// File: src/app/demo/company/team/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import DemoLayout from '../layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Users, Loader2 } from 'lucide-react';
import { InviteCollaboratorModal } from '@/components/modals/InviteCollaboratorModal';

interface Employee {
    id: string;
    name: string;
    role: string;
    departments: string[];
    isActive: boolean;
}

export default function DemoTeamManagementPage() {
    // Mock fake data
    const mockEmployees: Employee[] = [
        { id: '1', name: 'Ana Paula', role: 'Analista de Risco', departments: ['Recursos Humanos', 'TI'], isActive: true },
        { id: '2', name: 'Bruno Santos', role: 'Coordenador de Segurança', departments: ['Segurança'], isActive: true },
        { id: '3', name: 'Carla Souza', role: 'Psicóloga Corporativa', departments: ['Bem-estar'], isActive: false },
        { id: '4', name: 'Daniel Oliveira', role: 'Desenvolvedor', departments: ['TI'], isActive: true },
    ];

    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Simula fetch de dados
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setEmployees(mockEmployees);
            setLoading(false);
        }, 500);
    }, []);

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (

        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-mental-purple">Gerenciamento de Colaboradores</h2>
                <Button
                    className="bg-mental-purple text-white hover:bg-mental-purple-dark"
                    onClick={() => setOpenModal(true)}
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Colaborador
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Colaboradores</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-mental-gray" />
                            <Input
                                placeholder="Buscar colaboradores..."
                                className="pl-8 bg-white text-mental-gray"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline">Filtrar</Button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-10">
                            <Loader2 className="h-6 w-6 animate-spin text-mental-purple" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Departamento</TableHead>
                                    <TableHead>Cargo</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEmployees.map(employee => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.name}</TableCell>
                                        <TableCell>{employee.departments.join(', ') || <em>Sem departamento</em>}</TableCell>
                                        <TableCell>{employee.role}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {employee.isActive ? 'Ativo' : 'Inativo'}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Editar</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {filteredEmployees.length === 0 && !loading && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-mental-gray">
                                            Nenhum colaborador encontrado.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Footer Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex justify-between items-center pb-2">
                        <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
                        <Users className="h-4 w-4 text-mental-purple" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-mental-gray">{employees.length}</div>
                        <p className="text-xs text-mental-gray-dark">Colaboradores ativos</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center pb-2">
                        <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
                        <Users className="h-4 w-4 text-mental-purple" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-mental-gray">
                            {Array.from(new Set(employees.flatMap(e => e.departments))).length}
                        </div>
                        <p className="text-xs text-mental-gray-dark">Departamentos ativos</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex justify-between items-center pb-2">
                        <CardTitle className="text-sm font-medium">Avaliações Pendentes</CardTitle>
                        <Users className="h-4 w-4 text-mental-purple" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-mental-gray">12</div>
                        <p className="text-xs text-mental-gray-dark">Avaliações para realizar</p>
                    </CardContent>
                </Card>
            </div>

            {/* Modal de Convite */}
            <InviteCollaboratorModal open={openModal} onClose={() => setOpenModal(false)} />
        </div>

    );
}
