// File: src/app/demo/company/departments/page.tsx
'use client';

import React, { useState } from 'react';
import DemoLayout from '../layout';
import {
    Plus,
    Edit,
    Trash2,
    Search,
    Calendar as CalendarIcon,
    AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

// Mock de dados de departamentos
const mockDepartments = [
    { id: '1', name: 'Recursos Humanos', createdAt: '10/01/2025' },
    { id: '2', name: 'Financeiro', createdAt: '22/02/2025' },
    { id: '3', name: 'TI e Suporte', createdAt: '05/03/2025' },
    { id: '4', name: 'Marketing', createdAt: '18/04/2025' },
];

export default function DemoDepartmentsPage() {
    const [departments, setDepartments] = useState(mockDepartments);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<{ id: string; name: string } | null>(null);
    const [nameInput, setNameInput] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [toDelete, setToDelete] = useState<{ id: string; name: string } | null>(null);

    const filtered = departments.filter(dep =>
        dep.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setEditing(null);
        setNameInput('');
        setIsModalOpen(true);
    };

    const handleEdit = (dep: { id: string; name: string }) => {
        setEditing(dep);
        setNameInput(dep.name);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (!nameInput.trim()) return;
        if (editing) {
            setDepartments(prev =>
                prev.map(d => d.id === editing.id ? { ...d, name: nameInput } : d)
            );
        } else {
            const newDep = {
                id: String(Date.now()),
                name: nameInput,
                createdAt: new Date().toLocaleDateString('pt-BR'),
            };
            setDepartments(prev => [...prev, newDep]);
        }
        setIsModalOpen(false);
    };

    const confirmDelete = (dep: { id: string; name: string }) => {
        setToDelete(dep);
        setShowAlert(true);
    };

    const handleDelete = () => {
        if (toDelete) {
            setDepartments(prev => prev.filter(d => d.id !== toDelete.id));
        }
        setShowAlert(false);
    };

    return (

        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-mental-purple">Departamentos</h1>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-mental-purple text-white hover:bg-mental-purple-dark">
                            <Plus className="h-4 w-4 mr-2" />
                            {editing ? 'Editar Departamento' : 'Novo Departamento'}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>
                                {editing ? 'Editar Departamento' : 'Adicionar Departamento'}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div>
                                <Label htmlFor="name">Nome do departamento</Label>
                                <Input
                                    id="name"
                                    value={nameInput}
                                    onChange={e => setNameInput(e.target.value)}
                                    placeholder="Digite o nome"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                                Cancelar
                            </Button>
                            <Button onClick={handleSave} className="bg-mental-purple text-white hover:bg-mental-purple-dark">
                                Salvar
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search */}
            <Card>
                <CardContent>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-mental-gray" />
                        <Input
                            placeholder="Buscar departamentos..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Lista de Departamentos ({filtered.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    {filtered.length === 0 ? (
                        <div className="text-center py-12 text-mental-gray">Nenhum departamento encontrado</div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        <div className="flex items-center">
                                            <CalendarIcon className="h-4 w-4 mr-1" />
                                            Criado em
                                        </div>
                                    </TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map(dep => (
                                    <TableRow key={dep.id}>
                                        <TableCell>{dep.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">{dep.createdAt}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end space-x-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleEdit(dep)}>
                                                    <Edit className="h-4 w-4 text-mental-purple" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="h-4 w-4 text-red-600" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle className="flex items-center">
                                                                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                                                                Confirmar exclusão
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Tem certeza que deseja excluir o departamento <strong>{dep.name}</strong>?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => confirmDelete(dep)} className="bg-red-600 hover:bg-red-700">
                                                                Remover
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation */}
            {showAlert && toDelete && (
                <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tem certeza que deseja excluir o departamento <strong>{toDelete.name}</strong>?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                                Remover
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>

    );
}
