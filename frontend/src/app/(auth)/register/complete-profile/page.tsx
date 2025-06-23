'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Building, User, Briefcase } from 'lucide-react';

export default function CompleteProfileChoicePage() {
    const router = useRouter();

    const handleSelect = (type: 'company' | 'collaborator' | 'professional') => {
        router.push(`/register/complete-profile/${type}`);
    };

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#F8F4FF]">
            {/* Lado informativo */}
            <div className="hidden md:flex items-center justify-center px-12 bg-[#F8F4FF]">
                <div className="max-w-md">
                    <h2 className="text-3xl font-bold text-[#1E1E1E] leading-snug">
                        Falta só um último passo!
                    </h2>
                    <p className="mt-4 text-base text-[#4B5563]">
                        Para finalizar seu cadastro, escolha qual tipo de perfil deseja completar.
                    </p>
                </div>
            </div>

            {/* Lado das opções */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center justify-center px-6 py-12 bg-white"
            >
                <div className="w-full max-w-md">
                    <h1 className="text-3xl font-bold mb-8 text-center text-[#1E1E1E]">
                        Complete seu perfil
                    </h1>

                    <div className="space-y-4">
                        {/* Empresa */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect('company')}
                            className="cursor-pointer border border-[#6E33CC] rounded-xl p-5 bg-[#F8F4FF] hover:bg-[#EFE7FC] flex items-center gap-4"
                        >
                            <Building className="text-[#6E33CC]" />
                            <div>
                                <h2 className="text-lg font-semibold text-[#6E33CC]">
                                    Sou uma Empresa
                                </h2>
                                <p className="text-sm text-[#4B5563]">
                                    Quero completar os dados da minha organização.
                                </p>
                            </div>
                        </motion.div>

                        {/* Colaborador */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect('collaborator')}
                            className="cursor-pointer border border-[#6E33CC] rounded-xl p-5 bg-[#F8F4FF] hover:bg-[#EFE7FC] flex items-center gap-4"
                        >
                            <User className="text-[#6E33CC]" />
                            <div>
                                <h2 className="text-lg font-semibold text-[#6E33CC]">
                                    Sou um Colaborador(a)
                                </h2>
                                <p className="text-sm text-[#4B5563]">
                                    Quero completar meus dados pessoais.
                                </p>
                            </div>
                        </motion.div>

                        {/* Profissional */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect('professional')}
                            className="cursor-pointer border border-[#6E33CC] rounded-xl p-5 bg-[#F8F4FF] hover:bg-[#EFE7FC] flex items-center gap-4"
                        >
                            <Briefcase className="text-[#6E33CC]" />
                            <div>
                                <h2 className="text-lg font-semibold text-[#6E33CC]">
                                    Sou um Profissional
                                </h2>
                                <p className="text-sm text-[#4B5563]">
                                    Quero completar meu perfil profissional.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
