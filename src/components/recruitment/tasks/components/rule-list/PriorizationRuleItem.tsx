
import React from 'react';
import { PriorizationRule } from '@/types/recruitment/tasks';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getFactorName } from '../factors/PriorizationFactors';

interface PriorizationRuleItemProps {
  rule: PriorizationRule;
  onEditClick: (rule: PriorizationRule) => void;
  onToggleRule: (id: string) => void;
  onDeleteRule: (id: string) => void;
  onWeightChange: (id: string, weight: number) => void;
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
  // Ensure factors is always a valid array
  const factors = Array.isArray(rule.factors) ? rule.factors : [];
  
  return (
    <Card className={`${!rule.isActive ? 'opacity-70' : ''}`}>
      <CardContent className="pt-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div className="font-medium">{rule.name}</div>
            <div className="flex items-center gap-2">
              <Switch
                checked={rule.isActive}
                onCheckedChange={() => onToggleRule(rule.id)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditClick(rule)}
              >
                <Edit className="h-4 w-4" />
              </Button>
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
          
          {rule.appliesTo?.stageName && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Aplica-se a:</span>
              <Badge variant="outline">{rule.appliesTo.stageName}</Badge>
            </div>
          )}
          
          {factors.length > 0 && (
            <div className="mt-2">
              <div className="text-xs text-muted-foreground mb-1">Fatores:</div>
              <div className="flex flex-wrap gap-1">
                {factors.map((factor, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {getFactorName(factor.factor || '')} ({factor.weight})
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {linkedGenerationRules.length > 0 && (
            <div className="mt-2">
              <div className="text-xs text-muted-foreground mb-1">Regras de geração vinculadas:</div>
              <div className="flex flex-wrap gap-1">
                {linkedGenerationRules.map(genRule => (
                  <Badge key={genRule.id} variant="secondary" className="text-xs">
                    {genRule.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Peso: {rule.weight}</span>
              <div className="w-32">
                <Slider
                  value={[rule.weight]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => onWeightChange(rule.id, value[0])}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriorizationRuleItem;
