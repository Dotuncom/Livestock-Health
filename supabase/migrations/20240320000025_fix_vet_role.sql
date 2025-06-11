-- First, check if the user exists in public.users
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = '41d869bd-2c71-4346-b602-6080bc5edbe8') THEN
        -- Insert the user if they don't exist
        INSERT INTO public.users (id, email, role, full_name, created_at, updated_at)
        VALUES (
            '41d869bd-2c71-4346-b602-6080bc5edbe8',
            'vet@example.com', -- We'll need to update this with the actual email
            'vet',
            'Hoephill Vet', -- Using clinic name as full name
            NOW(),
            NOW()
        );
    END IF;
END $$;

-- Update the user role in auth.users
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'::jsonb),
    '{role}',
    '"vet"'
)
WHERE id = '41d869bd-2c71-4346-b602-6080bc5edbe8';

-- Update the role in public.users
UPDATE public.users
SET role = 'vet'
WHERE id = '41d869bd-2c71-4346-b602-6080bc5edbe8';

-- Debug information
SELECT 'auth.users' as table_name, id, email, raw_user_meta_data->>'role' as role
FROM auth.users
WHERE id = '41d869bd-2c71-4346-b602-6080bc5edbe8'
UNION ALL
SELECT 'public.users' as table_name, id, email, role
FROM public.users
WHERE id = '41d869bd-2c71-4346-b602-6080bc5edbe8'
UNION ALL
SELECT 'public.vets' as table_name, id, user_id::text as email, 'vet' as role
FROM public.vets
WHERE id = '41d869bd-2c71-4346-b602-6080bc5edbe8';