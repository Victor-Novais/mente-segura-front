'use client';

import { useRouter } from 'next/navigation';

export default function OnboardingSuccess() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Perfil completado com sucesso!</h1>
            <p className="mb-6">Seu cadastro foi finalizado. Agora você pode acessar a plataforma.</p>
            <button className="btn btn-primary" onClick={() => router.push('/dashboard')}>Ir para o Dashboard</button>
        </div>
    );
} 