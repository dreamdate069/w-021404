-- Fix security warnings by setting search_path for all functions
-- This prevents SQL injection attacks through search_path manipulation

-- Fix the existing functions by setting proper search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.update_last_login()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles 
  SET 
    last_login = NOW(),
    login_count = COALESCE(login_count, 0) + 1
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, nickname, gender, age)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'nickname', 
             COALESCE(NEW.raw_user_meta_data->>'first_name', 'User') || substring(NEW.id::text, 1, 4)),
    COALESCE(NEW.raw_user_meta_data->>'gender', 'male'),
    COALESCE((NEW.raw_user_meta_data->>'age')::INTEGER, 25)
  );
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user_coin_balance()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_coin_balances (user_id, balance)
  VALUES (NEW.id, 1000);
  RETURN NEW;
END;
$$;

-- Update the new function to also have proper search_path
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
SET search_path = public
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