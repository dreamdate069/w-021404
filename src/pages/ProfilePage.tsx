
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
import { Skeleton } from '@/components/ui/skeleton';
import ButtonPrimary from '@/components/ButtonPrimary';
import ButtonSecondary from '@/components/ButtonSecondary';
import ImageModal from '@/components/ImageModal';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfiles';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  
  const { profile: MEMBER, loading, error } = useProfile(id || '');
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8">
          <div className="space-y-4">
            <Skeleton className="aspect-[3/4] w-full rounded-xl" />
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !MEMBER) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Profile Not Found</h1>
        <p className="text-zinc-400 mb-6">The profile you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/discover')} className="bg-custom-pink hover:bg-custom-pink/90">
          Back to Discover
        </Button>
      </div>
    );
  }
  
  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
  };
  
  const handleLike = () => {
    setIsLiked(prev => !prev);
    toast({
      title: isLiked ? "Removed Like" : "Profile Liked",
      description: isLiked ? "You've removed your like." : `You've liked ${MEMBER.nickname}'s profile.`,
    });
  };
  
  const handleMessage = () => {
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
    setTimeout(() => navigate('/discover'), 1500);
  };
  
  const handleReport = () => {
    toast({
      title: "Profile Reported",
      description: "Thank you for helping keep our community safe.",
      variant: "destructive",
    });
  };

  const primaryPhoto = MEMBER.photos.find(photo => photo.is_primary) || MEMBER.photos[0];
  const otherPhotos = MEMBER.photos.filter(photo => !photo.is_primary).slice(0, 5);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="grid md:grid-cols-[1fr_2fr] gap-8">
        {/* Left Column - Photos */}
        <div className="space-y-4">
          <div className="bg-zinc-800 rounded-xl overflow-hidden relative group hover-lift">
            <img 
              src={primaryPhoto?.photo_url || '/user-uploads/profile-pics/placeholder.png'} 
              alt={`${MEMBER.nickname}'s profile`}
              className="w-full aspect-[3/4] object-cover select-none pointer-events-none cursor-pointer transition-transform duration-500 group-hover:scale-105"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onClick={() => handleImageClick(primaryPhoto?.photo_url || '', `${MEMBER.nickname}'s profile`)}
            />
            
            {/* Animated background overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-custom-pink/10 via-transparent to-custom-purple/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Verified Badge */}
            {MEMBER.is_verified && (
              <Badge className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 text-xs font-semibold transition-transform duration-300 group-hover:scale-110">
                <Check size={12} className="mr-1" />
                Verified
              </Badge>
            )}
            
            {/* Action buttons overlay at bottom of profile picture */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex gap-2 transform transition-transform duration-300 group-hover:translate-y-0">
              <ButtonPrimary 
                onClick={handleLike} 
                className="flex-1 py-2 transition-all duration-300 hover:scale-105"
              >
                {isLiked ? 'Liked' : 'Like'}
                <Heart size={18} className={isLiked ? "fill-white" : ""} />
              </ButtonPrimary>
              
              <ButtonSecondary 
                onClick={handleMessage} 
                className="flex-1 py-2 transition-all duration-300 hover:scale-105"
              >
                Message
                <MessageSquare size={18} />
              </ButtonSecondary>
            </div>
          </div>
          
          {otherPhotos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {otherPhotos.map((photo, i) => (
                <div key={photo.id} className="bg-zinc-800 rounded-lg overflow-hidden aspect-square group hover-lift cursor-pointer">
                  <img 
                    src={photo.photo_url}
                    alt={`${MEMBER.nickname}'s photo ${i+2}`}
                    className="w-full h-full object-cover select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onClick={() => handleImageClick(photo.photo_url, `${MEMBER.nickname}'s photo ${i+2}`)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-custom-pink/20 via-transparent to-custom-purple/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          )}
          
          {/* Additional action buttons */}
          <div className="flex gap-2">
            <ButtonSecondary onClick={handleFriendRequest} className="flex-1 transition-all duration-300 hover:scale-105">
              Friend Request
              <UserPlus size={16} />
            </ButtonSecondary>
            
            <ButtonSecondary onClick={handleInviteToGroup} className="flex-1 transition-all duration-300 hover:scale-105">
              Invite to Group
              <Users size={16} />
            </ButtonSecondary>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full transition-all duration-300 hover:scale-110">
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
              <span className="ml-4 text-green-500 text-sm font-medium">
                {MEMBER.is_online ? 'Online now' : 'Recently active'}
              </span>
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
              <p className="text-zinc-300">{MEMBER.bio || 'No bio available.'}</p>
              
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
                  {MEMBER.occupation && (
                    <div className="flex items-center gap-2 text-zinc-300">
                      <span>💼</span>
                      <span>{MEMBER.occupation}</span>
                    </div>
                  )}
                  {MEMBER.education && (
                    <div className="flex items-center gap-2 text-zinc-300">
                      <span>🎓</span>
                      <span>{MEMBER.education}</span>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="photos" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-3">Photos</h3>
              <div className="grid grid-cols-3 gap-3">
                {MEMBER.photos.map((photo) => (
                  <div key={photo.id} className="aspect-square rounded-lg overflow-hidden group hover-lift cursor-pointer">
                    <img 
                      src={photo.photo_url} 
                      alt={`${MEMBER.nickname}'s photo`} 
                      className="w-full h-full object-cover select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                      draggable="false"
                      onContextMenu={(e) => e.preventDefault()}
                      onClick={() => handleImageClick(photo.photo_url, `${MEMBER.nickname}'s photo`)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-custom-pink/20 via-transparent to-custom-purple/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
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
                    className="bg-zinc-700 text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-custom-pink hover:scale-105"
                  >
                    {interest}
                  </span>
                )) || <p className="text-zinc-400">No interests listed.</p>}
              </div>
            </TabsContent>
            
            <TabsContent value="groups" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-3">Groups</h3>
              <p className="text-zinc-300">Member of 3 groups</p>
              <div className="space-y-3 mt-3">
                <div className="bg-zinc-800 p-3 rounded-lg transition-all duration-300 hover:bg-zinc-700 hover-lift">
                  <h4 className="text-white font-medium">Photography Enthusiasts</h4>
                  <p className="text-zinc-400 text-sm">Local photography group - 127 members</p>
                </div>
                <div className="bg-zinc-800 p-3 rounded-lg transition-all duration-300 hover:bg-zinc-700 hover-lift">
                  <h4 className="text-white font-medium">Weekend Hikers</h4>
                  <p className="text-zinc-400 text-sm">Outdoor adventure group - 89 members</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="blog" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-3">Blog Posts</h3>
              <div className="space-y-4">
                <div className="bg-zinc-800 p-4 rounded-lg transition-all duration-300 hover:bg-zinc-700 hover-lift">
                  <h4 className="text-white font-medium mb-2">My Journey Through Germany</h4>
                  <p className="text-zinc-400 text-sm">Published 2 weeks ago • 45 likes • 12 comments</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg transition-all duration-300 hover:bg-zinc-700 hover-lift">
                  <h4 className="text-white font-medium mb-2">Best Coffee Shops in {MEMBER.location}</h4>
                  <p className="text-zinc-400 text-sm">Published 1 month ago • 23 likes • 8 comments</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mutual" className="pt-4">
              <h3 className="text-xl font-bold text-white mb-3">Mutual Friends</h3>
              <p className="text-zinc-300 mb-3">You have 12 mutual friends</p>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center group hover-lift">
                    <div className="w-16 h-16 bg-zinc-700 rounded-full mb-2 mx-auto transition-all duration-300 group-hover:scale-110"></div>
                    <p className="text-xs text-zinc-400">Friend {i}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Image Modal */}
      <ImageModal
        src={selectedImage?.src || ''}
        alt={selectedImage?.alt || ''}
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default ProfilePage;
