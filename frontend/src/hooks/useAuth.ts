'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { me as meService, logout as logoutService } from "@/lib/services/auth";

// Definimos UserRole apenas com as strings que vêm do backend:
type UserRole = "gerente" | "gestor" | "profissional" | "colaborador";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  onboarding: boolean;
  // Outros campos do `user` podem ser adicionados, se necessário
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Chama meService(), que agora retorna response.data.user
        const userData = await meService();
        console.log("useAuth → userData recebido de /auth/me:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setUser(null);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const redirectBasedOnRole = () => {
    if (!user) return;

    switch (user.role) {
      case "gerente":
      case "gestor":
        router.push("/manager");
        break;
      case "profissional":
        router.push("/professional");
        break;
      case "colaborador":
        router.push("/collaborator");
        break;
      default:
        router.push("/login");
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return {
    user,
    isLoading,
    redirectBasedOnRole,
    logout,
  };
}
