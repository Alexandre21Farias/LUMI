ALTER TABLE public.children ADD COLUMN blood_type TEXT;
ALTER TABLE public.children ADD COLUMN allergies TEXT;

ALTER TABLE public.bracelets ADD COLUMN color TEXT;
ALTER TABLE public.bracelets ADD COLUMN water_resistant BOOLEAN DEFAULT false;
