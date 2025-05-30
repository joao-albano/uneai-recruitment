
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SummaryCardsProps {
  totalLeads: number;
  totalCost: number;
  averageCostPerLead: number;
  averageConversion: number;
  channelCount: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalLeads,
  totalCost,
  averageCostPerLead,
  averageConversion,
  channelCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalLeads}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {channelCount} canais ativos
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Investimento Total</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">R$ {totalCost.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Todos os canais
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Custo Médio por Lead</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">R$ {averageCostPerLead.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Média de todos os canais
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Conversão Média</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{averageConversion.toFixed(1)}%</div>
          <Progress value={averageConversion} className="h-2 mt-2" />
        </CardContent>
      </Card>
    </div>
  );
};
