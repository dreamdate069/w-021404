
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
import { Toaster } from './components/ui/toaster';
import Chat from './pages/Chat';
import { getDreamCoinBalance } from './utils/dreamCoinUtils';

import './App.css';

function App() {
  // Initialize the DreamCoin system on app start
  useEffect(() => {
    // Just calling this will initialize the coins if needed
    getDreamCoinBalance();
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
