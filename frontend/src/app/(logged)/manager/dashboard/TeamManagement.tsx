'use client';
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Users, Loader2 } from "lucide-react";
import { InviteCollaboratorModal } from "@/components/modals/InviteCollaboratorModal";
import api from "@/lib/api";

interface Employee {
  id: string;
  name: string;
  role: string;
  department?: { name: string } | null;
  isActive: boolean;
}

const TeamManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Busca apenas os colaboradores vinculados à empresa do usuário logado
  useEffect(() => {
    async function fetchEmployees() {
      try {
        setLoading(true);
        // Chama o endpoint que retorna todos os usuários da mesma organização do gestor
        const response = await api.get<Employee[]>("/users/me/organization");
        const users = response.data;

        // Mapeia para a interface “Employee”
        const mapped: Employee[] = users.map((u: any) => ({
          id: u.id, // supondo que o backend retorne “id” diretamente
          name: u.name,
          role: u.role,
          department: u.userCompanyDepartments?.[0]?.department
            ? { name: u.userCompanyDepartments[0].department.name }
            : null,
          isActive: true, // ou use algum campo vindo do backend, se existir
        }));
        setEmployees(mapped);
      } catch (error) {
        console.error("Erro ao buscar colaboradores:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  // Filtra localmente por nome
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Título + botão de novo colaborador */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Gerenciamento de Colaboradores</h2>
        <Button
          className="bg-mental-purple hover:bg-mental-purple-dark"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Colaborador
        </Button>
      </div>

      {/* Tabela de Colaboradores */}
      <Card>
        <CardHeader>
          <CardTitle>Colaboradores</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Barra de busca */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar colaboradores..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">Filtrar</Button>
          </div>

          {/* Loading spinner ou tabela */}
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-mental-purple" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.department?.name ?? "-"}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {employee.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Editar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredEmployees.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Nenhum colaborador encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Colaboradores
            </CardTitle>
            <Users className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">
              Colaboradores ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
            <Users className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                Array.from(
                  new Set(
                    employees
                      .map((emp) => emp.department?.name)
                      .filter((d) => d !== undefined && d !== null)
                  )
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Departamentos ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avaliações Pendentes
            </CardTitle>
            <Users className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            {/* Ajuste conforme seu endpoint de avaliações */}
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Avaliações para realizar
            </p>
          </CardContent>
        </Card>
      </div>

      <InviteCollaboratorModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          // Recarrega a lista após fechar o modal
          api.get<Employee[]>("/users/me/organization").then((res) => {
            const users = res.data;
            const remapped: Employee[] = users.map((u: any) => ({
              id: u.id,
              name: u.name,
              role: u.role,
              department: u.userCompanyDepartments?.[0]?.department
                ? { name: u.userCompanyDepartments[0].department.name }
                : null,
              isActive: true,
            }));
            setEmployees(remapped);
          });
        }}
      />
    </div>
  );
};

export default TeamManagement;
