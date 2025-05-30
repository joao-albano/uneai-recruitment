
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { channelData } from './channelPerformanceData';
import { ChannelPerformance } from '@/types/recruitment/predictions';

// Calculate totals
const totalLeads = channelData.reduce((sum, item) => sum + item.leads, 0);
const totalPredicted = channelData.reduce((sum, item) => sum + (item.predictedEnrollment || 0), 0);
const totalTarget = channelData.reduce((sum, item) => sum + (item.targetEnrollment || 0), 0);
const averageConversionRate = channelData.reduce((sum, item) => sum + item.conversionRate, 0) / channelData.length;

const ChannelSummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Leads por Canal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalLeads}</div>
          <div className="text-xs text-muted-foreground mt-1">
            {channelData.length} canais ativos
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Conversão Média</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{averageConversionRate.toFixed(1)}%</div>
          <div className="text-xs text-muted-foreground mt-1">
            Taxa média de conversão em todos os canais
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Previsão de Matrículas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalPredicted}</div>
          <Progress 
            value={totalTarget > 0 ? (totalPredicted / totalTarget) * 100 : 0} 
            className={`h-2 mt-2 ${totalPredicted >= totalTarget ? 'bg-green-500' : 'bg-amber-500'}`}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {totalTarget > 0 ? ((totalPredicted / totalTarget) * 100).toFixed(1) : 0}% da meta ({totalTarget})
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelSummaryCards;
