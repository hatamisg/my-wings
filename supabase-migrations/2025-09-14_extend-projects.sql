-- Extend `projects` table with fields used by the app

ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS content TEXT,
  ADD COLUMN IF NOT EXISTS features TEXT[],
  ADD COLUMN IF NOT EXISTS screenshots TEXT[],
  ADD COLUMN IF NOT EXISTS author VARCHAR(255) DEFAULT 'Hatami Sugandi',
  ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Optional: backfill existing rows
UPDATE public.projects
SET author = COALESCE(author, 'Hatami Sugandi')
WHERE author IS NULL;

-- Refresh PostgREST schema cache so new columns are visible immediately
NOTIFY pgrst, 'reload schema';

