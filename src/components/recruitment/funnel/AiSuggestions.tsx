
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FunnelStage, Funnel } from '@/types/recruitment';
import { Lightbulb, BarChart, Users, Clock } from 'lucide-react';

interface AiSuggestionsProps {
  funnel: Funnel | null;
  stages: FunnelStage[];
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({ funnel, stages }) => {
  if (!funnel) return null;

  // Simulação de sugestões da IA com base nos dados do funil
  const suggestions = [
    {
      id: '1',
      title: 'Melhoria no Primeiro Contato',
      description: 'A taxa de conversão na etapa "Primeiro Contato" está abaixo do ideal. Considere implementar scripts de atendimento mais personalizados.',
      icon: <Users className="h-5 w-5 text-primary" />,
      action: 'Ver detalhes'
    },
    {
      id: '2',
      title: 'Otimizar tempo na etapa "Visita"',
      description: 'Leads estão passando mais tempo que o esperado na etapa "Visita". Recomendamos agilizar o processo de agendamento.',
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      action: 'Implementar'
    },
    {
      id: '3',
      title: 'Aumentar conversão na matrícula',
      description: 'Adicione uma etapa de follow-up pós-visita para aumentar a conversão para matrículas.',
      icon: <BarChart className="h-5 w-5 text-green-600" />,
      action: 'Adicionar etapa'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-lg">
          <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
          Sugestões da IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map(suggestion => (
            <div key={suggestion.id} className="bg-muted/50 p-4 rounded-lg border">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {suggestion.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.description}
                  </p>
                  <Button variant="link" className="px-0 h-auto mt-2 text-sm">
                    {suggestion.action}
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

export default AiSuggestions;
