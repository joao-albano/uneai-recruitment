
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { OpportunityItem } from '@/types/recruitment';

interface SuggestedActionsProps {
  opportunities: OpportunityItem[];
  onCreateCampaign: (opportunity: OpportunityItem) => void;
}

const SuggestedActions: React.FC<SuggestedActionsProps> = ({
  opportunities,
  onCreateCampaign
}) => {
  // Get top 3 opportunities with highest impact/urgency
  const topOpportunities = [...opportunities]
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 3);

  if (!topOpportunities.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Sugestões de Ação</CardTitle>
        <CardDescription>
          Ações recomendadas para aproveitar oportunidades identificadas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {topOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className={`p-1.5 rounded-full ${opportunity.impact > 7 ? 'bg-red-100' : 'bg-amber-100'}`}>
                <AlertCircle className={`h-5 w-5 ${opportunity.impact > 7 ? 'text-red-500' : 'text-amber-500'}`} />
              </div>
              <div>
                <h4 className="font-medium">{opportunity.title}</h4>
                <p className="text-sm text-muted-foreground">{opportunity.description}</p>
              </div>
            </div>
            
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium mb-1">Ação sugerida:</p>
              <p className="text-sm">{opportunity.suggestedAction}</p>
            </div>
            
            <Button 
              className="w-full"
              size="sm"
              variant="outline"
              onClick={() => onCreateCampaign(opportunity)}
            >
              <span>Criar Campanha</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedActions;
