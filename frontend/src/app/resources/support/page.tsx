import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PsychologicalSupport() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Suporte Psicológico</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agendar Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Agende uma consulta com nossos profissionais de saúde mental.
              Oferecemos atendimento online e presencial.
            </p>
            <Button>Agendar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plantão Psicológico</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Atendimento de emergência para situações de crise.
              Disponível 24 horas por dia, 7 dias por semana.
            </p>
            <Button>Falar com um Profissional</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Grupos de Apoio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Participe de grupos de apoio para compartilhar experiências
              e receber suporte de pessoas que passam por situações similares.
            </p>
            <Button>Ver Grupos Disponíveis</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Materiais de Apoio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Acesse materiais, artigos e recursos para auxiliar no seu
              processo de cuidado com a saúde mental.
            </p>
            <Button>Acessar Materiais</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 