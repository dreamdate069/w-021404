
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DiscoverPage from './pages/DiscoverPage';
import MatchesPage from './pages/MatchesPage';
import MessagesPage from './pages/MessagesPage';
import AboutPage from './pages/AboutPage';
import CommunityPage from './pages/CommunityPage';
import TermsPage from './pages/TermsPage';
import BrowsePage from './pages/BrowsePage';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/AdminPanel';
import { Toaster } from './components/ui/toaster';
import Chat from './pages/Chat';
import { getUserBalance } from './utils/dreamCoinUtils';
import { initializeChatSystem } from './utils/chatUtils';

import './App.css';

function App() {
  // Initialize the DreamCoin system and Chat system on app start
  useEffect(() => {
    // Initialize DreamCoin bank
    getUserBalance('current-user');
    
    // Initialize chat system
    initializeChatSystem();
    
    // Create necessary folders for user uploads in public folder (this is mock code)
    console.log("App initialized - In a real app, this would create storage folders");
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/discover" element={<MainLayout><DiscoverPage /></MainLayout>} />
          <Route path="/matches" element={<MainLayout><MatchesPage /></MainLayout>} />
          <Route path="/messages" element={<MainLayout showRightSidebar={false}><MessagesPage /></MainLayout>} />
          <Route path="/profile/:id" element={<MainLayout><ProfilePage /></MainLayout>} />
          <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
          <Route path="/community" element={<MainLayout><CommunityPage /></MainLayout>} />
          <Route path="/terms" element={<MainLayout><TermsPage /></MainLayout>} />
          <Route path="/browse" element={<MainLayout><BrowsePage /></MainLayout>} />
          <Route path="/chat" element={<MainLayout showRightSidebar={false}><Chat /></MainLayout>} />
          <Route path="/admin/*" element={<MainLayout showRightSidebar={false}><AdminPanel /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><div className="container p-8"><h1 className="text-3xl font-bold text-white">Settings</h1></div></MainLayout>} />
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
