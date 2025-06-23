'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckCircle, ClipboardCopy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

export default function OrganizationSuccessPage() {
    const router = useRouter();
    const [shareLink, setShareLink] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/onboarding/success', {
                    credentials: 'include',
                });
                const data = await res.json();
                setShareLink(data.shareLink);
            } catch (err) {
                console.error('Erro ao buscar link', err);
            }
        };

        fetchData();
    }, []);

    const handleCopy = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink);
            toast({ title: 'Link copiado com sucesso!' });
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-mental-light px-4 py-12">
            <motion.div
                className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-10 md:p-16 text-center border"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-mental-purple mb-2">
                    Organização cadastrada com sucesso!
                </h1>
                <p className="text-gray-600 mb-6">
                    Compartilhe este link com outros profissionais da sua empresa:
                </p>

                {shareLink && (
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-between w-full mb-6">
                        <span className="truncate text-sm text-left max-w-[85%]">{shareLink}</span>
                        <button onClick={handleCopy} className="ml-2">
                            <ClipboardCopy className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                )}

                <Button
                    onClick={() => router.push('/manager/dashboard')}
                    className="w-full bg-mental-purple hover:bg-mental-purple-dark"
                >
                    Ir para o Dashboard
                </Button>
            </motion.div>
        </main>
    );
}
