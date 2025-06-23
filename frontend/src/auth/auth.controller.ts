import { UnauthorizedException } from '@nestjs/common';

/**
 * Endpoint temporário: troca access_token do Supabase por JWT da aplicação
 */
@Post('supabase-oauth')
async supabaseOAuth(@Body() body: { access_token: string }) {
    const { access_token } = body;
    // Troque pelo seu projeto Supabase
    const supabaseUrl = 'https://<YOUR_SUPABASE_PROJECT>.supabase.co';
    const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
        headers: { Authorization: `Bearer ${access_token}` }
    });
    if (!res.ok) throw new UnauthorizedException('Token inválido do Supabase');
    const user = await res.json();

    // Verifica se o usuário já existe na base
    let dbUser = await this.auth.prisma.user.findUnique({ where: { email: user.email } });
    if (!dbUser) {
        dbUser = await this.auth.prisma.user.create({
            data: {
                email: user.email,
                name: user.user_metadata?.name || user.email,
                role: 'colaborador', // ou outro padrão
                profileCompleted: false,
                emailConfirmed: true,
                supabaseId: user.id,
                slug: user.id,
            }
        });
    }

    // Gera JWT da aplicação
    const access_token_app = this.auth.jwtService.sign({
        sub: dbUser.id,
        role: dbUser.role,
    });

    return {
        access_token: access_token_app,
        user: dbUser,
    };
} 