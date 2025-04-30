
import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MemberGrid } from '@/components/MemberGrid';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from '@/components/ui/slider';

const DiscoverPage = () => {
  const [ageRange, setAgeRange] = useState<number[]>([18, 45]);
  const [distance, setDistance] = useState<number[]>([50]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
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
      
      <MemberGrid />
    </div>
  );
};

export default DiscoverPage;
