import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ReportingChannels() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Canais de Denúncia</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Denúncia Anônima</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Faça uma denúncia de forma anônima sobre situações de assédio,
              discriminação ou qualquer outro problema no ambiente de trabalho.
            </p>
            <Button>Fazer Denúncia</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ouvidoria</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Entre em contato com nossa ouvidoria para relatar problemas
              ou fazer sugestões de melhoria.
            </p>
            <Button>Contatar Ouvidoria</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Comitê de Ética</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Acesse o comitê de ética para denunciar violações de código
              de conduta ou questões éticas.
            </p>
            <Button>Contatar Comitê</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Política de Denúncias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Conheça nossa política de denúncias e saiba como proceder
              em diferentes situações.
            </p>
            <Button>Ler Política</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 