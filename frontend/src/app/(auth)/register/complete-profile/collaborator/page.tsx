// src/app/register/complete-profile/collaborator/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { getDepartmentsByCode } from '@/lib/services/departments';
import { DepartmentSelector, Department } from '@/components/DepartmentSelector';

export default function CompleteCollaboratorProfilePage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedDept, setSelectedDept] = useState<string | null>(null);

    // pré-carrega name/email caso você queira mostrar (opcional)
    const profile = typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('userProfile') || '{}')
        : {};

    const [form, setForm] = useState({
        registration_code: '',
        cpf: ''
    });

    const steps = ['Código de Registro', 'CPF & Departamento'];
    const progress = (step / steps.length) * 100;

    // ao avançar para etapa 2 busca departamentos
    useEffect(() => {
        if (step === 2 && form.registration_code.trim()) {
            getDepartmentsByCode(form.registration_code)
                .then(setDepartments)
                .catch(() => {
                    toast.error('Código inválido ou sem departamentos.');
                    setDepartments([]);
                });
        }
    }, [step, form.registration_code]);

    const validate = () => {
        if (step === 1 && !form.registration_code.trim()) {
            toast.error('Preencha o código de registro.');
            return false;
        }
        if (step === 2) {
            if (!form.cpf.trim()) {
                toast.error('Preencha o CPF.');
                return false;
            }
            if (departments.length > 0 && !selectedDept) {
                toast.error('Selecione um departamento.');
                return false;
            }
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
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        cpf: form.cpf,
                        registration_code: form.registration_code,
                        department_id: selectedDept,
                        role: 'colaborador'
                    })
                }
            );
            if (!res.ok) throw new Error(await res.text());

            toast.success('Perfil completo!', { id: toastId });
            router.replace('/onboarding/collaborator');
        } catch (err: any) {
            toast.error(err.message || 'Falha ao completar perfil.', { id: toastId });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F4FF] p-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-center mb-4">
                    Complete seu perfil como Colaborador
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
                            <Label>Código de Registro</Label>
                            <Input
                                placeholder="Ex: ABC123"
                                value={form.registration_code}
                                onChange={e =>
                                    setForm(f => ({ ...f, registration_code: e.target.value }))
                                }
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Label>CPF</Label>
                            <Input
                                placeholder="000.000.000-00"
                                value={form.cpf}
                                onChange={e => setForm(f => ({ ...f, cpf: e.target.value }))}
                            />

                            {departments.length > 0 && (
                                <>
                                    <Label>Departamento</Label>
                                    <DepartmentSelector
                                        mode="single"
                                        availableDepartments={departments}
                                        selected={selectedDept}
                                        onChange={setSelectedDept}
                                    />
                                </>
                            )}
                        </>
                    )}

                    <div className="flex justify-between mt-6">
                        {step > 1 ? (
                            <Button variant="outline" onClick={back} disabled={loading}>
                                Voltar
                            </Button>
                        ) : <div />}

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
