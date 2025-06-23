import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MentalHealthPolicies() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Políticas de Saúde Mental</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Política de Saúde Mental</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Conheça nossa política de saúde mental e as diretrizes
              para promoção do bem-estar no ambiente de trabalho.
            </p>
            <Button>Ler Política</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Programa de Assistência ao Empregado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Saiba mais sobre nosso programa de assistência e os
              benefícios disponíveis para os colaboradores.
            </p>
            <Button>Conhecer Programa</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Protocolos de Atendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Conheça os protocolos de atendimento em situações de
              crise e emergência.
            </p>
            <Button>Ver Protocolos</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Diretrizes de Prevenção</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Acesse as diretrizes de prevenção e promoção da saúde
              mental no ambiente de trabalho.
            </p>
            <Button>Ver Diretrizes</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 