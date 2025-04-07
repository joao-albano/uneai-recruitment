
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
import { Plus, ChevronDown } from 'lucide-react';
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
    <Card className="bg-gradient-to-r from-white to-blue-50 border-blue-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex justify-between items-center text-gray-900">
          <span>Selecionar Funil</span>
          <Button 
            onClick={onCreateFunnel} 
            size="sm" 
            variant="outline"
            className="bg-white hover:bg-blue-100 hover:text-gray-900 border-blue-200"
          >
            <Plus className="h-4 w-4 mr-1 text-blue-500" />
            Novo Funil
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Select 
            value={selectedFunnel?.id} 
            onValueChange={(value) => {
              const funnel = funnels.find(f => f.id === value);
              if (funnel) onSelectFunnel(funnel);
            }}
          >
            <SelectTrigger className="w-full bg-white border-blue-200 focus:ring-blue-200">
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
            <div className="bg-white p-3 rounded-md border border-blue-100">
              <h3 className="font-medium text-gray-900">{selectedFunnel.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedFunnel.description || "Sem descrição"}
              </p>
              <div className="mt-2 text-xs text-muted-foreground">
                <span className="text-blue-500 font-medium">Ativo</span> • Criado em {new Date(selectedFunnel.createdAt).toLocaleDateString('pt-BR')}
              </div>
              <div className="mt-2 text-xs">
                <span className="font-medium">{selectedFunnel.stages.length} etapa{selectedFunnel.stages.length !== 1 ? 's' : ''}</span>
                {selectedFunnel.stages.some(stage => stage.subStages && stage.subStages.length > 0) && (
                  <span className="ml-2 bg-blue-50 text-gray-700 px-1.5 py-0.5 rounded-full text-[10px]">
                    Com sub-etapas
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelSelector;
