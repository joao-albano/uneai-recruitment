
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Info, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';

const AiModelInfo: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="mr-2 h-5 w-5 text-primary" />
            <CardTitle className="text-base font-medium">Modelo de Previsão</CardTitle>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                  <span className="sr-only">Informações sobre o modelo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>
                  Este modelo de IA usa árvores de decisão para analisar fatores de risco de evasão escolar. 
                  As previsões são baseadas em dados históricos e padrões de comportamento identificados.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>
          Árvore de Decisão V1.0
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tipo:</span>
            <span className="font-medium">Decision Tree</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fatores principais:</span>
            <span className="font-medium">Frequência, Notas, Comportamento</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Precisão:</span>
            <span className="font-medium">85%</span>
          </div>
          <div className="mt-4 pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-3">
              Este modelo foi projetado para ser transparente e explicável, 
              mostrando o caminho de decisão para cada previsão.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center gap-1" 
              onClick={() => navigate('/dashboard')}
            >
              <span>Ver impacto no dashboard</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiModelInfo;
