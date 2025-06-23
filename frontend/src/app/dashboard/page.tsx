"use client";

import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarSeparator, SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";
import { BarChart3, Users, ClipboardCheck, Settings, LogOut, CalendarRange, PieChart, Building, Activity, Brain } from "lucide-react";
import DashboardOverview from "@/app/(logged)/manager/dashboard/DashboardOverview";
import TeamManagement from "@/app/(logged)/manager/dashboard/TeamManagement";
import RiskAssessments from "@/app/(logged)/manager/dashboard/RiskAssessments";
import AnalyticsReports from "@/app/(logged)/manager/dashboard/AnalyticsReports";
import OrganizationSettings from "@/app/(logged)/professional/dashboard/OrganizationSettings";
import OrganizationsList from "@/app/(logged)/manager/dashboard/OrganizationsList";
import AngularRiskFactors from "@/app/(logged)/manager/dashboard/AngularRiskFactors";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<string>("overview");
  const [currentOrg, setCurrentOrg] = useState<string>("Empresa ABC Ltda.");

  const renderDashboardContent = () => {
    switch (currentView) {
      case "overview":
        return <DashboardOverview />;
      case "team":
        return <TeamManagement />;
      case "organizations":
        return <OrganizationsList />;
      case "assessments":
        return <RiskAssessments />;
      case "analytics":
        return <AnalyticsReports />;
      case "settings":
        return <OrganizationSettings />;
      case "risk-factors":
        return <AngularRiskFactors />;
      default:
        return <DashboardOverview />;
    }
  };
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");

    document.cookie = "token=; Max-Age=0";
    document.cookie = "userRole=; Max-Age=0";

    toast({
      title: "Sessão encerrada",
      description: "Você foi desconectado com sucesso."
    });

    router.push("/login");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <Sidebar side="left" variant="sidebar" collapsible="icon">
            <SidebarHeader>
              <div className="flex items-center px-2">
                <div className="font-bold text-xl text-mental-purple">Mente<span className="text-mental-purple-dark">Segura</span></div>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Principal</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={currentView === "overview"}
                        tooltip="Dashboard"
                        onClick={() => setCurrentView("overview")}
                      >
                        <BarChart3 className="h-5 w-5" />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={currentView === "organizations"}
                        tooltip="Organizações"
                        onClick={() => setCurrentView("organizations")}
                      >
                        <Building className="h-5 w-5" />
                        <span>Organizações</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={currentView === "team"}
                        tooltip="Colaboradores"
                        onClick={() => setCurrentView("team")}
                      >
                        <Users className="h-5 w-5" />
                        <span>Colaboradores</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator />

              <SidebarGroup>
                <SidebarGroupLabel>Ferramentas</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={currentView === "risk-factors"}
                        tooltip="Fatores de Risco Angular"
                        onClick={() => setCurrentView("risk-factors")}
                      >
                        <Brain className="h-5 w-5" />
                        <span>Fatores de Risco Angular</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={currentView === "assessments"}
                        tooltip="Avaliações"
                        onClick={() => setCurrentView("assessments")}
                      >
                        <ClipboardCheck className="h-5 w-5" />
                        <span>Avaliações</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={currentView === "analytics"}
                        tooltip="Relatórios"
                        onClick={() => setCurrentView("analytics")}
                      >
                        <PieChart className="h-5 w-5" />
                        <span>Relatórios</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip="Calendário"
                      >
                        <CalendarRange className="h-5 w-5" />
                        <span>Calendário</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive={currentView === "settings"}
                        tooltip="Configurações"
                        onClick={() => setCurrentView("settings")}
                      >
                        <Settings className="h-5 w-5" />
                        <span>Configurações</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip="Sair"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sair</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 overflow-auto">
            <div className="p-4 md:p-6">
              <header className="flex items-center justify-between mb-6">
                <SidebarTrigger className="md:hidden" />
              </header>

              {renderDashboardContent()}
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
} 