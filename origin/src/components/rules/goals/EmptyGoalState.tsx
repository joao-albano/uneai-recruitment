
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const EmptyGoalState: React.FC = () => {
  return (
    <Card className="w-full">
      <CardContent className="py-6">
        <div className="flex flex-col items-center justify-center h-40 text-center">
          <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">Nenhuma meta encontrada nesta categoria</p>
          <p className="text-xs text-muted-foreground">
            Utilize o botão "Nova Meta" para adicionar sua primeira meta.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyGoalState;
