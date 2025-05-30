
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from '@/types/recruitment';
import { BarChart3, Users, Target } from 'lucide-react';

interface CampaignPerformanceTabProps {
  campaign: Campaign;
}

const CampaignPerformanceTab: React.FC<CampaignPerformanceTabProps> = ({ campaign }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho da Campanha</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-muted/50 rounded-lg p-4">
            <Users className="h-6 w-6 text-primary mb-2" />
            <h3 className="text-2xl font-bold">
              {campaign.performance?.leadsGenerated || 0}
            </h3>
            <p className="text-sm text-muted-foreground">Leads Gerados</p>
          </div>
          
          <div className="flex flex-col items-center bg-muted/50 rounded-lg p-4">
            <Target className="h-6 w-6 text-primary mb-2" />
            <h3 className="text-2xl font-bold">
              {campaign.performance?.conversion || 0}%
            </h3>
            <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
          </div>
          
          <div className="flex flex-col items-center bg-muted/50 rounded-lg p-4">
            <BarChart3 className="h-6 w-6 text-primary mb-2" />
            <h3 className="text-2xl font-bold">
              {campaign.performance?.cost 
                ? `R$ ${campaign.performance.cost.toLocaleString('pt-BR')}` 
                : 'R$ 0'}
            </h3>
            <p className="text-sm text-muted-foreground">Custo Total</p>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Dados de Performance por Canal</h3>
          <p className="text-center text-muted-foreground py-8">
            Dados detalhados de performance por canal serão implementados em breve.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignPerformanceTab;
