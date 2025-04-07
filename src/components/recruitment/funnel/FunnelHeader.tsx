
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Plus, PlusCircle, ChevronRight } from 'lucide-react';

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
    <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg shadow-sm border border-orange-100">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-orange-800">Funil de Captação</h1>
        <p className="text-sm text-muted-foreground mt-1">Gerencie seus funis de captação e acompanhe a jornada dos leads</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          onClick={onNewFunnelClick}
          className="bg-white hover:bg-orange-50 border-orange-200"
        >
          <PlusCircle className="h-4 w-4 mr-2 text-orange-500" />
          Novo Funil
        </Button>
        <Button 
          variant="outline" 
          onClick={onNewStageClick}
          className="bg-white hover:bg-orange-50 border-orange-200"
        >
          <Plus className="h-4 w-4 mr-2 text-orange-500" />
          Nova Etapa
        </Button>
        <Button 
          variant="outline" 
          onClick={onConfigClick}
          className="bg-white hover:bg-orange-50 border-orange-200"
        >
          <Settings className="h-4 w-4 mr-2 text-orange-500" />
          Configurações
        </Button>
      </div>
    </div>
  );
};

export default FunnelHeader;
