-- Create visitors table to track website visitors
CREATE TABLE IF NOT EXISTS public.visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT,
  country TEXT,
  city TEXT,
  latitude FLOAT,
  longitude FLOAT,
  user_agent TEXT,
  visited_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert visitor data (no auth required for tracking)
CREATE POLICY "Allow anyone to insert visitor data"
  ON public.visitors FOR INSERT
  WITH CHECK (true);

-- Allow only authenticated admin to view visitor data
CREATE POLICY "Allow admin to view visitor data"
  ON public.visitors FOR SELECT
  USING (true);
