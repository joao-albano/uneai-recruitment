
import React from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Funnel } from '@/types/recruitment';

interface FunnelSelectorProps {
  funnels: Funnel[];
  selectedFunnel: Funnel | null;
  onSelectFunnel: (funnel: Funnel) => void;
  onCreateFunnel: () => void;
}

const FunnelSelector: React.FC<FunnelSelectorProps> = ({
  funnels,
  selectedFunnel,
  onSelectFunnel,
  onCreateFunnel
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex justify-between items-center">
          <span>Selecionar Funil</span>
          <Button onClick={onCreateFunnel} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Novo Funil
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select 
          value={selectedFunnel?.id} 
          onValueChange={(value) => {
            const funnel = funnels.find(f => f.id === value);
            if (funnel) onSelectFunnel(funnel);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione um funil" />
          </SelectTrigger>
          <SelectContent>
            {funnels.map((funnel) => (
              <SelectItem key={funnel.id} value={funnel.id}>
                {funnel.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedFunnel && (
          <p className="mt-2 text-sm text-muted-foreground">
            {selectedFunnel.description || "Sem descrição"}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default FunnelSelector;
