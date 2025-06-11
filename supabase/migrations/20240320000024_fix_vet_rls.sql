-- Drop existing policies
DROP POLICY IF EXISTS "Vets can view own data" ON public.vets;
DROP POLICY IF EXISTS "Vets can update own data" ON public.vets;
DROP POLICY IF EXISTS "Vets can insert own data" ON public.vets;
DROP POLICY IF EXISTS "Farmers can view vet data" ON public.vets;

-- Create new policies with role checks
CREATE POLICY "Vets can view own data"
    ON public.vets
    FOR SELECT
    USING (
        auth.uid() = id
        AND EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'vet'
        )
    );

CREATE POLICY "Vets can update own data"
    ON public.vets
    FOR UPDATE
    USING (
        auth.uid() = id
        AND EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'vet'
        )
    );

CREATE POLICY "Vets can insert own data"
    ON public.vets
    FOR INSERT
    WITH CHECK (
        auth.uid() = id
        AND EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'vet'
        )
    );

CREATE POLICY "Farmers can view vet data"
    ON public.vets
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid()
            AND users.role = 'farmer'
        )
    );

-- Add a policy for service role to manage vet data
CREATE POLICY "Service role can manage vet data"
    ON public.vets
    USING (auth.jwt() ->> 'role' = 'service_role')
    WITH CHECK (auth.jwt() ->> 'role' = 'service_role');