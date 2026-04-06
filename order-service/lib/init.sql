CREATE TABLE IF NOT EXISTS orders (
  id           SERIAL PRIMARY KEY,
  product_id   INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity     INTEGER NOT NULL,
  unit_price   NUMERIC(10, 2) NOT NULL,
  total_price  NUMERIC(10, 2) NOT NULL,
  status       VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);