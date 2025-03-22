
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SurveyForm from '@/components/survey/SurveyForm';

const SurveyPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <DataProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
        
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Pesquisa Diagnóstica</h1>
              <p className="text-muted-foreground mt-1">
                Colete informações importantes das famílias para enriquecer a análise
              </p>
            </div>
            
            <SurveyForm />
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default SurveyPage;
