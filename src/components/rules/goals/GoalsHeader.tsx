
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import NewGoalDialog from './NewGoalDialog';

interface GoalsHeaderProps {
  onAddGoal?: (goal: any) => void;
}

const GoalsHeader: React.FC<GoalsHeaderProps> = ({ onAddGoal }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');

  const handleGoalCreated = (goal: any) => {
    if (onAddGoal) {
      onAddGoal(goal);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Metas de Captação</h2>
          <p className="text-muted-foreground">
            Configure metas e acompanhe o progresso de captação para cada período
          </p>
        </div>
        
        <Button onClick={() => setDialogOpen(true)} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Nova Meta</span>
        </Button>
      </div>

      <NewGoalDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onGoalCreated={handleGoalCreated}
        category={activeCategory}
      />
    </>
  );
};

export default GoalsHeader;
