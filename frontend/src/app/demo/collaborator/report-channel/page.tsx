// File: src/app/demo/collaborator/well-being/report-channel/page.tsx
'use client';

import React, { useState } from 'react';

import { Shield, AlertTriangle, Send as SendIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const categories = [
    'Assédio moral',
    'Assédio sexual',
    'Discriminação',
    'Abuso de poder',
    'Conflito interpessoal',
    'Questões de segurança',
    'Outros',
];

export default function DemoReportChannelPage() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [description, setDescription] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuccess(true);
        setDescription('');
        setSelectedCategory('');
    };

    return (

        <div className="max-w-3xl mx-auto py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-mental-purple mb-2">Canal de Denúncias</h1>
                <p className="text-mental-gray">
                    Este é um canal seguro e confidencial para relatar situações inadequadas no ambiente de trabalho.
                    Sua identidade será protegida e todas as denúncias serão tratadas com seriedade.
                </p>
            </div>

            {/* Cards informativos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                        <Shield className="h-8 w-8 text-blue-600 mb-2" />
                        <CardTitle className="text-blue-800">Confidencial</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-blue-700 text-sm">Sua identidade será mantida em sigilo absoluto.</p>
                    </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                    <CardHeader>
                        <AlertTriangle className="h-8 w-8 text-green-600 mb-2" />
                        <CardTitle className="text-green-800">Imparcial</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-green-700 text-sm">Investigação séria e imparcial de todos os casos.</p>
                    </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                    <CardHeader>
                        <SendIcon className="h-8 w-8 text-purple-600 mb-2" />
                        <CardTitle className="text-purple-800">Rápido</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-purple-700 text-sm">Resposta em até 48 horas úteis.</p>
                    </CardContent>
                </Card>
            </div>

            {/* Formulário de denúncia */}
            <Card>
                <CardHeader>
                    <CardTitle>Fazer uma Denúncia</CardTitle>
                    <CardDescription>
                        Descreva a situação com o máximo de detalhes possível. Todos os campos são opcionais,
                        mas mais informações ajudam na investigação.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Categoria */}
                        <div>
                            <label className="block text-sm font-medium text-mental-gray mb-2">
                                Categoria da Denúncia
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                                className="w-full p-3 bg-white text-mental-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-mental-purple focus:border-transparent"
                            >
                                <option value="">Selecione uma categoria</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* Descrição */}
                        <div>
                            <label className="block text-sm font-medium text-mental-gray mb-2">
                                Descrição do Caso
                            </label>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Descreva a situação com detalhes: o que aconteceu, quando, onde, quem esteve envolvido..."
                                rows={6}
                                className="w-full p-3 bg-white text-mental-gray border border-gray-300 rounded-lg focus:ring-2 focus:ring-mental-purple focus:border-transparent"
                            />
                        </div>

                        {/* Anonimato */}
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="anonymous"
                                checked={isAnonymous}
                                onChange={e => setIsAnonymous(e.target.checked)}
                                className="rounded border-gray-300 text-mental-purple focus:ring-mental-purple"
                            />
                            <label htmlFor="anonymous" className="text-sm text-mental-gray">
                                Enviar denúncia de forma anônima
                            </label>
                        </div>

                        {/* Botão */}
                        <Button
                            type="submit"
                            className="w-full bg-mental-purple text-white hover:bg-mental-purple-dark py-3"
                        >
                            <SendIcon className="h-4 w-4 mr-2" />
                            Enviar Denúncia
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Modal de Sucesso */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <SendIcon className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Denúncia Enviada</h3>
                            <p className="text-mental-gray mb-4">
                                Sua denúncia foi recebida com protocolo <strong>#DEN-2024-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</strong>. Você receberá atualizações por e-mail.
                            </p>
                            <Button
                                onClick={() => setShowSuccess(false)}
                                className="w-full bg-mental-purple text-white hover:bg-mental-purple-dark"
                            >
                                Fechar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}
