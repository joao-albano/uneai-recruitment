
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from '@/types/recruitment';
import { CalendarCheck, CalendarClock, Clock } from 'lucide-react';

interface CampaignConfigurationTabProps {
  campaign: Campaign;
}

const CampaignConfigurationTab: React.FC<CampaignConfigurationTabProps> = ({ campaign }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações da Campanha</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Cronograma</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Início: {new Date(campaign.startDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              {campaign.endDate && (
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Término: {new Date(campaign.endDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  Duração: {campaign.endDate 
                    ? Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24)) 
                    : 'Indeterminada'} dias
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Metas</h3>
            <div className="space-y-2">
              {campaign.goal ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Meta de Leads:</span>
                    <span className="text-sm">{campaign.goal.targetLeads || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Meta de Conversão:</span>
                    <span className="text-sm">{campaign.goal.targetConversion || 0}%</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhuma meta definida
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignConfigurationTab;
