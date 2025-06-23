// src/app/onboarding/page.tsx
'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Info, Building } from 'lucide-react'

export default function OnboardingPage() {
    const router = useRouter()

    const options = [
        {
            title: 'Agendar Apresentação',
            description: 'Marque uma apresentação inicial do sistema para sua equipe.',
            icon: <Calendar className="h-6 w-6 text-mental-purple" />,
            path: '/manager/onboarding/schedule',
        },
        {
            title: 'Saiba Mais',
            description: 'Descubra todos os recursos e benefícios do MenteSegura.',
            icon: <Info className="h-6 w-6 text-mental-purple" />,
            path: '/manager/onboarding/info',
        },
        {
            title: 'Cadastrar Organização',
            description: 'Finalize o cadastro inicial da sua organização.',
            icon: <Building className="h-6 w-6 text-mental-purple" />,
            path: '/manager/organization/create_wizard',
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-mental-purple/10 to-mental-purple/5 p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Bem-vindo ao Onboarding</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {options.map(opt => (
                    <Card key={opt.title} className="cursor-pointer hover:shadow-lg transition" onClick={() => router.push(opt.path)}>
                        <CardContent className="flex items-start space-x-4 p-6">
                            {opt.icon}
                            <div>
                                <h2 className="text-xl font-semibold mb-1">{opt.title}</h2>
                                <p className="text-gray-600 mb-3">{opt.description}</p>
                                <Button variant="outline" size="sm" onClick={() => router.push(opt.path)}>
                                    Ir
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
