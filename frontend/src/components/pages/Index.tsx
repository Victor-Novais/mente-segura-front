// src/app/page.tsx
'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { HeartPulse, MessageCircle, Bell, FileText, Calendar, Info } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#access_token=')) {
      // redireciona para o callback passando o hash
      router.replace(`/oauth/callback${hash}`)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-mental-purple mb-4">
            Mente<span className="text-mental-purple-dark">Segura</span>
          </h1>
          <p className="text-lg text-gray-600">
            Sua plataforma completa de saúde mental e bem-estar
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5 text-mental-purple" />
                Meu Bem-Estar
              </CardTitle>
              <CardDescription>
                Acompanhe sua saúde mental e bem-estar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/patient-dashboard">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-mental-purple" />
                Suporte Psicológico
              </CardTitle>
              <CardDescription>
                Acesse nossos serviços de suporte psicológico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/resources/support">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-mental-purple" />
                Canais de Denúncia
              </CardTitle>
              <CardDescription>
                Reporte situações de risco ou assédio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/resources/reporting">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-mental-purple" />
                Pesquisas
              </CardTitle>
              <CardDescription>
                Participe de pesquisas e avaliações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/resources/surveys">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-mental-purple" />
                Treinamentos
              </CardTitle>
              <CardDescription>
                Acesse nossos treinamentos e workshops
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/resources/trainings">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-mental-purple" />
                Políticas
              </CardTitle>
              <CardDescription>
                Conheça nossas políticas de saúde mental
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/resources/policies">
                <Button className="w-full">Acessar</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}