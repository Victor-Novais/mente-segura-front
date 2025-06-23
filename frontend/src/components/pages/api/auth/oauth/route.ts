import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
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
}

export async function GET() {
    return NextResponse.json({ message: 'Método não permitido' }, { status: 405 })
}