
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Profile {
  id: string;
  nickname: string;
  first_name: string;
  last_name: string;
  age: number;
  gender: string;
  bio: string | null;
  location: string;
  occupation: string | null;
  interests: string[] | null;
  education: string | null;
  height_cm: number | null;
  is_verified: boolean;
  is_online: boolean;
  last_active: string | null;
  created_at: string;
  relationship_status: string | null;
  looking_for: string[] | null;
  photos: ProfilePhoto[];
}

export interface ProfilePhoto {
  id: string;
  photo_url: string;
  photo_order: number;
  is_primary: boolean;
}

export interface UseProfilesOptions {
  filters?: {
    ageRange?: [number, number];
    gender?: string;
    distance?: number;
    searchQuery?: string;
    isOnline?: boolean;
  };
  sortBy?: 'recent' | 'new' | 'popular';
  limit?: number;
}

export const useProfiles = (options: UseProfilesOptions = {}) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const { toast } = useToast();

  const fetchProfiles = async (reset = false) => {
    try {
      console.log('Fetching profiles...');
      setLoading(true);
      setError(null);
      
      const currentPage = reset ? 0 : page;
      const pageSize = options.limit || 20;
      
      let query = supabase
        .from('profiles')
        .select(`
          *,
          profile_photos (
            id,
            photo_url,
            photo_order,
            is_primary
          )
        `)
        .range(currentPage * pageSize, (currentPage + 1) * pageSize - 1);

      // Apply filters
      if (options.filters?.ageRange) {
        query = query
          .gte('age', options.filters.ageRange[0])
          .lte('age', options.filters.ageRange[1]);
      }

      if (options.filters?.gender && options.filters.gender !== 'all') {
        query = query.eq('gender', options.filters.gender);
      }

      if (options.filters?.isOnline) {
        query = query.eq('is_online', true);
      }

      // Apply sorting
      switch (options.sortBy) {
        case 'recent':
          query = query.order('last_active', { ascending: false, nullsFirst: false });
          break;
        case 'new':
          query = query.order('created_at', { ascending: false });
          break;
        case 'popular':
          query = query.order('is_verified', { ascending: false }).order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data: profilesData, error: profilesError } = await query;

      if (profilesError) {
        console.error('Profiles error:', profilesError);
        throw profilesError;
      }

      console.log('Profiles fetched:', profilesData?.length || 0);

      const transformedProfiles: Profile[] = (profilesData || []).map(profile => ({
        ...profile,
        photos: (profile.profile_photos || []).sort((a, b) => a.photo_order - b.photo_order)
      }));

      if (reset) {
        setProfiles(transformedProfiles);
        setPage(1);
      } else {
        setProfiles(prev => [...prev, ...transformedProfiles]);
        setPage(prev => prev + 1);
      }
      
      setHasMore(transformedProfiles.length === pageSize);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching profiles:', err);
      const errorMessage = err.message || 'Failed to load profiles';
      setError(errorMessage);
      
      if (!errorMessage.includes('Failed to fetch') && !errorMessage.includes('NetworkError')) {
        toast({
          title: "Error",
          description: "Failed to load profiles. Please try again.",
          variant: "destructive",
        });
      }
      
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const generateProfiles = async () => {
    try {
      setLoading(true);
      console.log('Generating international profiles...');
      
      toast({
        title: "Generating International Profiles",
        description: "Creating 60+ diverse profiles from around the world with image sets. This may take a few minutes...",
      });

      const { data, error } = await supabase.functions.invoke('generate-real-profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (error) {
        console.error('Generate profiles error:', error);
        throw error;
      }
      
      toast({
        title: "Success!",
        description: data?.message || "Successfully generated international profiles",
      });

      await fetchProfiles();
    } catch (err: any) {
      console.error('Error generating profiles:', err);
      toast({
        title: "Error",
        description: "Failed to generate profiles. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchProfiles();
    }
  };

  const refresh = () => {
    setPage(0);
    fetchProfiles(true);
  };

  useEffect(() => {
    refresh();
  }, [options.filters, options.sortBy]);

  return {
    profiles,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    generateProfiles
  };
};

export const useProfile = (profileId: string) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile:', profileId);
        setLoading(true);
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select(`
            *,
            profile_photos (
              id,
              photo_url,
              photo_order,
              is_primary
            )
          `)
          .eq('id', profileId)
          .single();

        if (profileError) {
          console.error('Profile error:', profileError);
          throw profileError;
        }

        if (profileData) {
          const transformedProfile: Profile = {
            ...profileData,
            photos: (profileData.profile_photos || []).sort((a, b) => a.photo_order - b.photo_order)
          };
          setProfile(transformedProfile);
        }
        
        setError(null);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError(err.message);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  return { profile, loading, error };
};
