'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Briefcase, Users } from 'lucide-react';

export default function DemoPage() {
    const router = useRouter();
    const options = [
        {
            id: 'company',
            icon: <Building className="h-6 w-6 text-mental-purple" />,
            title: 'Demo Empresa',
            description: 'Visualize a experiência corporativa completa na plataforma.',
            href: '/demo/company',
        },
        {
            id: 'professional',
            icon: <Briefcase className="h-6 w-6 text-mental-purple" />,
            title: 'Demo Profissional',
            description: 'Explore o fluxo de trabalho de um profissional parceiro.',
            href: '/demo/professional',
        },
        {
            id: 'collaborator',
            icon: <Users className="h-6 w-6 text-mental-purple" />,
            title: 'Demo Colaborador',
            description: 'Confira a jornada de um colaborador na plataforma.',
            href: '/demo/collaborator',
        },
    ];

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mental-light to-white">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-8">
                {/* Introdução */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-5xl font-bold text-mental-purple">
                        Escolha seu tipo de demonstração
                    </h1>
                    <p className="mt-4 text-lg text-mental-gray">
                        Selecione a experiência que deseja visualizar e explore todas as funcionalidades.
                    </p>
                </div>

                {/* Opções */}
                <div className="md:w-1/2 mt-8 md:mt-0 grid grid-rows-3 gap-6 w-full max-w-md">
                    {options.map((opt) => (
                        <motion.div
                            key={opt.id}
                            onClick={() => router.push(opt.href)}
                            whileHover={{ translateY: -4 }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer"
                        >
                            <Card className="shadow-lg rounded-lg border border-transparent hover:border-mental-purple-light transition-colors">
                                <CardContent className="flex items-start space-x-4 p-6">
                                    <div className="bg-mental-purple-light p-3 rounded-full">
                                        {opt.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-mental-purple">
                                            {opt.title}
                                        </h2>
                                        <p className="mt-1 text-mental-gray">
                                            {opt.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
