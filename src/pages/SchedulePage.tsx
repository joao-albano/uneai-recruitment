
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ScheduleView from '@/components/scheduling/ScheduleView';

const SchedulePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <DataProvider>
      <div className="h-screen flex flex-col md:flex-row overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 overflow-y-auto p-6">
            <ScheduleView />
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default SchedulePage;
