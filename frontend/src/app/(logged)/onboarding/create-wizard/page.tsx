'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import {
    getWizardProgress,
    saveWizardStep,
    finalizeOnboarding,
} from '@/lib/services/auth';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { DepartmentSelector } from '@/components/DepartmentSelector';

const TOTAL_STEPS = 3;

export default function CreateWizardPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const [organizationId, setOrganizationId] = useState<string | null>(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const data = await getWizardProgress();
                setStep(data.currentStep || 1);
                setAnswers(data.answers || {});
            } catch (error) {
                console.error('Erro ao buscar progresso', error);
            }
        };

        const orgId = localStorage.getItem('organizationId');
        if (orgId) setOrganizationId(orgId);
        else {
            toast({
                title: 'Erro',
                description: 'Organização não encontrada.',
                variant: 'destructive',
            });
        }

        fetchProgress();
    }, []);

    const handleChange = (
        key: string,
        value: string | number | string[]
    ) => {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    };

    const handleNext = async () => {
        setLoading(true);
        try {
            await saveWizardStep(step, answers);

            if (step === TOTAL_STEPS) {
                if (!organizationId) {
                    toast({
                        title: 'Erro ao salvar departamentos',
                        description: 'ID da organização não encontrado.',
                        variant: 'destructive',
                    });
                    setLoading(false);
                    return;
                }

                const departments: string[] = answers.departments || [];
                const token = localStorage.getItem('token');

                await Promise.all(
                    departments.map((name) =>
                        api.post(
                            '/departments',
                            { name, organizationId },
                            { headers: { Authorization: `Bearer ${token}` } }
                        )
                    )
                );

                await finalizeOnboarding();
                router.push('/manager?showInvite=true');
                return;
            }

            setStep((prev) => prev + 1);
        } catch {
            toast({
                title: 'Erro ao salvar',
                description: 'Tente novamente.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

    const renderStep = () => {
        switch (step) {
            case 1:
                return {
                    label: 'Qual o nome da empresa?',
                    placeholder: 'Ex: MenteSegura',
                    value: answers.name || '',
                    key: 'name',
                    type: 'text',
                };
            case 2:
                return {
                    label: 'Qual o CNPJ da empresa?',
                    placeholder: 'Ex: 00.000.000/0001-00',
                    value: answers.cnpj || '',
                    key: 'cnpj',
                    type: 'text',
                };
            case 3:
                return {
                    label: 'Quais os departamentos da empresa?',
                    key: 'departments',
                    type: 'departments',
                };
            default:
                return { label: '', placeholder: '', value: '', key: '' };
        }
    };

    const { label, placeholder, value, key, type } = renderStep();

    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white to-mental-light animate-fade-in px-4">
            <motion.div
                className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10 md:p-16 text-center border"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <p className="text-sm text-gray-500 mb-4">
                    Etapa {step} de {TOTAL_STEPS}
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-mental-purple mb-8">
                    {label}
                </h1>

                {type === 'departments' ? (
                    <DepartmentSelector
                        mode="multiple"
                        selected={answers.departments || []}
                        onChange={(departments: string[]) =>
                            handleChange('departments', departments)
                        }
                    />
                ) : (
                    <Input
                        type={type as string}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) =>
                            handleChange(
                                key,
                                type === 'number' ? Number(e.target.value) : e.target.value
                            )
                        }
                        className="mb-6 text-lg"
                    />
                )}

                <div className="flex justify-between mt-6">
                    {step > 1 ? (
                        <Button
                            variant="outline"
                            onClick={handleBack}
                            className="text-base px-6"
                        >
                            Voltar
                        </Button>
                    ) : (
                        <div />
                    )}

                    <Button
                        onClick={handleNext}
                        disabled={loading}
                        className="bg-mental-purple hover:bg-mental-purple-dark text-white text-base px-8"
                    >
                        {step === TOTAL_STEPS ? 'Finalizar' : 'Próximo'}
                    </Button>
                </div>
            </motion.div>
        </main>
    );
}
