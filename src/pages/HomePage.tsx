import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Users, MessageSquare, Shield, Sparkles, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/explore');
    } else {
      navigate('/auth');
    }
  };

  const features = [
    {
      icon: Heart,
      title: "Smart Matching",
      description: "Our AI algorithm finds your perfect matches based on compatibility and shared interests."
    },
    {
      icon: MessageSquare,
      title: "Real-time Chat",
      description: "Connect instantly with your matches through our secure messaging system."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your privacy and security are our top priorities with verified profiles and encryption."
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Meet amazing people from around the world and expand your social circle."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-rose-500" />
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">DreamDate</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-zinc-600 dark:text-zinc-300">Welcome back!</span>
              <Button onClick={() => navigate('/explore')} className="bg-rose-500 hover:bg-rose-600">
                Go to App
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-zinc-600 dark:text-zinc-300">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-rose-500 hover:bg-rose-600">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Sparkles className="h-8 w-8 text-rose-500" />
            <h2 className="text-5xl font-bold text-zinc-900 dark:text-white">
              Find Your Perfect Match
            </h2>
          </div>
          
          <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
            Join thousands of singles who have found love through DreamDate. 
            Our smart matching system connects you with compatible people based on your interests, values, and goals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-rose-500 hover:bg-rose-600 text-lg px-8 py-3"
              onClick={handleGetStarted}
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-3"
              onClick={() => navigate('/community')}
            >
              <Globe className="mr-2 h-5 w-5" />
              Explore Community
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            Why Choose DreamDate?
          </h3>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            We've built the most comprehensive dating platform to help you find meaningful connections.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border-rose-200 dark:border-zinc-700 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/20 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-rose-500" />
                  </div>
                  <CardTitle className="text-zinc-900 dark:text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-zinc-600 dark:text-zinc-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-rose-500 to-pink-500 border-0 text-white">
          <CardContent className="text-center py-16">
            <h3 className="text-3xl font-bold mb-4">Ready to Find Love?</h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join our community of verified singles and start your journey to finding your perfect match today.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-rose-500 hover:bg-rose-50 text-lg px-8 py-3"
              onClick={handleGetStarted}
            >
              Join DreamDate Now
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-rose-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-6 w-6 text-rose-500" />
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">DreamDate</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="/about" className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500 transition-colors">
                About
              </Link>
              <Link to="/terms" className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500 transition-colors">
                Terms
              </Link>
              <Link to="/community" className="text-zinc-600 dark:text-zinc-300 hover:text-rose-500 transition-colors">
                Community
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-rose-200 dark:border-zinc-700 text-center">
            <p className="text-zinc-500 dark:text-zinc-400">
              © 2024 DreamDate. Made with ❤️ for meaningful connections.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
