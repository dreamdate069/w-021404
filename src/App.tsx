
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SidebarNav from './components/SidebarNav';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DiscoverPage from './pages/DiscoverPage';
import MessagesPage from './pages/MessagesPage';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <SidebarNav />
        <div className="flex-1 overflow-auto bg-zinc-900 min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/matches" element={<Navigate to="/discover" />} />
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
