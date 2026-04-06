import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET /api/products — list all products
export async function GET() {
    try {
        const result = await pool.query(
            'SELECT * FROM products ORDER BY created_at DESC'
        )
        return NextResponse.json(result.rows)
    } catch (error) {
        console.error('GET /api/products error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}

// POST /api/products — create a product
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, description, price, stock } = body

        if (!name || price === undefined) {
            return NextResponse.json(
                { error: 'name and price are required' },
                { status: 400 }
            )
        }

        const result = await pool.query(
            `INSERT INTO products (name, description, price, stock)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
            [name, description ?? '', price, stock ?? 0]
        )

        return NextResponse.json(result.rows[0], { status: 201 })
    } catch (error) {
        console.error('POST /api/products error:', error)
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        )
    }
}