
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, AlertTriangle, Check, X, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock reported content data
const reportedMessages = [
  { id: 'report-1', content: 'Hey, want to meet up somewhere private?', reporter: 'user-4', reported: 'user-2', reason: 'Suspicious behavior', timestamp: '2023-09-15 14:23' },
  { id: 'report-2', content: 'You look terrible in that photo lol', reporter: 'user-1', reported: 'user-3', reason: 'Harassment', timestamp: '2023-09-14 18:45' },
  { id: 'report-3', content: '**** you, you stupid ****', reporter: 'user-5', reported: 'user-2', reason: 'Offensive language', timestamp: '2023-09-13 20:12' },
];

const reportedProfiles = [
  { id: 'profile-1', userId: 'user-6', name: 'John Smith', reason: 'Fake profile', reportCount: 3, timestamp: '2023-09-14 12:30' },
  { id: 'profile-2', userId: 'user-7', name: 'Jessica Lee', reason: 'Inappropriate photos', reportCount: 2, timestamp: '2023-09-12 09:15' },
];

const ContentModeration = () => {
  const { toast } = useToast();
  
  const approveContent = (id: string, type: 'message' | 'profile') => {
    toast({
      title: "Content Approved",
      description: `${type === 'message' ? 'Message' : 'Profile'} ID: ${id} has been approved and report dismissed.`,
      variant: "default",
    });
  };
  
  const removeContent = (id: string, type: 'message' | 'profile') => {
    toast({
      title: "Content Removed",
      description: `${type === 'message' ? 'Message' : 'Profile'} ID: ${id} has been removed.`,
      variant: "destructive",
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Content Moderation</h2>
      
      <Tabs defaultValue="messages" className="w-full">
        <TabsList className="bg-zinc-800 border-zinc-700 border">
          <TabsTrigger value="messages" className="data-[state=active]:bg-zinc-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Reported Messages
          </TabsTrigger>
          <TabsTrigger value="profiles" className="data-[state=active]:bg-zinc-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Reported Profiles
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="messages" className="mt-6">
          <Card className="bg-zinc-800 border-zinc-700 text-white">
            <CardHeader>
              <CardTitle>Reported Messages</CardTitle>
              <CardDescription className="text-zinc-400">
                Review and moderate messages reported by users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportedMessages.map((report) => (
                  <div key={report.id} className="p-4 border border-zinc-700 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm bg-zinc-700 p-2 rounded-md mb-2">"{report.content}"</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
                          <div>
                            <span className="font-medium text-zinc-300">Reported by:</span> {report.reporter}
                          </div>
                          <div>
                            <span className="font-medium text-zinc-300">User:</span> {report.reported}
                          </div>
                          <div>
                            <span className="font-medium text-zinc-300">Reason:</span> {report.reason}
                          </div>
                          <div>
                            <span className="font-medium text-zinc-300">Time:</span> {report.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-zinc-700 hover:bg-zinc-700 text-zinc-300"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-green-700 hover:bg-green-700/20 text-green-500"
                          onClick={() => approveContent(report.id, 'message')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-rose-700 hover:bg-rose-700/20 text-rose-500"
                          onClick={() => removeContent(report.id, 'message')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profiles" className="mt-6">
          <Card className="bg-zinc-800 border-zinc-700 text-white">
            <CardHeader>
              <CardTitle>Reported Profiles</CardTitle>
              <CardDescription className="text-zinc-400">
                Review and moderate user profiles reported by other users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportedProfiles.map((profile) => (
                  <div key={profile.id} className="p-4 border border-zinc-700 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium mb-2">{profile.name}</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
                          <div>
                            <span className="font-medium text-zinc-300">User ID:</span> {profile.userId}
                          </div>
                          <div>
                            <span className="font-medium text-zinc-300">Report Count:</span> {profile.reportCount}
                          </div>
                          <div>
                            <span className="font-medium text-zinc-300">Reason:</span> {profile.reason}
                          </div>
                          <div>
                            <span className="font-medium text-zinc-300">Latest Report:</span> {profile.timestamp}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-zinc-700 hover:bg-zinc-700 text-zinc-300"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-green-700 hover:bg-green-700/20 text-green-500"
                          onClick={() => approveContent(profile.id, 'profile')}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-rose-700 hover:bg-rose-700/20 text-rose-500"
                          onClick={() => removeContent(profile.id, 'profile')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentModeration;
