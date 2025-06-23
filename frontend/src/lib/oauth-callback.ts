// src/lib/oauth-callback.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).end()
    // simplesmente repassa pro seu backend NestJS
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/callback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
    })
    if (!response.ok) {
        return res.status(response.status).json(await response.json())
    }
    const data = await response.json()
    // guarda token/cookie e redireciona pra rota principal
    res.setHeader('Set-Cookie', `token=${data.access_token}; Path=/; HttpOnly`)
    res.status(200).json(data)
}
