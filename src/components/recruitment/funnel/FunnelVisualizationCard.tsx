
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FunnelStage } from '@/types/recruitment';
import { Edit, Plus, ChevronRight, Users, Calendar, TrendingUp } from 'lucide-react';

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
  const renderStage = (stage: FunnelStage, isSubStage = false, index = 0, total = 1) => {
    const stageColors = [
      'border-l-blue-500 bg-blue-50',
      'border-l-indigo-500 bg-indigo-50',
      'border-l-teal-500 bg-teal-50',
      'border-l-purple-500 bg-purple-50',
      'border-l-cyan-500 bg-cyan-50',
      'border-l-sky-500 bg-sky-50',
    ];
    
    const stageColor = stageColors[index % stageColors.length];
    const progressWidth = `${stage.conversionRate || 0}%`;
    
    return (
      <div 
        key={stage.id} 
        className={`mb-4 relative ${isSubStage ? 'ml-8 border-l-2 pl-4 border-dashed border-gray-300' : ''}`}
      >
        <div className={`rounded-lg border p-4 hover:shadow-md transition-all ${isSubStage ? '' : `border-l-4 ${stageColor}`}`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <span className="font-medium text-gray-800">{stage.name}</span>
                {!isSubStage && stage.subStages && stage.subStages.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs font-medium rounded-full text-gray-600">
                    {stage.subStages.length} sub-etapas
                  </span>
                )}
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                {stage.description || "Sem descrição"}
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded border">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  <div>
                    <div className="font-medium text-gray-800">{stage.leadCount}</div>
                    <div className="text-xs">leads</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded border">
                  <TrendingUp className="h-4 w-4 mr-2 text-teal-500" />
                  <div>
                    <div className="font-medium text-gray-800">{stage.conversionRate}%</div>
                    <div className="text-xs">conversão</div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 bg-white p-2 rounded border">
                  <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                  <div>
                    <div className="font-medium text-gray-800">{stage.expectedDuration}</div>
                    <div className="text-xs">dias esperados</div>
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: progressWidth }}></div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 ml-4">
              {!isSubStage && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onAddSubStage(stage.id)}
                  title="Adicionar sub-etapa"
                  className="border-blue-200 bg-white hover:bg-blue-50 text-gray-700 hover:text-gray-900"
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
                className="text-gray-600 hover:bg-gray-100"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {!isSubStage && index < total - 1 && (
            <div className="flex justify-center my-2">
              <div className="w-0.5 h-6 bg-gray-300"></div>
            </div>
          )}
        </div>
        
        {/* Render sub-stages if they exist */}
        {!isSubStage && stage.subStages && stage.subStages.length > 0 && (
          <div className="mt-2 relative before:absolute before:top-0 before:bottom-0 before:left-4 before:w-0.5 before:bg-gray-200">
            {stage.subStages.map((subStage, idx) => renderStage(subStage, true, idx, stage.subStages?.length || 0))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="shadow-sm border-blue-100">
      <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
        <CardTitle className="text-lg text-gray-900">Visualização do Funil</CardTitle>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        {stages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma etapa cadastrada neste funil.</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {}} 
              className="mt-4 border-blue-200 bg-white hover:bg-blue-50 text-gray-700 hover:text-gray-900"
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Primeira Etapa
            </Button>
          </div>
        ) : (
          stages.map((stage, index) => renderStage(stage, false, index, stages.length))
        )}
      </CardContent>
    </Card>
  );
};

export default FunnelVisualizationCard;
