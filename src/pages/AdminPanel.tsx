
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Users, DollarSign, BarChart, Shield, MessageSquare, Image } from 'lucide-react';
import AdminDashboard from '@/components/admin/AdminDashboard';
import UserManagement from '@/components/admin/UserManagement';
import DreamCoinManagement from '@/components/admin/DreamCoinManagement';
import ContentModeration from '@/components/admin/ContentModeration';
import AppSettings from '@/components/admin/AppSettings';
import AnalyticsPanel from '@/components/admin/AnalyticsPanel';
import IntegrationSettings from '@/components/admin/IntegrationSettings';
import AccessControl from '@/components/admin/AccessControl';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <div className="border-b border-zinc-700">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Shield className="mr-2" size={24} />
            DreamDate Admin Panel
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 flex-1">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-zinc-800 border-zinc-700 border h-12">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-zinc-700">
              <BarChart className="mr-2 h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-zinc-700">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="dreamcoin" className="data-[state=active]:bg-zinc-700">
              <DollarSign className="mr-2 h-4 w-4" />
              DreamCoin
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-zinc-700">
              <MessageSquare className="mr-2 h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-zinc-700">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-zinc-700">
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-zinc-700">
              <Image className="mr-2 h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="access" className="data-[state=active]:bg-zinc-700">
              <Shield className="mr-2 h-4 w-4" />
              Access
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-6">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <UserManagement />
          </TabsContent>
          
          <TabsContent value="dreamcoin" className="mt-6">
            <DreamCoinManagement />
          </TabsContent>
          
          <TabsContent value="content" className="mt-6">
            <ContentModeration />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <AppSettings />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <AnalyticsPanel />
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-6">
            <IntegrationSettings />
          </TabsContent>
          
          <TabsContent value="access" className="mt-6">
            <AccessControl />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
