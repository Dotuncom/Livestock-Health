-- Create vets table
CREATE TABLE IF NOT EXISTS public.vets (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    years_of_experience INTEGER,
    clinic_name TEXT,
    license_number TEXT UNIQUE,
    preferred_animals TEXT[],
    location TEXT,
    phone TEXT,
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Add RLS policies
ALTER TABLE public.vets ENABLE ROW LEVEL SECURITY;

-- Policy for vets to view their own data
CREATE POLICY "Vets can view own data"
    ON public.vets
    FOR SELECT
    USING (auth.uid() = id);

-- Policy for vets to update their own data
CREATE POLICY "Vets can update own data"
    ON public.vets
    FOR UPDATE
    USING (auth.uid() = id);

-- Policy for vets to insert their own data
CREATE POLICY "Vets can insert own data"
    ON public.vets
    FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Policy for farmers to view vet data
CREATE POLICY "Farmers can view vet data"
    ON public.vets
    FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.users
        WHERE users.id = auth.uid()
        AND users.role = 'farmer'
    ));

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.vets TO authenticated;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.vets
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();