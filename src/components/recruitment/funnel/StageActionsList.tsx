
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface StageActionsListProps {
  actions: string[];
  onChange: (actions: string[]) => void;
}

const StageActionsList: React.FC<StageActionsListProps> = ({
  actions,
  onChange
}) => {
  const handleActionChange = (index: number, value: string) => {
    const updatedActions = [...actions];
    updatedActions[index] = value;
    onChange(updatedActions);
  };
  
  const handleAddAction = () => {
    onChange([...actions, '']);
  };
  
  const handleRemoveAction = (index: number) => {
    const updatedActions = [...actions];
    updatedActions.splice(index, 1);
    onChange(updatedActions);
  };

  return (
    <div className="space-y-2">
      <Label>Ações nesta Etapa</Label>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input 
              placeholder="Ex: Telefonema, E-mail, Visita, etc."
              value={action}
              onChange={(e) => handleActionChange(index, e.target.value)}
            />
            <Button 
              type="button"
              variant="ghost" 
              size="icon"
              onClick={() => handleRemoveAction(index)}
              disabled={actions.length === 1}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full gap-2"
          onClick={handleAddAction}
        >
          <Plus className="h-4 w-4" />
          <span>Adicionar Ação</span>
        </Button>
      </div>
    </div>
  );
};

export default StageActionsList;
