-- ============================================
-- FairPlay Africa - Admin Settings Migration
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Create the admin_settings table
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT admin_settings_key_unique UNIQUE (key)
);

-- 2. updated_at trigger
DROP TRIGGER IF EXISTS set_admin_settings_updated_at ON public.admin_settings;
CREATE TRIGGER set_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 3. Enable Row Level Security
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies — only service-role can access
CREATE POLICY "Service role full access"
  ON public.admin_settings
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 5. Seed the admin password (hashed with bcrypt, 10 rounds)
-- Default password: FairPlay2026!
-- To generate a new hash:  node -e "require('bcryptjs').hash('YourPassword', 10).then(console.log)"
INSERT INTO public.admin_settings (key, value)
VALUES (
  'admin_password',
  '$2b$10$es/Akc1rSwgG.i4eQvMwXOxzZXZIXEhPCQX8RHWyRumAXU8mT7PNC'
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
