-- First, let's check if we need to add the specialization and location columns
DO $$
BEGIN
    -- Add specialization column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'users'
        AND column_name = 'specialization'
    ) THEN
        ALTER TABLE public.users ADD COLUMN specialization TEXT;
    END IF;

    -- Add location column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'users'
        AND column_name = 'location'
    ) THEN
        ALTER TABLE public.users ADD COLUMN location TEXT;
    END IF;
END $$;

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('farmer', 'vet')),
    specialization TEXT,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create test accounts in auth.users only if they don't exist
DO $$
DECLARE
    farmer_exists BOOLEAN;
    vet_exists BOOLEAN;
BEGIN
    -- Check if accounts exist
    SELECT EXISTS(SELECT 1 FROM auth.users WHERE email = 'farmer@test.com') INTO farmer_exists;
    SELECT EXISTS(SELECT 1 FROM auth.users WHERE email = 'vet@test.com') INTO vet_exists;

    -- Create farmer account if it doesn't exist
    IF NOT farmer_exists THEN
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            '11111111-1111-1111-1111-111111111111'::uuid,
            'authenticated',
            'authenticated',
            'farmer@test.com',
            crypt('farmer123', gen_salt('bf')),
            now(),
            now(),
            now(),
            '{"provider":"email","providers":["email"]}',
            '{}',
            now(),
            now(),
            '',
            '',
            '',
            ''
        );

        -- Create farmer profile
        INSERT INTO public.users (email, role, created_at, updated_at)
        VALUES ('farmer@test.com', 'farmer', now(), now());

        -- Add farmer location
        UPDATE public.users
        SET location = 'Test Farm Location'
        WHERE email = 'farmer@test.com';
    END IF;

    -- Create vet account if it doesn't exist
    IF NOT vet_exists THEN
        INSERT INTO auth.users (
            instance_id,
            id,
            aud,
            role,
            email,
            encrypted_password,
            email_confirmed_at,
            recovery_sent_at,
            last_sign_in_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            confirmation_token,
            email_change,
            email_change_token_new,
            recovery_token
        ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            '22222222-2222-2222-2222-222222222222'::uuid,
            'authenticated',
            'authenticated',
            'vet@test.com',
            crypt('vet123', gen_salt('bf')),
            now(),
            now(),
            now(),
            '{"provider":"email","providers":["email"]}',
            '{}',
            now(),
            now(),
            '',
            '',
            '',
            ''
        );

        -- Create vet profile
        INSERT INTO public.users (email, role, created_at, updated_at)
        VALUES ('vet@test.com', 'vet', now(), now());

        -- Add vet specialization
        UPDATE public.users
        SET specialization = 'General Practice'
        WHERE email = 'vet@test.com';
    END IF;
END $$;