/*
  # Create custom wishlist items table

  1. New Tables
    - `wishlist_items`
      - `id` (uuid, primary key)
      - `name` (text) - item name
      - `description` (text) - item description
      - `quantity_needed` (integer) - quantity needed
      - `unit` (text) - unit of measurement (books, sets, kg, etc.)
      - `icon` (text) - emoji or icon
      - `color` (text) - tailwind color class
      - `bg_color` (text) - tailwind background color class
      - `is_default` (boolean) - whether this is a default item
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `wishlist_items` table
    - Add policy for public read access (anyone can view wishlist items)
*/

CREATE TABLE IF NOT EXISTS wishlist_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  quantity_needed integer NOT NULL DEFAULT 0,
  unit text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  bg_color text NOT NULL,
  is_default boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read wishlist items"
  ON wishlist_items
  FOR SELECT
  USING (true);

-- Insert default items
INSERT INTO wishlist_items (name, description, quantity_needed, unit, icon, color, bg_color, is_default)
VALUES
  ('Books & Story Books', 'Colorful picture books and story books in Hindi and English for all ages', 50, 'books', '📚', 'text-sky-600', 'bg-sky-50', true),
  ('Stationery Supplies', 'Pencils, crayons, notebooks, coloring books, and drawing supplies', 200, 'sets', '✏️', 'text-amber-600', 'bg-amber-50', true),
  ('Educational Toys', 'Age-appropriate toys for learning, play, and development (blocks, puzzles, etc.)', 30, 'pieces', '🧩', 'text-rose-600', 'bg-rose-50', true),
  ('Clothes & Shoes', 'School uniforms, shoes, and seasonal clothing in various sizes (2-9 years)', 100, 'pieces', '👕', 'text-emerald-600', 'bg-emerald-50', true),
  ('Nutritious Food', 'Rice, lentils, vegetables, milk, and other essentials for daily meals', 500, 'kg', '🍎', 'text-green-600', 'bg-green-50', true),
  ('Medical Supplies', 'First aid kits, hygiene products, vitamins, and health essentials', 20, 'kits', '🏥', 'text-red-600', 'bg-red-50', true)
ON CONFLICT DO NOTHING;
