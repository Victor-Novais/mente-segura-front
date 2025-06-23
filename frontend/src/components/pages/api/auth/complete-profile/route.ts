import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json()

    try {
        const token = req.headers.get('authorization')
        const response = await fetch(
            `${process.env.BACKEND_URL}/auth/complete-profile`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // repassa o Bearer token
                    Authorization: token || '',
                },
                body: JSON.stringify(body),
            }
        )
        const data = await response.json()
        return NextResponse.json(data, { status: response.status })
    } catch (err) {
        console.error('Erro proxy complete-profile:', err)
        return NextResponse.json(
            { message: 'Erro interno no servidor' },
            { status: 500 }
        )
    }
}
