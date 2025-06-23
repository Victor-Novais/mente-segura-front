// File: src/app/register/complete-profile/company/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import type { Nr1Status } from '@/lib/services/auth';
import { Loader2 } from 'lucide-react';

export default function CompleteCompanyProfilePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Traz dados mínimos já vindo do OAuth
    const stored = typeof window !== 'undefined'
        ? localStorage.getItem('userProfile')
        : null;
    const profile = stored ? JSON.parse(stored) : {};

    const [form, setForm] = useState({
        name: profile.name || '',
        email: profile.email || '',
        whatsapp: '',
        jobTitle: '',
        companySize: '',
        nr1Status: '' as Nr1Status,
    });

    const steps = ['Dados Pessoais', 'Empresa', 'NR-1'];
    const progress = (step / steps.length) * 100;

    const validate = () => {
        if (step === 1) {
            if (!form.name.trim()) { toast.error('Preencha o nome completo.'); return false; }
            if (!form.whatsapp.trim()) { toast.error('Preencha o WhatsApp.'); return false; }
            if (!form.email.trim()) { toast.error('Preencha o e-mail.'); return false; }
        }
        if (step === 2) {
            if (!form.jobTitle.trim()) { toast.error('Preencha o cargo.'); return false; }
            if (!form.companySize.trim()) { toast.error('Preencha o tamanho da empresa.'); return false; }
        }
        if (step === 3 && !form.nr1Status) {
            toast.error('Selecione o status NR-1.'); return false;
        }
        return true;
    };

    const next = () => validate() && setStep(s => s + 1);
    const back = () => setStep(s => Math.max(s - 1, 1));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        const toastId = toast.loading('Salvando perfil…');
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/complete-profile`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        whatsapp: form.whatsapp,
                        jobTitle: form.jobTitle,
                        companySize: Number(form.companySize),
                        nr1Status: form.nr1Status,
                        role: 'gestor',
                    }),
                }
            );
            if (!res.ok) throw new Error(await res.text());
            toast.success('Perfil completo!', { id: toastId });
            router.replace('/onboarding/create-wizard');
        } catch (err: any) {
            toast.error(err.message || 'Falha ao completar perfil.', { id: toastId });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F4FF] p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Complete seu perfil de Empresa
                </h2>

                {/* barra de progresso */}
                <div className="w-full bg-gray-200 h-2 rounded mb-6">
                    <div
                        className="bg-mental-purple h-2 rounded"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={step === steps.length ? handleSubmit : (e) => { e.preventDefault(); next() }}
                    className="space-y-4"
                >
                    {step === 1 && (
                        <>
                            <Label>Nome completo</Label>
                            <Input
                                placeholder="Seu nome"
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            />
                            <Label className="mt-4">WhatsApp</Label>
                            <Input
                                placeholder="(00) 90000-0000"
                                value={form.whatsapp}
                                onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                            />
                            <Label className="mt-4">E-mail</Label>
                            <Input
                                placeholder="email@empresa.com"
                                value={form.email}
                                disabled
                                className="bg-gray-100"
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Label>Cargo</Label>
                            <Input
                                placeholder="Ex.: Gerente, Diretor..."
                                value={form.jobTitle}
                                onChange={e => setForm(f => ({ ...f, jobTitle: e.target.value }))}
                            />
                            <Label className="mt-4">Qtd. de funcionários</Label>
                            <Input
                                type="number"
                                placeholder="Ex.: 150"
                                value={form.companySize}
                                onChange={e => setForm(f => ({ ...f, companySize: e.target.value }))}
                            />
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <Label>Status NR-1</Label>
                            <Select
                                value={form.nr1Status}
                                onValueChange={v => setForm(f => ({ ...f, nr1Status: v as Nr1Status }))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="nunca_ouvi_falar">Nunca ouvi falar</SelectItem>
                                    <SelectItem value="sabemos_nao_fazemos">Sabemos, mas não fazemos</SelectItem>
                                    <SelectItem value="escolhendo_solucao">Estamos escolhendo solução</SelectItem>
                                    <SelectItem value="atendendo_exigencias">Atendendo exigências</SelectItem>
                                </SelectContent>
                            </Select>
                        </>
                    )}

                    <div className="flex justify-between mt-6">
                        {step > 1
                            ? <Button variant="outline" onClick={back} disabled={loading}>Voltar</Button>
                            : <div />}
                        <Button
                            type="submit"
                            className="bg-mental-purple text-white"
                            disabled={loading}
                        >
                            {loading
                                ? <Loader2 className="animate-spin h-4 w-4" />
                                : step === steps.length ? 'Concluir' : 'Próximo'}
                        </Button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
}
