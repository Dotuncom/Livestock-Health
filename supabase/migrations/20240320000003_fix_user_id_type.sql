-- First, drop any existing foreign key constraints that reference the users table
ALTER TABLE IF EXISTS appointments
    DROP CONSTRAINT IF EXISTS appointments_vet_id_fkey;

-- Drop the existing users table and recreate it with UUID
DROP TABLE IF EXISTS public.users CASCADE;

-- Recreate the users table with UUID
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('farmer', 'vet')),
    full_name TEXT,
    phone TEXT,
    specialization TEXT,
    location TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
ON public.users FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Vets can view all users"
ON public.users FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE users.id = auth.uid()
        AND users.role = 'vet'
    )
);

-- Handle appointments table vet_id conversion
-- First, add a new UUID column
ALTER TABLE appointments ADD COLUMN vet_id_new UUID;

-- Update the new column with mapped UUIDs from auth.users
UPDATE appointments a
SET vet_id_new = u.id
FROM auth.users u
WHERE a.vet_id::text = u.id::text;

-- Drop the old column and rename the new one
ALTER TABLE appointments DROP COLUMN vet_id;
ALTER TABLE appointments RENAME COLUMN vet_id_new TO vet_id;

-- Add the foreign key constraint
ALTER TABLE appointments
    ADD CONSTRAINT appointments_vet_id_fkey
    FOREIGN KEY (vet_id)
    REFERENCES auth.users(id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, role, full_name, phone, specialization)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'role', 'farmer'),
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        CASE
            WHEN NEW.raw_user_meta_data->>'role' = 'vet'
            THEN COALESCE(NEW.raw_user_meta_data->>'specialization', '')
            ELSE NULL
        END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS set_updated_at ON public.users;
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();