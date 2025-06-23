'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Briefcase, Link2, UserCircle, BookOpen } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function OnboardingProfessionalPage() {
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
                            Seu cadastro como profissional foi concluído com sucesso.
                            Agora, siga os próximos passos para ativar seu perfil.
                        </p>
                    </div>


                    <div className="space-y-4">

                        <Button
                            className="w-full bg-mental-purple hover:bg-mental-purple-dark"
                            onClick={() => router.push('/professional')}
                        >
                            <UserCircle className="h-4 w-4 mr-2" />
                            Concluir Perfil Profissional
                        </Button>


                        <Button
                            variant="outline"
                            className="w-full border-mental-purple text-mental-purple hover:bg-mental-purple/10"
                            onClick={() => router.push('/professional/dashboard')}
                        >
                            <Briefcase className="h-4 w-4 mr-2" />
                            Cadastrar Organização Cliente
                        </Button>


                        <Button
                            variant="ghost"
                            className="w-full text-mental-purple hover:bg-mental-purple/10"
                            onClick={() => router.push('/professional/dashboard')}
                        >
                            <Link2 className="h-4 w-4 mr-2" />
                            Vincular-se a uma Empresa com Código
                        </Button>





                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
