/*
  # Create blogs table for Aashiyan daily blog

  1. New Tables
    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `slug` (text, unique, not null) — URL-friendly identifier
      - `content` (text, not null) — blog body content
      - `excerpt` (text) — short preview text
      - `cover_image_url` (text) — optional cover photo URL
      - `author_name` (text, not null, default 'Aashiyan Team')
      - `published` (boolean, default false) — draft/published toggle
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `blogs` table
    - SELECT policy: anyone can read published blogs
    - INSERT policy: authenticated users can create blogs
    - UPDATE policy: authenticated users can update blogs
    - DELETE policy: authenticated users can delete blogs

  3. Indexes
    - Index on `slug` for fast lookups
    - Index on `published` for filtering
    - Index on `created_at` for ordering
*/

CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text DEFAULT '',
  cover_image_url text DEFAULT '',
  author_name text NOT NULL DEFAULT 'Aashiyan Team',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published blogs"
  ON blogs FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can create blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs (slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs (published);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs (created_at DESC);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON blogs;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
