
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Settings, Save } from 'lucide-react';

const AppSettings = () => {
  const [siteName, setSiteName] = useState('DreamDate.online');
  const [siteDescription, setSiteDescription] = useState('Find Your Dream Connection');
  const [featuresEnabled, setFeaturesEnabled] = useState({
    giftSystem: true,
    videoChat: true,
    profileVerification: true,
    aiMatchmaking: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Settings Saved',
        description: 'Your application settings have been updated.',
        variant: 'default',
      });
      
      setIsSaving(false);
    }, 1000);
  };
  
  const toggleFeature = (feature: keyof typeof featuresEnabled) => {
    setFeaturesEnabled({
      ...featuresEnabled,
      [feature]: !featuresEnabled[feature]
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Application Settings</h2>
      
      <Card className="bg-zinc-800 border-zinc-700 text-white">
        <CardHeader>
          <div className="flex items-center">
            <Settings className="h-5 w-5 text-custom-pink mr-2" />
            <CardTitle>General Settings</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Configure basic information about your site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="siteName" className="text-sm font-medium">
                Site Name
              </label>
              <Input
                id="siteName"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="siteDescription" className="text-sm font-medium">
                Site Description
              </label>
              <Input
                id="siteDescription"
                value={siteDescription}
                onChange={(e) => setSiteDescription(e.target.value)}
                className="bg-zinc-700 border-zinc-600 text-white"
              />
            </div>
            
            <Button 
              onClick={handleSaveSettings} 
              disabled={isSaving}
              className="bg-custom-pink hover:bg-custom-pink/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-zinc-800 border-zinc-700 text-white">
        <CardHeader>
          <CardTitle>Feature Management</CardTitle>
          <CardDescription className="text-zinc-400">
            Enable or disable platform features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Gift System</h4>
                <p className="text-xs text-zinc-400">Allow users to send virtual gifts</p>
              </div>
              <Switch 
                checked={featuresEnabled.giftSystem} 
                onCheckedChange={() => toggleFeature('giftSystem')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Video Chat</h4>
                <p className="text-xs text-zinc-400">Enable video conversations between matches</p>
              </div>
              <Switch 
                checked={featuresEnabled.videoChat} 
                onCheckedChange={() => toggleFeature('videoChat')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Profile Verification</h4>
                <p className="text-xs text-zinc-400">Require identity verification for new accounts</p>
              </div>
              <Switch 
                checked={featuresEnabled.profileVerification} 
                onCheckedChange={() => toggleFeature('profileVerification')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">AI Matchmaking</h4>
                <p className="text-xs text-zinc-400">Use AI to improve match recommendations</p>
              </div>
              <Switch 
                checked={featuresEnabled.aiMatchmaking} 
                onCheckedChange={() => toggleFeature('aiMatchmaking')}
              />
            </div>
            
            <Button 
              onClick={handleSaveSettings} 
              disabled={isSaving}
              className="bg-custom-pink hover:bg-custom-pink/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Features'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppSettings;
