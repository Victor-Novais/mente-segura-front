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
import { registerProfessional, login } from '@/lib/services/auth';
import type { Nr1Status } from '@/lib/services/auth';
import { Loader2 } from 'lucide-react';

export default function RegisterProfessional() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleFlow, setIsGoogleFlow] = useState(false);

    const steps = isGoogleFlow
        ? ['Dados Pessoais', 'Atuação', 'NR-1']
        : ['Dados Pessoais', 'Atuação', 'NR-1', 'Senha'];
    const progress = (step / steps.length) * 100;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        jobTitle: '',
        descricaoProfissional: '',
        nr1Status: '' as Nr1Status,
        password: '',
    });

    useEffect(() => {
        // detecta fluxo OAuth
        if (localStorage.getItem('token')) {
            setIsGoogleFlow(true);
        }
        // preenche name/email
        const stored = localStorage.getItem('userProfile');
        if (stored) {
            try {
                const perfil = JSON.parse(stored);
                setFormData(f => ({
                    ...f,
                    name: perfil.name || f.name,
                    email: perfil.email || f.email,
                }));
            } catch { }
        } else if (localStorage.getItem('registerEmail')) {
            setFormData(f => ({ ...f, email: localStorage.getItem('registerEmail')! }));
        }
    }, []);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const validateStep = () => {
        if (step === 1) {
            if (!formData.name.trim()) { toast.error('Preencha o nome completo.'); return false; }
            if (!formData.email.trim()) { toast.error('Preencha o e-mail.'); return false; }
            if (!formData.whatsapp.trim()) { toast.error('Preencha o WhatsApp.'); return false; }
        }
        if (step === 2) {
            if (!formData.jobTitle.trim()) { toast.error('Preencha o cargo.'); return false; }
            if (!formData.descricaoProfissional.trim()) {
                toast.error('Descreva sua atuação profissional.'); return false;
            }
        }
        if (step === 3) {
            if (!formData.nr1Status) { toast.error('Selecione o status NR-1.'); return false; }
        }
        if (!isGoogleFlow && step === steps.length) {
            if (!formData.password) { toast.error('Preencha a senha.'); return false; }
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;

        const toastId = toast.loading('Processando...');
        setIsLoading(true);

        try {
            if (isGoogleFlow) {
                const token = localStorage.getItem('token');
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/complete-profile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        whatsapp: formData.whatsapp,
                        jobTitle: formData.jobTitle,
                        descricaoProfissional: formData.descricaoProfissional,
                        nr1Status: formData.nr1Status,
                        cpf: '',
                        role: 'profissional',
                    }),
                });
                toast.success('Perfil completado!', { id: toastId });
                router.push('/onboarding/success');
            } else {
                await registerProfessional({
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp,
                    jobTitle: formData.jobTitle,
                    descricaoProfissional: formData.descricaoProfissional,
                    nr1Status: formData.nr1Status,
                    password: formData.password,
                });
                toast.success('Conta criada!', { id: toastId });

                const { access_token, user } = await login(formData.email, formData.password);
                localStorage.setItem('token', access_token);
                document.cookie = `token=${access_token}; path=/`;
                document.cookie = `userRole=${user.role}; path=/`;
                router.push('/onboarding/professional');
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Erro ao criar conta.', { id: toastId });
            setIsLoading(false);
        }
    };

    const renderStepFields = () => {
        if (step === 1) {
            return (
                <>
                    <Label>Nome completo</Label>
                    <Input
                        placeholder="Digite seu nome completo"
                        value={formData.name}
                        onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                    />
                    <Label>Email corporativo</Label>
                    <Input
                        placeholder="seu@email.com"
                        value={formData.email}
                        disabled={isGoogleFlow}
                        className={isGoogleFlow ? 'bg-gray-100' : ''}
                        onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                    />
                    <Label>Whatsapp</Label>
                    <Input
                        placeholder="(00) 90000-0000"
                        value={formData.whatsapp}
                        onChange={e => setFormData(f => ({ ...f, whatsapp: e.target.value }))}
                    />
                </>
            );
        }
        if (step === 2) {
            return (
                <>
                    <Label>Cargo</Label>
                    <Input
                        placeholder="Ex.: Psicólogo, Consultor de RH..."
                        value={formData.jobTitle}
                        onChange={e => setFormData(f => ({ ...f, jobTitle: e.target.value }))}
                    />
                    <Label>Descreva sua atuação profissional</Label>
                    <Input
                        placeholder="Ex.: Especialista em saúde ocupacional..."
                        value={formData.descricaoProfissional}
                        onChange={e => setFormData(f => ({ ...f, descricaoProfissional: e.target.value }))}
                    />
                </>
            );
        }
        if (step === 3) {
            return (
                <>
                    <Label>Status NR-1</Label>
                    <Select
                        value={formData.nr1Status}
                        onValueChange={v => setFormData(f => ({ ...f, nr1Status: v as Nr1Status }))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="nunca_ouvi_falar">Nunca ouvi falar</SelectItem>
                            <SelectItem value="sabemos_nao_fazemos">Sabemos, mas não fazemos</SelectItem>
                            <SelectItem value="escolhendo_solucao">Escolhendo solução</SelectItem>
                            <SelectItem value="atendendo_exigencias">Atendendo exigências</SelectItem>
                        </SelectContent>
                    </Select>
                </>
            );
        }
        // senha step
        return (
            <>
                <Label>Senha</Label>
                <Input
                    type="password"
                    placeholder="Digite uma senha segura"
                    value={formData.password}
                    onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
                    required={!isGoogleFlow}
                />
            </>
        );
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-mental-purple/10 to-mental-purple/5">
            <div className="hidden md:flex flex-col justify-center items-center bg-white">
                <h2 className="text-3xl font-bold text-center text-mental-purple px-10">
                    Bem-vindo(a) ao MenteSegura
                </h2>
                <p className="text-center text-zinc-600 px-10 mt-4">
                    Cuidando da saúde mental nas empresas, em conformidade com a NR-1 e Lei 14.831/2024.
                </p>
            </div>

            <div className="flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-center text-zinc-800">
                            Cadastro de Profissional
                        </h2>
                        <div className="mt-4">
                            <div className="flex justify-between mb-2">
                                {steps.map((label, idx) => (
                                    <div
                                        key={idx}
                                        className={`text-xs md:text-sm font-medium ${step === idx + 1 ? 'text-mental-purple' : 'text-zinc-400'}`}>
                                        {label}
                                    </div>
                                ))}
                            </div>
                            <div className="w-full bg-zinc-200 rounded-full h-2">
                                <div
                                    className="bg-mental-purple h-2 rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <motion.form
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        onSubmit={step === steps.length ? handleSubmit : handleNext}
                        className="space-y-5">
                        {renderStepFields()}

                        <div className="flex justify-between">
                            {step > 1 && (
                                <Button type="button" variant="outline" onClick={handleBack} disabled={isLoading}>
                                    Voltar
                                </Button>
                            )}
                            <Button type="submit" className="bg-mental-purple hover:bg-mental-purple-dark" disabled={isLoading}>
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> :
                                    step === steps.length ? 'Finalizar' : 'Próximo'}
                            </Button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </div>
    );
}
