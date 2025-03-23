
import React from 'react';
import { AlignLeft } from 'lucide-react';

interface ModelPageHeaderProps {
  toggleModelSidebar: () => void;
}

const ModelPageHeader: React.FC<ModelPageHeaderProps> = ({ toggleModelSidebar }) => {
  return (
    <div className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Modelo de Previsão</h1>
        <p className="text-muted-foreground mt-1">
          Detalhes sobre o modelo de IA e suas previsões
        </p>
      </div>
      <button 
        onClick={toggleModelSidebar}
        className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <AlignLeft className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ModelPageHeader;
