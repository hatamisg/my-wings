-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  short_description VARCHAR(500),
  image_url TEXT,
  github_url TEXT,
  live_url TEXT,
  technologies TEXT[], -- Array of technologies
  category VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'published', -- draft, published, archived
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL, -- Markdown content
  featured_image TEXT,
  author VARCHAR(255) DEFAULT 'Hatami Sugandi',
  tags TEXT[], -- Array of tags
  category VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'published', -- draft, published, archived
  reading_time INTEGER, -- in minutes
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);

CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_featured ON blogs(featured);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public read access for projects" ON projects;
DROP POLICY IF EXISTS "Admin full access for projects" ON projects;
DROP POLICY IF EXISTS "Public read access for blogs" ON blogs;
DROP POLICY IF EXISTS "Admin full access for blogs" ON blogs;

-- Public read access for published content
CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public read access for blogs" ON blogs
  FOR SELECT USING (status = 'published');

-- Admin full access (authenticated users)
CREATE POLICY "Admin full access for projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin full access for blogs" ON blogs
  FOR ALL USING (auth.role() = 'authenticated');

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blogs_updated_at ON blogs;
CREATE TRIGGER update_blogs_updated_at
    BEFORE UPDATE ON blogs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for projects
INSERT INTO projects (title, slug, description, short_description, technologies, category, featured, order_index) VALUES
('Portfolio Website', 'portfolio-website', 'Personal portfolio website built with Next.js and Tailwind CSS', 'Modern portfolio website with dark mode support', ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui'], 'Web Development', true, 1),
('Task Management App', 'task-management-app', 'A full-stack task management application with real-time updates', 'Collaborative task management with team features', ARRAY['React', 'Node.js', 'MongoDB', 'Socket.io'], 'Web Development', true, 2),
('E-commerce Platform', 'ecommerce-platform', 'Complete e-commerce solution with payment integration', 'Modern e-commerce platform with Stripe integration', ARRAY['Next.js', 'Prisma', 'PostgreSQL', 'Stripe'], 'E-commerce', false, 3)
ON CONFLICT (slug) DO NOTHING;

-- Storage policies for image uploads
-- Allow public read access to images
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their own uploads
CREATE POLICY "Authenticated Update" ON storage.objects
FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their own uploads
CREATE POLICY "Authenticated Delete" ON storage.objects
FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Insert sample data for blogs
INSERT INTO blogs (title, slug, excerpt, content, tags, category, featured, reading_time, published_at) VALUES
('Getting Started with Next.js 14', 'getting-started-nextjs-14', 'Learn the basics of Next.js 14 and its new App Router', '# Getting Started with Next.js 14\n\nNext.js 14 introduces many exciting features...', ARRAY['Next.js', 'React', 'Web Development'], 'Tutorial', true, 5, NOW()),
('Building Modern UI with Shadcn', 'building-modern-ui-shadcn', 'How to create beautiful interfaces using Shadcn/ui components', '# Building Modern UI with Shadcn\n\nShadcn/ui provides a great foundation for modern web apps...', ARRAY['UI/UX', 'Shadcn', 'Tailwind CSS'], 'Tutorial', true, 7, NOW()),
('Database Design Best Practices', 'database-design-best-practices', 'Essential tips for designing scalable database schemas', '# Database Design Best Practices\n\nGood database design is crucial for application performance...', ARRAY['Database', 'PostgreSQL', 'Backend'], 'Best Practices', false, 10, NOW())
ON CONFLICT (slug) DO NOTHING;