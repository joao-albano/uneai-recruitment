
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SummaryCardsProps {
  totalLeads: number;
  channelName: string;
  channelGrowth: number;
  averageConversion: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ 
  totalLeads, 
  channelName, 
  channelGrowth, 
  averageConversion 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalLeads}</div>
          <div className="text-xs text-muted-foreground mt-1">
            Últimos 30 dias
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Canal Mais Efetivo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{channelName}</div>
          <div className="flex items-center gap-1 mt-1">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              +{channelGrowth}% 
            </Badge>
            <span className="text-xs text-muted-foreground">vs mês anterior</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Conversão Média</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{averageConversion}%</div>
          <Progress 
            value={averageConversion} 
            max={100}
            className="h-2 mt-2"
          />
          <div className="text-xs text-muted-foreground mt-1">
            Meta: 25%
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
