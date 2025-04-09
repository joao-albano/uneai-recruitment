
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface PeriodsHeaderProps {
  onAddPeriod?: () => void;
}

const PeriodsHeader: React.FC<PeriodsHeaderProps> = ({ onAddPeriod }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Períodos de Captação</h2>
        <p className="text-muted-foreground">
          Configure calendários e marcos importantes para o sistema de previsão
        </p>
      </div>
      
      <Button onClick={onAddPeriod} disabled={!onAddPeriod} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        <span>Novo Período</span>
      </Button>
    </div>
  );
};

export default PeriodsHeader;
