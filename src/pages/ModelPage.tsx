
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AiModelInfo from '@/components/model/AiModelInfo';
import RiskDistributionCard from '@/components/model/RiskDistributionCard';
import InterventionsCard from '@/components/model/InterventionsCard';
import ModelExplanationCard from '@/components/model/ModelExplanationCard';

// Create an inner component that uses the context
const ModelPageContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Modelo de Previsão</h1>
              <p className="text-muted-foreground mt-1">
                Detalhes sobre o modelo de IA e suas previsões
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Model Information Card */}
              <AiModelInfo />
              
              {/* Risk Distribution Card */}
              <RiskDistributionCard />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* AI-Assisted Interventions Card */}
              <InterventionsCard />
              
              {/* Model Explanation Card */}
              <ModelExplanationCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Main component that wraps the content with DataProvider
const ModelPage: React.FC = () => {
  return (
    <DataProvider>
      <ModelPageContent />
    </DataProvider>
  );
};

export default ModelPage;
