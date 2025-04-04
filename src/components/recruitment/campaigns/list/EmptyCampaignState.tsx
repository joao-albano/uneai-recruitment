
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface EmptyCampaignStateProps {
  showArchived: boolean;
  onCreateCampaign?: () => void;
}

const EmptyCampaignState: React.FC<EmptyCampaignStateProps> = ({ 
  showArchived,
  onCreateCampaign
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{showArchived ? 'Campanhas Arquivadas' : 'Campanhas Ativas'}</CardTitle>
        <CardDescription>
          {showArchived 
            ? 'Visualize suas campanhas arquivadas' 
            : 'Visualize e gerencie suas campanhas de captação em andamento'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border p-4 text-center">
          <p className="text-muted-foreground">
            {showArchived 
              ? 'Você ainda não tem campanhas arquivadas.' 
              : 'Você ainda não tem campanhas ativas. Crie uma nova campanha para começar.'}
          </p>
          {!showArchived && onCreateCampaign && (
            <Button variant="outline" className="mt-4" onClick={onCreateCampaign}>
              Criar Campanha
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyCampaignState;
