
import React from 'react';
import SidebarNav from '@/components/SidebarNav';
import RightSidebar from './RightSidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  showRightSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showRightSidebar = true 
}) => {
  return (
    <div className="flex min-h-screen">
      <SidebarNav />
      <div className="flex-1 overflow-auto bg-zinc-900">
        {children}
      </div>
      {showRightSidebar && <RightSidebar />}
    </div>
  );
};

export default MainLayout;
