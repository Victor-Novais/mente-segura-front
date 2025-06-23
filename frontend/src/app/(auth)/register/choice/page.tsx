'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Building, User, Briefcase } from 'lucide-react'

export default function RegisterChoicePage() {
    const router = useRouter()

    const handleSelect = (type: 'company' | 'collaborator' | 'professional') => {
        router.push(`/register/${type}`)
    }

    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#F8F4FF]">
            {/* Lado informativo */}
            <div className="hidden md:flex items-center justify-center px-12 bg-[#F8F4FF]">
                <div className="max-w-md">
                    <h2 className="text-3xl font-bold text-[#1E1E1E] leading-snug">
                        Uma nova era para o cuidado com a saúde mental no trabalho.
                    </h2>
                    <p className="mt-4 text-base text-[#4B5563]">
                        Conecte empresas, profissionais e colaboradores em um ecossistema completo de bem-estar psicológico, em conformidade com a NR-1 e a Lei 14.831/2024.
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
                        Escolha seu tipo de conta
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
                                    Quero cadastrar minha organização e gerenciar colaboradores.
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
                                    Quero responder formulários e acessar minha jornada de bem-estar.
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
                                    Quero aplicar diagnósticos, acompanhar dados e apoiar empresas na promoção da saúde mental.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}