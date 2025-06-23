import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Trainings() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Treinamentos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Saúde Mental no Trabalho</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Aprenda sobre a importância da saúde mental no ambiente
              de trabalho e como promover um ambiente saudável.
            </p>
            <Button>Acessar Treinamento</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prevenção ao Assédio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Conheça as diferentes formas de assédio e aprenda como
              prevenir e combater situações inadequadas.
            </p>
            <Button>Acessar Treinamento</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gestão do Estresse</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Aprenda técnicas e estratégias para gerenciar o estresse
              no dia a dia.
            </p>
            <Button>Acessar Treinamento</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comunicação Não Violenta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Desenvolva habilidades de comunicação que promovam
              relacionamentos mais saudáveis.
            </p>
            <Button>Acessar Treinamento</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 