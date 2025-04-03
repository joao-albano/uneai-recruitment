
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';

interface FunnelHeaderProps {
  onConfigClick: () => void;
  onNewStageClick: () => void;
}

const FunnelHeader: React.FC<FunnelHeaderProps> = ({ onConfigClick, onNewStageClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">Funil de Captação</h1>
        <p className="text-muted-foreground">
          Configure e monitore as etapas do processo de captação
        </p>
      </div>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={onConfigClick}
        >
          <Settings className="h-4 w-4" />
          Configurar
        </Button>
        <Button 
          className="gap-2"
          onClick={onNewStageClick}
        >
          <Plus className="h-4 w-4" />
          Nova Etapa
        </Button>
      </div>
    </div>
  );
};

export default FunnelHeader;
