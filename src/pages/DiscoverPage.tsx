
import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MemberGrid } from '@/components/MemberGrid';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from '@/components/ui/slider';
import {
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from "@/components/ui/tabs";

const DiscoverPage = () => {
  const [ageRange, setAgeRange] = useState<number[]>([18, 45]);
  const [distance, setDistance] = useState<number[]>([50]);
  const [activeTab, setActiveTab] = useState("nearby");
  
  const locations = [
    { name: "New York, NY", distance: "< 1 mile" },
    { name: "Brooklyn, NY", distance: "4 miles" },
    { name: "Queens, NY", distance: "7 miles" },
  ];

  const onlineCount = 132;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <h1 className="text-3xl font-bold text-white">Discover</h1>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-[300px]">
            <Input
              placeholder="Search by name, location..."
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
                      defaultValue={ageRange}
                      max={80}
                      min={18}
                      step={1}
                      onValueChange={setAgeRange}
                    />
                    <div className="flex justify-between mt-2 text-zinc-400 text-sm">
                      <span>{ageRange[0]}</span>
                      <span>{ageRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Distance (miles)</h4>
                  <div className="mt-6 px-1">
                    <Slider
                      defaultValue={distance}
                      max={100}
                      min={1}
                      step={1}
                      onValueChange={setDistance}
                    />
                    <div className="flex justify-between mt-2 text-zinc-400 text-sm">
                      <span>1</span>
                      <span className="text-white">{distance[0]}</span>
                      <span>100+</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-rose-500 hover:bg-rose-600">
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Tabs defaultValue="nearby" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="bg-zinc-800 border border-zinc-700">
          <TabsTrigger value="nearby" className="data-[state=active]:bg-zinc-700">
            <MapPin size={16} className="mr-2" />
            Nearby
          </TabsTrigger>
          <TabsTrigger value="online" className="data-[state=active]:bg-zinc-700">
            <UserCheck size={16} className="mr-2" />
            Online Now <Badge variant="outline" className="ml-2 bg-green-500 border-green-600">{onlineCount}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="nearby" className="pt-4">
          <div className="bg-zinc-800 p-4 rounded-md mb-6 border border-zinc-700">
            <h3 className="font-medium text-white mb-2 flex items-center">
              <MapPin size={18} className="mr-2 text-custom-pink" />
              Near Your Location
            </h3>
            <div className="flex flex-wrap gap-2">
              {locations.map(location => (
                <Badge 
                  key={location.name}
                  variant="outline" 
                  className="bg-zinc-700 hover:bg-zinc-600 cursor-pointer border-zinc-600"
                >
                  {location.name} <span className="ml-1 text-zinc-400">({location.distance})</span>
                </Badge>
              ))}
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
      
      <MemberGrid />
    </div>
  );
};

export default DiscoverPage;
