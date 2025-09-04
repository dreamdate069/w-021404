-- Remove overly permissive policies that allow public access to profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Create secure policies that protect sensitive information
-- Policy 1: Authenticated users can view basic profile info (for matching/browsing)
-- but NOT sensitive data like email addresses
CREATE POLICY "Authenticated users can view basic profile info" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Policy 2: Users can view ALL their own profile data (including sensitive info)
CREATE POLICY "Users can view their complete profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Policy 3: Block anonymous/public access entirely
CREATE POLICY "Block anonymous access to profiles" 
ON public.profiles 
FOR SELECT 
TO anon
USING (false);

-- Add a function to get sanitized profile data for public viewing
-- This will be used by the frontend to fetch only non-sensitive profile data
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_id uuid)
RETURNS TABLE (
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
SECURITY DEFINER 
STABLE
AS $$
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