-- Create a function to confirm user email
CREATE OR REPLACE FUNCTION public.confirm_user_email(user_id UUID)
RETURNS void AS $$
BEGIN
  -- Update the user's email_confirmed_at timestamp
  UPDATE auth.users
  SET email_confirmed_at = timezone('utc'::text, now())
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.confirm_user_email(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.confirm_user_email(UUID) TO service_role;