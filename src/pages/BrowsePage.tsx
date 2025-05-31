
import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MemberGrid } from '@/components/MemberGrid';
import { Separator } from '@/components/ui/separator';
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

const BrowsePage = () => {
  const [ageRange, setAgeRange] = useState<number[]>([18, 45]);
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filterButtons = [
    { id: 'all', label: 'All Members' },
    { id: 'new', label: 'New Members' },
    { id: 'featured', label: 'Featured' },
    { id: 'popular', label: 'Popular' },
    { id: 'online', label: 'Online Now' },
  ];
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Browse Members</h1>
        
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-[300px]">
            <Input
              placeholder="Search members..."
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
                  <label className="text-white font-medium mb-2 block">Gender</label>
                  <Select>
                    <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-700 border-zinc-600 text-white">
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="nonbinary">Non-binary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-white font-medium mb-2 block">Sort By</label>
                  <Select defaultValue="recent">
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
                    console.log('Filters applied');
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 bg-zinc-800 p-4 rounded-md border border-zinc-700">
          {filterButtons.map((filter) => (
            <Button 
              key={filter.id}
              variant={activeFilter === filter.id ? "outline" : "ghost"}
              className={`${
                activeFilter === filter.id 
                  ? "bg-zinc-700 border-zinc-600 text-white" 
                  : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
      
      <MemberGrid />
      
      <div className="mt-8 flex justify-center">
        <Button 
          variant="outline" 
          className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          onClick={() => {
            console.log('Loading more members');
          }}
        >
          Load More
        </Button>
      </div>
    </div>
  );
};

export default BrowsePage;
