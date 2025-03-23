
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useData } from '@/context/DataContext';
import SurveyTabs from '@/components/survey/SurveyTabs';

const SurveyPageContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { students, generateDemoData } = useData();
  
  // Generate demo data if needed
  useEffect(() => {
    if (students.length === 0) {
      console.log("Generating demo data for survey page");
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={toggleSidebar} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Pesquisa Diagnóstica</h1>
            <p className="text-muted-foreground mt-1">
              Colete informações importantes das famílias para enriquecer a análise
            </p>
          </div>
          
          <SurveyTabs />
        </main>
      </div>
    </div>
  );
};

export default SurveyPageContent;
