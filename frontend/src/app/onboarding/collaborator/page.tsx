'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function OnboardingCollaborator() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        whatsapp: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('userProfile');
        let name = '', email = '';
        if (stored) {
            const perfil = JSON.parse(stored);
            name = perfil.name || '';
            email = perfil.email || '';
        } else {
            // fallback para registerEmail
            email = localStorage.getItem('registerEmail') || '';
        }
        setFormData(f => ({
            ...f,
            name: f.name || name,
            email: f.email || email,
        }));
    }, []);

    const handleChange = (key: string, value: string) => {
        setFormData(f => ({ ...f, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        await api.post(
            '/auth/complete-profile',
            { ...formData, role: 'colaborador' },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setLoading(false);
        router.push('/onboarding/success');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Complete seu perfil de colaborador</h2>
            <input value={formData.name} onChange={e => handleChange('name', e.target.value)} placeholder="Nome completo" className="input" />
            <input value={formData.email} onChange={e => handleChange('email', e.target.value)} placeholder="E-mail" className="input" />
            <input value={formData.cpf} onChange={e => handleChange('cpf', e.target.value)} placeholder="CPF" className="input" />
            <input value={formData.whatsapp} onChange={e => handleChange('whatsapp', e.target.value)} placeholder="Whatsapp" className="input" />
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>{loading ? 'Salvando...' : 'Finalizar'}</button>
        </form>
    );
} 