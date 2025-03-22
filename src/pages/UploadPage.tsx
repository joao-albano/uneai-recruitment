
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import UploadForm from '@/components/upload/UploadForm';

const UploadPage: React.FC = () => {
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
              <h1 className="text-3xl font-bold tracking-tight">Upload de Dados</h1>
              <p className="text-muted-foreground mt-1">
                Faça upload de planilhas com dados dos alunos
              </p>
            </div>
            
            <UploadForm />
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default UploadPage;
