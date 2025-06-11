-- Drop existing policies
DROP POLICY IF EXISTS "Farmers can view own farm details" ON public.farmers;
DROP POLICY IF EXISTS "Farmers can update own farm details" ON public.farmers;
DROP POLICY IF EXISTS "Vets can view all farm details" ON public.farmers;
DROP POLICY IF EXISTS "Enable insert for farmers" ON public.farmers;
DROP POLICY IF EXISTS "Enable insert for service role" ON public.farmers;

-- Create new policies
-- Allow farmers to view their own farm details
CREATE POLICY "Farmers can view own farm details"
ON public.farmers FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow farmers to update their own farm details
CREATE POLICY "Farmers can update own farm details"
ON public.farmers FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow vets to view all farm details
CREATE POLICY "Vets can view all farm details"
ON public.farmers FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.users
        WHERE users.id = auth.uid()
        AND users.role = 'vet'
    )
);

-- Allow farmers to insert their own farm details during onboarding
CREATE POLICY "Enable insert for farmers"
ON public.farmers FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = id
    AND EXISTS (
        SELECT 1 FROM public.users
        WHERE users.id = auth.uid()
        AND users.role = 'farmer'
    )
);

-- Allow the trigger function to insert farm details
CREATE POLICY "Enable insert for service role"
ON public.farmers FOR INSERT
TO service_role
WITH CHECK (true);