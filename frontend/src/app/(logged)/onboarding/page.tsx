"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileText, PhoneCall, Building } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mental-purple/10 to-mental-purple/5">
            <Card className="max-w-xl w-full bg-white p-8 shadow-2xl rounded-3xl">
                <CardContent className="space-y-6">
                    <div className="text-center space-y-3">
                        <CheckCircle className="mx-auto h-10 w-10 text-mental-purple" />
                        <h2 className="text-3xl font-bold text-mental-purple">
                            Cadastro Realizado com Sucesso!
                        </h2>
                        <p className="text-mental-gray text-base">
                            Sua conta foi registrada e está em processo de análise e
                            validação pela nossa equipe.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Botão 1 - roxo sólido */}
                        <Button
                            className="w-full bg-mental-purple hover:bg-mental-purple-dark"
                            onClick={() => router.push("/onboarding/create-wizard")}
                        >
                            <Building className="h-4 w-4 mr-2" />
                            Iniciar Cadastro da Organização
                        </Button>

                        {/* Botão 2 - agora vazado com borda roxa */}
                        <Button
                            asChild
                            variant="outline"
                            className="w-full border-mental-purple text-mental-purple hover:bg-mental-purple/10"
                        >
                            <a
                                href="https://api.whatsapp.com/send?phone=5548996839045&text=Ol%C3%A1!%20Finalizei%20meu%20cadastro%20no%20MenteSegura%20e%20gostaria%20de%20saber%20se%20%C3%A9%20poss%C3%ADvel%20adiantar%20a%20an%C3%A1lise%20e%20valida%C3%A7%C3%A3o.%20Fico%20%C3%A0%20disposi%C3%A7%C3%A3o.%20Obrigado(a)!"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <PhoneCall className="h-4 w-4 mr-2" />
                                Falar no WhatsApp para Acelerar Análise
                            </a>
                        </Button>

                        {/* Botão 3 - NR-1, já estava com estilo correto */}
                        <Button asChild variant="outline" className="w-full">
                            <a
                                href="https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/inspecao/seguranca-e-saude-no-trabalho/legislacao/normas-regulamentadoras/nr-01-disposicoes-gerais"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                Saiba Mais Sobre a NR-1
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
