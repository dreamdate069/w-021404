
import React from 'react';
import { Calendar, User, MessageSquare, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getBlogPosts } from '@/data/blogPosts';
import { getMemberById } from '@/data/members';
import SEO from '@/components/SEO';

const CommunityPage = () => {
  const allBlogPosts = getBlogPosts();
  const featuredPost = allBlogPosts[3]; // Featured post
  const recentPosts = allBlogPosts.slice(0, 9); // First 9 posts for the grid

  return (
    <>
      <SEO 
        title="Dating Tips & Relationship Advice - DreamDate Community"
        description="Discover expert dating tips, relationship advice, and success stories from the DreamDate community. Learn how to find love, build meaningful connections, and navigate modern dating."
        keywords={["dating tips", "relationship advice", "dating blog", "love advice", "relationship psychology", "dating success stories", "modern dating"]}
        url="https://dreamdate.app/community"
      />
      
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">DreamDate Community & Dating Blog</h1>
          <p className="text-zinc-300 text-lg max-w-3xl">
            Discover expert dating advice, relationship psychology insights, and real success stories from our community. 
            Learn how to create authentic connections, navigate modern dating, and find lasting love in today's digital world.
          </p>
        </div>
        
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
                
                <span className="inline-block bg-custom-pink/20 text-custom-pink px-2 py-1 rounded text-xs mb-3">
                  Featured Article
                </span>
                
                <h2 className="text-2xl font-semibold text-white mb-3">
                  {featuredPost.title}
                </h2>
                
                <p className="text-zinc-300 mb-4">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">{featuredPost.readTime} min read</span>
                  <Button variant="link" className="text-custom-pink p-0 flex items-center">
                    Read Full Article <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Popular Posts Sidebar */}
          <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
            <h2 className="font-bold text-white mb-4">Most Popular Dating Tips</h2>
            <div className="space-y-4">
              {allBlogPosts.slice(0, 5).map((post, index) => (
                <div key={post.id} className="flex gap-3 group">
                  <div className="text-custom-pink font-bold text-lg">{index + 1}</div>
                  <a href="#" className="text-zinc-300 group-hover:text-white transition-colors text-sm">
                    {post.title}
                  </a>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <h2 className="font-bold text-white mb-4">Dating Categories</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Dating Tips", "Relationships", "Adventure Dating", 
                "Online Dating", "Wellness", "Cultural Dating",
                "Digital Dating", "Date Ideas"
              ].map((category, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="bg-zinc-700 text-zinc-300 hover:bg-zinc-600 hover:text-white px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="bg-gradient-to-r from-custom-pink/10 to-purple-600/10 p-4 rounded-lg border border-custom-pink/20">
              <h3 className="font-bold text-white mb-2">Join Our Community</h3>
              <p className="text-zinc-300 text-sm mb-3">Get personalized dating advice and connect with like-minded singles.</p>
              <Button className="w-full bg-custom-pink hover:bg-custom-pink/90">
                Start Your Journey
              </Button>
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Latest Dating Advice & Relationship Tips</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map(post => {
              const author = getMemberById(post.authorId);
              return (
                <article key={post.id} className="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700 hover:border-zinc-600 transition-colors">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
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
                    
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-zinc-300 mb-3 text-sm line-clamp-3">
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
                </article>
              );
            })}
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-custom-pink/10 to-purple-600/10 rounded-lg p-8 border border-custom-pink/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get Weekly Dating Tips</h2>
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for expert dating advice, relationship insights, and exclusive content delivered to your inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:border-custom-pink"
            />
            <Button className="bg-custom-pink hover:bg-custom-pink/90 px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
