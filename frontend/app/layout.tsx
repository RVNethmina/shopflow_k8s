export const metadata = { title: 'ShopFlow' }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
        <nav style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
          <a href="/" style={{ fontWeight: 600, textDecoration: 'none', color: '#111' }}>ShopFlow</a>
          <a href="/" style={{ textDecoration: 'none', color: '#555' }}>Products</a>
          <a href="/orders" style={{ textDecoration: 'none', color: '#555' }}>Orders</a>
        </nav>
        {children}
      </body>
    </html>
  )
}