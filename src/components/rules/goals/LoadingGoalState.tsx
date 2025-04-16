
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const LoadingGoalState: React.FC = () => {
  return (
    <Card className="w-full">
      <CardContent className="py-6">
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">Carregando metas...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingGoalState;
