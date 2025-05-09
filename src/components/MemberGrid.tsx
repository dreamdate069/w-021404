
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Updated member data with real profile picture paths
const MEMBERS = [
  { 
    id: '1', 
    name: 'Jessica', 
    age: 28, 
    location: 'New York', 
    image: '/user-uploads/profile-pics/1.png',
    online: true
  },
  { 
    id: '2', 
    name: 'Michael', 
    age: 32, 
    location: 'Los Angeles', 
    image: '/user-uploads/profile-pics/(3).png',
    online: false
  },
  { 
    id: '3', 
    name: 'Emma', 
    age: 26, 
    location: 'Chicago', 
    image: '/user-uploads/profile-pics/(4).png',
    online: true
  },
  { 
    id: '4', 
    name: 'James', 
    age: 30, 
    location: 'Miami', 
    image: '/user-uploads/profile-pics/Untitled design (1).png',
    online: false
  },
  { 
    id: '5', 
    name: 'Olivia', 
    age: 25, 
    location: 'Seattle', 
    image: '/user-uploads/profile-pics/Untitled design (3).png',
    online: true
  },
  { 
    id: '6', 
    name: 'Daniel', 
    age: 34, 
    location: 'Boston', 
    image: '/user-uploads/profile-pics/Untitled design (4).png',
    online: true
  },
  { 
    id: '7', 
    name: 'Sophia', 
    age: 27, 
    location: 'Austin', 
    image: '/user-uploads/profile-pics/Untitled design (5).png',
    online: false
  },
  { 
    id: '8', 
    name: 'William', 
    age: 29, 
    location: 'Denver', 
    image: '/user-uploads/profile-pics/design (1).png',
    online: true
  }
];

export const MemberGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {MEMBERS.map((member) => (
        <div key={member.id} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 relative group">
          <div className="aspect-[3/4] relative overflow-hidden">
            <img 
              src={member.image} 
              alt={`${member.name}'s profile`} 
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            
            {/* Online indicator */}
            {member.online && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full ring-2 ring-zinc-800"></span>
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3">
              <h3 className="text-white font-medium text-lg">{member.name}, {member.age}</h3>
              <p className="text-zinc-300 text-sm">{member.location}</p>
            </div>
            
            {/* Like/Match Button */}
            <Button 
              size="icon" 
              className="absolute top-2 left-2 bg-zinc-800/70 hover:bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Heart size={16} />
            </Button>
          </div>
          
          <div className="p-3 bg-zinc-800">
            <Link 
              to={`/profile/${member.id}`} 
              className="block w-full text-center text-white bg-zinc-700 py-2 rounded hover:bg-rose-500 transition-colors"
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
