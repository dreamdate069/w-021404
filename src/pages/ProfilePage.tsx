
import React from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquare, Heart, X, Check, MapPin, Calendar, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// This is a temporary solution until connected to Supabase
const MEMBER = {
  id: '1',
  name: 'Jessica',
  age: 28,
  location: 'New York',
  bio: 'Love hiking, photography, and trying new restaurants. Looking for someone who enjoys adventures and good conversation.',
  images: [
    '/lovable-uploads/6d9b54c2-64d4-44f3-959b-b0c71fff7a04.png',
    '/lovable-uploads/7973c816-d414-4bfa-b312-1407036a6e21.png',
    '/placeholder.svg'
  ],
  interests: ['Travel', 'Photography', 'Cooking', 'Hiking', 'Movies'],
  lastActive: 'Online now'
};

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        {/* Left Column - Photos */}
        <div className="space-y-4">
          <div className="bg-zinc-800 rounded-xl overflow-hidden">
            <img 
              src={MEMBER.images[0]} 
              alt={`${MEMBER.name}'s profile`}
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {MEMBER.images.slice(1).map((image, i) => (
              <div key={i} className="bg-zinc-800 rounded-lg overflow-hidden aspect-square">
                <img 
                  src={image}
                  alt={`${MEMBER.name}'s photo ${i+2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          <div className="flex justify-between gap-2">
            <Button className="flex-1 gap-2 bg-rose-600 hover:bg-rose-700">
              <Heart size={16} />
              Like
            </Button>
            <Button className="flex-1 gap-2" variant="outline">
              <MessageSquare size={16} />
              Message
            </Button>
          </div>
        </div>
        
        {/* Right Column - Profile Info */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{MEMBER.name}, {MEMBER.age}</h1>
              <div className="flex items-center text-zinc-300 mt-1">
                <MapPin size={16} className="mr-1" />
                <span>{MEMBER.location}</span>
                <span className="ml-4 text-green-500 text-sm font-medium">{MEMBER.lastActive}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="icon" variant="outline" className="rounded-full border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white">
                <X size={16} />
              </Button>
              <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600">
                <Check size={16} />
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="about">
            <TabsList className="bg-zinc-800 border-b border-zinc-700">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-2">About Me</h3>
              <p className="text-zinc-300">{MEMBER.bio}</p>
              
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-2">Basic Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Calendar size={16} />
                    <span>28 years old</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <MapPin size={16} />
                    <span>Lives in New York</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="photos" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-3">Photos</h3>
              <div className="grid grid-cols-3 gap-3">
                {MEMBER.images.map((image, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={image} 
                      alt={`${MEMBER.name}'s photo ${i+1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="interests" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-3">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {MEMBER.interests.map((interest) => (
                  <span 
                    key={interest} 
                    className="bg-zinc-700 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
