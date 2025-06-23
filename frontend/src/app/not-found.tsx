import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Página não encontrada</h2>
      <p className="text-center mb-8">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link href="/">
        <Button>Voltar para a página inicial</Button>
      </Link>
    </main>
  );
} 