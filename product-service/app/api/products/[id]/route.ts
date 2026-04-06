import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET /api/products/:id — get a single product
export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(result.rows[0])
    } catch (error) {
        console.error('GET /api/products/:id error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch product' },
            { status: 500 }
        )
    }
}

// DELETE /api/products/:id — delete a product
export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [id]
        )

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ deleted: result.rows[0] })
    } catch (error) {
        console.error('DELETE /api/products/:id error:', error)
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        )
    }
}