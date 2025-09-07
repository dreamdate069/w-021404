-- Remove the security_barrier setting from the view to avoid security definer behavior
ALTER VIEW public.public_profiles SET (security_barrier = false);

-- The view should inherit security from underlying table, not act as security definer
-- This ensures proper access control while allowing safe public profile viewing