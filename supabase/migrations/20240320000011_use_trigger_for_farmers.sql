-- Drop existing policies and functions
DROP POLICY IF EXISTS "Users can view own farm details" ON public.farmers;
DROP POLICY IF EXISTS "Users can update own farm details" ON public.farmers;
DROP POLICY IF EXISTS "Enable insert for users" ON public.farmers;
DROP POLICY IF EXISTS "Enable insert for service role" ON public.farmers;
DROP FUNCTION IF EXISTS public.is_vet(UUID);
DROP FUNCTION IF EXISTS public.is_farmer(UUID);

-- Disable RLS temporarily
ALTER TABLE public.farmers DISABLE ROW LEVEL SECURITY;

-- Create a function to handle farmer profile creation
CREATE OR REPLACE FUNCTION public.handle_farmer_profile()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the user is a farmer
  IF NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = NEW.id
    AND raw_user_meta_data->>'role' = 'farmer'
  ) THEN
    RAISE EXCEPTION 'Only farmers can create farm profiles';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for farmer profile creation
DROP TRIGGER IF EXISTS on_farmer_insert ON public.farmers;
CREATE TRIGGER on_farmer_insert
  BEFORE INSERT ON public.farmers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_farmer_profile();

-- Create a function to handle farmer profile updates
CREATE OR REPLACE FUNCTION public.handle_farmer_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Only allow users to update their own profile
  IF NEW.id != auth.uid() THEN
    RAISE EXCEPTION 'You can only update your own farm profile';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for farmer profile updates
DROP TRIGGER IF EXISTS on_farmer_update ON public.farmers;
CREATE TRIGGER on_farmer_update
  BEFORE UPDATE ON public.farmers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_farmer_update();

-- Grant necessary permissions
GRANT ALL ON public.farmers TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_farmer_profile() TO authenticated;
GRANT EXECUTE ON FUNCTION public.handle_farmer_update() TO authenticated;