import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, MapPin, UserCheck, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MemberGrid } from '@/components/MemberGrid';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfiles } from '@/hooks/useProfiles';

export interface ExploreFilters {
  ageRange: [number, number];
  distance: number;
  gender: string;
  sortBy: string;
  searchQuery: string;
  activeTab: string;
  quickFilter: string;
}

const ExplorePage = () => {
  const [filters, setFilters] = useState<ExploreFilters>({
    ageRange: [18, 45],
    distance: 50,
    gender: 'all',
    sortBy: 'recent',
    searchQuery: '',
    activeTab: 'all',
    quickFilter: 'all'
  });

  const { profiles, loading, error } = useProfiles();
  
  const quickFilters = [
    { id: 'all', label: 'All Members', icon: Users },
    { id: 'new', label: 'New Members', icon: Star },
    { id: 'featured', label: 'Featured', icon: Star },
    { id: 'popular', label: 'Popular', icon: Users },
    { id: 'online', label: 'Online Now', icon: UserCheck },
  ];

  const locations = [
    { name: "New York, NY", distance: "< 1 mile" },
    { name: "Brooklyn, NY", distance: "4 miles" },
    { name: "Queens, NY", distance: "7 miles" }
  ];

  const onlineCount = useMemo(() => {
    return profiles.filter(profile => profile.is_online).length;
  }, [profiles]);

  const filteredProfiles = useMemo(() => {
    let filtered = [...profiles];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(profile => 
        profile.nickname.toLowerCase().includes(query) ||
        profile.first_name.toLowerCase().includes(query) ||
        profile.location.toLowerCase().includes(query) ||
        profile.occupation?.toLowerCase().includes(query) ||
        profile.interests?.some(interest => interest.toLowerCase().includes(query))
      );
    }

    // Apply age filter
    filtered = filtered.filter(profile => 
      profile.age >= filters.ageRange[0] && profile.age <= filters.ageRange[1]
    );

    // Apply gender filter
    if (filters.gender !== 'all') {
      filtered = filtered.filter(profile => profile.gender === filters.gender);
    }

    // Apply quick filter
    switch (filters.quickFilter) {
      case 'online':
        filtered = filtered.filter(profile => profile.is_online);
        break;
      case 'new':
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        filtered = filtered.filter(profile => new Date(profile.created_at) > oneWeekAgo);
        break;
      case 'featured':
        filtered = filtered.filter(profile => profile.is_verified);
        break;
      case 'popular':
        // For now, sort by verification and recent activity
        filtered = filtered.filter(profile => profile.is_verified || profile.is_online);
        break;
    }

    // Apply tab filter
    switch (filters.activeTab) {
      case 'nearby':
        // For demo, just return all - would implement geo filtering with real data
        break;
      case 'online':
        filtered = filtered.filter(profile => profile.is_online);
        break;
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.last_active || b.created_at).getTime() - new Date(a.last_active || a.created_at).getTime());
        break;
      case 'new':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.is_verified ? 1 : 0) - (a.is_verified ? 1 : 0));
        break;
    }

    return filtered;
  }, [profiles, filters]);

  const updateFilter = (key: keyof ExploreFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <h1 className="text-3xl font-bold text-white">Explore Members</h1>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-[300px]">
            <Input
              placeholder="Search by name, location, interests..."
              value={filters.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              className="pl-10 bg-zinc-800 border-zinc-700 text-white"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] bg-zinc-800 border-zinc-700">
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-2">Age Range</h4>
                  <div className="mt-6 px-1">
                    <Slider
                      value={filters.ageRange}
                      max={80}
                      min={18}
                      step={1}
                      onValueChange={(value) => updateFilter('ageRange', value as [number, number])}
                    />
                    <div className="flex justify-between mt-2 text-zinc-400 text-sm">
                      <span>{filters.ageRange[0]}</span>
                      <span>{filters.ageRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Distance (miles)</h4>
                  <div className="mt-6 px-1">
                    <Slider
                      value={[filters.distance]}
                      max={100}
                      min={1}
                      step={1}
                      onValueChange={(value) => updateFilter('distance', value[0])}
                    />
                    <div className="flex justify-between mt-2 text-zinc-400 text-sm">
                      <span>1</span>
                      <span className="text-white">{filters.distance}</span>
                      <span>100+</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-white font-medium mb-2 block">Gender</label>
                  <Select value={filters.gender} onValueChange={(value) => updateFilter('gender', value)}>
                    <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-700 border-zinc-600 text-white">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="male">Men</SelectItem>
                      <SelectItem value="female">Women</SelectItem>
                      <SelectItem value="nonbinary">Non-binary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-white font-medium mb-2 block">Sort By</label>
                  <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                    <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-700 border-zinc-600 text-white">
                      <SelectItem value="recent">Recently Active</SelectItem>
                      <SelectItem value="new">Newest Members</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full bg-rose-500 hover:bg-rose-600"
                  onClick={() => {
                    console.log('Filters applied:', filters);
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Tabs 
        value={filters.activeTab} 
        onValueChange={(value) => updateFilter('activeTab', value)}
        className="mb-6"
      >
        <TabsList className="bg-zinc-800 border border-zinc-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-zinc-700">
            <Users size={16} className="mr-2" />
            All Members
          </TabsTrigger>
          <TabsTrigger value="nearby" className="data-[state=active]:bg-zinc-700">
            <MapPin size={16} className="mr-2" />
            Nearby
          </TabsTrigger>
          <TabsTrigger value="online" className="data-[state=active]:bg-zinc-700">
            <UserCheck size={16} className="mr-2" />
            Online Now 
            <Badge variant="outline" className="ml-2 bg-green-500 border-green-600">
              {onlineCount}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-4">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 bg-zinc-800 p-4 rounded-md border border-zinc-700">
              {quickFilters.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <Button 
                    key={filter.id}
                    variant={filters.quickFilter === filter.id ? "outline" : "ghost"}
                    className={`${
                      filters.quickFilter === filter.id 
                        ? "bg-zinc-700 border-zinc-600 text-white" 
                        : "text-zinc-400 hover:text-white"
                    }`}
                    onClick={() => updateFilter('quickFilter', filter.id)}
                  >
                    <IconComponent size={16} className="mr-2" />
                    {filter.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="nearby" className="pt-4">
          <div className="bg-zinc-800 p-4 rounded-md mb-6 border border-zinc-700">
            <h3 className="font-medium text-white mb-2 flex items-center">
              <MapPin size={18} className="mr-2 text-rose-500" />
              Near Your Location
            </h3>
            <div className="flex flex-wrap gap-2">
              {locations.map(location => 
                <Badge 
                  key={location.name} 
                  variant="outline" 
                  className="bg-zinc-700 hover:bg-zinc-600 cursor-pointer border-zinc-600"
                  onClick={() => {
                    console.log('Location filter:', location.name);
                  }}
                >
                  {location.name} <span className="ml-1 text-zinc-400">({location.distance})</span>
                </Badge>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="online" className="pt-4">
          <div className="bg-zinc-800 p-4 rounded-md mb-6 border border-zinc-700">
            <h3 className="font-medium text-white mb-2 flex items-center">
              <UserCheck size={18} className="mr-2 text-green-500" />
              Currently Online
            </h3>
            <p className="text-zinc-400 text-sm">
              {onlineCount} members are currently active. Connect with them in real-time!
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mb-4 text-zinc-400 text-sm">
        Showing {filteredProfiles.length} of {profiles.length} members
      </div>
      
      <MemberGrid />
      
      <div className="mt-8 flex justify-center">
        <Button 
          variant="outline" 
          className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          disabled={loading}
          onClick={() => {
            console.log('Loading more members');
          }}
        >
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      </div>
    </div>
  );
};

export default ExplorePage;