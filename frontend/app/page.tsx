import { getProducts } from '@/lib/api'
import OrderForm from '@/components/order-form'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: '1.5rem' }}>Products</h1>

      <div style={{ display: 'grid', gap: '1rem', marginBottom: '3rem' }}>
        {products.map(product => (
          <div
            key={product.id}
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
              <p style={{ fontWeight: 500, margin: '0 0 0.25rem' }}>{product.name}</p>
              <p style={{ fontSize: 13, color: '#666', margin: 0 }}>{product.description}</p>
              <p style={{ fontSize: 12, color: '#999', margin: '0.25rem 0 0' }}>
                {product.stock} in stock
              </p>
            </div>
            <span style={{ fontWeight: 600, fontSize: 18 }}>${product.price}</span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: '1rem' }}>Place an order</h2>
      <OrderForm products={products} />
    </main>
  )
}