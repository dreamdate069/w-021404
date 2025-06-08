
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

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProfiles = async () => {
    try {
      console.log('Fetching profiles...');
      setLoading(true);
      setError(null);
      
      const { data: profilesData, error: profilesError } = await supabase
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
        .order('created_at', { ascending: false })
        .limit(50);

      if (profilesError) {
        console.error('Profiles error:', profilesError);
        throw profilesError;
      }

      console.log('Profiles fetched:', profilesData?.length || 0);

      const transformedProfiles: Profile[] = (profilesData || []).map(profile => ({
        ...profile,
        photos: (profile.profile_photos || []).sort((a, b) => a.photo_order - b.photo_order)
      }));

      setProfiles(transformedProfiles);
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

  useEffect(() => {
    fetchProfiles();
  }, []);

  return {
    profiles,
    loading,
    error,
    refetch: fetchProfiles,
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
