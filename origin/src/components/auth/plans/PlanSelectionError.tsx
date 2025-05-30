
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface PlanSelectionErrorProps {
  error: string;
  onRetry: () => void;
}

const PlanSelectionError: React.FC<PlanSelectionErrorProps> = ({ error, onRetry }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Escolha seu plano</h3>
      <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span>{error}</span>
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-2 sm:mt-0">
            Tentar novamente
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PlanSelectionError;
