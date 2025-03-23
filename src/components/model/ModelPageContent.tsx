
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useData } from '@/context/DataContext';
import ModelPageHeader from './ModelPageHeader';
import ModelTabsContent from './ModelTabsContent';

const ModelPageContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { students, generateDemoData } = useData();
  
  // Make sure we have demo data
  useEffect(() => {
    if (students.length === 0) {
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 p-6 overflow-auto">
            <div className="animate-fade-in">
              <ModelPageHeader />
              <ModelTabsContent />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ModelPageContent;
