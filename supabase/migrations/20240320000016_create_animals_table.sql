-- Create animals table
CREATE TABLE public.animals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    breed TEXT,
    age INTEGER,
    gender TEXT CHECK (gender IN ('male', 'female', 'unknown')),
    weight DECIMAL,
    health_status TEXT DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'sick', 'under_treatment', 'recovered')),
    last_checkup_date TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.animals ENABLE ROW LEVEL SECURITY;

-- Create updated_at trigger (only if the function exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'set_updated_at') THEN
        CREATE TRIGGER set_updated_at
            BEFORE UPDATE ON public.animals
            FOR EACH ROW
            EXECUTE FUNCTION public.set_updated_at();
    END IF;
END $$;

-- Create policies
-- 1. Farmers can view their own animals
CREATE POLICY "Farmers can view own animals"
    ON public.animals
    FOR SELECT
    TO authenticated
    USING (
        auth.uid() = user_id
    );

-- 2. Vets can view all animals
CREATE POLICY "Vets can view all animals"
    ON public.animals
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'vet'
        )
    );

-- 3. Farmers can insert their own animals
CREATE POLICY "Farmers can insert own animals"
    ON public.animals
    FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.uid() = user_id
        AND EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'farmer'
        )
    );

-- 4. Farmers can update their own animals
CREATE POLICY "Farmers can update own animals"
    ON public.animals
    FOR UPDATE
    TO authenticated
    USING (
        auth.uid() = user_id
    )
    WITH CHECK (
        auth.uid() = user_id
    );

-- 5. Farmers can delete their own animals
CREATE POLICY "Farmers can delete own animals"
    ON public.animals
    FOR DELETE
    TO authenticated
    USING (
        auth.uid() = user_id
    );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.animals TO authenticated;

-- Create index for faster lookups
CREATE INDEX animals_user_id_idx ON public.animals(user_id);
CREATE INDEX animals_health_status_idx ON public.animals(health_status);