
import React from 'react';
import { Calendar, User, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CommunityPage = () => {
  // Mock blog data
  const blogPosts = [
    {
      id: 1,
      title: "5 Tips for Creating an Authentic Dating Profile",
      excerpt: "Learn how to showcase the real you and attract meaningful connections with these expert tips...",
      image: "/lovable-uploads/ab2b4a57-9177-4693-9a88-23d89544a07b.png",
      author: "Jessica Chen",
      date: "May 2, 2023",
      comments: 24
    },
    {
      id: 2,
      title: "The Psychology Behind Successful Relationships",
      excerpt: "Understanding attachment styles and communication patterns can dramatically improve your connections...",
      image: "/lovable-uploads/6d9b54c2-64d4-44f3-959b-b0c71fff7a04.png",
      author: "Dr. Michael Rivera",
      date: "April 15, 2023",
      comments: 42
    },
    {
      id: 3,
      title: "Dating Across Cultures: Embracing Differences",
      excerpt: "How cultural diversity can enrich your relationship and broaden your horizons when dating...",
      image: "/lovable-uploads/7973c816-d414-4bfa-b312-1407036a6e21.png",
      author: "Aisha Patel",
      date: "March 28, 2023",
      comments: 18
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Community Blog</h1>
      
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Featured Post */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 h-full">
            <div className="h-56 overflow-hidden">
              <img 
                src="/lovable-uploads/e50ff5ee-d6a3-49e9-b666-e7f48dfdfb8b.png" 
                alt="Featured Post" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-zinc-400 mb-2">
                <Calendar size={14} className="mr-1" />
                <span>May 10, 2023</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <User size={14} className="mr-1" />
                <span>Sarah Johnson</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <MessageSquare size={14} className="mr-1" />
                <span>36 comments</span>
              </div>
              
              <h2 className="text-2xl font-semibold text-white mb-3">
                Finding Love in the Digital Age: Navigating Online Dating
              </h2>
              
              <p className="text-zinc-300 mb-4">
                The landscape of dating has transformed dramatically over the past decade. 
                With most romantic connections now beginning online, it's important to understand 
                how to navigate this new terrain authentically and safely...
              </p>
              
              <Button variant="link" className="text-custom-pink p-0 flex items-center">
                Read More <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Popular Posts Sidebar */}
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
          <h2 className="font-bold text-white mb-4">Popular Posts</h2>
          <div className="space-y-4">
            {[
              "How to Start Conversations That Actually Lead Somewhere",
              "Red Flags vs. Yellow Flags: What to Watch For",
              "Dating with Intention: Moving Beyond Casual Connections",
              "Self-Care Practices While Dating",
              "When to Take Your Relationship Offline"
            ].map((title, index) => (
              <div key={index} className="flex gap-3 group">
                <div className="text-custom-pink font-bold text-lg">{index + 1}</div>
                <a href="#" className="text-zinc-300 group-hover:text-white transition-colors">
                  {title}
                </a>
              </div>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <h2 className="font-bold text-white mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Relationships", "Dating Tips", "Success Stories", 
              "Online Dating", "Communication", "Self-Growth"
            ].map((category, index) => (
              <a 
                key={index} 
                href="#" 
                className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600 px-3 py-1 rounded-full text-sm"
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map(post => (
          <div key={post.id} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700">
            <div className="h-40 overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center text-sm text-zinc-400 mb-2">
                <Calendar size={14} className="mr-1" />
                <span>{post.date}</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <MessageSquare size={14} className="mr-1" />
                <span>{post.comments}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">
                {post.title}
              </h3>
              
              <p className="text-zinc-300 mb-3 text-sm">
                {post.excerpt}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-zinc-400 flex items-center">
                  <User size={14} className="mr-1" />
                  <span>{post.author}</span>
                </div>
                
                <Button variant="link" className="text-custom-pink p-0 text-sm flex items-center">
                  Read More <ArrowRight size={14} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
