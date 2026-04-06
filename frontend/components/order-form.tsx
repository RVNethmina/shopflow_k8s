'use client'

import { useState } from 'react'
import type { Product } from '@/lib/types'

export default function OrderForm({ products }: { products: Product[] }) {
    const [productId, setProductId] = useState<string>(
        products[0]?.id.toString() ?? ''
    )
    const [quantity, setQuantity] = useState<string>('1')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [message, setMessage] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus('loading')
        setMessage('')

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product_id: parseInt(productId),
                    quantity: parseInt(quantity),
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setStatus('error')
                setMessage(data.error ?? 'Something went wrong')
                return
            }

            setStatus('success')
            setMessage(
                `Order #${data.id} placed — ${data.product_name} x${data.quantity} for $${data.total_price}`
            )
        } catch {
            setStatus('error')
            setMessage('Could not reach the server')
        }
    }

    const selectedProduct = products.find(p => p.id.toString() === productId)

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 400 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: 14, color: '#555' }}>Product</label>
                <select
                    value={productId}
                    onChange={e => setProductId(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ddd', fontSize: 14 }}
                >
                    {products.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.name} — ${p.price}
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: 14, color: '#555' }}>Quantity</label>
                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: 6, border: '1px solid #ddd', fontSize: 14, width: 100 }}
                />
            </div>

            {selectedProduct && quantity && (
                <p style={{ fontSize: 13, color: '#555', margin: 0 }}>
                    Total: ${(parseFloat(selectedProduct.price) * parseInt(quantity || '0')).toFixed(2)}
                </p>
            )}

            <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                    padding: '0.6rem 1.2rem',
                    background: '#111',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 14,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    width: 'fit-content',
                    opacity: status === 'loading' ? 0.6 : 1,
                }}
            >
                {status === 'loading' ? 'Placing order...' : 'Place order'}
            </button>

            {message && (
                <p style={{
                    fontSize: 13,
                    margin: 0,
                    padding: '0.5rem 0.75rem',
                    borderRadius: 6,
                    background: status === 'success' ? '#f0fdf4' : '#fef2f2',
                    color: status === 'success' ? '#166534' : '#991b1b',
                }}>
                    {message}
                </p>
            )}
        </form>
    )
}