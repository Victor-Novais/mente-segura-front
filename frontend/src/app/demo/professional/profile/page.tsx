
import React from 'react';

import ProfessionalProfile from '@/components/professional/ProfessionalProfile';

export default function ProfessionalProfilePage() {
    return (

        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Meu Perfil</h1>
                <p className="text-gray-600 mt-1">Gerencie suas informações pessoais e profissionais</p>
            </div>

            {/* Componente de Perfil */}
            <ProfessionalProfile
                name="João Silva"
                role="Psicólogo Organizacional"
                company="Empresa XYZ"
                email="joao.silva@empresaxyz.com"
                phone="(11) 9 9999-9999"
                activePatients={45}
                weekSessions={12}
                averageRating={4.9}
            />
        </div>

    );
}
