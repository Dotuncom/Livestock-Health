-- Grant necessary permissions to anon role
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.users TO anon;

-- Create policy to allow anon users to read user data needed for login
CREATE POLICY "Allow anon users to read user data"
ON public.users FOR SELECT
TO anon
USING (true);

-- Ensure the trigger function has necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- Ensure the handle_updated_at function has necessary permissions
GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO anon;
GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_updated_at() TO service_role;