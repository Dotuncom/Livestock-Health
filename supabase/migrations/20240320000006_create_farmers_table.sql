-- Create farmers table
CREATE TABLE IF NOT EXISTS public.farmers (
    id UUID PRIMARY KEY REFERENCES public.users(id),
    number_of_animals INTEGER,
    farm_size TEXT,
    livestock_types TEXT[],
    breed TEXT,
    vaccination_status TEXT,
    feeding_type TEXT,
    water_source TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Farmers can view their own farm details
CREATE POLICY "Farmers can view own farm details"
ON public.farmers FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Farmers can update their own farm details
CREATE POLICY "Farmers can update own farm details"
ON public.farmers FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Vets can view all farm details
CREATE POLICY "Vets can view all farm details"
ON public.farmers FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE users.id = auth.uid()
        AND users.role = 'vet'
    )
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_farmers_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER set_farmers_updated_at
    BEFORE UPDATE ON public.farmers
    FOR EACH ROW EXECUTE FUNCTION public.handle_farmers_updated_at();