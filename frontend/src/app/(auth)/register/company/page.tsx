// File: app/(auth)/register/professional/page.tsx
'use client';

import { useState } from 'react';
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
import { registerProfessional, login, Nr1Status } from '@/lib/services/auth';
import { Loader2 } from 'lucide-react';

export default function RegisterProfessional() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Passos: Dados Pessoais, Atuação, NR-1, Senha (sem confirmação)
    const steps = ['Dados Pessoais', 'Atuação', 'NR-1', 'Senha'];
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

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const validateStep = () => {
        if (step === 1) {
            if (!formData.name.trim()) {
                toast.error('Por favor, preencha o nome completo.');
                return false;
            }
            if (!formData.email.trim()) {
                toast.error('Por favor, preencha o e-mail.');
                return false;
            }
            if (!formData.whatsapp.trim()) {
                toast.error('Por favor, preencha o WhatsApp.');
                return false;
            }
        }
        if (step === 2) {
            if (!formData.jobTitle.trim()) {
                toast.error('Por favor, preencha o cargo.');
                return false;
            }
            if (!formData.descricaoProfissional.trim()) {
                toast.error('Por favor, descreva sua atuação profissional.');
                return false;
            }
        }
        if (step === 3) {
            if (!formData.nr1Status) {
                toast.error('Por favor, selecione o status NR-1.');
                return false;
            }
        }
        if (step === 4) {
            if (!formData.password) {
                toast.error('Por favor, preencha a senha.');
                return false;
            }
            // sem confirmação de senha aqui
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;

        const toastId = toast.loading('Criando sua conta...');
        setIsLoading(true);

        try {
            // 1) Cria a conta de profissional
            await registerProfessional({
                name: formData.name,
                email: formData.email,
                whatsapp: formData.whatsapp,
                jobTitle: formData.jobTitle,
                descricaoProfissional: formData.descricaoProfissional,
                nr1Status: formData.nr1Status,
                password: formData.password,
            });

            toast.success('Conta criada com sucesso!', { id: toastId });

            // 2) Efetua login automático
            const { access_token, user } = await login(formData.email, formData.password);

            // 3) Salva token e user no localStorage
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(user));

            // 4) Seta cookies para middleware
            document.cookie = `token=${access_token}; path=/`;
            document.cookie = `userRole=${user.role}; path=/`;

            // 5) Redireciona para o onboarding do profissional
            router.push('/onboarding/professional');
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || 'Erro ao criar conta.',
                { id: toastId }
            );
            setIsLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Label>Nome completo</Label>
                        <Input
                            placeholder="Digite seu nome completo"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />

                        <Label>Email corporativo</Label>
                        <Input
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />

                        <Label>Whatsapp</Label>
                        <Input
                            placeholder="(00) 90000-0000"
                            value={formData.whatsapp}
                            onChange={(e) =>
                                setFormData({ ...formData, whatsapp: e.target.value })
                            }
                        />
                    </>
                );

            case 2:
                return (
                    <>
                        <Label>Cargo</Label>
                        <Input
                            placeholder="Ex.: Psicólogo, Consultor de RH..."
                            value={formData.jobTitle}
                            onChange={(e) =>
                                setFormData({ ...formData, jobTitle: e.target.value })
                            }
                        />

                        <Label>Descreva sua atuação profissional</Label>
                        <Input
                            placeholder="Ex.: Especialista em saúde ocupacional..."
                            value={formData.descricaoProfissional}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    descricaoProfissional: e.target.value,
                                })
                            }
                        />
                    </>
                );

            case 3:
                return (
                    <>
                        <Label>
                            Como está o nível de adequação da sua empresa às exigências da NR-1?
                        </Label>
                        <Select
                            value={formData.nr1Status}
                            onValueChange={(value: Nr1Status) =>
                                setFormData({ ...formData, nr1Status: value })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione uma opção" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nunca_ouvi_falar">
                                    Nunca ouvi falar
                                </SelectItem>
                                <SelectItem value="sabemos_nao_fazemos">
                                    Sabemos, mas não fazemos
                                </SelectItem>
                                <SelectItem value="escolhendo_solucao">
                                    Estamos escolhendo uma solução
                                </SelectItem>
                                <SelectItem value="atendendo_exigencias">
                                    Já estamos atendendo às exigências
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </>
                );

            case 4:
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
                                {steps.map((label, index) => (
                                    <div
                                        key={index}
                                        className={`text-xs md:text-sm font-medium ${step === index + 1 ? 'text-mental-purple' : 'text-zinc-400'
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
                        transition={{ duration: 0.4 }}
                        onSubmit={step === 4 ? handleSubmit : handleNext}
                        className="space-y-5"
                    >
                        {renderStep()}

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
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Processando...
                                    </>
                                ) : step === 4 ? (
                                    'Finalizar'
                                ) : (
                                    'Próximo'
                                )}
                            </Button>
                        </div>
                    </motion.form>
                </div>
            </div>
        </div>
    );
}