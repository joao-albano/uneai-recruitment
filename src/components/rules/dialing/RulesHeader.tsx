
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RulesHeaderProps {
  onAddRule: () => void;
}

const RulesHeader: React.FC<RulesHeaderProps> = ({ onAddRule }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Regras de Discagem</h1>
      <Button onClick={onAddRule}>
        <Plus className="mr-2 h-4 w-4" />
        Nova Regra
      </Button>
    </div>
  );
};

export default RulesHeader;
