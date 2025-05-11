
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import SidebarNav from './components/SidebarNav';
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
    <BrowserRouter>
      <div className="flex">
        <SidebarNav />
        <div className="flex-1 overflow-auto bg-zinc-900 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/admin/*" element={<AdminPanel />} />
            <Route path="/settings" element={<div className="container p-8"><h1 className="text-3xl font-bold text-white">Settings</h1></div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
