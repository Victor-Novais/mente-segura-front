import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PatientDashboard() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Área do Paciente</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Minhas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Visualize e gerencie suas consultas agendadas.</p>
            <Button>Acessar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Atendimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Acesse seu histórico de atendimentos e evolução.</p>
            <Button>Acessar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Materiais de Apoio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Acesse materiais e recursos recomendados pelo seu terapeuta.</p>
            <Button>Acessar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agendar Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Agende uma nova consulta com seu terapeuta.</p>
            <Button>Acessar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mensagens</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Comunique-se com seu terapeuta através de mensagens.</p>
            <Button>Acessar</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 