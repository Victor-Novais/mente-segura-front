'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, BookOpen, PhoneCall } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OnboardingCollaboratorPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mental-purple/10 to-mental-purple/5">
            <Card className="max-w-xl w-full bg-white p-8 shadow-2xl rounded-3xl">
                <CardContent className="space-y-6">
                    {/* Cabeçalho */}
                    <div className="text-center space-y-3">
                        <CheckCircle className="mx-auto h-10 w-10 text-mental-purple" />
                        <h2 className="text-3xl font-bold text-mental-purple">
                            Bem-vindo ao MenteSegura!
                        </h2>
                        <p className="text-mental-gray text-base">
                            Seu cadastro como colaborador foi concluído com sucesso.
                            Acesse o seu painel para começar a usar a plataforma.
                        </p>
                    </div>

                    {/* Botões de ação */}
                    <div className="space-y-4">
                        {/* 1) Acessar Dashboard */}
                        <Button
                            className="w-full bg-mental-purple hover:bg-mental-purple-dark"
                            onClick={() => router.push('/colaborador/dashboard')}
                        >
                            Entrar no Painel
                        </Button>

                        {/* 2) Guia do Colaborador */}
                        <Button
                            asChild
                            variant="outline"
                            className="w-full border-mental-purple text-mental-purple hover:bg-mental-purple/10"
                        >
                            <a
                                href="/assets/guia-colaborador.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <BookOpen className="h-4 w-4 mr-2" />
                                Baixar Guia do Colaborador
                            </a>
                        </Button>

                        {/* 3) Contato por WhatsApp */}
                        <Button
                            asChild
                            variant="outline"
                            className="w-full border-mental-purple text-mental-purple hover:bg-mental-purple/10"
                        >
                            <a
                                href="https://api.whatsapp.com/send?phone=5548996839045&text=Ol%C3%A1!%20Preciso%20de%20ajuda%20como%20colaborador%20no%20MenteSegura."
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <PhoneCall className="h-4 w-4 mr-2" />
                                Suporte pelo WhatsApp
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
