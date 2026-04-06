export type Product = {
    id: number
    name: string
    description: string
    price: string
    stock: number
    created_at: string
}

export type Order = {
    id: number
    product_id: number
    product_name: string
    quantity: number
    unit_price: string
    total_price: string
    status: string
    created_at: string
}