// src/lib/services/departments.ts
import axios from '@/lib/api'

export interface Department {
    id: string
    name: string
    organizationId: string
    created_at?: string | null
}

/**
 * Busca os departamentos de uma organização pelo código de registro.
 * Retorna um array de Department.
 */
export async function getDepartmentsByCode(code: string): Promise<Department[]> {
    const res = await axios.get<{ departments: Department[] }>(
        `/departments/by-code/${code}`
    )
    return res.data.departments
}

/**
 * Busca todos os departamentos de uma organização.
 */
export async function getDepartments(
    organizationId: string
): Promise<Department[]> {
    const res = await axios.get<Department[]>(`/departments/${organizationId}`)
    return res.data
}

/**
 * Cria um novo departamento na organização.
 * Retorna o departamento criado.
 */
export async function createDepartment(data: {
    name: string
    organizationId: string
}): Promise<Department> {
    const res = await axios.post<Department>('/departments', data)
    return res.data
}

/**
 * Atualiza somente o nome de um departamento.
 * Retorna o departamento atualizado.
 */
export async function updateDepartment(
    id: string,
    data: { name: string }
): Promise<Department> {
    const res = await axios.patch<Department>(`/departments/${id}`, data)
    return res.data
}

/**
 * Remove um departamento pelo seu ID.
 */
export async function deleteDepartment(id: string): Promise<void> {
    await axios.delete(`/departments/${id}`)
}
