
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

import MatchesPage from './pages/MatchesPage';
import MessagesPage from './pages/MessagesPage';
import AboutPage from './pages/AboutPage';
import CommunityPage from './pages/CommunityPage';
import TermsPage from './pages/TermsPage';
import AuthPage from './pages/AuthPage';
import ExplorePage from './pages/ExplorePage';
import NotFound from './pages/NotFound';
import AdminPanel from './pages/AdminPanel';
import SettingsPage from './pages/SettingsPage';
import { Toaster } from './components/ui/toaster';
import Chat from './pages/Chat';
import ErrorBoundary from './components/ErrorBoundary';
import { initializeChatSystem } from './utils/chatUtils';
import SwipePage from './pages/SwipePage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  // Initialize Chat system on app start
  useEffect(() => {
    try {
      console.log('Initializing app...');
      
      // Initialize chat system
      initializeChatSystem();
      
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Error initializing app:', error);
    }
  }, []);

  console.log('App rendering, current path:', window.location.pathname);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/swipe" element={<ProtectedRoute><MainLayout showRightSidebar={false}><SwipePage /></MainLayout></ProtectedRoute>} />
              <Route path="/explore" element={<ProtectedRoute><MainLayout><ExplorePage /></MainLayout></ProtectedRoute>} />
              <Route path="/browse" element={<Navigate to="/explore" replace />} />
              <Route path="/discover" element={<Navigate to="/explore" replace />} />
              <Route path="/matches" element={<ProtectedRoute><MainLayout><MatchesPage /></MainLayout></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><MainLayout showRightSidebar={false}><MessagesPage /></MainLayout></ProtectedRoute>} />
              <Route path="/profile/:id" element={<ProtectedRoute><MainLayout><ProfilePage /></MainLayout></ProtectedRoute>} />
              <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
              <Route path="/community" element={<ProtectedRoute><MainLayout><CommunityPage /></MainLayout></ProtectedRoute>} />
              <Route path="/terms" element={<MainLayout><TermsPage /></MainLayout>} />
              <Route path="/chat" element={<ProtectedRoute><MainLayout showRightSidebar={false}><Chat /></MainLayout></ProtectedRoute>} />
              <Route path="/admin/*" element={<ProtectedRoute><MainLayout showRightSidebar={false}><AdminPanel /></MainLayout></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
            </Routes>
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
