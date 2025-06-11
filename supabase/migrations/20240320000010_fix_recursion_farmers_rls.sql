-- Drop existing policies
DROP POLICY IF EXISTS "Farmers can view own farm details" ON public.farmers;
DROP POLICY IF EXISTS "Farmers can update own farm details" ON public.farmers;
DROP POLICY IF EXISTS "Vets can view all farm details" ON public.farmers;
DROP POLICY IF EXISTS "Enable insert for farmers" ON public.farmers;
DROP POLICY IF EXISTS "Enable insert for service role" ON public.farmers;

-- Create new policies that avoid recursion
-- Allow users to view their own farm details
CREATE POLICY "Users can view own farm details"
ON public.farmers FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow users to update their own farm details
CREATE POLICY "Users can update own farm details"
ON public.farmers FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow users to insert their own farm details
CREATE POLICY "Enable insert for users"
ON public.farmers FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Allow the trigger function to insert farm details
CREATE POLICY "Enable insert for service role"
ON public.farmers FOR INSERT
TO service_role
WITH CHECK (true);

-- Create a function to check if a user is a vet
CREATE OR REPLACE FUNCTION public.is_vet(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = user_id
    AND raw_user_meta_data->>'role' = 'vet'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if a user is a farmer
CREATE OR REPLACE FUNCTION public.is_farmer(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = user_id
    AND raw_user_meta_data->>'role' = 'farmer'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.is_vet TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_farmer TO authenticated;