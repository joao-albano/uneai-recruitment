
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import { SchedulesProvider } from '@/context/schedules/SchedulesContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ScheduleView from '@/components/scheduling/ScheduleView';

const SchedulePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <DataProvider>
      <SchedulesProvider>
        <div className="h-screen flex flex-col md:flex-row overflow-hidden">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={toggleSidebar} 
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
            
            <main className="flex-1 overflow-y-auto p-6 pointer-events-auto">
              <ScheduleView />
            </main>
          </div>
        </div>
      </SchedulesProvider>
    </DataProvider>
  );
};

export default SchedulePage;
