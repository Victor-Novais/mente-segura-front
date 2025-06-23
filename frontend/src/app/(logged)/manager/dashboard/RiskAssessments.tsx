"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, ClipboardCheck, Activity, Users } from "lucide-react";

const RiskAssessments = () => {
  const assessments = [
    {
      id: 1,
      organization: "Empresa ABC Ltda.",
      department: "TI",
      date: "15/03/2024",
      riskLevel: "Médio",
      status: "Concluído",
      participants: 45
    },
    {
      id: 2,
      organization: "Tech Solutions",
      department: "RH",
      date: "10/03/2024",
      riskLevel: "Baixo",
      status: "Concluído",
      participants: 28
    },
    {
      id: 3,
      organization: "Inovação Digital",
      department: "Marketing",
      date: "05/03/2024",
      riskLevel: "Alto",
      status: "Em Andamento",
      participants: 32
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Avaliações de Risco</h2>
        <Button className="bg-mental-purple hover:bg-mental-purple-dark">
          <Plus className="h-4 w-4 mr-2" />
          Nova Avaliação
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessments.length}</div>
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
            <div className="text-2xl font-bold">
              {assessments.reduce((acc, assessment) => acc + assessment.participants, 0)}
            </div>
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

      <Card>
        <CardHeader>
          <CardTitle>Lista de Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar avaliações..." className="pl-8" />
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organização</TableHead>
                <TableHead>Departamento</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Nível de Risco</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell>{assessment.organization}</TableCell>
                  <TableCell>{assessment.department}</TableCell>
                  <TableCell>{assessment.date}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      assessment.riskLevel === 'Baixo' ? 'bg-green-100 text-green-800' :
                      assessment.riskLevel === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {assessment.riskLevel}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      assessment.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {assessment.status}
                    </span>
                  </TableCell>
                  <TableCell>{assessment.participants}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessments; 