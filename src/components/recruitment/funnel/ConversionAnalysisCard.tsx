
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FunnelStage } from '@/types/recruitment';

interface ConversionAnalysisCardProps {
  stages: FunnelStage[];
}

const ConversionAnalysisCard: React.FC<ConversionAnalysisCardProps> = ({ stages }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Análise de Conversão</CardTitle>
            <CardDescription>
              Dados de conversão entre etapas do funil
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            <span>Filtrar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md divide-y">
          {stages.slice(0, -1).map((stage, index) => {
            const nextStage = stages[index + 1];
            const conversionCount = Math.round(stage.leadCount * (stage.conversionRate / 100));
            const conversionPercent = ((conversionCount / stage.leadCount) * 100).toFixed(1);
            
            return (
              <div key={`conversion-${stage.id}`} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{stage.name}</div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <div className="font-medium">{nextStage.name}</div>
                  </div>
                  <Badge className={
                    parseFloat(conversionPercent) > 70 ? "bg-green-100 text-green-800" :
                    parseFloat(conversionPercent) > 50 ? "bg-amber-100 text-amber-800" :
                    "bg-red-100 text-red-800"
                  }>
                    {conversionPercent}%
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <div>{stage.leadCount} leads</div>
                  <ArrowRight className="h-3 w-3" />
                  <div>{conversionCount} conversões</div>
                </div>
                
                <div className="mt-2">
                  <Progress 
                    value={parseFloat(conversionPercent)} 
                    className={`h-1.5 ${
                      parseFloat(conversionPercent) > 70 ? "bg-green-500" :
                      parseFloat(conversionPercent) > 50 ? "bg-amber-500" :
                      "bg-red-500"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 p-4 border rounded-md bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Conversão global (Lead → Matrícula)</div>
            <Badge className="bg-blue-100 text-blue-800">
              {((stages[stages.length - 1].leadCount / stages[0].leadCount) * 100).toFixed(1)}%
            </Badge>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {stages[0].leadCount} leads iniciais → {stages[stages.length - 1].leadCount} matrículas
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionAnalysisCard;
