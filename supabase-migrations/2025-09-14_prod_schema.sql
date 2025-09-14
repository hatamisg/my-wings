-- Production schema (no seed data)
-- Safe to run multiple times; uses IF NOT EXISTS and idempotent operations.

-- Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto; -- for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; -- optional, kept for compatibility

-- Tables
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content TEXT,
  short_description VARCHAR(500),
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  technologies TEXT[],
  features TEXT[],
  screenshots TEXT[],
  category VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'published',
  order_index INTEGER DEFAULT 0,
  author VARCHAR(255) DEFAULT 'Hatami Sugandi',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author VARCHAR(255) DEFAULT 'Hatami Sugandi',
  tags TEXT[],
  category VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'published',
  reading_time INTEGER,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON public.projects(order_index);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON public.blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at);

-- RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Public read access for projects" ON public.projects;
DROP POLICY IF EXISTS "Admin full access for projects" ON public.projects;
DROP POLICY IF EXISTS "Public read access for blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admin full access for blogs" ON public.blogs;

-- Public read for published content
CREATE POLICY "Public read access for projects" ON public.projects
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read access for blogs" ON public.blogs
  FOR SELECT USING (status = 'published');

-- Admin full access (authenticated users)
CREATE POLICY "Admin full access for projects" ON public.projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access for blogs" ON public.blogs
  FOR ALL USING (auth.role() = 'authenticated');

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

DROP TRIGGER IF EXISTS update_projects_updated_at ON public.projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_blogs_updated_at ON public.blogs;
CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Storage: ensure images bucket exists (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for images bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;

CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Authenticated Upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Refresh PostgREST cache
NOTIFY pgrst, 'reload schema';

