-- First, ensure we have the auth user
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '41d869bd-2c71-4346-b602-6080bc5edbe8') THEN
        -- Insert into auth.users
        INSERT INTO auth.users (
            id,
            instance_id,
            email,
            encrypted_password,
            email_confirmed_at,
            created_at,
            updated_at,
            raw_app_meta_data,
            raw_user_meta_data,
            is_super_admin,
            role
        ) VALUES (
            '41d869bd-2c71-4346-b602-6080bc5edbe8',
            '00000000-0000-0000-0000-000000000000',
            'vet@hoephill.com',
            crypt('temp_password', gen_salt('bf')),
            NOW(),
            NOW(),
            NOW(),
            '{"provider":"email","providers":["email"]}',
            '{"role":"vet"}',
            false,
            'authenticated'
        );
    END IF;
END $$;

-- Then, ensure we have the public user
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE id = '41d869bd-2c71-4346-b602-6080bc5edbe8') THEN
        -- Insert into public.users
        INSERT INTO public.users (
            id,
            email,
            role,
            full_name,
            created_at,
            updated_at
        ) VALUES (
            '41d869bd-2c71-4346-b602-6080bc5edbe8',
            'vet@hoephill.com',
            'vet',
            'Hoephill Vet',
            NOW(),
            NOW()
        );
    END IF;
END $$;

-- Verify the data
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