'use client'

import React, { useEffect, useState } from 'react'
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar,
  AlertTriangle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '@/lib/services/departments'

// --------------------------------------------------
// ATENÇÃO: garanta que no seu departments.ts a interface seja:
// export interface Department {
//   id: string
//   name: string
//   organizationId: string
//   created_at?: string | null
// }
// --------------------------------------------------

export interface Department {
  id: string
  name: string
  organizationId: string
  created_at?: string | null
}

export default function DepartamentosPage() {
  const [organizationId, setOrganizationId] = useState<string | null>(null)
  const [departamentos, setDepartamentos] = useState<Department[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDepartamento, setEditingDepartamento] = useState<Department | null>(null)
  const [nomeDepartamento, setNomeDepartamento] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({ nome: '' })

  // 1) Recupera organizationId do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('organizationId')
    if (stored) setOrganizationId(stored)
    else toast.error('Organização não identificada')
  }, [])

  // 2) Carrega lista de departamentos
  useEffect(() => {
    if (!organizationId) return
    getDepartments(organizationId)
      .then(setDepartamentos)
      .catch(() => toast.error('Erro ao buscar departamentos'))
  }, [organizationId])

  const departamentosFiltrados = departamentos.filter((dep) =>
    dep.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Valida nome
  const validateForm = () => {
    const newErr = { nome: '' }
    if (!nomeDepartamento.trim()) newErr.nome = 'Nome é obrigatório'
    else if (nomeDepartamento.trim().length < 2) newErr.nome = 'Mínimo 2 caracteres'
    const dup = departamentos.some(
      (d) =>
        d.name.toLowerCase() === nomeDepartamento.trim().toLowerCase() &&
        d.id !== editingDepartamento?.id
    )
    if (dup) newErr.nome = 'Já existe este departamento'
    setErrors(newErr)
    return !newErr.nome
  }

  const handleAdicionar = () => {
    setEditingDepartamento(null)
    setNomeDepartamento('')
    setErrors({ nome: '' })
    setIsModalOpen(true)
  }

  const handleEditar = (dep: Department) => {
    setEditingDepartamento(dep)
    setNomeDepartamento(dep.name)
    setErrors({ nome: '' })
    setIsModalOpen(true)
  }

  const handleSalvar = async () => {
    if (!validateForm()) return
    setIsLoading(true)
    try {
      if (editingDepartamento) {
        await updateDepartment(editingDepartamento.id, { name: nomeDepartamento.trim() })
        setDepartamentos((prev) =>
          prev.map((d) =>
            d.id === editingDepartamento.id ? { ...d, name: nomeDepartamento.trim() } : d
          )
        )
        toast.success('Departamento atualizado')
      } else {
        if (!organizationId) return
        const novo = await createDepartment({ name: nomeDepartamento.trim(), organizationId })
        setDepartamentos((prev) => [...prev, novo])
        toast.success('Departamento criado')
      }
      setIsModalOpen(false)
    } catch {
      toast.error('Erro ao salvar')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletar = async (id: string, nome: string) => {
    setIsLoading(true)
    try {
      await deleteDepartment(id)
      setDepartamentos((prev) => prev.filter((d) => d.id !== id))
      toast.success(`"${nome}" removido`)
    } catch {
      toast.error('Erro ao remover')
    } finally {
      setIsLoading(false)
    }
  }

  // Função segura p/ formatar data
  const formatDate = (s?: string | null) => {
    if (!s) return '-'
    const d = new Date(s)
    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('pt-BR')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* header + botão */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Departamentos</h1>
            <p className="mt-1 text-sm text-gray-600">
              Gerencie os departamentos da sua empresa
            </p>
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={handleAdicionar}
                className="mt-4 sm:mt-0 bg-mental-purple hover:bg-mental-purple/90 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo departamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingDepartamento ? 'Editar departamento' : 'Adicionar departamento'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Label htmlFor="nome">Nome *</Label>
                <Input
                  id="nome"
                  value={nomeDepartamento}
                  onChange={(e) => {
                    setNomeDepartamento(e.target.value)
                    if (errors.nome) setErrors({ nome: '' })
                  }}
                  placeholder="Ex: Financeiro"
                  className={errors.nome ? 'border-red-500' : ''}
                />
                {errors.nome && <p className="text-xs text-red-600">{errors.nome}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSalvar} disabled={isLoading}>
                  {isLoading ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* busca */}
        <Card className="mb-6">
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* tabela */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Lista de Departamentos ({departamentosFiltrados.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {departamentosFiltrados.length === 0 ? (
              <p className="text-center py-12">Nenhum departamento.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden md:table-cell">
                      <div className="flex items-center">
                        <Calendar className="mr-1" />
                        Criado em
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departamentosFiltrados.map((dep) => (
                    <TableRow key={dep.id}>
                      <TableCell>{dep.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(dep.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditar(dep)}
                          >
                            <Edit />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="text-red-600" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center">
                                  <AlertTriangle className="mr-2 text-red-600" />
                                  Confirmar exclusão
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Deseja remover <strong>{dep.name}</strong>?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeletar(dep.id, dep.name)}
                                  className="bg-red-600"
                                >
                                  Remover
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
