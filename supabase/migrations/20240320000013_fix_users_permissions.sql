-- First, revoke all existing permissions
REVOKE ALL ON public.users FROM authenticated;
REVOKE ALL ON public.users FROM anon;
REVOKE ALL ON public.users FROM service_role;

-- Grant basic permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.users TO authenticated;

-- Grant all permissions to service role
GRANT ALL ON public.users TO service_role;

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Vets can view all users" ON public.users;
DROP POLICY IF EXISTS "Enable insert for signup" ON public.users;
DROP POLICY IF EXISTS "Enable insert for trigger function" ON public.users;

-- Create new policies
-- Allow users to view their own profile
CREATE POLICY "Users can view own profile"
ON public.users FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON public.users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow vets to view all users
CREATE POLICY "Vets can view all users"
ON public.users FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'vet'
    )
);

-- Allow inserting new users during signup (without OTP)
CREATE POLICY "Enable insert for signup"
ON public.users FOR INSERT
TO authenticated
WITH CHECK (
    -- Allow insert if the user is inserting their own profile
    auth.uid() = id
    -- And the role is either 'farmer' or 'vet'
    AND role IN ('farmer', 'vet')
    -- And the email matches the authenticated user's email
    AND email = (SELECT email FROM auth.users WHERE id = auth.uid())
);

-- Allow the trigger function to insert new users
CREATE POLICY "Enable insert for trigger function"
ON public.users FOR INSERT
TO service_role
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Grant execute permission on the trigger function
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;