"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Acesso Não Autorizado
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Você não tem permissão para acessar esta página.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            onClick={() => router.back()}
            className="w-full"
            variant="outline"
          >
            Voltar
          </Button>
          <Button
            onClick={() => router.push("/login")}
            className="w-full"
          >
            Ir para Login
          </Button>
        </div>
      </div>
    </div>
  );
} 