"use client";

import { AppSidebar } from "@/components/layout/sidebar";
import { useRouter } from "next/navigation";
import { BarChart3, Brain, Settings, Building, Users, ClipboardCheck, PieChart } from "lucide-react";

export default function ProfessionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const groups = [
    {
      label: "Principal",
      items: [
        {
          label: "Dashboard",
          href: "/professional",
          icon: BarChart3,
        },
        {
          label: "Organizações",
          href: "/professional/organizations",
          icon: Building,
        },
        {
          label: "Pacientes",
          href: "/professional/patients",
          icon: Users,
        },
      ],
    },
    {
      label: "Ferramentas",
      items: [
        {
          label: "Fatores de Risco",
          href: "/professional/risk-factors",
          icon: Brain,
        },
        {
          label: "Avaliações",
          href: "/professional/assessments",
          icon: ClipboardCheck,
        },
        {
          label: "Relatórios",
          href: "/professional/analytics",
          icon: PieChart,
        },
      ],
    },
  ];

  const footerItems = [
    {
      label: "Configurações",
      href: "/professional/settings",
      icon: Settings,
    },
  ];

  return (
    <AppSidebar
      groups={groups}
      footerItems={footerItems}
      onLogout={() => router.push("/")}
    >
      {children}
    </AppSidebar>
  );
} 