
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Heart } from 'lucide-react';

interface QuickSignUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

const QuickSignUpModal: React.FC<QuickSignUpModalProps> = ({ 
  open, 
  onOpenChange, 
  onComplete 
}) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    age: 25,
    gender: 'male'
  });
  const { signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await signUp(form.email, form.password, {
        first_name: form.firstName,
        last_name: '',
        age: form.age,
        gender: form.gender,
        nickname: form.firstName
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
          description: "Account created successfully. Start swiping!",
        });
        onOpenChange(false);
        onComplete?.();
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
      <DialogContent className="sm:max-w-md bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-gray-900 text-center flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            Quick Sign Up
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => setForm(prev => ({ ...prev, firstName: e.target.value }))}
              className="border-gray-300"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              className="border-gray-300"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
              className="border-gray-300"
              required
              minLength={6}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-700">Age</Label>
              <Input
                id="age"
                type="number"
                min="18"
                max="100"
                value={form.age}
                onChange={(e) => setForm(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="border-gray-300"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="text-gray-700">Gender</Label>
              <select
                id="gender"
                value={form.gender}
                onChange={(e) => setForm(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Start Dating'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuickSignUpModal;
