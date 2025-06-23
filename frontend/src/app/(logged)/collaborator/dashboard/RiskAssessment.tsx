'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

export default function RiskAssessment() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Avaliação de Riscos</h2>
        <Button>
          <AlertTriangle className="mr-2 h-4 w-4" />
          Nova Avaliação
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Riscos Altos</CardTitle>
            <CardDescription>
              Total de colaboradores com riscos altos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <div className="flex items-center text-sm text-red-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+12% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riscos Médios</CardTitle>
            <CardDescription>
              Total de colaboradores com riscos médios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">45</div>
            <div className="flex items-center text-sm text-yellow-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+5% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Riscos Baixos</CardTitle>
            <CardDescription>
              Total de colaboradores com riscos baixos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">156</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingDown className="mr-1 h-4 w-4" />
              <span>-8% em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Avaliações</CardTitle>
          <CardDescription>
            Acompanhe as últimas avaliações de risco realizadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Colaborador
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Data
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Nível de Risco
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Ana Costa</td>
                  <td className="p-4">20/03/2024</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      Alto
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Em Acompanhamento
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Carlos Mendes</td>
                  <td className="p-4">19/03/2024</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      Médio
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Resolvido
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Juliana Lima</td>
                  <td className="p-4">18/03/2024</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Baixo
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Resolvido
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 