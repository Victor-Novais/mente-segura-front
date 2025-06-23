'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/layout/sidebar";
import {
  Heart,
  Clipboard,
  Info,
  MessageCircle,
  BarChart2,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

export default function CollaboratorLayout({
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
          label: "Meu Bem-Estar",
          href: "/collaborator/well-being",
          icon: Heart,
        },
        {
          label: "Minhas Avaliações",
          href: "/collaborator/assessments",
          icon: Clipboard,
        },
      ],
    },
    {
      label: "Recursos",
      items: [
        {
          label: "Apoio Psicológico",
          href: "/collaborator/well-being/apoio-psicologico",
          icon: Info,
        },
        {
          label: "Canal de Denúncias",
          href: "/collaborator/well-being/canal-denuncias",
          icon: MessageCircle,
        },
        {
          label: "Pesquisas",
          href: "/collaborator/well-being/pesquisas",
          icon: BarChart2,
        },
        {
          label: "Treinamentos",
          href: "/collaborator/well-being/treinamentos",
          icon: Users,
        },
        {
          label: "Políticas de Bem-Estar",
          href: "/collaborator/well-being/politicas",
          icon: FileText,
        },
        {
          label: "Assistente Virtual",
          href: "/assistant",
          icon: MessageCircle,
        },
      ],
    }
  ];

  const footerItems = [
    {
      label: "Configurações",
      href: "/collaborator/settings",
      icon: Settings,

    },
  ];

  return (
    <AppSidebar
      groups={groups}
      footerItems={footerItems}
      onLogout={() => {
        document.cookie = "token=; Max-Age=-99999999; path=/";
        document.cookie = "userRole=; Max-Age=-99999999; path=/";
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      }}
    >
      {children}
    </AppSidebar>
  );
}
