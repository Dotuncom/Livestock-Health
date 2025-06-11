-- Drop existing policies
DROP POLICY IF EXISTS "Farmers can view own animals" ON public.animals;
DROP POLICY IF EXISTS "Vets can view all animals" ON public.animals;
DROP POLICY IF EXISTS "Farmers can insert own animals" ON public.animals;
DROP POLICY IF EXISTS "Farmers can update own animals" ON public.animals;
DROP POLICY IF EXISTS "Farmers can delete own animals" ON public.animals;

-- Create new policies using get_user_role function
-- 1. Farmers can view their own animals
CREATE POLICY "Farmers can view own animals"
    ON public.animals
    FOR SELECT
    TO authenticated
    USING (
        auth.uid() = user_id
        AND public.get_user_role(auth.uid()) = 'farmer'
    );

-- 2. Vets can view all animals
CREATE POLICY "Vets can view all animals"
    ON public.animals
    FOR SELECT
    TO authenticated
    USING (
        public.get_user_role(auth.uid()) = 'vet'
    );

-- 3. Farmers can insert their own animals
CREATE POLICY "Farmers can insert own animals"
    ON public.animals
    FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.uid() = user_id
        AND public.get_user_role(auth.uid()) = 'farmer'
    );

-- 4. Farmers can update their own animals
CREATE POLICY "Farmers can update own animals"
    ON public.animals
    FOR UPDATE
    TO authenticated
    USING (
        auth.uid() = user_id
        AND public.get_user_role(auth.uid()) = 'farmer'
    )
    WITH CHECK (
        auth.uid() = user_id
        AND public.get_user_role(auth.uid()) = 'farmer'
    );

-- 5. Farmers can delete their own animals
CREATE POLICY "Farmers can delete own animals"
    ON public.animals
    FOR DELETE
    TO authenticated
    USING (
        auth.uid() = user_id
        AND public.get_user_role(auth.uid()) = 'farmer'
    );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.animals TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role(UUID) TO authenticated;