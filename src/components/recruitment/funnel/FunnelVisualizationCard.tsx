
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FunnelStagesList from './FunnelStagesList';
import type { FunnelStage } from '@/types/recruitment';

interface FunnelVisualizationCardProps {
  stages: FunnelStage[];
  onEditStage: (stage: FunnelStage) => void;
}

const FunnelVisualizationCard: React.FC<FunnelVisualizationCardProps> = ({ 
  stages, 
  onEditStage 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Visualização do Funil</CardTitle>
        <CardDescription>
          Fluxo de conversão e desempenho por etapa
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <FunnelStagesList stages={stages} onEditStage={onEditStage} />
      </CardContent>
    </Card>
  );
};

export default FunnelVisualizationCard;
