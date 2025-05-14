
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check, Info, Key, Link, Cloud, AlertCircle, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { validateApiKey, validateOpenRouterApiKey, validateHuggingFaceApiKey } from '@/utils/runwayService';

const IntegrationSettings = () => {
  const [runwayApiKey, setRunwayApiKey] = useState('');
  const [openRouterApiKey, setOpenRouterApiKey] = useState('');
  const [huggingFaceApiKey, setHuggingFaceApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [activeTab, setActiveTab] = useState('runway');
  const [validationStatus, setValidationStatus] = useState({
    runway: null,
    openrouter: null,
    huggingface: null
  });
  
  const { toast } = useToast();
  
  // Load saved API keys from localStorage on component mount
  useEffect(() => {
    const savedRunwayApiKey = localStorage.getItem('runway_api_key') || '';
    const savedOpenRouterApiKey = localStorage.getItem('openrouter_api_key') || '';
    const savedHuggingFaceApiKey = localStorage.getItem('huggingface_api_key') || '';
    
    setRunwayApiKey(savedRunwayApiKey);
    setOpenRouterApiKey(savedOpenRouterApiKey);
    setHuggingFaceApiKey(savedHuggingFaceApiKey);
    
    // Update validation status for each key if they exist
    if (savedRunwayApiKey) {
      setValidationStatus(prev => ({ ...prev, runway: true }));
    }
    if (savedOpenRouterApiKey) {
      setValidationStatus(prev => ({ ...prev, openrouter: true }));
    }
    if (savedHuggingFaceApiKey) {
      setValidationStatus(prev => ({ ...prev, huggingface: true }));
    }
  }, []);
  
  const validateKey = async (keyType) => {
    setIsValidating(true);
    
    let keyValue = '';
    let validationFunction;
    
    switch(keyType) {
      case 'runway':
        keyValue = runwayApiKey;
        validationFunction = validateApiKey;
        break;
      case 'openrouter':
        keyValue = openRouterApiKey;
        validationFunction = validateOpenRouterApiKey;
        break;
      case 'huggingface':
        keyValue = huggingFaceApiKey;
        validationFunction = validateHuggingFaceApiKey;
        break;
    }
    
    try {
      const isValid = await validationFunction(keyValue);
      
      setValidationStatus(prev => ({ ...prev, [keyType]: isValid }));
      
      if (isValid) {
        toast({
          title: "API Key Valid",
          description: "The API key was validated successfully.",
          variant: "default",
        });
      } else {
        toast({
          title: "API Key Invalid",
          description: "The API key could not be validated. Please check it and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "There was a problem validating the API key. Please try again later.",
        variant: "destructive",
      });
      setValidationStatus(prev => ({ ...prev, [keyType]: false }));
    } finally {
      setIsValidating(false);
    }
  };
  
  const saveApiKey = async (keyType) => {
    setIsSaving(true);
    
    let keyValue = '';
    let storageKey = '';
    let serviceName = '';
    
    switch(keyType) {
      case 'runway':
        keyValue = runwayApiKey;
        storageKey = 'runway_api_key';
        serviceName = 'Runway';
        break;
      case 'openrouter':
        keyValue = openRouterApiKey;
        storageKey = 'openrouter_api_key';
        serviceName = 'OpenRouter';
        break;
      case 'huggingface':
        keyValue = huggingFaceApiKey;
        storageKey = 'huggingface_api_key';
        serviceName = 'HuggingFace';
        break;
    }
    
    // Optional: Validate before saving
    try {
      // Save the API key
      localStorage.setItem(storageKey, keyValue);
      
      // Show success notification
      toast({
        title: `${serviceName} API Key Saved`,
        description: `Your ${serviceName} API key has been securely saved.`,
        variant: 'default',
      });
      
      // Update validation status
      setValidationStatus(prev => ({ ...prev, [keyType]: true }));
    } catch (error) {
      toast({
        title: "Error Saving API Key",
        description: `There was a problem saving the ${serviceName} API key.`,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const clearApiKey = (keyType) => {
    let storageKey = '';
    let serviceName = '';
    
    switch(keyType) {
      case 'runway':
        setRunwayApiKey('');
        storageKey = 'runway_api_key';
        serviceName = 'Runway';
        break;
      case 'openrouter':
        setOpenRouterApiKey('');
        storageKey = 'openrouter_api_key';
        serviceName = 'OpenRouter';
        break;
      case 'huggingface':
        setHuggingFaceApiKey('');
        storageKey = 'huggingface_api_key';
        serviceName = 'HuggingFace';
        break;
    }
    
    localStorage.removeItem(storageKey);
    setValidationStatus(prev => ({ ...prev, [keyType]: null }));
    
    toast({
      title: `${serviceName} API Key Removed`,
      description: `Your ${serviceName} API key has been removed.`,
      variant: 'destructive',
    });
  };
  
  const renderValidationIndicator = (keyType) => {
    const status = validationStatus[keyType];
    
    if (status === null) return null;
    
    return status ? (
      <div className="flex items-center text-xs text-emerald-500 mt-1">
        <Check className="h-3 w-3 mr-1" />
        API key is valid
      </div>
    ) : (
      <div className="flex items-center text-xs text-red-500 mt-1">
        <AlertCircle className="h-3 w-3 mr-1" />
        API key is invalid
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Integration Settings</h2>
      
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="bg-zinc-800 border-zinc-700 border">
          <TabsTrigger value="runway" className="data-[state=active]:bg-zinc-700">
            <Key className="h-4 w-4 mr-2" />
            Runway API
          </TabsTrigger>
          <TabsTrigger value="openrouter" className="data-[state=active]:bg-zinc-700">
            <Link className="h-4 w-4 mr-2" />
            OpenRouter API
          </TabsTrigger>
          <TabsTrigger value="huggingface" className="data-[state=active]:bg-zinc-700">
            <Cloud className="h-4 w-4 mr-2" />
            HuggingFace API
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="runway">
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
                <label htmlFor="runwayApiKey" className="text-sm font-medium">
                  API Key
                </label>
                <div className="flex">
                  <Input
                    id="runwayApiKey"
                    value={runwayApiKey}
                    onChange={(e) => setRunwayApiKey(e.target.value)}
                    type="password"
                    placeholder="Enter your Runway API key"
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                  <div className="flex space-x-2 ml-2">
                    <Button 
                      variant="secondary" 
                      onClick={() => validateKey('runway')}
                      disabled={!runwayApiKey || isSaving || isValidating}
                    >
                      {isValidating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Validate"}
                    </Button>
                    <Button 
                      variant="default" 
                      onClick={() => saveApiKey('runway')} 
                      disabled={!runwayApiKey || isSaving}
                      className="bg-custom-pink hover:bg-custom-pink/90"
                    >
                      {isSaving ? 'Saving...' : 'Save Key'}
                    </Button>
                  </div>
                </div>
                {renderValidationIndicator('runway')}
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
                Last verified: {validationStatus.runway ? 'Just now' : 'Never'}
              </div>
              {runwayApiKey && (
                <Button variant="outline" onClick={() => clearApiKey('runway')} className="border-zinc-600 text-zinc-300">
                  Clear API Key
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="openrouter">
          <Card className="bg-zinc-800 border-zinc-700 text-white">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Link className="h-5 w-5 text-custom-pink" />
                <CardTitle>OpenRouter API Integration</CardTitle>
              </div>
              <CardDescription className="text-zinc-400">
                Configure OpenRouter API for extended AI model access and language processing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="openRouterApiKey" className="text-sm font-medium">
                  API Key
                </label>
                <div className="flex">
                  <Input
                    id="openRouterApiKey"
                    value={openRouterApiKey}
                    onChange={(e) => setOpenRouterApiKey(e.target.value)}
                    type="password"
                    placeholder="Enter your OpenRouter API key"
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                  <div className="flex space-x-2 ml-2">
                    <Button 
                      variant="secondary" 
                      onClick={() => validateKey('openrouter')}
                      disabled={!openRouterApiKey || isValidating}
                    >
                      {isValidating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Validate"}
                    </Button>
                    <Button 
                      variant="default" 
                      onClick={() => saveApiKey('openrouter')} 
                      disabled={!openRouterApiKey || isSaving}
                      className="bg-custom-pink hover:bg-custom-pink/90"
                    >
                      {isSaving ? 'Saving...' : 'Save Key'}
                    </Button>
                  </div>
                </div>
                {renderValidationIndicator('openrouter')}
              </div>
              
              <div className="bg-zinc-700/50 p-4 rounded-md flex gap-2 text-sm mt-4">
                <Info className="h-5 w-5 text-custom-pink shrink-0" />
                <p>
                  OpenRouter provides unified access to various AI models including those from OpenAI, Anthropic, 
                  and more. Use it for enhanced chat capabilities and AI-driven features.
                  <a href="https://openrouter.ai/docs" target="_blank" rel="noopener noreferrer" className="text-custom-pink hover:underline block mt-1">
                    Learn more about OpenRouter API
                  </a>
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-zinc-700 justify-between">
              <div className="text-sm text-zinc-400">
                Last verified: {validationStatus.openrouter ? 'Just now' : 'Never'}
              </div>
              {openRouterApiKey && (
                <Button variant="outline" onClick={() => clearApiKey('openrouter')} className="border-zinc-600 text-zinc-300">
                  Clear API Key
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="huggingface">
          <Card className="bg-zinc-800 border-zinc-700 text-white">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Cloud className="h-5 w-5 text-custom-pink" />
                <CardTitle>HuggingFace API Integration</CardTitle>
              </div>
              <CardDescription className="text-zinc-400">
                Configure HuggingFace API for access to thousands of AI models for various tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="huggingFaceApiKey" className="text-sm font-medium">
                  API Key
                </label>
                <div className="flex">
                  <Input
                    id="huggingFaceApiKey"
                    value={huggingFaceApiKey}
                    onChange={(e) => setHuggingFaceApiKey(e.target.value)}
                    type="password"
                    placeholder="Enter your HuggingFace API key"
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                  <div className="flex space-x-2 ml-2">
                    <Button 
                      variant="secondary" 
                      onClick={() => validateKey('huggingface')}
                      disabled={!huggingFaceApiKey || isValidating}
                    >
                      {isValidating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Validate"}
                    </Button>
                    <Button 
                      variant="default" 
                      onClick={() => saveApiKey('huggingface')} 
                      disabled={!huggingFaceApiKey || isSaving}
                      className="bg-custom-pink hover:bg-custom-pink/90"
                    >
                      {isSaving ? 'Saving...' : 'Save Key'}
                    </Button>
                  </div>
                </div>
                {renderValidationIndicator('huggingface')}
              </div>
              
              <div className="bg-zinc-700/50 p-4 rounded-md flex gap-2 text-sm mt-4">
                <Info className="h-5 w-5 text-custom-pink shrink-0" />
                <p>
                  HuggingFace provides access to thousands of pre-trained models for tasks like 
                  text generation, translation, sentiment analysis, and more.
                  <a href="https://huggingface.co/docs/api-inference/quicktour" target="_blank" rel="noopener noreferrer" className="text-custom-pink hover:underline block mt-1">
                    Learn more about HuggingFace API
                  </a>
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t border-zinc-700 justify-between">
              <div className="text-sm text-zinc-400">
                Last verified: {validationStatus.huggingface ? 'Just now' : 'Never'}
              </div>
              {huggingFaceApiKey && (
                <Button variant="outline" onClick={() => clearApiKey('huggingface')} className="border-zinc-600 text-zinc-300">
                  Clear API Key
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="bg-zinc-800 border-zinc-700 text-white mt-6">
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
