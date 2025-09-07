-- Drop the current policy that might still expose sensitive data
DROP POLICY IF EXISTS "Users can view safe public profile data" ON public.profiles;

-- Create a more restrictive policy that only allows users to see their own complete profile
-- and prevents any access to other users' sensitive data
CREATE POLICY "Users can only view their own complete profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Create a secure view for public profile data that excludes all sensitive information
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  p.id,
  p.first_name,
  p.nickname,
  p.age,
  p.gender,
  p.bio,
  p.location,
  p.occupation,
  p.interests,
  p.education,
  p.height_cm,
  p.is_verified,
  p.is_online,
  p.last_active,
  p.created_at,
  p.relationship_status,
  p.looking_for,
  p.profile_pic_url,
  p.verification_status,
  p.account_status
FROM public.profiles p
WHERE p.account_status = 'active';

-- Enable RLS on the view
ALTER VIEW public.public_profiles SET (security_barrier = true);

-- Grant access to the view for authenticated users
GRANT SELECT ON public.public_profiles TO authenticated;

-- Create RLS policy for the public profiles view
CREATE POLICY "Authenticated users can view public profiles" 
ON public.public_profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Update the get_public_profile function to use the view
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_id uuid)
RETURNS TABLE(
  id uuid, 
  first_name text, 
  nickname text, 
  age integer, 
  gender text, 
  bio text, 
  location text, 
  occupation text, 
  interests text[], 
  education text, 
  height_cm integer, 
  is_verified boolean, 
  is_online boolean, 
  last_active timestamp with time zone, 
  created_at timestamp with time zone, 
  relationship_status text, 
  looking_for text[], 
  profile_pic_url text, 
  verification_status text, 
  account_status text
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    pp.id,
    pp.first_name,
    pp.nickname,
    pp.age,
    pp.gender,
    pp.bio,
    pp.location,
    pp.occupation,
    pp.interests,
    pp.education,
    pp.height_cm,
    pp.is_verified,
    pp.is_online,
    pp.last_active,
    pp.created_at,
    pp.relationship_status,
    pp.looking_for,
    pp.profile_pic_url,
    pp.verification_status,
    pp.account_status
  FROM public.public_profiles pp
  WHERE pp.id = profile_id;
$$;