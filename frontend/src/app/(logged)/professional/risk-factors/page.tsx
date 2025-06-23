import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Target, TrendingDown, TrendingUp } from 'lucide-react';

const mockFatoresRisco = [
  {
    categoria: "Estresse no Trabalho",
    nivel: 75,
    tendencia: "up",
    descricao: "Alto nível de pressão e prazos apertados",
    pacientesAfetados: 28
  },
  {
    categoria: "Isolamento Social",
    nivel: 45,
    tendencia: "down",
    descricao: "Dificuldades de relacionamento interpessoal",
    pacientesAfetados: 15
  },
  {
    categoria: "Burnout",
    nivel: 60,
    tendencia: "up",
    descricao: "Esgotamento físico e mental",
    pacientesAfetados: 22
  },
  {
    categoria: "Ansiedade",
    nivel: 55,
    tendencia: "down",
    descricao: "Transtornos de ansiedade generalizada",
    pacientesAfetados: 18
  }
];

export default function FatoresRiscoPage() {
  return (

    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fatores de Risco</h1>
        <p className="text-gray-600 mt-1">Monitore os principais fatores de risco identificados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockFatoresRisco.map((fator, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${fator.nivel >= 70 ? 'bg-red-100' :
                    fator.nivel >= 50 ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                    <Target className={`h-5 w-5 ${fator.nivel >= 70 ? 'text-red-600' :
                      fator.nivel >= 50 ? 'text-yellow-600' : 'text-green-600'
                      }`} />
                  </div>
                  <CardTitle className="text-lg">{fator.categoria}</CardTitle>
                </div>
                <div className="flex items-center space-x-1">
                  {fator.tendencia === "up" ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Nível de Risco</span>
                  <span className="font-semibold">{fator.nivel}%</span>
                </div>
                <Progress value={fator.nivel} className="h-2" />
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">{fator.descricao}</p>
                <div className="flex items-center space-x-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <span>{fator.pacientesAfetados} pacientes afetados</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>

  );
}
