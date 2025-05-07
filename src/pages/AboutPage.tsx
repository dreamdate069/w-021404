
import React from 'react';
import { Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-6">About DreamDate</h1>
      
      <div className="bg-zinc-800 rounded-lg p-6 mb-8 border border-zinc-700">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
        <p className="text-zinc-300 mb-4">
          DreamDate is dedicated to helping people form meaningful connections in an authentic way. 
          We believe in creating a safe, inclusive environment where everyone can be themselves and 
          find others who appreciate them for who they are.
        </p>
        <p className="text-zinc-300">
          Founded in 2023, we've grown to become one of the most trusted dating platforms, with thousands 
          of successful matches and relationships that started right here.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
          <div className="w-12 h-12 bg-custom-pink rounded-full flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Authentic Connections</h3>
          <p className="text-zinc-300">
            Our algorithm focuses on compatibility beyond just photos, helping you find people you'll really click with.
          </p>
        </div>
        
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
          <div className="w-12 h-12 bg-custom-pink rounded-full flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Privacy First</h3>
          <p className="text-zinc-300">
            Your data is yours. We maintain strict privacy standards and give you control over what you share.
          </p>
        </div>
        
        <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
          <div className="w-12 h-12 bg-custom-pink rounded-full flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Safety Matters</h3>
          <p className="text-zinc-300">
            We employ advanced monitoring systems and human moderation to ensure a respectful community.
          </p>
        </div>
      </div>
      
      <div className="bg-zinc-800 rounded-lg p-6 border border-zinc-700">
        <h2 className="text-2xl font-semibold text-white mb-4">Our Story</h2>
        <p className="text-zinc-300 mb-4">
          DreamDate began with a simple idea: dating should be less about swiping and more about connecting. 
          Our founders experienced the frustration of superficial dating apps and wanted to create 
          something more meaningful.
        </p>
        <p className="text-zinc-300">
          Today, we're proud to have helped thousands of couples find each other, and we're 
          just getting started on our mission to revolutionize how people meet online.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
