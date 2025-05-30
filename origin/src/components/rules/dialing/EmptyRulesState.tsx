
import React from 'react';
import { Phone, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface EmptyRulesStateProps {
  onAddRule: () => void;
}

const EmptyRulesState: React.FC<EmptyRulesStateProps> = ({ onAddRule }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-8">
          <Phone className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Nenhuma regra de discagem</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Configure regras para automatizar suas campanhas de discagem.
          </p>
          <Button onClick={onAddRule}>
            <Plus className="mr-2 h-4 w-4" />
            Criar Primeira Regra
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyRulesState;
