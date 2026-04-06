import { getOrders } from '@/lib/api'

export default async function OrdersPage() {
    const orders = await getOrders()

    return (
        <main>
            <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem' }}>Orders</h1>

            {orders.length === 0 ? (
                <p style={{ color: '#666' }}>No orders yet. Place one from the Products page.</p>
            ) : (
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {orders.map(order => (
                        <div
                            key={order.id}
                            style={{
                                border: '1px solid #eee',
                                borderRadius: 8,
                                padding: '1rem 1.25rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <div>
                                <p style={{ fontWeight: 500, margin: '0 0 0.25rem' }}>
                                    {order.product_name}
                                </p>
                                <p style={{ fontSize: 13, color: '#666', margin: 0 }}>
                                    Qty: {order.quantity} · ${order.unit_price} each
                                </p>
                                <p style={{ fontSize: 12, color: '#999', margin: '0.25rem 0 0' }}>
                                    Order #{order.id} · {new Date(order.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontWeight: 600, fontSize: 18 }}>${order.total_price}</span>
                                <p style={{ fontSize: 12, color: '#888', margin: '0.25rem 0 0', textTransform: 'capitalize' }}>
                                    {order.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}