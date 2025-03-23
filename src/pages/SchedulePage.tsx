
import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ScheduleView from '@/components/scheduling/ScheduleView';
import { useLocation } from 'react-router-dom';

// Page content component
const SchedulePageContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { students, schedules, generateDemoData } = useData();
  const location = useLocation();
  
  // Generate demo data if needed
  useEffect(() => {
    if (students.length === 0 || schedules.length === 0) {
      console.log("Generating demo data for schedule page");
      generateDemoData();
    }
  }, [students.length, schedules.length, generateDemoData]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <ScheduleView />
        </main>
      </div>
    </div>
  );
};

// Wrapper with DataProvider
const SchedulePage: React.FC = () => {
  return (
    <DataProvider>
      <SchedulePageContent />
    </DataProvider>
  );
};

export default SchedulePage;
