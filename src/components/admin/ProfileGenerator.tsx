
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Loader2, Globe } from 'lucide-react';
import { useProfiles } from '@/hooks/useProfiles';

const ProfileGenerator = () => {
  const { profiles, loading, generateProfiles } = useProfiles();

  const countryFlags = {
    usa: '🇺🇸', uk: '🇬🇧', france: '🇫🇷', spain: '🇪🇸', 
    italy: '🇮🇹', canada: '🇨🇦', australia: '🇦🇺', germany: '🇩🇪'
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Profile Management</h2>
      
      <Card className="bg-zinc-800 border-zinc-700 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-custom-pink mr-2" />
              <CardTitle>International Profile Generator</CardTitle>
            </div>
          </div>
          <CardDescription className="text-zinc-400">
            Generate diverse international profiles with AI-created image sets from around the world
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-700 rounded-lg">
            <div>
              <h3 className="font-medium text-white">Current Profiles</h3>
              <p className="text-zinc-400 text-sm">{profiles.length} international profiles in database</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-custom-pink">{profiles.length}</div>
              <div className="text-xs text-zinc-400">Total Users</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 p-4 bg-zinc-700 rounded-lg">
            {Object.entries(countryFlags).map(([country, flag]) => (
              <div key={country} className="text-center">
                <div className="text-lg">{flag}</div>
                <div className="text-xs text-zinc-400 capitalize">{country}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={generateProfiles} 
              disabled={loading}
              className="bg-custom-pink hover:bg-custom-pink/90 flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating International Profiles...
                </>
              ) : (
                <>
                  <Globe className="mr-2 h-4 w-4" />
                  Generate 60+ International Profiles
                </>
              )}
            </Button>
          </div>

          <div className="text-sm text-zinc-400">
            <p className="mb-2">This will create profiles from 8 countries:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Generate ~7-8 users per country (USA, UK, France, Spain, Italy, Canada, Australia, Germany)</li>
              <li>Create 2-4 consistent AI images per profile</li>
              <li>Use authentic names, locations, and cultural context for each country</li>
              <li>Include realistic bios, interests, and preferences</li>
              <li>Replace existing profiles with fresh international content</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileGenerator;
