
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Link, Edit, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { PriorizationRule } from '@/types/recruitment/tasks';
import { getFactorName } from '../factors/PriorizationFactors';

interface PriorizationRuleItemProps {
  rule: PriorizationRule;
  onEditClick: (rule: PriorizationRule) => void;
  onToggleRule: (id: string) => void;
  onDeleteRule: (id: string) => void;
  onWeightChange: (id: string, value: number) => void;
  linkedGenerationRules: { id: string; name: string }[];
}

const PriorizationRuleItem: React.FC<PriorizationRuleItemProps> = ({
  rule,
  onEditClick,
  onToggleRule,
  onDeleteRule,
  onWeightChange,
  linkedGenerationRules
}) => {
  // Ensure that rule.factors is always an array
  const factors = Array.isArray(rule.factors) ? rule.factors : [];
  
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{rule.name}</h3>
          <Badge variant={rule.isActive ? 'default' : 'outline'}>
            {rule.isActive ? 'Ativo' : 'Inativo'}
          </Badge>
          {rule.appliesTo?.stageName && (
            <Badge variant="secondary">
              Etapa: {rule.appliesTo.stageName}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => onEditClick(rule)}
          >
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Switch
            checked={rule.isActive}
            onCheckedChange={() => onToggleRule(rule.id)}
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={() => onDeleteRule(rule.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div>
        <Label>
          Peso da Regra: {rule.weight}
        </Label>
        <Slider
          value={[rule.weight]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => onWeightChange(rule.id, value[0])}
          className="mt-2"
        />
      </div>
      
      <div>
        <Label className="mb-2 block">Fatores</Label>
        <div className="space-y-2">
          {factors.length > 0 ? factors.map((factor, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span>{getFactorName(factor.factor)}</span>
              <span>Peso: {factor.weight}</span>
            </div>
          )) : (
            <p className="text-sm text-muted-foreground">
              Nenhum fator adicionado
            </p>
          )}
        </div>
      </div>
      
      {linkedGenerationRules.length > 0 && (
        <div className="mt-3">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Link className="h-3.5 w-3.5" />
            <span>Regras de geração vinculadas:</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {linkedGenerationRules.map(genRule => (
              <Tooltip key={genRule.id}>
                <TooltipTrigger>
                  <Badge variant="secondary" className="text-xs">
                    {genRule.name}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Regra de geração: {genRule.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorizationRuleItem;
