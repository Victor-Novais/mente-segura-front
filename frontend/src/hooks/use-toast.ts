// apps/frontend/src/hooks/use-toast.ts

import { toast as sonnerToast } from 'sonner'

/**
 * Hook personalizado para uso de toast com Sonner.
 * Permite futura extensão (ex: logs, tradução, contexto de usuário).
 */
export const useToast = () => {
    return {
        toast: sonnerToast,
    }
}
