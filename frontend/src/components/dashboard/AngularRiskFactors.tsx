"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AngularRiskFactors = () => {
  const riskFactors = [
    {
      id: 1,
      name: "Auto-Conhecimento",
      totalColaboradores: 150,
      criticos: 45,
      description: "Resultado da soma das questões 1-6",
      level: "ALTO",
      details: "45 colaboradores apresentam baixo auto-conhecimento, necessitando de atenção imediata.",
      criticosPorcentagem: 30
    },
    {
      id: 2,
      name: "Propósito e Conexão",
      totalColaboradores: 150,
      criticos: 38,
      description: "Resultado da soma das questões 7-11",
      level: "ALTO",
      details: "38 colaboradores demonstram desconexão com propósito, indicando necessidade de intervenção.",
      criticosPorcentagem: 25
    },
    {
      id: 3,
      name: "Desenvolvimento Pessoal",
      totalColaboradores: 150,
      criticos: 52,
      description: "Resultado da soma das questões 12-16",
      level: "ALTÍSSIMO",
      details: "52 colaboradores apresentam baixo desenvolvimento pessoal, requerendo ações prioritárias.",
      criticosPorcentagem: 35
    },
    {
      id: 4,
      name: "Impacto Social",
      totalColaboradores: 150,
      criticos: 41,
      description: "Resultado da soma das questões 17-25",
      level: "ALTO",
      details: "41 colaboradores mostram baixo impacto social, necessitando de desenvolvimento.",
      criticosPorcentagem: 27
    }
  ];

  const chartData = riskFactors.map(factor => ({
    name: factor.name,
    criticos: factor.criticos,
    total: factor.totalColaboradores
  }));

  const pieData = [
    { name: 'Críticos', value: riskFactors.reduce((acc, curr) => acc + curr.criticos, 0) },
    { name: 'Estáveis', value: riskFactors[0].totalColaboradores - riskFactors.reduce((acc, curr) => acc + curr.criticos, 0) }
  ];

  const COLORS = ['#ef4444', '#22c55e'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fatores de Risco Angular</h2>
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle className="h-5 w-5" />
          <span className="font-semibold">176 Colaboradores em Situação Crítica</span>
        </div>
      </div>

      <Alert variant="destructive" className="mb-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>
          Existem colaboradores em situação crítica em todos os fatores. Recomenda-se intervenção imediata.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {riskFactors.map((factor) => (
          <Card key={factor.id} className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-mental-purple">
                {factor.name}
              </CardTitle>
              <p className="text-sm text-gray-500">{factor.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Críticos: {factor.criticos}</span>
                  <span className="text-sm font-medium text-red-500">{factor.criticosPorcentagem}%</span>
                </div>
                <Progress value={factor.criticosPorcentagem} className="h-2" />
                <p className="text-sm text-gray-600 mt-2">{factor.details}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-mental-purple">
              Distribuição de Criticidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-mental-purple">
              Colaboradores em Situação Crítica por Fator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="criticos" fill="#ef4444" name="Colaboradores Críticos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AngularRiskFactors; 