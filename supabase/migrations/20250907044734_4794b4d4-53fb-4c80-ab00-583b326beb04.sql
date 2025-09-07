-- Drop the view to avoid the security definer view linter warning
DROP VIEW IF EXISTS public.public_profiles;

-- Remove the problematic security definer function
DROP FUNCTION IF EXISTS public.get_public_profile(uuid);

-- The application will use direct queries with field restrictions instead of views
-- This ensures proper RLS enforcement while avoiding security definer issues