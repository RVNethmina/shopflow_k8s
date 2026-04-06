import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const res = await fetch(
            `${process.env.ORDER_SERVICE_URL}/api/orders`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
        )

        const data = await res.json()
        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        console.error('Order proxy error:', error)
        return NextResponse.json(
            { error: 'Failed to reach order service' },
            { status: 502 }
        )
    }
}