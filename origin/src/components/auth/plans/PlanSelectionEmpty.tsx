
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PlanSelectionEmptyProps {
  onRetry: () => void;
}

const PlanSelectionEmpty: React.FC<PlanSelectionEmptyProps> = ({ onRetry }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Escolha seu plano</h3>
      <div className="py-8 flex flex-col items-center justify-center text-muted-foreground">
        <AlertTriangle className="h-8 w-8 mb-2" />
        <p>Nenhum plano disponível no momento.</p>
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
          Tentar novamente
        </Button>
      </div>
    </div>
  );
};

export default PlanSelectionEmpty;
