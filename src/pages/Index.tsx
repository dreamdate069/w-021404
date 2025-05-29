import React, { useEffect, useRef } from 'react';
import { ArrowRight, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnnouncementBar from '@/components/AnnouncementBar';
import Logo from '@/components/Logo';
import ButtonPrimary from '@/components/ButtonPrimary';
import ButtonSecondary from '@/components/ButtonSecondary';
import SEO from '@/components/SEO';
import Interactive3DViewer from '@/components/Interactive3DViewer';

const Index = () => {
  const product3dRef = useRef<HTMLDivElement>(null);
  const deviceImageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (product3dRef.current && deviceImageRef.current) {
        const scrollPosition = window.scrollY;
        product3dRef.current.style.transform = `translateY(${scrollPosition * 0.05}px) rotate(${scrollPosition * 0.02}deg)`;
        deviceImageRef.current.style.transform = `translateY(${scrollPosition * -0.03}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <SEO 
        title="DreamDate - Find Authentic Love & Meaningful Connections Online"
        description="Join DreamDate, Germany's premium dating platform for authentic connections. Meet verified singles, build meaningful relationships, and find your perfect match with our advanced compatibility system."
        keywords={["online dating", "German dating", "find love", "authentic dating", "meaningful relationships", "singles", "dating app", "European dating", "premium dating platform"]}
        url="https://dreamdate.app"
      />
      
      <div className="flex flex-col min-h-screen bg-adam-darker text-white overflow-x-hidden">
        {/* Announcement Bar */}
        <AnnouncementBar />

        {/* Header */}
        <header className="w-full max-w-7xl mx-auto px-4 py-6 flex justify-between items-center animate-fade-in">
          <Logo />
          <Link to="/discover">
            <ButtonPrimary>FIND YOUR MATCH</ButtonPrimary>
          </Link>
        </header>

        {/* Hero Section */}
        <section className="hero-gradient w-full pt-16 pb-24 px-4 md:px-8 lg:px-0 bg-slate-950">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="lg:w-1/2 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Find authentic<br />love in <span className="text-adam-pink">Germany</span>
              </h1>
              <p className="mt-6 text-xl text-white/80">
                Join thousands of verified singles looking for meaningful connections on Germany's most trusted dating platform.
              </p>
              <div className="mt-10 space-y-4">
                <Link to="/discover">
                  <ButtonSecondary icon={true} className="group mr-4">
                    Start Dating Now
                  </ButtonSecondary>
                </Link>
                <Link to="/community">
                  <ButtonPrimary>
                    Read Success Stories
                  </ButtonPrimary>
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-sm text-white/60">
                <span>✓ Verified Profiles</span>
                <span>✓ Safe & Secure</span>
                <span>✓ Meaningful Connections</span>
              </div>
            </div>
            
            {/* Right Content - Dating App Preview */}
            <div className="lg:w-1/2 flex justify-center relative animate-fade-in">
              <div ref={product3dRef} className="relative animate-float w-full max-w-md">
                <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
                  <div className="bg-zinc-900 rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"></div>
                      <div>
                        <h3 className="text-white font-semibold">DreamDate</h3>
                        <p className="text-zinc-400 text-sm">Find your perfect match</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-32 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-lg border border-pink-500/20"></div>
                      <div className="flex space-x-2">
                        <div className="flex-1 h-4 bg-zinc-800 rounded"></div>
                        <div className="w-16 h-4 bg-pink-500/30 rounded"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-20 h-4 bg-zinc-800 rounded"></div>
                        <div className="flex-1 h-4 bg-purple-600/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 px-4 bg-zinc-900">
          <div className="max-w-5xl mx-auto text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose DreamDate?</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Experience dating the way it should be - authentic, secure, and designed for meaningful connections.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-zinc-800 rounded-lg border border-zinc-700">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Verified Profiles</h3>
              <p className="text-zinc-400">Every profile is manually verified to ensure authentic connections and eliminate fake accounts.</p>
            </div>
            
            <div className="text-center p-6 bg-zinc-800 rounded-lg border border-zinc-700">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Matching</h3>
              <p className="text-zinc-400">Our advanced algorithm considers compatibility, interests, and relationship goals for perfect matches.</p>
            </div>
            
            <div className="text-center p-6 bg-zinc-800 rounded-lg border border-zinc-700">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Meaningful Conversations</h3>
              <p className="text-zinc-400">Connect through shared interests, values, and life goals for deeper, more meaningful relationships.</p>
            </div>
          </div>
        </section>

        {/* Success Stories Preview */}
        <section className="w-full py-24 px-4">
          <div className="max-w-5xl mx-auto text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Real Love Stories</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Join thousands of couples who found lasting love through DreamDate
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
              <p className="text-white italic mb-4">"We matched on DreamDate and knew immediately we had something special. Six months later, we're planning our future together!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mr-3"></div>
                <div>
                  <p className="text-white font-semibold">Anna & Marcus</p>
                  <p className="text-zinc-400 text-sm">Berlin, Germany</p>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
              <p className="text-white italic mb-4">"The verification process made me feel safe, and the matches were incredibly compatible. Found my soulmate here!"</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mr-3"></div>
                <div>
                  <p className="text-white font-semibold">Sophie & Lars</p>
                  <p className="text-zinc-400 text-sm">Munich, Germany</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/community">
              <ButtonSecondary>Read More Success Stories</ButtonSecondary>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-10 px-4 border-t border-white/10 bg-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <Logo />
                <p className="text-zinc-400 mt-4">Find authentic love and meaningful connections on Germany's premier dating platform.</p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Platform</h4>
                <ul className="space-y-2 text-zinc-400">
                  <li><Link to="/discover" className="hover:text-white">Discover</Link></li>
                  <li><Link to="/matches" className="hover:text-white">Matches</Link></li>
                  <li><Link to="/messages" className="hover:text-white">Messages</Link></li>
                  <li><Link to="/community" className="hover:text-white">Community</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-zinc-400">
                  <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Safety Tips</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-zinc-400">
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white">Help Center</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Press</a></li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-zinc-800">
              <p className="text-zinc-400 text-sm">© 2024 DreamDate. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-zinc-400 hover:text-white">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-zinc-400 hover:text-white">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
