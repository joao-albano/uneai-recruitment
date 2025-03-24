
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import PlanOptionsManager from '@/components/admin/plans/PlanOptionsManager';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminPlansPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Redirect non-admin users
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <DataProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <div className="flex-1 flex flex-col">
          <Header 
            toggleSidebar={toggleSidebar} 
            sidebarCollapsed={sidebarCollapsed} 
          />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Planos</h1>
              <p className="text-muted-foreground mt-1">
                Gerencie os planos e preços disponíveis no sistema
              </p>
            </div>
            
            <PlanOptionsManager />
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default AdminPlansPage;
