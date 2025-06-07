
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MemberGrid } from '@/components/MemberGrid';
import ButtonPrimary from '@/components/ButtonPrimary';
import ButtonSecondary from '@/components/ButtonSecondary';
import DreamCoinBalance from '@/components/DreamCoinBalance';
import ErrorBoundary from '@/components/ErrorBoundary';

type QuizStep = {
  question: string;
  options: string[];
};

const quizSteps: QuizStep[] = [{
  question: "I am...",
  options: ["A man", "A woman", "Non-binary"]
}, {
  question: "Looking for...",
  options: ["Men", "Women", "Everyone"]
}, {
  question: "My age is...",
  options: ["18-24", "25-34", "35-45", "46+"]
}];

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(true);

  console.log('HomePage rendering...');

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (currentStep < quizSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz completed - would connect to signup/login in the future
      setShowQuiz(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-zinc-900" style={{
        backgroundImage: 'url("/lovable-uploads/ab2b4a57-9177-4693-9a88-23d89544a07b.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* DreamDate Logo and DreamCoin Balance */}
        <div className="relative z-10 pt-6 px-6">
          <div className="flex justify-between items-center mb-8">
            <img 
              src="/lovable-uploads/cdd2e339-d00c-4458-b5cc-7a69afcfa1de.png" 
              alt="DreamDate.Online Logo" 
              className="h-16 md:h-20 object-contain mx-auto" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <ErrorBoundary>
              <DreamCoinBalance showBuyButton={true} />
            </ErrorBoundary>
          </div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-justify lg:text-5xl my-0">
            Find Your <span className="text-pink-500">Dream</span> Connection
          </h1>
          <p className="text-zinc-300 mb-8 max-w-2xl text-left text-lg mx-0 px-px py-0 my-[2px]">
            Join thousands of singles finding meaningful relationships every day.  
            Your perfect match is just a conversation away.
          </p>
          
          {/* Welcome Quiz/Chat */}
          {showQuiz ? (
            <div className="bg-zinc-800 bg-opacity-90 rounded-xl p-6 max-w-md shadow-lg border border-zinc-700">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">Let's get to know you</h3>
                <p className="text-zinc-300 text-sm">Step {currentStep + 1} of {quizSteps.length}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-white mb-3">{quizSteps[currentStep].question}</h4>
                <div className="space-y-2">
                  {quizSteps[currentStep].options.map((option) => (
                    <Button
                      key={option}
                      variant="outline"
                      onClick={() => handleAnswerSelect(option)}
                      className="w-full justify-between border-zinc-600 hover:bg-zinc-700 text-slate-300"
                    >
                      <span>{option}</span>
                      <ChevronDown size={16} />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-white">
                <span>{currentStep + 1}/{quizSteps.length} questions</span>
                <Button 
                  variant="link" 
                  className="text-pink-500 hover:text-pink-400 p-0" 
                  onClick={() => setShowQuiz(false)}
                >
                  Skip for now
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <ButtonPrimary onClick={() => {}}>
                Create Account
              </ButtonPrimary>
              <ButtonSecondary onClick={() => {}}>
                Browse Matches
              </ButtonSecondary>
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Members Section */}
      <div className="bg-zinc-900 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Members Nearby</h2>
          <ErrorBoundary fallback={
            <div className="text-center py-12">
              <h3 className="text-xl font-bold text-white mb-4">Loading members...</h3>
              <p className="text-zinc-400">Please wait while we load member profiles.</p>
            </div>
          }>
            <MemberGrid />
          </ErrorBoundary>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="bg-zinc-800 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">How DreamDate Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Your Profile",
                desc: "Sign up in seconds and create your personal profile"
              },
              {
                title: "Find Matches",
                desc: "Browse through potential matches based on your preferences"
              },
              {
                title: "Start Chatting",
                desc: "Connect with people you like and begin your journey"
              }
            ].map((step, index) => (
              <div key={index} className="bg-zinc-900 p-6 rounded-lg border border-zinc-700">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-zinc-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
