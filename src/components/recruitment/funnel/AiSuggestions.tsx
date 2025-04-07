
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ArrowRight, RefreshCw } from 'lucide-react';
import { Funnel, FunnelStage } from '@/types/recruitment';
import SegmentationStrategiesDialog from './SegmentationStrategiesDialog';

interface AiSuggestionsProps {
  funnel: Funnel | null;
  stages: FunnelStage[];
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({ funnel, stages }) => {
  const [segmentationDialogOpen, setSegmentationDialogOpen] = useState(false);
  const [currentSuggestionId, setCurrentSuggestionId] = useState<string | null>(null);

  // Safety check: if no funnel or stages are empty, show placeholder
  if (!funnel || stages.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center text-purple-800">
            <Lightbulb className="h-5 w-5 mr-2 text-purple-500" />
            <span>Sugestões da IA</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white/80 p-4 rounded-md border border-purple-100">
            <p className="text-sm text-center text-muted-foreground">
              Configure seu funil com etapas para receber sugestões inteligentes da IA.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Define some sample suggestions based on the funnel state
  const getSuggestions = () => {
    const hasSingleStage = stages.length === 1;
    const hasLowConversion = stages.some(s => (s.conversionRate || 0) < 50);
    const hasHighLeadCount = stages.some(s => s.leadCount > 300);
    
    const suggestions = [];
    
    if (hasSingleStage) {
      suggestions.push({
        id: 'add-stages',
        title: 'Adicione mais etapas ao funil',
        description: 'Um funil eficaz geralmente possui entre 3 e 5 etapas principais.',
        action: 'Adicionar etapa',
        actionType: 'add-stage'
      });
    }
    
    if (hasLowConversion) {
      suggestions.push({
        id: 'improve-conversion',
        title: 'Aumente a taxa de conversão',
        description: 'Algumas etapas estão com taxas de conversão abaixo de 50%. Considere revisar o processo dessas etapas.',
        action: 'Ver sugestões detalhadas',
        actionType: 'conversion-details'
      });
    }
    
    if (hasHighLeadCount) {
      suggestions.push({
        id: 'lead-segmentation',
        title: 'Segmentação de leads',
        description: 'Você tem um grande volume de leads. A segmentação pode aumentar a eficácia do seu processo.',
        action: 'Ver estratégias',
        actionType: 'segmentation-strategies'
      });
    }
    
    // Default suggestion if none of the above apply
    if (suggestions.length === 0) {
      suggestions.push({
        id: 'optimize-funnel',
        title: 'Otimize seu funil',
        description: 'Analise regularmente os dados de conversão para identificar oportunidades de melhoria.',
        action: 'Ver dicas',
        actionType: 'optimization-tips'
      });
    }
    
    return suggestions;
  };

  const handleSuggestionAction = (suggestionId: string, actionType: string) => {
    setCurrentSuggestionId(suggestionId);
    
    switch (actionType) {
      case 'segmentation-strategies':
        setSegmentationDialogOpen(true);
        break;
      case 'conversion-details':
        // Future implementation for conversion details
        console.log('Show conversion details');
        break;
      case 'optimization-tips':
        // Future implementation for optimization tips
        console.log('Show optimization tips');
        break;
      case 'add-stage':
        // Future implementation for adding stage
        console.log('Add new stage');
        break;
      default:
        console.log('Action not implemented:', actionType);
    }
  };

  const suggestions = getSuggestions();

  return (
    <>
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex justify-between items-center text-purple-800">
            <div className="flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-purple-500" />
              <span>Sugestões da IA</span>
            </div>
            <Button 
              size="sm" 
              variant="ghost"
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Atualizar
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white/80 p-4 rounded-md border border-purple-100 hover:border-purple-200 transition-colors">
                <h3 className="font-medium text-purple-800 mb-1">{suggestion.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{suggestion.description}</p>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={() => handleSuggestionAction(suggestion.id, suggestion.actionType)}
                >
                  {suggestion.action}
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <SegmentationStrategiesDialog
        open={segmentationDialogOpen}
        onOpenChange={setSegmentationDialogOpen}
      />
    </>
  );
};

export default AiSuggestions;
