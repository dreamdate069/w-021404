
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Users, Search, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock user data
const mockUsers = [
  { id: 'user-1', name: 'Alex Johnson', age: 28, status: 'active', location: 'New York', joined: '2023-05-12', matches: 14 },
  { id: 'user-2', name: 'Sarah Williams', age: 24, status: 'active', location: 'Los Angeles', joined: '2023-06-23', matches: 8 },
  { id: 'user-3', name: 'Mike Thompson', age: 32, status: 'suspended', location: 'Chicago', joined: '2023-04-18', matches: 5 },
  { id: 'user-4', name: 'Emma Davis', age: 26, status: 'active', location: 'Miami', joined: '2023-07-30', matches: 12 },
];

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">User Management</h2>
      
      <Card className="bg-zinc-800 border-zinc-700 text-white">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-custom-pink mr-2" />
              <CardTitle>All Users</CardTitle>
            </div>
            <div className="flex items-center">
              <div className="relative mr-2">
                <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-zinc-400" />
                <Input
                  placeholder="Search users..."
                  className="pl-8 bg-zinc-700 border-zinc-600 text-white w-[250px]"
                />
              </div>
              <Button className="bg-custom-pink hover:bg-custom-pink/90">Add User</Button>
            </div>
          </div>
          <CardDescription className="text-zinc-400">
            Manage and monitor all user accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-700">
                <TableHead className="text-zinc-400">Name</TableHead>
                <TableHead className="text-zinc-400">Age</TableHead>
                <TableHead className="text-zinc-400">Location</TableHead>
                <TableHead className="text-zinc-400">Status</TableHead>
                <TableHead className="text-zinc-400">Joined</TableHead>
                <TableHead className="text-zinc-400">Matches</TableHead>
                <TableHead className="text-zinc-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id} className="border-zinc-700">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>{user.matches}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-400">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
