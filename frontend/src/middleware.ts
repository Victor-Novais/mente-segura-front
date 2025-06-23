// File: middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const userRole = request.cookies.get('userRole')?.value
  const profileCompleted = request.cookies.get('profileCompleted')?.value
  const { pathname } = request.nextUrl

  // 1) Fluxos públicos de demo e OAuth callback
  if (
    pathname.startsWith('/demo') ||
    pathname === '/oauth/callback' ||          // página cliente
    pathname.startsWith('/api/auth/oauth/callback') // rota proxy
  ) {
    return NextResponse.next()
  }

  // 2) Rotas públicas que não exigem token
  const publicRoutes = [
    '/',
    '/home',
    '/login',
    '/register/choice',
    '/register/collaborator',
    '/register/company',
    '/register/professional',
    '/forgot-password',
    '/calculadora',
    '/terms',
  ]

  if (publicRoutes.includes(pathname)) {
    // se já logado e tentar acessar "/", redireciona pro dashboard
    if (pathname === '/' && token) {
      switch (userRole) {
        case 'gestor':
          return NextResponse.redirect(new URL('/manager', request.url))
        case 'profissional':
          return NextResponse.redirect(new URL('/professional', request.url))
        case 'colaborador':
          return NextResponse.redirect(new URL('/collaborator', request.url))
      }
    }
    return NextResponse.next()
  }

  // 3) Rotas protegidas por papel
  if (
    pathname.startsWith('/manager') ||
    pathname.startsWith('/professional') ||
    pathname.startsWith('/collaborator')
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // Se perfil não está completo, redireciona para complete-profile
    if (profileCompleted === 'false') {
      return NextResponse.redirect(new URL('/register/complete-profile', request.url))
    }
    if (
      pathname.startsWith('/manager') &&
      userRole !== 'gestor'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
    if (
      pathname.startsWith('/professional') &&
      userRole !== 'profissional'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
    if (
      pathname.startsWith('/collaborator') &&
      userRole !== 'colaborador'
    ) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
    return NextResponse.next()
  }

  // 4) Qualquer outra rota exige estar logado
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // protege tudo, exceto _next, public, api/auth/oauth-callback, etc.
  matcher: [

    '/((?!api/auth/oauth/callback|auth/oauth/callback|_next/static|_next/image|favicon.ico).*)'
  ],
}
