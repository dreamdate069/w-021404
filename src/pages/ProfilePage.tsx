
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Heart, 
  X, 
  Check, 
  MapPin, 
  Calendar, 
  Share,
  MoreHorizontal, 
  Flag,
  UserX
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ButtonPrimary from '@/components/ButtonPrimary';
import ButtonSecondary from '@/components/ButtonSecondary';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { getMemberById } from '@/data/members';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  
  // Get the correct member data based on the ID parameter
  const MEMBER = getMemberById(id || '1');
  
  if (!MEMBER) {
    navigate('/not-found');
    return null;
  }
  
  const handleLike = () => {
    setIsLiked(prev => !prev);
    toast({
      title: isLiked ? "Removed Like" : "Profile Liked",
      description: isLiked ? "You've removed your like." : `You've liked ${MEMBER.name}'s profile.`,
    });
  };
  
  const handleMessage = () => {
    // Navigate to messages with this user
    navigate(`/messages?userId=${id}`);
  };
  
  const handleShare = () => {
    // Copy profile link to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Profile link copied to clipboard.",
    });
  };
  
  const handleBlock = () => {
    toast({
      title: "User Blocked",
      description: `You won't see ${MEMBER.name}'s profile anymore.`,
      variant: "destructive",
    });
    // In a real app, we would make an API call to block the user
    setTimeout(() => navigate('/discover'), 1500);
  };
  
  const handleReport = () => {
    toast({
      title: "Profile Reported",
      description: "Thank you for helping keep our community safe.",
      variant: "destructive",
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        {/* Left Column - Photos */}
        <div className="space-y-4">
          <div className="bg-zinc-800 rounded-xl overflow-hidden relative">
            <img 
              src={MEMBER.images?.[0] || MEMBER.image} 
              alt={`${MEMBER.name}'s profile`}
              className="w-full aspect-[3/4] object-cover"
            />
            
            {/* Action buttons overlay at bottom of profile picture */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex gap-2">
              <ButtonPrimary 
                onClick={handleLike} 
                className="flex-1 py-2"
              >
                {isLiked ? 'Liked' : 'Like'}
                <Heart size={18} className={isLiked ? "fill-white" : ""} />
              </ButtonPrimary>
              
              <ButtonSecondary 
                onClick={handleMessage} 
                className="flex-1 py-2"
              >
                Message
                <MessageSquare size={18} />
              </ButtonSecondary>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {MEMBER.images?.slice(1).map((image, i) => (
              <div key={i} className="bg-zinc-800 rounded-lg overflow-hidden aspect-square">
                <img 
                  src={image}
                  alt={`${MEMBER.name}'s photo ${i+2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Additional action buttons */}
          <div className="flex justify-between">
            <ButtonSecondary onClick={handleShare} className="flex-1 mr-2">
              Share
              <Share size={16} />
            </ButtonSecondary>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MoreHorizontal size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem 
                  onClick={handleBlock}
                  className="text-red-500 cursor-pointer"
                >
                  <UserX size={16} className="mr-2" />
                  Block User
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleReport}
                  className="text-orange-500 cursor-pointer"
                >
                  <Flag size={16} className="mr-2" />
                  Report Profile
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                    <span>{MEMBER.age} years old</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <MapPin size={16} />
                    <span>Lives in {MEMBER.location}</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="photos" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-3">Photos</h3>
              <div className="grid grid-cols-3 gap-3">
                {MEMBER.images?.map((image, i) => (
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
                {MEMBER.interests?.map((interest) => (
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
