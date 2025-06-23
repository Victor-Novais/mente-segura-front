'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { supabase } from '@/lib/supabase-browser'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { login } from '@/lib/services/auth'

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Garante que o usuário volte para /oauth/callback
        redirectTo: `${window.location.origin}/oauth/callback`,
        // NÃO adicione flow: 'implicit'
      },
    })

    if (error) {
      toast.error(`Falha ao iniciar OAuth com Google: ${error.message}`)
      setIsLoading(false)
    }
    // Se não houve erro, o Supabase já redireciona o browser para /oauth/callback
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const toastId = toast.loading('Verificando suas credenciais...')
    setIsLoading(true)

    try {
      const res = await login(formData.email, formData.password)

      // 1) Armazena token e papel do usuário
      localStorage.setItem('token', res.access_token)
      document.cookie = `token=${res.access_token}; path=/`
      document.cookie = `userRole=${res.user.role}; path=/`
      document.cookie = `profileCompleted=${res.user.profileCompleted}; path=/`

      toast.success('Login realizado com sucesso!', { id: toastId })

      // 2) Se gestor e onboarding pendente, vai para /onboarding
      if (res.user.role === 'gestor' && !res.user.onboardingCompleted) {
        return router.push('/onboarding')
      }

      // 3) Se perfil não está completo, vai para complete-profile
      if (!res.user.profileCompleted) {
        return router.push('/register/complete-profile')
      }

      // 4) Redireciona para o dashboard adequado
      switch (res.user.role) {
        case 'gestor':
          router.push('/manager')
          break
        case 'profissional':
          router.push('/professional')
          break
        case 'colaborador':
          router.push('/collaborator')
          break
        default:
          router.push('/')
      }
    } catch (err: any) {
      console.error('Erro ao fazer login:', err)
      toast.error(err.response?.data?.message || 'Email ou senha inválidos', { id: toastId })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-mental-purple/10 to-mental-purple/5 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Bem-vindo de volta!</h2>
        <p className="text-center text-gray-500 mb-6">Entre com seu e-mail e senha</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                disabled={isLoading}
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                disabled={isLoading}
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="pl-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-mental-purple hover:bg-mental-purple-dark"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </Button>
        </form>

        {/* Separador */}
        <div className="flex items-center my-6">
          <span className="flex-grow border-t border-gray-200" />
          <span className="px-4 text-sm text-gray-500 uppercase">ou entrar com</span>
          <span className="flex-grow border-t border-gray-200" />
        </div>

        {/* Botão Google */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center space-x-2 px-4 py-2"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <FcGoogle className="h-5 w-5" />
          <span>Google</span>
        </Button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem conta?{' '}
          <Link href="/register/choice" className="text-mental-purple hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}