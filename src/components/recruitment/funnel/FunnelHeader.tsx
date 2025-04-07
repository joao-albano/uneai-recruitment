
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Plus, PlusCircle } from 'lucide-react';

interface FunnelHeaderProps {
  onConfigClick: () => void;
  onNewStageClick: () => void;
  onNewFunnelClick: () => void;
}

const FunnelHeader: React.FC<FunnelHeaderProps> = ({ 
  onConfigClick, 
  onNewStageClick,
  onNewFunnelClick
}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold tracking-tight">Funil de Captação</h1>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onNewFunnelClick}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Novo Funil
        </Button>
        <Button variant="outline" onClick={onNewStageClick}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Etapa
        </Button>
        <Button variant="outline" onClick={onConfigClick}>
          <Settings className="h-4 w-4 mr-2" />
          Configurações
        </Button>
      </div>
    </div>
  );
};

export default FunnelHeader;
