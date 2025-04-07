
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FunnelStage } from '@/types/recruitment';
import { Edit, Plus, ChevronRight } from 'lucide-react';

interface FunnelVisualizationCardProps {
  stages: FunnelStage[];
  onEditStage: (stage: FunnelStage) => void;
  onAddSubStage: (stageId: string) => void;
}

const FunnelVisualizationCard: React.FC<FunnelVisualizationCardProps> = ({ 
  stages, 
  onEditStage,
  onAddSubStage
}) => {
  const renderStage = (stage: FunnelStage, isSubStage = false) => {
    return (
      <div 
        key={stage.id} 
        className={`mb-4 ${isSubStage ? 'ml-8 border-l-2 pl-4 border-dashed border-gray-300' : ''}`}
      >
        <div className="flex items-center justify-between bg-white rounded-lg border p-4 hover:shadow transition-shadow">
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-medium">{stage.name}</span>
              {!isSubStage && stage.subStages && stage.subStages.length > 0 && (
                <span className="text-sm ml-2 text-muted-foreground">
                  ({stage.subStages.length} sub-etapas)
                </span>
              )}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {stage.description}
            </div>
            <div className="mt-2 flex items-center">
              <div className="text-sm">
                <span className="font-medium">{stage.leadCount}</span> leads
              </div>
              <div className="mx-2 text-muted-foreground">•</div>
              <div className="text-sm">
                <span className="font-medium">{stage.conversionRate}%</span> conversão
              </div>
              <div className="mx-2 text-muted-foreground">•</div>
              <div className="text-sm">
                <span className="font-medium">{stage.expectedDuration}</span> dias esperados
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {!isSubStage && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAddSubStage(stage.id)}
                title="Adicionar sub-etapa"
              >
                <Plus className="h-4 w-4 mr-1" />
                Sub-etapa
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEditStage(stage)}
              title="Editar etapa"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Render sub-stages if they exist */}
        {!isSubStage && stage.subStages && stage.subStages.length > 0 && (
          <div className="mt-2">
            {stage.subStages.map(subStage => renderStage(subStage, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Visualização do Funil</CardTitle>
      </CardHeader>
      <CardContent>
        {stages.map(stage => renderStage(stage))}
      </CardContent>
    </Card>
  );
};

export default FunnelVisualizationCard;
