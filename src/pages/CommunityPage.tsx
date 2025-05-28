
import React from 'react';
import { Calendar, User, MessageSquare, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getBlogPosts } from '@/data/blogPosts';
import { getMemberById } from '@/data/members';

const CommunityPage = () => {
  const allBlogPosts = getBlogPosts();
  const featuredPost = allBlogPosts[3]; // Featured post
  const recentPosts = allBlogPosts.slice(0, 9); // First 9 posts for the grid

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Community Blog</h1>
      
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Featured Post */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 h-full">
            <div className="h-56 overflow-hidden">
              <img 
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-zinc-400 mb-2">
                <Calendar size={14} className="mr-1" />
                <span>{featuredPost.date}</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <User size={14} className="mr-1" />
                <span>{featuredPost.author}</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <MessageSquare size={14} className="mr-1" />
                <span>{featuredPost.comments} comments</span>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Heart size={14} className="mr-1" />
                <span>{featuredPost.likes} likes</span>
              </div>
              
              <h2 className="text-2xl font-semibold text-white mb-3">
                {featuredPost.title}
              </h2>
              
              <p className="text-zinc-300 mb-4">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">{featuredPost.readTime} min read</span>
                <Button variant="link" className="text-custom-pink p-0 flex items-center">
                  Read More <ArrowRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Popular Posts Sidebar */}
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
          <h2 className="font-bold text-white mb-4">Popular Posts</h2>
          <div className="space-y-4">
            {allBlogPosts.slice(0, 5).map((post, index) => (
              <div key={post.id} className="flex gap-3 group">
                <div className="text-custom-pink font-bold text-lg">{index + 1}</div>
                <a href="#" className="text-zinc-300 group-hover:text-white transition-colors">
                  {post.title}
                </a>
              </div>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <h2 className="font-bold text-white mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "Dating Tips", "Relationships", "Adventure Dating", 
              "Online Dating", "Wellness", "Food & Dating"
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
        {recentPosts.map(post => {
          const author = getMemberById(post.authorId);
          return (
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
                  <Separator orientation="vertical" className="mx-2 h-4" />
                  <Heart size={14} className="mr-1" />
                  <span>{post.likes}</span>
                </div>
                
                <span className="inline-block bg-custom-pink/20 text-custom-pink px-2 py-1 rounded text-xs mb-2">
                  {post.category}
                </span>
                
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
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-500">{post.readTime} min</span>
                    <Button variant="link" className="text-custom-pink p-0 text-sm flex items-center">
                      Read More <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityPage;
