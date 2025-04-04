
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Mail, 
  MessageSquare, 
  Phone, 
  BarChart2,
  Send
} from 'lucide-react';
import { Campaign } from '@/types/recruitment';

interface CampaignCardProps {
  campaign: Campaign;
  onViewDetails: (campaign: Campaign) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ 
  campaign,
  onViewDetails
}) => {
  return (
    <Card key={campaign.id} className="overflow-hidden">
      <div className="flex border-b">
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">{campaign.name}</h3>
              <Badge variant={campaign.status === 'active' ? 'default' : 'outline'}>
                {campaign.status === 'active' 
                  ? 'Ativa' 
                  : campaign.status === 'paused' 
                    ? 'Pausada' 
                    : campaign.status === 'completed' 
                      ? 'Arquivada' 
                      : 'Rascunho'}
              </Badge>
            </div>
          </div>
          
          <p className="mt-2 text-muted-foreground">{campaign.description}</p>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Período</p>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {new Date(campaign.startDate).toLocaleDateString('pt-BR')}
                  {campaign.endDate && ` - ${new Date(campaign.endDate).toLocaleDateString('pt-BR')}`}
                </span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Canais</p>
              <div className="flex items-center gap-1 mt-1">
                {campaign.channel.includes('mail') && <Mail className="h-4 w-4" />}
                {campaign.channel.includes('whatsapp') && <MessageSquare className="h-4 w-4" />}
                {campaign.channel.includes('voice') && <Phone className="h-4 w-4" />}
                {campaign.channel.includes('sms') && <Send className="h-4 w-4" />}
                {campaign.channel.length > 0 && (
                  <span className="ml-1">{campaign.channel.length} canais</span>
                )}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Desempenho</p>
              <div className="flex items-center mt-1">
                <BarChart2 className="h-4 w-4 mr-1" />
                <span>
                  {campaign.performance?.leadsGenerated || 0} leads 
                  ({campaign.performance?.conversion || 0}% conversão)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-6 w-64 flex flex-col justify-between border-l">
          <div>
            <h4 className="text-sm font-medium">Segmentação</h4>
            <div className="mt-2 flex flex-wrap gap-1">
              <Badge variant="outline">{campaign.target?.audience || 'Geral'}</Badge>
              {campaign.target?.location && (
                <Badge variant="outline">{campaign.target.location}</Badge>
              )}
              {campaign.target?.courses && campaign.target.courses.map((course, index) => (
                <Badge key={index} variant="outline" className="bg-primary/10">
                  {course}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <Button 
              variant="secondary" 
              className="w-full" 
              size="sm"
              onClick={() => onViewDetails(campaign)}
            >
              Ver Detalhes
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CampaignCard;
