import type { Product, Order } from './types'

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL

export async function getProducts(): Promise<Product[]> {
    const res = await fetch(`${PRODUCT_SERVICE_URL}/api/products`, {
        cache: 'no-store',
    })
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
}

export async function getOrders(): Promise<Order[]> {
    const res = await fetch(`${ORDER_SERVICE_URL}/api/orders`, {
        cache: 'no-store',
    })
    if (!res.ok) throw new Error('Failed to fetch orders')
    return res.json()
}