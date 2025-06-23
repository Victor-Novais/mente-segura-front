import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json()

    try {
    
        const resp = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/oauth/callback`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        )
        const data = await resp.json()
        return NextResponse.json(data, { status: resp.status })
    } catch (err) {
        console.error('[proxy oauth/callback]', err)
        return NextResponse.json(
            { message: 'Erro interno no proxy OAuth' },
            { status: 500 }
        )
    }
}