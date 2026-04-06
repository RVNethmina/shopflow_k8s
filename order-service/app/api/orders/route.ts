import { NextResponse } from 'next/server'
import pool from '@/lib/db'
import { getProductById } from '@/lib/product-client'

// GET /api/orders — list all orders
export async function GET() {
    try {
        const result = await pool.query(
            'SELECT * FROM orders ORDER BY created_at DESC'
        )
        return NextResponse.json(result.rows)
    } catch (error) {
        console.error('GET /api/orders error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        )
    }
}

// POST /api/orders — create an order
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { product_id, quantity } = body

        if (!product_id || !quantity || quantity < 1) {
            return NextResponse.json(
                { error: 'product_id and a quantity of at least 1 are required' },
                { status: 400 }
            )
        }

        // Step 1: validate the product exists by calling the Product service
        const product = await getProductById(product_id)

        if (!product) {
            return NextResponse.json(
                { error: `Product ${product_id} not found` },
                { status: 404 }
            )
        }

        // Step 2: calculate total and insert the order
        const unitPrice = parseFloat(product.price)
        const totalPrice = unitPrice * quantity

        const result = await pool.query(
            `INSERT INTO orders (product_id, product_name, quantity, unit_price, total_price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [product_id, product.name, quantity, unitPrice, totalPrice]
        )

        return NextResponse.json(result.rows[0], { status: 201 })
    } catch (error) {
        console.error('POST /api/orders error:', error)
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        )
    }
}