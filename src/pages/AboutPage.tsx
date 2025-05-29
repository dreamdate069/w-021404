
import React from 'react';
import { Heart, Shield, Users, Target, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const AboutPage = () => {
  return (
    <>
      <SEO 
        title="About DreamDate - Germany's Premier Dating Platform"
        description="Learn about DreamDate's mission to create authentic connections and meaningful relationships. Discover our story, values, and commitment to safe, verified online dating in Germany."
        keywords={["about dreamdate", "dating platform story", "authentic dating", "verified profiles", "safe online dating", "German dating platform"]}
        url="https://dreamdate.app/about"
      />
      
      <div className="container mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Creating Authentic Love Stories in Germany
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            DreamDate was born from the belief that everyone deserves to find genuine love and meaningful connections. 
            We're revolutionizing online dating by prioritizing authenticity, safety, and real compatibility over superficial matching.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-custom-pink mr-3" />
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              To create a dating platform where authenticity thrives, meaningful connections flourish, and lasting love stories begin. 
              We believe that real relationships are built on trust, shared values, and genuine compatibility - not just swiping.
            </p>
          </div>

          <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-custom-pink mr-3" />
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              To become Germany's most trusted dating platform, known for creating genuine connections that lead to lasting relationships. 
              We envision a world where online dating feels safe, authentic, and focused on what truly matters in love.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Makes DreamDate Different</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-custom-pink to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Verified Safety</h3>
              <p className="text-zinc-300">Every profile is manually verified to ensure authenticity. Our advanced safety measures protect your privacy and personal information.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-custom-pink to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Quality Community</h3>
              <p className="text-zinc-300">We curate a community of genuine individuals seeking meaningful relationships, not casual encounters or fake connections.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-custom-pink to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Matching</h3>
              <p className="text-zinc-300">Our advanced compatibility algorithm considers personality, values, life goals, and shared interests for truly compatible matches.</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-custom-pink/10 to-purple-600/10 rounded-lg p-8 border border-custom-pink/20 mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Success in Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-custom-pink mb-2">50,000+</div>
              <p className="text-zinc-300">Verified Members</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-custom-pink mb-2">2,500+</div>
              <p className="text-zinc-300">Success Stories</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-custom-pink mb-2">98%</div>
              <p className="text-zinc-300">Profile Verification Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-custom-pink mb-2">4.8/5</div>
              <p className="text-zinc-300">User Satisfaction</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How DreamDate Works</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-custom-pink rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Create Your Authentic Profile</h3>
                <p className="text-zinc-300">Build a comprehensive profile that showcases your personality, interests, and what you're looking for in a relationship. Our verification process ensures all profiles are genuine.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-custom-pink rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Get Smart Matches</h3>
                <p className="text-zinc-300">Our algorithm analyzes compatibility based on values, interests, lifestyle, and relationship goals to suggest truly compatible matches.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-custom-pink rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Connect Meaningfully</h3>
                <p className="text-zinc-300">Engage in thoughtful conversations with your matches through our secure messaging system. Share interests, values, and build genuine connections.</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-custom-pink rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">4</div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Meet Safely</h3>
                <p className="text-zinc-300">When you're ready to meet in person, our safety guidelines and community support ensure secure, comfortable first meetings.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Commitment */}
        <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Commitment to Your Safety</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Manual Profile Verification</h3>
                <p className="text-zinc-300 text-sm">Every profile is reviewed by our team to ensure authenticity and prevent fake accounts.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Advanced Privacy Protection</h3>
                <p className="text-zinc-300 text-sm">Your personal information is encrypted and protected with industry-leading security measures.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">24/7 Community Support</h3>
                <p className="text-zinc-300 text-sm">Our support team is available around the clock to address concerns and ensure a positive experience.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white mb-1">Safe Meeting Guidelines</h3>
                <p className="text-zinc-300 text-sm">Comprehensive safety tips and resources for meeting matches in person safely and confidently.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-custom-pink/10 to-purple-600/10 rounded-lg p-8 border border-custom-pink/20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Perfect Match?</h2>
          <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
            Join thousands of verified singles who have found meaningful relationships through DreamDate. 
            Your authentic love story starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/discover">
              <Button className="bg-custom-pink hover:bg-custom-pink/90 px-8 py-3">
                Start Dating Today
              </Button>
            </Link>
            <Link to="/community">
              <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-700 px-8 py-3">
                Read Success Stories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
