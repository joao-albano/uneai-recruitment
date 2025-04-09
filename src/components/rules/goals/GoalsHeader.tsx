
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface GoalsHeaderProps {
  onAddGoal?: () => void;
}

const GoalsHeader: React.FC<GoalsHeaderProps> = ({ onAddGoal }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Metas de Captação</h2>
        <p className="text-muted-foreground">
          Configure metas e acompanhe o progresso de captação para cada período
        </p>
      </div>
      
      <Button onClick={onAddGoal} className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        <span>Nova Meta</span>
      </Button>
    </div>
  );
};

export default GoalsHeader;
