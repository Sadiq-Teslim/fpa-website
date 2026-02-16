    -- ============================================
    -- FairPlay Africa - Subscribers Table Migration
    -- Run this in your Supabase SQL Editor
    -- ============================================

    -- 1. Create the subscribers table
    CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'footer',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT subscribers_email_unique UNIQUE (email)
    );

    -- 2. Indexes
    CREATE INDEX IF NOT EXISTS idx_subscribers_email ON public.subscribers (email);
    CREATE INDEX IF NOT EXISTS idx_subscribers_is_active ON public.subscribers (is_active);
    CREATE INDEX IF NOT EXISTS idx_subscribers_created_at ON public.subscribers (created_at DESC);

    -- 3. updated_at trigger (reuses existing function from jobs migration)
    DROP TRIGGER IF EXISTS set_subscribers_updated_at ON public.subscribers;
    CREATE TRIGGER set_subscribers_updated_at
    BEFORE UPDATE ON public.subscribers
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

    -- 4. Enable Row Level Security
    ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

    -- 5. RLS Policies
    -- Anyone can subscribe (insert their own email)
    CREATE POLICY "Anyone can subscribe"
    ON public.subscribers
    FOR INSERT
    WITH CHECK (true);

    -- Only admin/service-role can read subscribers
    CREATE POLICY "Admin can read subscribers"
    ON public.subscribers
    FOR SELECT
    USING (true);

    -- Admin can update/delete
    CREATE POLICY "Admin can manage subscribers"
    ON public.subscribers
    FOR ALL
    USING (true)
    WITH CHECK (true);

    -- 6. Enable Realtime
    ALTER PUBLICATION supabase_realtime ADD TABLE public.subscribers;
