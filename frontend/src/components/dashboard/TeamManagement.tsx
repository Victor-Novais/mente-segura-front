'use client'

import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Search, Users, Loader2 } from 'lucide-react'
import { InviteCollaboratorModal } from '@/components/modals/InviteCollaboratorModal'
import api from '@/lib/api'

interface Employee {
  id: string
  name: string
  role: string
  departments: string[]
  isActive: boolean
}

const TeamManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const response = await api.get('/users/me/organization')
      const users = response.data.users ?? []

      const mapped: Employee[] = users.map((u: any) => {
        const rawNames = u.userCompanyDepartments?.map((d: any) => d.department?.name) ?? []

        const names = rawNames.filter(
          (name: unknown): name is string =>
            typeof name === 'string' && name.trim() !== ''
        )

        const unique = Array.from(new Set(names))

        return {
          id: u.id,
          name: u.name,
          role: u.role,
          departments: unique,
          isActive: true,
        }
      })

      setEmployees(mapped)
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
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

      <Card>
        <CardHeader>
          <CardTitle>Colaboradores</CardTitle>
        </CardHeader>
        <CardContent>
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
                    <TableCell>
                      {employee.departments.length > 0 ? (
                        employee.departments.join(', ')
                      ) : (
                        <span className="text-xs italic text-muted-foreground">
                          Sem departamento
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {employee.isActive ? 'Ativo' : 'Inativo'}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Colaboradores</CardTitle>
            <Users className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">Colaboradores ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Departamentos</CardTitle>
            <Users className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Array.from(new Set(employees.flatMap(emp => emp.departments))).length}
            </div>
            <p className="text-xs text-muted-foreground">Departamentos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avaliações Pendentes</CardTitle>
            <Users className="h-4 w-4 text-mental-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Avaliações para realizar</p>
          </CardContent>
        </Card>
      </div>

      <InviteCollaboratorModal
        open={openModal}
        onClose={() => {
          setOpenModal(false)
          fetchEmployees()
        }}
      />
    </div>
  )
}

export default TeamManagement
