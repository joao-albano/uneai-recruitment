
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '@/context/auth';
import { useTrialPeriod } from '@/hooks/useTrialPeriod';
import TrialPeriodBanner from '../shared/TrialPeriodBanner';
import TrialExpiredModal from '../shared/TrialExpiredModal';

interface LayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  hideSidebar?: boolean; // Nova propriedade para ocultar a sidebar
}

const Layout: React.FC<LayoutProps> = ({
  children,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  hideSidebar = false // Valor padrão falso
}) => {
  const { isAuthenticated, isSuperAdmin } = useAuth();
  
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
        hideSidebar={hideSidebar}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {!hideSidebar && (
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        )}
        
        <main className={`flex-1 overflow-auto p-6 ${hideSidebar ? 'ml-0' : ''}`}>
          {isAuthenticated && showBanner && (
            <TrialPeriodBanner 
              daysRemaining={daysRemaining}
              isLoading={isLoading}
              errorMessage={errorMessage}
              isSuperAdmin={isSuperAdmin}
            />
          )}
          
          {children}
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
