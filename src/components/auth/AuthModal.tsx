
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Heart } from 'lucide-react';

interface QuizAnswers {
  gender?: string;
  lookingFor?: string;
  ageRange?: string;
}

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthComplete?: () => void;
  quizAnswers?: QuizAnswers;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  open, 
  onOpenChange, 
  onAuthComplete,
  quizAnswers = {}
}) => {
  const [loading, setLoading] = useState(false);
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ 
    email: '', 
    password: '', 
    confirmPassword: '',
    firstName: '',
    lastName: '',
    age: getAgeFromRange(quizAnswers.ageRange) || 25,
    gender: mapGenderFromQuiz(quizAnswers.gender) || 'male'
  });
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  function getAgeFromRange(ageRange?: string): number {
    if (!ageRange) return 25;
    switch (ageRange) {
      case '18-24': return 22;
      case '25-34': return 29;
      case '35-45': return 40;
      case '46+': return 50;
      default: return 25;
    }
  }

  function mapGenderFromQuiz(genderAnswer?: string): string {
    if (!genderAnswer) return 'male';
    switch (genderAnswer.toLowerCase()) {
      case 'a man': return 'male';
      case 'a woman': return 'female';
      case 'non-binary': return 'non-binary';
      default: return 'male';
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(signInForm.email, signInForm.password);
      
      if (error) {
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        onOpenChange(false);
        onAuthComplete?.();
      }
    } catch (err) {
      toast({
        title: "Sign In Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpForm.password !== signUpForm.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (signUpForm.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const lookingFor = quizAnswers.lookingFor ? [quizAnswers.lookingFor.toLowerCase()] : ['everyone'];
      
      const { error } = await signUp(signUpForm.email, signUpForm.password, {
        first_name: signUpForm.firstName,
        last_name: signUpForm.lastName,
        age: signUpForm.age,
        gender: signUpForm.gender,
        nickname: signUpForm.firstName,
        looking_for: lookingFor,
        quiz_answers: quizAnswers
      });
      
      if (error) {
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome to DreamDate!",
          description: "Your account has been created successfully. Please check your email to verify your account.",
        });
        onOpenChange(false);
        onAuthComplete?.();
      }
    } catch (err) {
      toast({
        title: "Sign Up Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle className="text-white text-center flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            Join DreamDate
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
            <TabsTrigger value="signup" className="text-white data-[state=active]:bg-pink-500">Sign Up</TabsTrigger>
            <TabsTrigger value="signin" className="text-white data-[state=active]:bg-pink-500">Sign In</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="signup-firstname" className="text-white">First Name</Label>
                  <Input
                    id="signup-firstname"
                    value={signUpForm.firstName}
                    onChange={(e) => setSignUpForm(prev => ({ ...prev, firstName: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-lastname" className="text-white">Last Name</Label>
                  <Input
                    id="signup-lastname"
                    value={signUpForm.lastName}
                    onChange={(e) => setSignUpForm(prev => ({ ...prev, lastName: e.target.value }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-white">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signUpForm.email}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-white">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  value={signUpForm.password}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  required
                  minLength={6}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm" className="text-white">Confirm Password</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  value={signUpForm.confirmPassword}
                  onChange={(e) => setSignUpForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="signup-age" className="text-white">Age</Label>
                  <Input
                    id="signup-age"
                    type="number"
                    min="18"
                    max="100"
                    value={signUpForm.age}
                    onChange={(e) => setSignUpForm(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-gender" className="text-white">Gender</Label>
                  <select
                    id="signup-gender"
                    value={signUpForm.gender}
                    onChange={(e) => setSignUpForm(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 text-white rounded-md"
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                  </select>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-pink-500 hover:bg-pink-600" 
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signin" className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email" className="text-white">Email</Label>
                <Input
                  id="signin-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signInForm.email}
                  onChange={(e) => setSignInForm(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password" className="text-white">Password</Label>
                <Input
                  id="signin-password"
                  type="password"
                  value={signInForm.password}
                  onChange={(e) => setSignInForm(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-pink-500 hover:bg-pink-600" 
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
