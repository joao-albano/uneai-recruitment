
import React from 'react';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import { PriorizationFactorSelector } from '../factors/PriorizationFactors';

interface RuleEditFormProps {
  editFormData: any;
  handleEditFormChange: (field: string, value: any) => void;
  handleEditCancel: () => void;
  handleEditSave: () => void;
  handleAddFactor: () => void;
  handleDeleteFactor: (index: number) => void;
  handleFactorChange: (index: number, field: string, value: any) => void;
  handleStageChange: (stageId: string) => void;
  funnelStages: { id: string; name: string }[];
}

const RuleEditForm: React.FC<RuleEditFormProps> = ({
  editFormData,
  handleEditFormChange,
  handleEditCancel,
  handleEditSave,
  handleAddFactor,
  handleDeleteFactor,
  handleFactorChange,
  handleStageChange,
  funnelStages
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input 
          value={editFormData.name}
          onChange={(e) => handleEditFormChange('name', e.target.value)}
          className="max-w-md"
        />
        <div className="flex items-center gap-2">
          <Switch
            checked={editFormData.isActive}
            onCheckedChange={(checked) => handleEditFormChange('isActive', checked)}
          />
          <Button variant="ghost" size="sm" onClick={handleEditCancel}>
            Cancelar
          </Button>
          <Button variant="default" size="sm" onClick={handleEditSave}>
            Salvar
          </Button>
        </div>
      </div>

      {funnelStages.length > 0 && (
        <div>
          <Label className="mb-2 block">Aplicar a etapa</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge 
              variant="outline" 
              className={`cursor-pointer ${!editFormData.appliesTo?.stageId ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => handleEditFormChange('appliesTo', {})}
            >
              Todas as etapas
            </Badge>
            {funnelStages.map(stage => (
              <Badge 
                key={stage.id}
                variant={editFormData.appliesTo?.stageId === stage.id ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleStageChange(stage.id)}
              >
                {stage.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      <div>
        <Label>
          Peso da Regra: {editFormData.weight}
        </Label>
        <Slider
          value={[editFormData.weight]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => handleEditFormChange('weight', value[0])}
          className="mt-2"
        />
      </div>
      
      <div>
        <Label className="mb-2 block">Fatores</Label>
        {editFormData.factors.length === 0 ? (
          <p className="text-sm text-muted-foreground mb-2">
            Nenhum fator adicionado
          </p>
        ) : (
          <ScrollArea className="h-[200px] pr-4">
            {editFormData.factors.map((factor: any, idx: number) => (
              <div key={idx} className="flex items-center gap-2 mb-4">
                <PriorizationFactorSelector
                  value={factor.factor}
                  onChange={(value) => handleFactorChange(idx, 'factor', value)}
                />
                <div className="flex flex-col w-32">
                  <Label className="text-xs">Peso: {factor.weight}</Label>
                  <Slider
                    value={[factor.weight]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => handleFactorChange(idx, 'weight', value[0])}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => handleDeleteFactor(idx)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </ScrollArea>
        )}
        
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={handleAddFactor}
        >
          Adicionar Fator
        </Button>
      </div>
    </div>
  );
};

export default RuleEditForm;
