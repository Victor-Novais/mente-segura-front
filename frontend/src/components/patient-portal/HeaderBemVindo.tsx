// src/components/patient-portal/HeaderBemVindo.tsx
'use client';

import React from "react";
import { Info } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function HeaderBemVindo() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="bg-white border-b border-gray-200 px-8 py-6">
                <h1 className="text-3xl font-bold text-gray-800">Carregando...</h1>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="bg-white border-b border-gray-200 px-8 py-6">
                <h1 className="text-3xl font-bold text-gray-800">Olá, visitante</h1>
                <p className="mt-1 text-base text-gray-600">
                    Por favor, faça login para acessar o portal de bem-estar.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white border-b border-gray-200 px-8 py-6">
            <h1 className="text-3xl font-bold text-gray-800">Olá, {user.name}</h1>
            <p className="mt-1 text-base text-gray-600">
                Bem-vindo(a) ao seu portal de bem-estar
            </p>

            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                <div className="bg-blue-100 p-1 rounded-full">
                    <Info className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                    <p className="text-blue-800 font-semibold text-sm">
                        Bem-vindo ao seu portal de saúde mental
                    </p>
                    <p className="text-blue-700 text-sm mt-1">
                        Aqui você encontra recursos para apoiar seu bem-estar e acompanhar sua
                        jornada de saúde mental.
                    </p>
                </div>
            </div>
        </div>
    );
}
