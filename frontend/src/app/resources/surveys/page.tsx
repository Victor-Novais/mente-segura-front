import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Surveys() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Pesquisas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pesquisa de Satisfação</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Participe da nossa pesquisa de satisfação e ajude-nos a
              melhorar nossos serviços.
            </p>
            <Button>Participar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pesquisa de Bem-estar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Avalie seu nível de bem-estar e receba dicas personalizadas
              para melhorar sua qualidade de vida.
            </p>
            <Button>Participar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pesquisa de Clima Organizacional</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Contribua para a melhoria do ambiente de trabalho
              participando desta pesquisa.
            </p>
            <Button>Participar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resultados Anteriores</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Acesse os resultados das pesquisas anteriores e veja as
              melhorias implementadas.
            </p>
            <Button>Ver Resultados</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 