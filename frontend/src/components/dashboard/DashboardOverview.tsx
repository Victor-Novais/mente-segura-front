"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Activity, Brain, ClipboardCheck } from "lucide-react";

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
            <Users className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +12% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Realizadas</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              +5% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nível de Risco</CardTitle>
            <Activity className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Médio</div>
            <p className="text-xs text-muted-foreground">
              -2% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtividade</CardTitle>
            <BarChart3 className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">
              +8% em relação ao mês anterior
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fatores de Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm mb-2">Principais fatores psicossociais identificados</p>
              <div className="flex items-end justify-between h-56 w-full gap-4">
                {[
                  { label: 'Estresse excessivo', value: 68 },
                  { label: 'Sobrecarga de trabalho', value: 82 },
                  { label: 'Assédio moral', value: 24 },
                  { label: 'Falta de autonomia', value: 46 },
                  { label: 'Conflitos interpessoais', value: 37 },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center w-1/5">
                    <span className="mb-2 text-sm font-semibold text-foreground">{item.value}%</span>
                    <div className="w-8 bg-mental-purple/20 rounded-t-lg flex items-end">
                      <div
                        className="bg-mental-purple w-8 rounded-t-lg transition-all duration-500"
                        style={{ height: `${item.value * 2}px` }}
                      ></div>
                    </div>
                    <span className="mt-2 text-xs text-center text-foreground break-words">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtividade por Departamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-sm mb-2">Produtividade dos departamentos no último mês</p>
                {[
                  { label: 'RH', value: 78 },
                  { label: 'Financeiro', value: 85 },
                  { label: 'TI', value: 92 },
                  { label: 'Comercial', value: 69 },
                  { label: 'Operações', value: 81 },
                ].map((item) => (
                  <div key={item.label} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <span className="text-sm font-semibold text-foreground">{item.value}%</span>
                    </div>
                    <div className="w-full bg-mental-purple/20 rounded-full h-3">
                      <div
                        className="h-3 rounded-full bg-mental-purple transition-all duration-500"
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Planos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <ClipboardCheck className="h-6 w-6 text-mental-purple mt-1" />
              <div>
                <p className="font-semibold text-foreground">Plano de Ação</p>
                <p className="text-sm text-muted-foreground">Ações corretivas para tratar fatores de risco identificados e melhorar o ambiente de trabalho.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <Brain className="h-6 w-6 text-mental-purple mt-1" />
              <div>
                <p className="font-semibold text-foreground">Plano Preventivo</p>
                <p className="text-sm text-muted-foreground">Medidas para evitar o surgimento de novos riscos psicossociais e promover a saúde mental.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
              <Activity className="h-6 w-6 text-mental-purple mt-1" />
              <div>
                <p className="font-semibold text-foreground">Plano Contingencial</p>
                <p className="text-sm text-muted-foreground">Estratégias para lidar rapidamente com situações críticas e emergenciais no ambiente de trabalho.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview; 