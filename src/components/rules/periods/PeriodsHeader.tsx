
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import NewPeriodDialog from './NewPeriodDialog';

interface PeriodsHeaderProps {
  onAddPeriod?: (period: any) => void;
}

const PeriodsHeader: React.FC<PeriodsHeaderProps> = ({ onAddPeriod }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activePeriodType, setActivePeriodType] = useState('academic');

  const handlePeriodCreated = (period: any) => {
    if (onAddPeriod) {
      onAddPeriod(period);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Períodos de Captação</h2>
          <p className="text-muted-foreground">
            Configure calendários e marcos importantes para o sistema de previsão
          </p>
        </div>
        
        <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Novo Período</span>
        </Button>
      </div>

      <NewPeriodDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onPeriodCreated={handlePeriodCreated}
        periodType={activePeriodType}
      />
    </>
  );
};

export default PeriodsHeader;
