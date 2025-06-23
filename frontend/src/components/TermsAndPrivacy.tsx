'use client'

import React from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
    title: 'Termos de Uso e Política de Privacidade – MenteSegura',
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Navegação */}
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao início
                    </Link>
                </div>

                <Card className="shadow-lg rounded-2xl overflow-hidden">
                    <CardContent className="p-12 bg-white">
                        <div className="space-y-12 animate-fade-in-up">

                            {/* Header */}
                            <div className="text-center pb-8 border-b">
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    Termos de Uso e Política de Privacidade
                                </h1>
                                <p className="text-xl text-blue-600 font-semibold mb-2">MenteSegura</p>
                                <p className="text-gray-600">Gestão de Saúde Mental Empresarial</p>
                            </div>

                            {/* Seções */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Introdução</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Bem-vindo à MenteSegura, uma plataforma SaaS especializada em gestão de saúde mental empresarial.
                                    Operamos em conformidade com a Lei nº 14.831/2024, NR-1 e a Lei Geral de Proteção de Dados (LGPD).
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Este documento estabelece os termos e condições de uso de nossos serviços, bem como nossa política
                                    de privacidade. Ao acessar ou utilizar a MenteSegura, você concorda integralmente com estas disposições.
                                </p>
                            </section>

                            <Separator />

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Definições</h2>
                                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                                    {[
                                        ['Plataforma', 'Sistema MenteSegura, incluindo website, apps e APIs.'],
                                        ['Usuário', 'Qualquer pessoa que acessa ou utiliza a Plataforma.'],
                                        ['Dados Pessoais', 'Informações relacionadas a pessoa natural identificada ou identificável.'],
                                        ['Organização', 'Empresa ou entidade que contrata nossos serviços.'],
                                        ['Dados Sensíveis', 'Informações sobre saúde mental e bem-estar.'],
                                        ['Serviços', 'Todas as funcionalidades oferecidas pela MenteSegura.'],
                                    ].map(([term, desc]) => (
                                        <p key={term}>
                                            <strong className="text-gray-900">{term}:</strong> {desc}
                                        </p>
                                    ))}
                                </div>
                            </section>

                            <Separator />

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Aceitação dos Termos</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Ao criar uma conta, acessar ou utilizar nossos Serviços, você declara que:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                    <li>Leu, compreendeu e concorda com estes Termos</li>
                                    <li>Possui capacidade legal para celebrar este acordo</li>
                                    <li>Não está impedido de receber nossos Serviços sob leis aplicáveis</li>
                                    <li>Utilizará os Serviços em conformidade com todas as leis aplicáveis</li>
                                </ul>
                                <div className="bg-blue-50 p-4 rounded-lg mt-4">
                                    <p className="text-sm text-blue-800">
                                        <strong>Importante:</strong> Se você não concorda com qualquer parte destes Termos,
                                        não deve usar nossos Serviços.
                                    </p>
                                </div>
                            </section>

                            <Separator />

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Descrição dos Serviços</h2>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    A MenteSegura oferece uma plataforma tecnológica para gestão abrangente de saúde mental empresarial:
                                </p>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recursos Principais</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Avaliação de riscos psicossociais</li>
                                            <li>• Dashboards e relatórios analíticos</li>
                                            <li>• Módulos de educação e e-learning</li>
                                            <li>• Canal integrado de apoio psicológico</li>
                                            <li>• Conformidade com NR-1 e Lei 14.831/2024</li>
                                            <li>• Gestão de indicadores de bem-estar</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrações e APIs</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Integração com sistemas de RH</li>
                                            <li>• API para desenvolvimento personalizado</li>
                                            <li>• Comunicação via WhatsApp Business</li>
                                            <li>• Notificações e alertas automáticos</li>
                                            <li>• Sincronização com plataformas terceiras</li>
                                            <li>• Suporte técnico dedicado</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Obrigações do Usuário</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-lg font-semibold text-green-700 mb-4">Você deve:</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Fornecer informações precisas e atualizadas</li>
                                            <li>• Manter a confidencialidade de suas credenciais</li>
                                            <li>• Usar os Serviços apenas para fins legítimos</li>
                                            <li>• Respeitar os direitos de outros usuários</li>
                                            <li>• Cumprir todas as leis e regulamentos aplicáveis</li>
                                            <li>• Reportar problemas de segurança imediatamente</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-red-700 mb-4">Você não deve:</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li>• Violar sistemas de segurança ou privacidade</li>
                                            <li>• Transmitir conteúdo ilegal ou prejudicial</li>
                                            <li>• Interferir no funcionamento da Plataforma</li>
                                            <li>• Usar dados de terceiros sem autorização</li>
                                            <li>• Criar contas falsas ou enganosas</li>
                                            <li>• Realizar engenharia reversa do software</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <Separator />

                            {/* … repita o mesmo padrão para as seções 6 a 15 … */}

                            {/* Rodapé */}
                            <div className="border-t pt-8 text-center">
                                <p className="text-gray-600 font-medium">
                                    © 2025 MenteSegura – Todos os direitos reservados.
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Em conformidade com Lei nº 14.831/2024, NR-1 e LGPD.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
