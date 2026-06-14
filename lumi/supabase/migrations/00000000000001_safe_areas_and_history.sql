CREATE TABLE public.safe_areas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    radius INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.event_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    bracelet_id UUID REFERENCES public.bracelets(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.safe_areas DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_history DISABLE ROW LEVEL SECURITY;
