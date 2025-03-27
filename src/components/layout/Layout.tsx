
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/auth';
import { useTrialPeriod } from '@/hooks/useTrialPeriod';
import TrialPeriodBanner from '../shared/TrialPeriodBanner';
import TrialExpiredModal from '../shared/TrialExpiredModal';

const Layout = () => {
  const { isAuthenticated, isSuperAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const { 
    daysRemaining, 
    showBanner, 
    isExpired,
    isLoading, 
    errorMessage 
  } = useTrialPeriod();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header 
        toggleSidebar={toggleSidebar} 
        sidebarCollapsed={sidebarCollapsed} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <main className="flex-1 overflow-auto p-6">
          {isAuthenticated && showBanner && (
            <TrialPeriodBanner 
              daysRemaining={daysRemaining}
              isLoading={isLoading}
              errorMessage={errorMessage}
              isSuperAdmin={isSuperAdmin}
            />
          )}
          
          <Outlet />
        </main>
      </div>
      
      {isAuthenticated && (
        <TrialExpiredModal 
          isExpired={isExpired} 
          isSuperAdmin={isSuperAdmin} 
        />
      )}
    </div>
  );
};

export default Layout;
