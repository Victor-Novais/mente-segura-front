'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, TrendingUp, TrendingDown } from "lucide-react"

export default function WellBeingIndex() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Índice de Bem-Estar</h2>
        <Button>
          <Heart className="mr-2 h-4 w-4" />
          Nova Avaliação
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Bem-Estar Geral</CardTitle>
            <CardDescription>
              Média geral de bem-estar dos colaboradores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8.5</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+0.5 em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saúde Mental</CardTitle>
            <CardDescription>
              Média de saúde mental dos colaboradores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8.2</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="mr-1 h-4 w-4" />
              <span>+0.3 em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Satisfação no Trabalho</CardTitle>
            <CardDescription>
              Média de satisfação no trabalho
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">7.8</div>
            <div className="flex items-center text-sm text-yellow-600">
              <TrendingDown className="mr-1 h-4 w-4" />
              <span>-0.2 em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Últimas Avaliações</CardTitle>
          <CardDescription>
            Acompanhe as últimas avaliações de bem-estar
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
                    Bem-Estar Geral
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Saúde Mental
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Satisfação
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Roberto Alves</td>
                  <td className="p-4">20/03/2024</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      9.0
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      8.5
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      9.2
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Fernanda Souza</td>
                  <td className="p-4">19/03/2024</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      7.5
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      7.8
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      7.2
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Lucas Martins</td>
                  <td className="p-4">18/03/2024</td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      8.8
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      8.6
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      8.9
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