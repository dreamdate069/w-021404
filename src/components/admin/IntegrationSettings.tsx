
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check, Info, Key } from 'lucide-react';

const IntegrationSettings = () => {
  const [runwayApiKey, setRunwayApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  // Load saved API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem('runway_api_key');
    if (savedApiKey) {
      setRunwayApiKey(savedApiKey);
    }
  }, []);
  
  const saveRunwayApiKey = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('runway_api_key', runwayApiKey);
      
      toast({
        title: 'API Key Saved',
        description: 'Your Runway API key has been securely saved.',
        variant: 'default',
      });
      
      setIsSaving(false);
    }, 1000);
  };
  
  const clearRunwayApiKey = () => {
    setRunwayApiKey('');
    localStorage.removeItem('runway_api_key');
    
    toast({
      title: 'API Key Removed',
      description: 'Your Runway API key has been removed.',
      variant: 'destructive',
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Integration Settings</h2>
      
      <Card className="bg-zinc-800 border-zinc-700 text-white">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-custom-pink" />
            <CardTitle>Runway API Integration</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Configure your Runway API for AI-powered profile pictures and image generation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium">
              API Key
            </label>
            <div className="flex">
              <Input
                id="apiKey"
                value={runwayApiKey}
                onChange={(e) => setRunwayApiKey(e.target.value)}
                type="password"
                placeholder="Enter your Runway API key"
                className="bg-zinc-700 border-zinc-600 text-white"
              />
              <Button 
                variant="default" 
                onClick={saveRunwayApiKey} 
                disabled={!runwayApiKey || isSaving}
                className="ml-2 bg-custom-pink hover:bg-custom-pink/90"
              >
                {isSaving ? 'Saving...' : 'Save Key'}
              </Button>
            </div>
            {runwayApiKey && (
              <div className="flex items-center text-xs text-emerald-500 mt-1">
                <Check className="h-3 w-3 mr-1" />
                API key is set
              </div>
            )}
          </div>
          
          <div className="bg-zinc-700/50 p-4 rounded-md flex gap-2 text-sm mt-4">
            <Info className="h-5 w-5 text-custom-pink shrink-0" />
            <p>
              The Runway API enables AI-generated profile pictures and images for your users.
              Your API key is stored securely and never exposed to clients. 
              <a href="https://runway.com/api" target="_blank" rel="noopener noreferrer" className="text-custom-pink hover:underline block mt-1">
                Learn more about Runway API
              </a>
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t border-zinc-700 justify-between">
          <div className="text-sm text-zinc-400">
            Last verified: {runwayApiKey ? 'Just now' : 'Never'}
          </div>
          {runwayApiKey && (
            <Button variant="outline" onClick={clearRunwayApiKey} className="border-zinc-600 text-zinc-300">
              Clear API Key
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <Card className="bg-zinc-800 border-zinc-700 text-white">
        <CardHeader>
          <CardTitle>Other Integrations</CardTitle>
          <CardDescription className="text-zinc-400">
            Configure additional third-party services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-dashed border-zinc-700 rounded-md text-center">
              <p className="text-zinc-400">Additional integration options will be available in future updates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
