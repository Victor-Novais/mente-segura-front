"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Building, Users, Activity } from "lucide-react";

const OrganizationsList = () => {
  const organizations = [
    { 
      id: 1, 
      name: "Empresa ABC Ltda.", 
      employees: 150, 
      riskLevel: "Médio",
      lastAssessment: "15/03/2024",
      status: "Ativo"
    },
    { 
      id: 2, 
      name: "Tech Solutions", 
      employees: 89, 
      riskLevel: "Baixo",
      lastAssessment: "10/03/2024",
      status: "Ativo"
    },
    { 
      id: 3, 
      name: "Inovação Digital", 
      employees: 234, 
      riskLevel: "Alto",
      lastAssessment: "05/03/2024",
      status: "Ativo"
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Organizações</h2>
        <Button className="bg-mental-purple hover:bg-mental-purple-dark">
          <Plus className="h-4 w-4 mr-2" />
          Nova Organização
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Organizações</CardTitle>
            <Building className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{organizations.length}</div>
            <p className="text-xs text-muted-foreground">
              Organizações ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
            <Users className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {organizations.reduce((acc, org) => acc + org.employees, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Colaboradores ativos
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
          <CardTitle>Lista de Organizações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar organizações..." className="pl-8" />
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Colaboradores</TableHead>
                <TableHead>Nível de Risco</TableHead>
                <TableHead>Última Avaliação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>{org.name}</TableCell>
                  <TableCell>{org.employees}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      org.riskLevel === 'Baixo' ? 'bg-green-100 text-green-800' :
                      org.riskLevel === 'Médio' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {org.riskLevel}
                    </span>
                  </TableCell>
                  <TableCell>{org.lastAssessment}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {org.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Editar
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

export default OrganizationsList; 