
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Shield, Plus, UserPlus, Key } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock admin users data
const adminUsers = [
  { id: 'admin-1', name: 'Admin User', email: 'admin@dreamdate.online', role: 'Super Admin', lastLogin: '2023-09-15 09:23' },
  { id: 'admin-2', name: 'Content Moderator', email: 'moderator@dreamdate.online', role: 'Moderator', lastLogin: '2023-09-14 14:45' },
];

const AccessControl = () => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: '',
  });
  const { toast } = useToast();
  
  const handleAddUser = () => {
    // Validate form
    if (!newUserData.name || !newUserData.email || !newUserData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate API call
    toast({
      title: "Admin User Added",
      description: `${newUserData.name} has been added as ${newUserData.role}`,
      variant: "default",
    });
    
    // Reset form
    setNewUserData({ name: '', email: '', role: '' });
    setIsAddingUser(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Access Control</h2>
        <Button 
          onClick={() => setIsAddingUser(!isAddingUser)} 
          className="bg-custom-pink hover:bg-custom-pink/90"
        >
          {isAddingUser ? 'Cancel' : <><UserPlus className="h-4 w-4 mr-2" /> Add Admin User</>}
        </Button>
      </div>
      
      {isAddingUser && (
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle>Add New Admin User</CardTitle>
            <CardDescription className="text-zinc-400">
              Create a new administrator account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
                  className="bg-zinc-700 border-zinc-600 text-white"
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData({...newUserData, email: e.target.value})}
                  className="bg-zinc-700 border-zinc-600 text-white"
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select
                  onValueChange={(value) => setNewUserData({...newUserData, role: value})}
                  value={newUserData.role}
                >
                  <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                    <SelectItem value="Analyst">Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleAddUser} 
                className="bg-custom-pink hover:bg-custom-pink/90 w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Add User
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="bg-zinc-800 border-zinc-700 text-white">
        <CardHeader>
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-custom-pink mr-2" />
            <CardTitle>Admin Users</CardTitle>
          </div>
          <CardDescription className="text-zinc-400">
            Manage administrator access and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminUsers.map((user) => (
              <div key={user.id} className="p-4 border border-zinc-700 rounded-md flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{user.name}</h4>
                  <p className="text-sm text-zinc-400">{user.email}</p>
                  <div className="mt-1 flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-custom-pink/20 text-custom-pink">
                      {user.role}
                    </span>
                    <span className="ml-2 text-xs text-zinc-400">
                      Last login: {user.lastLogin}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-zinc-700 text-zinc-300"
                  >
                    <Key className="h-4 w-4 mr-1" />
                    Reset Pass
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-zinc-700 text-zinc-300"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessControl;
