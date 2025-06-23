import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, Users, Calendar, Star } from 'lucide-react';

interface ProfessionalProfileProps {
    name: string;
    role: string;
    company: string;
    email: string;
    phone: string;
    activePatients: number;
    weekSessions: number;
    averageRating: number;
}

export default function ProfessionalProfile({
    name,
    role,
    company,
    email,
    phone,
    activePatients,
    weekSessions,
    averageRating
}: ProfessionalProfileProps) {
    const initials = name.split(' ').map(n => n[0]).join('');

    return (
        <div className="space-y-6">
            {/* Header do Perfil */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        <Avatar className="h-20 w-20">
                            <AvatarFallback className="text-lg font-semibold bg-purple-100 text-purple-700">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
                            <p className="text-lg text-gray-600">{role}</p>
                            <p className="text-sm text-gray-500">{company}</p>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline">Editar Perfil</Button>
                            <Button variant="outline">Alterar Senha</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dados de Contato */}
                <Card>
                    <CardHeader>
                        <CardTitle>Dados de Contato</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">E-mail</p>
                                <p className="font-medium">{email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Telefone</p>
                                <p className="font-medium">{phone}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Estatísticas Pessoais */}
                <Card>
                    <CardHeader>
                        <CardTitle>Estatísticas Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-purple-500" />
                                <span className="text-sm text-gray-600">Pacientes Ativos</span>
                            </div>
                            <span className="font-semibold">{activePatients}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5 text-purple-500" />
                                <span className="text-sm text-gray-600">Sessões esta semana</span>
                            </div>
                            <span className="font-semibold">{weekSessions}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Star className="h-5 w-5 text-purple-500" />
                                <span className="text-sm text-gray-600">Avaliação média</span>
                            </div>
                            <span className="font-semibold">{averageRating}/5.0</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
