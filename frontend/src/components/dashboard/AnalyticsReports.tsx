"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, BarChart3, Activity, Users, Download } from "lucide-react";

const AnalyticsReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Relatórios e Análises</h2>
        <Button className="bg-mental-purple hover:bg-mental-purple-dark">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
            <PieChart className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Avaliações realizadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participantes</CardTitle>
            <Users className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              Total de participantes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nível de Risco Médio</CardTitle>
            <Activity className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Médio</div>
            <p className="text-xs text-muted-foreground">
              Baseado nas avaliações
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Níveis de Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de Distribuição de Riscos</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Evolução dos Riscos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de Evolução</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Riscos por Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de Riscos por Departamento</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtividade vs. Riscos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de Correlação</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Principais Indicadores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Absenteísmo</h4>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-mental-purple rounded-full" style={{ width: '15%' }}></div>
                </div>
                <p className="text-sm text-muted-foreground">15% - Abaixo da média do setor</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Presenteísmo</h4>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-mental-purple rounded-full" style={{ width: '25%' }}></div>
                </div>
                <p className="text-sm text-muted-foreground">25% - Necessita atenção</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Turnover</h4>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-mental-purple rounded-full" style={{ width: '12%' }}></div>
                </div>
                <p className="text-sm text-muted-foreground">12% - Dentro do esperado</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Satisfação</h4>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-mental-purple rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-sm text-muted-foreground">85% - Acima da média</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsReports; 