'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import DashboardOverview from '@/components/dashboard/DashboardOverview';
import RiskAssessments from '@/components/dashboard/RiskAssessments';
import TeamManagement from '@/components/dashboard/TeamManagement';
import AnalyticsReports from '@/components/dashboard/AnalyticsReports';
import AngularRiskFactors from '@/components/dashboard/AngularRiskFactors';

import { InviteCollaboratorModal } from '@/components/modals/InviteCollaboratorModal';

export default function ManagerDashboardPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {

    if (params.get('showInvite') === 'true') {
      setModalOpen(true);

      const url = new URL(window.location.href);
      url.searchParams.delete('showInvite');
      router.replace(url.toString());
    }
  }, [params, router]);

  return (
    <>
      {/* Modal de convite */}
      <InviteCollaboratorModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Conteúdo do Dashboard */}
      <div className="space-y-6 dashboard-overview">
        <DashboardOverview />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 productivity-chart">
          <RiskAssessments />
          <TeamManagement />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 risk-chart">
          <AnalyticsReports />
          <AngularRiskFactors />
        </div>

        <div className="plans-section">
          {/* Se aqui tiver planos, coloca os componentes dos planos */}
        </div>
      </div>
    </>
  );
}
