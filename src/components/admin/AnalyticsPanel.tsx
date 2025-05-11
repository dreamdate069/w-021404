
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, ComposedChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Pie } from 'recharts';

// Mock data for analytics
const userActivityData = [
  { name: 'Jan', Messages: 4000, Logins: 2400, Matches: 1200 },
  { name: 'Feb', Messages: 3500, Logins: 2100, Matches: 1000 },
  { name: 'Mar', Messages: 5000, Logins: 2800, Matches: 1500 },
  { name: 'Apr', Messages: 4200, Logins: 2600, Matches: 1300 },
  { name: 'May', Messages: 4800, Logins: 3000, Matches: 1700 },
  { name: 'Jun', Messages: 5500, Logins: 3200, Matches: 2000 },
];

const userGenderData = [
  { name: 'Male', value: 60 },
  { name: 'Female', value: 35 },
  { name: 'Non-binary', value: 5 },
];

const COLORS = ['#fa6b84', '#67b9fb', '#a27afd'];

const AnalyticsPanel = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle>User Activity Trends</CardTitle>
            <CardDescription className="text-zinc-400">
              Monthly activity metrics for the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={userActivityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                  <XAxis dataKey="name" stroke="#71717a" />
                  <YAxis stroke="#71717a" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#27272a", 
                      borderColor: "#3f3f46", 
                      color: "#ffffff" 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="Logins" stackId="a" fill="#67b9fb" />
                  <Bar dataKey="Messages" stackId="a" fill="#a27afd" />
                  <Line type="monotone" dataKey="Matches" stroke="#fa6b84" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 text-white">
          <CardHeader>
            <CardTitle>User Demographics</CardTitle>
            <CardDescription className="text-zinc-400">
              Breakdown of user composition by gender
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={userGenderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {userGenderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#27272a", 
                      borderColor: "#3f3f46", 
                      color: "#ffffff" 
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-zinc-800 border-zinc-700 text-white">
        <CardHeader>
          <CardTitle>DreamCoin Transactions</CardTitle>
          <CardDescription className="text-zinc-400">
            Daily transaction volume over the past month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { date: '06/01', volume: 5000 },
                  { date: '06/02', volume: 4200 },
                  { date: '06/03', volume: 6800 },
                  { date: '06/04', volume: 4900 },
                  { date: '06/05', volume: 7200 },
                  { date: '06/06', volume: 8400 },
                  { date: '06/07', volume: 6700 },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
                <XAxis dataKey="date" stroke="#71717a" />
                <YAxis stroke="#71717a" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#27272a", 
                    borderColor: "#3f3f46", 
                    color: "#ffffff" 
                  }} 
                />
                <Bar dataKey="volume" fill="#fa6b84" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPanel;
