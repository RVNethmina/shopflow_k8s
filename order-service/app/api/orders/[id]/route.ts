import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        const result = await pool.query(
            'SELECT * FROM orders WHERE id = $1',
            [id]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(result.rows[0])
    } catch (error) {
        console.error('GET /api/orders/:id error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch order' },
            { status: 500 }
        )
    }
}