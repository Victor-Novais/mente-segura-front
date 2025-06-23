'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-browser'
import { toast } from 'sonner'

export default function OAuthCallbackPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        console.log('[OAuth] Callback page loaded');
        const url = new URL(window.location.href);
        let code = url.searchParams.get('code');

        // Workaround: extrai access_token do hash se não houver code
        if (!code && window.location.hash) {
            const params = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = params.get('access_token');
            if (accessToken) {
                (async () => {
                    console.warn('[OAuth] Usando access_token do hash (implicit flow)');
                    localStorage.setItem('token', accessToken);
                    document.cookie = `token=${accessToken}; path=/`;
                    // Obter perfil do usuário do Supabase e salvar no localStorage
                    try {
                        const { data: { user } } = await supabase.auth.getUser(accessToken);
                        if (user) {
                            localStorage.setItem('userProfile', JSON.stringify({
                                name: user.user_metadata?.name || '',
                                email: user.email || '',
                            }));
                        }
                    } catch (e) {
                        console.warn('[OAuth] Não foi possível obter perfil do usuário do Supabase:', e);
                    }
                    // Busca o perfil do usuário no backend
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    })
                        .then(res => {
                            if (res.status === 401) {
                                // Usuário não existe no backend, precisa completar o cadastro
                                router.replace('/register/complete-profile');
                                return null;
                            }
                            if (!res.ok) throw new Error('Não autorizado');
                            return res.json();
                        })
                        .then(data => {
                            if (!data) return; // já redirecionou acima
                            const user = data.user;
                            document.cookie = `userRole=${user.role}; path=/`;
                            document.cookie = `profileCompleted=${user.profileCompleted}; path=/`;
                            if (!user.profileCompleted) {
                                router.replace('/register/complete-profile');
                            } else {
                                switch (user.role) {
                                    case 'gestor':
                                        router.replace('/manager');
                                        break;
                                    case 'profissional':
                                        router.replace('/professional');
                                        break;
                                    case 'colaborador':
                                        router.replace('/collaborator');
                                        break;
                                    default:
                                        router.replace('/');
                                }
                            }
                        })
                        .catch(err => {
                            toast.error('Não foi possível autenticar com Google. Tente novamente.');
                            router.replace('/login');
                        });
                })();
                return;
            }
        }

        const handleOAuth = async () => {
            try {
                if (!code) {
                    toast.error('Código OAuth não encontrado.')
                    router.replace('/signin')
                    return
                }

                // 2) troca code por sessão
                const { data, error } = await supabase.auth.exchangeCodeForSession(code)
                console.log('[OAuth] exchangeCodeForSession:', { data, error })

                if (error || !data.session) {
                    toast.error(error?.message || 'Falha na troca de código por sessão.')
                    router.replace('/signin')
                    return
                }

                const session = data.session
                const jwtToken = session.access_token
                console.log('[OAuth] Session:', session)

                // 3) callback no backend
                console.log('[OAuth] Fazendo POST para /auth/oauth/callback...')
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/callback`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${jwtToken}`,
                        },
                        body: JSON.stringify({ user: session.user, session }),
                    }
                )
                console.log('[OAuth] Resposta do backend:', res)

                if (!res.ok) {
                    const text = await res.text()
                    console.error('[OAuth] Erro no backend OAuth callback:', text)
                    toast.error('Erro ao processar callback no servidor.')
                    router.replace('/signin')
                    return
                }

                const { access_token: appJwt, user } = await res.json()
                console.log('[OAuth] Dados recebidos do backend:', { appJwt, user })

                // 4) guarda token e role
                localStorage.setItem('token', appJwt)
                document.cookie = `token=${appJwt}; path=/`
                document.cookie = `userRole=${user.role}; path=/`
                document.cookie = `profileCompleted=${user.profileCompleted}; path=/`

                // limpa dados temporários
                localStorage.removeItem('registerEmail')
                localStorage.removeItem('userProfile')

                toast.success('Login efetuado com sucesso!')

                // 5) redireciona de acordo com profileCompleted/role
                if (!user.profileCompleted) {
                    console.log('[OAuth] Redirecionando para /register/complete-profile')
                    return router.replace('/register/complete-profile')
                }
                switch (user.role) {
                    case 'gestor':
                        console.log('[OAuth] Redirecionando para /manager')
                        return router.replace('/manager')
                    case 'profissional':
                        console.log('[OAuth] Redirecionando para /professional')
                        return router.replace('/professional')
                    case 'colaborador':
                        console.log('[OAuth] Redirecionando para /collaborator')
                        return router.replace('/collaborator')
                    default:
                        console.log('[OAuth] Redirecionando para /')
                        return router.replace('/')
                }
            } catch (err) {
                console.error('[OAuth] Erro inesperado:', err)
                toast.error('Erro inesperado no login OAuth.')
                router.replace('/signin')
            }
        }

        handleOAuth()
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            {loading && <p className="text-gray-500">Finalizando autenticação…</p>}
        </div>
    )
}
