const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL

if (!PRODUCT_SERVICE_URL) {
    throw new Error('PRODUCT_SERVICE_URL environment variable is not set')
}

export type Product = {
    id: number
    name: string
    description: string
    price: string
    stock: number
}

export async function getProductById(id: number): Promise<Product | null> {
    const res = await fetch(`${PRODUCT_SERVICE_URL}/api/products/${id}`, {
        cache: 'no-store',    // always fetch fresh — no Next.js caching
    })

    if (res.status === 404) return null

    if (!res.ok) {
        throw new Error(
            `Product service responded with ${res.status} for product ${id}`
        )
    }

    return res.json()
}