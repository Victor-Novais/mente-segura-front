"use client";

import DashboardOverview from "@/components/dashboard/DashboardOverview";
import RiskAssessments from "@/components/dashboard/RiskAssessments";
import AnalyticsReports from "@/components/dashboard/AnalyticsReports";
import AngularRiskFactors from "@/components/dashboard/AngularRiskFactors";

export default function ProfessionalDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskAssessments />
        <AnalyticsReports />
      </div>
      <AngularRiskFactors />
    </div>
  );
} 