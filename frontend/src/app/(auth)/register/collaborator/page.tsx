'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { registerCollaborator, login } from '@/lib/services/auth';
import { getDepartmentsByCode } from '@/lib/services/departments';
import { DepartmentSelector, Department } from '@/components/DepartmentSelector';

export default function RegisterCollaborator() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [availableDepartments, setAvailableDepartments] = useState<Department[]>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        registration_code: '',
        name: '',
        cpf: '',
        email: '',
        password: '',
    });

    const steps = ['Código de Registro', 'Dados Pessoais', 'Senha'];
    const progress = (step / steps.length) * 100;

    useEffect(() => {
        if (step === 2 && formData.registration_code.trim()) {
            getDepartmentsByCode(formData.registration_code)
                .then((res) => setAvailableDepartments(res))
                .catch(() => {
                    toast.error('Código inválido ou sem departamentos.');
                    setAvailableDepartments([]);
                });
        }
    }, [step, formData.registration_code]);

    const validateStep = () => {
        if (step === 1 && !formData.registration_code.trim()) {
            toast.error('Por favor, preencha o código de registro.');
            return false;
        }
        if (step === 2) {
            if (!formData.name.trim() || !formData.cpf.trim() || !formData.email.trim()) {
                toast.error('Preencha todos os dados pessoais.');
                return false;
            }
            if (availableDepartments.length > 0 && !selectedDepartmentId) {
                toast.error('Selecione um departamento.');
                return false;
            }
        }
        if (step === 3 && !formData.password) {
            toast.error('Por favor, defina uma senha.');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (validateStep()) setStep((prev) => prev + 1);
    };

    const handleBack = () => setStep((prev) => prev - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;

        const toastId = toast.loading('Criando sua conta...');
        setIsLoading(true);

        try {
            // ✅ Corrigido: adiciona 'role: colaborador'
            await registerCollaborator({
                registration_code: formData.registration_code,
                name: formData.name,
                cpf: formData.cpf,
                email: formData.email,
                password: formData.password,
                department_id: selectedDepartmentId,
                role: 'colaborador', // <-- ESSENCIAL
            });

            toast.success('Conta criada com sucesso!', { id: toastId });

            // Login automático
            const { access_token, user } = await login(formData.email, formData.password);
            localStorage.setItem('token', access_token);

            router.push('/onboarding/collaborator');
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'Erro ao criar conta.', { id: toastId });
            setIsLoading(false);
        }
    };

    const renderStepFields = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Label>Código de Registro</Label>
                        <Input
                            placeholder="Ex: ABC123"
                            value={formData.registration_code}
                            onChange={(e) =>
                                setFormData({ ...formData, registration_code: e.target.value })
                            }
                        />
                    </>
                );

            case 2:
                return (
                    <>
                        <Label>Nome completo</Label>
                        <Input
                            placeholder="Digite seu nome completo"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />

                        <Label>CPF</Label>
                        <Input
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        />

                        <Label>E-mail</Label>
                        <Input
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        {availableDepartments.length > 0 && (
                            <>
                                <Label className="mt-4">Departamentos</Label>
                                <DepartmentSelector
                                    mode="single"
                                    selected={selectedDepartmentId}
                                    onChange={setSelectedDepartmentId}
                                    availableDepartments={availableDepartments}
                                />
                            </>
                        )}
                    </>
                );

            case 3:
                return (
                    <>
                        <Label>Senha</Label>
                        <Input
                            type="password"
                            placeholder="Digite uma senha segura"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-mental-purple/10 to-mental-purple/5">
            {/* Lado ilustrativo */}
            <div className="hidden md:flex flex-col justify-center items-center bg-white">
                <h2 className="text-3xl font-bold text-center text-mental-purple px-10">
                    Bem-vindo(a) ao MenteSegura
                </h2>
                <p className="text-center text-zinc-600 px-10 mt-4">
                    Cuidando da saúde mental nas empresas, em conformidade com a NR-1 e Lei 14.831/2024.
                </p>
            </div>

            {/* Formulário */}
            <div className="flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold text-center text-zinc-800">
                            Cadastro de Colaborador
                        </h2>
                        {/* Progress bar */}
                        <div className="mt-4">
                            <div className="flex justify-between mb-2">
                                {steps.map((label, idx) => (
                                    <div
                                        key={idx}
                                        className={`text-xs md:text-sm font-medium ${step === idx + 1 ? 'text-mental-purple' : 'text-zinc-400'
                                            }`}
                                    >
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
                        transition={{ duration: 0.3 }}
                        onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}
                        className="space-y-5"
                    >
                        {renderStepFields()}

                        <div className="flex justify-between">
                            {step > 1 && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleBack}
                                    disabled={isLoading}
                                >
                                    Voltar
                                </Button>
                            )}
                            <Button
                                type="submit"
                                className="bg-mental-purple hover:bg-mental-purple-dark"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : step === 3 ? 'Finalizar' : 'Próximo'}
                            </Button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </div>
    );
}