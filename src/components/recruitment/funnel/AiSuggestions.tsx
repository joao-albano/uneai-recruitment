
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FunnelStage, Funnel } from '@/types/recruitment';
import { BrainCircuit, Lightbulb, Zap, BarChart, ChevronRight } from 'lucide-react';

interface AiSuggestionsProps {
  funnel: Funnel | null;
  stages: FunnelStage[];
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({ funnel, stages }) => {
  const suggestions = [
    {
      title: "Otimize seu primeiro contato",
      description: "Sua taxa de conversão na etapa de primeiro contato está abaixo da média. Considere revisar seu script de abordagem.",
      action: "Revisar script",
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      priority: "Alta"
    },
    {
      title: "Aumente a velocidade de resposta",
      description: "Leads que recebem resposta em até 5 minutos têm 21x mais chances de conversão. Seu tempo médio está em 45 minutos.",
      action: "Configurar alertas",
      icon: <BarChart className="h-5 w-5 text-blue-500" />,
      priority: "Média"
    },
    {
      title: "Adicione uma etapa de nutrição",
      description: "Seu funil não possui uma etapa de nutrição de leads. Adicionar esta etapa pode aumentar suas conversões em até 25%.",
      action: "Adicionar etapa",
      icon: <Lightbulb className="h-5 w-5 text-green-500" />,
      priority: "Média"
    }
  ];

  if (!funnel || stages.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-sm border-blue-100">
      <CardHeader className="pb-3 flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
        <div className="flex items-center">
          <BrainCircuit className="h-5 w-5 text-blue-600 mr-2" />
          <CardTitle className="text-lg text-blue-800">Sugestões da IA</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
          Ver todas
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-6 bg-white">
        <div className="grid gap-4 md:grid-cols-3">
          {suggestions.map((suggestion, i) => (
            <div key={i} className="bg-white border border-blue-100 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-start">
                <div className="bg-blue-50 p-2 rounded-full mr-3">
                  {suggestion.icon}
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium">{suggestion.title}</h3>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                      suggestion.priority === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {suggestion.priority}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-600 line-clamp-3">
                    {suggestion.description}
                  </p>
                  <Button variant="link" size="sm" className="mt-2 h-auto p-0 text-blue-600">
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
