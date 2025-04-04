
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle, Zap } from 'lucide-react';
import { OpportunityItem } from '@/types/recruitment';

interface SuggestedActionsProps {
  opportunities: OpportunityItem[];
  onCreateCampaign: (item: OpportunityItem) => void;
}

const SuggestedActions: React.FC<SuggestedActionsProps> = ({ 
  opportunities, 
  onCreateCampaign 
}) => {
  const opportunitiesWithSuggestions = opportunities.filter(opp => opp.suggestedAction);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sugestões de Ação</CardTitle>
        <CardDescription>
          Ações recomendadas para aproveitar oportunidades identificadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {opportunitiesWithSuggestions.map(opp => (
            <div key={`suggestion-${opp.id}`} className="flex gap-4 p-4 rounded-lg border">
              <div className={`rounded-full p-2 h-fit ${
                opp.urgency === 'high' ? 'bg-red-100 text-red-700' : 
                opp.urgency === 'medium' ? 'bg-amber-100 text-amber-700' : 
                'bg-blue-100 text-blue-700'
              }`}>
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{opp.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{opp.description}</p>
                <div className="mt-3">
                  <strong className="text-sm">Ação sugerida:</strong>
                  <p className="text-sm mt-1">{opp.suggestedAction}</p>
                </div>
                <div className="mt-4">
                  <Button size="sm" className="gap-1" onClick={() => onCreateCampaign(opp)}>
                    <Zap className="h-3.5 w-3.5" />
                    <span>Criar Campanha</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuggestedActions;
