-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create updated function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (
        id,
        email,
        role,
        full_name,
        phone,
        specialization,
        location,
        created_at,
        updated_at
    )
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
        END,
        CASE
            WHEN NEW.raw_user_meta_data->>'role' = 'farmer'
            THEN COALESCE(NEW.raw_user_meta_data->>'location', '')
            ELSE NULL
        END,
        timezone('utc'::text, now()),
        timezone('utc'::text, now())
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();