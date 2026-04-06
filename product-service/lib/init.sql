CREATE TABLE IF NOT EXISTS products (
  id        SERIAL PRIMARY KEY,
  name      VARCHAR(255) NOT NULL,
  description TEXT,
  price     NUMERIC(10, 2) NOT NULL,
  stock     INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO products (name, description, price, stock) VALUES
  ('Mechanical Keyboard', 'Tactile switches, RGB backlight', 89.99, 50),
  ('USB-C Hub', '7-in-1 hub with 4K HDMI', 34.99, 120),
  ('Desk Mat', 'XL non-slip desk mat, black', 19.99, 200)
ON CONFLICT DO NOTHING;