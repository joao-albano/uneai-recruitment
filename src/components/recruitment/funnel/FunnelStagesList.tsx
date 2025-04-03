
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { FunnelStage } from '@/types/recruitment';

interface FunnelStagesListProps {
  stages: FunnelStage[];
  onEditStage: (stage: FunnelStage) => void;
}

const FunnelStagesList: React.FC<FunnelStagesListProps> = ({ 
  stages, 
  onEditStage 
}) => {
  return (
    <div className="space-y-8">
      {stages.map((stage, index) => (
        <div key={stage.id} className="relative">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <span className="font-bold text-primary">{stage.order}</span>
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="font-medium text-lg">{stage.name}</h3>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEditStage(stage)}
                >
                  Editar
                </Button>
              </div>
              
              <div className="bg-muted p-4 rounded-lg mt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Leads nesta etapa</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      {stage.leadCount}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Taxa de conversão</div>
                    <div className="text-2xl font-bold flex items-center gap-2">
                      {stage.conversionRate}%
                      {index < stages.length - 1 && (
                        <Badge className="bg-amber-100 text-amber-800">
                          {Math.round(stage.leadCount * (stage.conversionRate / 100))} leads
                        </Badge>
                      )}
                    </div>
                    <Progress 
                      value={stage.conversionRate} 
                      className="h-1.5 mt-1" 
                    />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Duração esperada</div>
                    <div className="text-2xl font-bold flex items-center gap-1">
                      {stage.expectedDuration}
                      <span className="text-base font-normal text-muted-foreground">dias</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {index < stages.length - 1 && (
            <div className="absolute left-6 top-full h-8 flex items-center justify-center">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FunnelStagesList;
