
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AdminDashboardContent from '@/components/admin/AdminDashboardContent';

const AdminDashboardPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
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
            <AdminDashboardContent />
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default AdminDashboardPage;
