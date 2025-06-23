"use client";

import DashboardOverview from "@/components/dashboard/DashboardOverview";
import RiskAssessment from "@/components/dashboard/RiskAssessment";
import WellBeingIndex from "@/components/dashboard/WellBeingIndex";

export default function CollaboratorDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskAssessment />
        <WellBeingIndex />
      </div>
    </div>
  );
} 