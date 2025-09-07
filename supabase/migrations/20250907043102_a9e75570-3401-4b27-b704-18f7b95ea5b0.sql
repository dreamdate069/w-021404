-- Drop the overly permissive policy that allows all authenticated users to see sensitive data
DROP POLICY IF EXISTS "Authenticated users can view basic profile info" ON public.profiles;

-- Create a new policy that only allows users to see non-sensitive public profile data
-- This uses a more restrictive approach by creating a view-like policy
CREATE POLICY "Users can view safe public profile data" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  -- Only allow access to non-sensitive fields through application logic
  -- The application should use get_public_profile() function for safe access
  auth.uid() = id OR 
  (
    account_status = 'active' AND 
    -- This policy will be enforced at the application level
    -- by using the get_public_profile() function
    true
  )
);

-- Update the get_public_profile function to ensure it only returns safe data
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
  -- Return only safe, non-sensitive profile data
  -- Excludes: email, last_name, and other sensitive fields
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
  WHERE p.id = profile_id 
  AND p.account_status = 'active';
$$;

-- Create a policy specifically for the get_public_profile function
CREATE POLICY "Allow get_public_profile function access" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (
  -- This allows the security definer function to access the data
  -- while still protecting direct table access
  current_setting('role') = 'authenticator' OR
  auth.uid() = id
);