'use client'

/**
 * Para instalar e tipar corretamente o InputMask, execute:
 * npm install react-input-mask
 * npm install --save-dev @types/react-input-mask
 */
// @ts-ignore
import InputMask from 'react-input-mask'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select'

interface CompleteProfileDto {
    name: string
    cpf: string
    whatsapp: string
    jobTitle: string
    descricaoProfissional: string
    nr1Status: string
}

export default function CompleteProfilePage() {
    const router = useRouter()
    const [form, setForm] = useState<CompleteProfileDto>({
        name: '',
        cpf: '',
        whatsapp: '',
        jobTitle: '',
        descricaoProfissional: '',
        nr1Status: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    // Preenche com dados vieram do OAuth (se existir)
    useEffect(() => {
        const stored = localStorage.getItem('userProfile')
        if (stored) {
            try {
                const perfil = JSON.parse(stored)
                setForm(prev => ({
                    ...prev,
                    name: perfil.name || prev.name,
                    whatsapp: perfil.whatsapp || prev.whatsapp,
                }))
            } catch {
                console.warn('Não foi possível ler perfil do Google')
            }
        }
    }, [])

    const handleChange = (key: keyof CompleteProfileDto, value: string) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('/api/auth/complete-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            })
            if (!res.ok) throw new Error('Erro ao completar perfil')
            toast.success('Perfil completo com sucesso!')
            router.push(
                document.cookie.includes('userRole=profissional')
                    ? '/professional'
                    : document.cookie.includes('userRole=colaborador')
                        ? '/collaborator'
                        : '/manager'
            )
        } catch (err: any) {
            console.error(err)
            toast.error(err.message || 'Falha ao enviar dados')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-mental-purple/10 to-mental-purple/5">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6"
            >
                <h2 className="text-2xl font-bold mb-4">Complete seu perfil</h2>

                <div>
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                        id="name"
                        value={form.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange('name', e.target.value)
                        }
                        disabled={isLoading}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="cpf">CPF</Label>
                    {/* @ts-ignore */}
                    <InputMask
                        mask="999.999.999-99"
                        value={form.cpf}
                        disabled={isLoading}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange('cpf', e.target.value)
                        }
                    >
                        {(inputProps: any) => (
                            <Input id="cpf" {...inputProps} required />
                        )}
                    </InputMask>
                </div>

                <div>
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    {/* @ts-ignore */}
                    <InputMask
                        mask="(99) 9 9999-9999"
                        value={form.whatsapp}
                        disabled={isLoading}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange('whatsapp', e.target.value)
                        }
                    >
                        {(inputProps: any) => (
                            <Input id="whatsapp" {...inputProps} required />
                        )}
                    </InputMask>
                </div>

                <div>
                    <Label htmlFor="jobTitle">Cargo/Profissão</Label>
                    <Input
                        id="jobTitle"
                        value={form.jobTitle}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange('jobTitle', e.target.value)
                        }
                        disabled={isLoading}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="descricaoProfissional">
                        Descrição profissional
                    </Label>
                    <Input
                        id="descricaoProfissional"
                        value={form.descricaoProfissional}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleChange('descricaoProfissional', e.target.value)
                        }
                        disabled={isLoading}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="nr1Status">Status NR-1</Label>
                    <Select
                        onValueChange={(val: string) =>
                            handleChange('nr1Status', val)
                        }
                        value={form.nr1Status}
                        disabled={isLoading}
                    >
                        <SelectTrigger id="nr1Status">
                            <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="nunca_ouvi_falar">
                                Nunca ouvi falar
                            </SelectItem>
                            <SelectItem value="sabemos_nao_fazemos">
                                Sabemos, não fazemos
                            </SelectItem>
                            <SelectItem value="escolhendo_solucao">
                                Escolhendo solução
                            </SelectItem>
                            <SelectItem value="atendendo_exigencias">
                                Atendendo exigências
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    type="submit"
                    className="w-full bg-mental-purple hover:bg-mental-purple-dark"
                    disabled={isLoading}
                >
                    {isLoading ? 'Enviando...' : 'Concluir Perfil'}
                </Button>
            </form>
        </div>
    )
}
