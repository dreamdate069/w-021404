
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, MessageSquare, Heart, DollarSign } from 'lucide-react';

const statsCards = [
  {
    title: 'Total Users',
    value: '1,248',
    change: '+22%',
    icon: Users,
    description: 'Active users this month'
  },
  {
    title: 'Messages',
    value: '12,843',
    change: '+17%',
    icon: MessageSquare,
    description: 'Messages sent today'
  },
  {
    title: 'Matches',
    value: '458',
    change: '+5%',
    icon: Heart,
    description: 'New matches this week'
  },
  {
    title: 'DreamCoins',
    value: '984,582',
    change: '+12%',
    icon: DollarSign,
    description: 'Coins in circulation'
  }
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="bg-zinc-800 border-zinc-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-custom-pink" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-zinc-400 mt-1">{stat.description}</p>
              <div className="text-xs font-medium mt-2 text-emerald-500">
                {stat.change} from last period
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription className="text-zinc-400">
              Latest user activities across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['User Sarah joined', 'New match between Alex and Jordan', 'Thomas sent 500 DreamCoins to Riley', 'New user report: Inappropriate content'].map((activity, i) => (
                <div key={i} className="flex items-center border-b border-zinc-700 pb-2 last:border-0 last:pb-0">
                  <div className="w-2 h-2 rounded-full bg-custom-pink mr-2"></div>
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription className="text-zinc-400">
              Current platform metrics and performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Server Load</span>
                <span className="text-emerald-500">Normal (24%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Response Time</span>
                <span className="text-emerald-500">142ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Error Rate</span>
                <span className="text-emerald-500">0.02%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Storage Used</span>
                <span className="text-amber-500">78% (Warning)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
