
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Heart, 
  UserPlus,
  Users,
  MapPin, 
  Calendar, 
  MoreHorizontal, 
  Flag,
  UserX,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
      description: isLiked ? "You've removed your like." : `You've liked ${MEMBER.nickname}'s profile.`,
    });
  };
  
  const handleMessage = () => {
    // Navigate to messages with this user
    navigate(`/messages?userId=${id}`);
  };
  
  const handleFriendRequest = () => {
    toast({
      title: "Friend Request Sent",
      description: `Friend request sent to ${MEMBER.nickname}.`,
    });
  };
  
  const handleInviteToGroup = () => {
    toast({
      title: "Group Invite",
      description: `Invite sent to ${MEMBER.nickname} to join your group.`,
    });
  };
  
  const handleBlock = () => {
    toast({
      title: "User Blocked",
      description: `You won't see ${MEMBER.nickname}'s profile anymore.`,
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
              alt={`${MEMBER.nickname}'s profile`}
              className="w-full aspect-[3/4] object-cover select-none pointer-events-none"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
            />
            
            {/* Verified Badge */}
            <Badge className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 text-xs font-semibold">
              <Check size={12} className="mr-1" />
              Verified
            </Badge>
            
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
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            ))}
          </div>
          
          {/* Additional action buttons */}
          <div className="flex gap-2">
            <ButtonSecondary onClick={handleFriendRequest} className="flex-1">
              Friend Request
              <UserPlus size={16} />
            </ButtonSecondary>
            
            <ButtonSecondary onClick={handleInviteToGroup} className="flex-1">
              Invite to Group
              <Users size={16} />
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
          <div>
            <h1 className="text-3xl font-bold text-white">{MEMBER.nickname}, {MEMBER.age}</h1>
            <div className="flex items-center text-zinc-300 mt-1">
              <MapPin size={16} className="mr-1" />
              <span>{MEMBER.location}</span>
              <span className="ml-4 text-green-500 text-sm font-medium">{MEMBER.lastActive}</span>
            </div>
          </div>
          
          <Tabs defaultValue="about">
            <TabsList className="bg-zinc-800 border-b border-zinc-700">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="mutual">Mutual Friends</TabsTrigger>
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
                      alt={`${MEMBER.nickname}'s photo ${i+1}`} 
                      className="w-full h-full object-cover select-none pointer-events-none"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
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
            
            <TabsContent value="groups" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-3">Groups</h3>
              <p className="text-zinc-300">Member of 3 groups</p>
              <div className="space-y-3 mt-3">
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <h4 className="text-white font-medium">Photography Enthusiasts</h4>
                  <p className="text-zinc-400 text-sm">Local photography group - 127 members</p>
                </div>
                <div className="bg-zinc-800 p-3 rounded-lg">
                  <h4 className="text-white font-medium">Weekend Hikers</h4>
                  <p className="text-zinc-400 text-sm">Outdoor adventure group - 89 members</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="blog" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-3">Blog Posts</h3>
              <div className="space-y-4">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">My Journey Through Japan</h4>
                  <p className="text-zinc-400 text-sm">Published 2 weeks ago • 45 likes • 12 comments</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Best Coffee Shops in the City</h4>
                  <p className="text-zinc-400 text-sm">Published 1 month ago • 23 likes • 8 comments</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mutual" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-3">Mutual Friends</h3>
              <p className="text-zinc-300 mb-3">You have 12 mutual friends</p>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 bg-zinc-700 rounded-full mb-2 mx-auto"></div>
                    <p className="text-xs text-zinc-400">Friend {i}</p>
                  </div>
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
