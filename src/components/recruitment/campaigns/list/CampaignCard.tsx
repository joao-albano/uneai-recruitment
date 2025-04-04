
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
  Send,
  ExternalLink,
  MapPin,
  Users,
  GraduationCap
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
  if (!campaign) {
    return null; // Return null if campaign is not defined
  }

  const formatStatus = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'paused': return 'Pausada';
      case 'completed': return 'Arquivada';
      case 'draft': return 'Rascunho';
      default: return status;
    }
  };

  return (
    <Card key={campaign.id} className="overflow-hidden border">
      <div className="flex flex-col">
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">{campaign.name}</h3>
              <Badge variant={campaign.status === 'active' ? 'default' : 'outline'}>
                {formatStatus(campaign.status)}
              </Badge>
            </div>
          </div>
          
          <p className="mt-2 text-muted-foreground text-sm">{campaign.description}</p>
        </div>
        
        <div className="px-4 pb-3">
          <div className="grid grid-cols-3 gap-4 text-sm mb-2">
            <div>
              <p className="text-muted-foreground text-xs">Período</p>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="text-xs">
                  {new Date(campaign.startDate).toLocaleDateString('pt-BR')}
                  {campaign.endDate && ` - ${new Date(campaign.endDate).toLocaleDateString('pt-BR')}`}
                </span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Canais</p>
              <div className="flex items-center gap-1 mt-1">
                {campaign.channel && campaign.channel.includes('mail') && <Mail className="h-4 w-4" />}
                {campaign.channel && campaign.channel.includes('whatsapp') && <MessageSquare className="h-4 w-4" />}
                {campaign.channel && campaign.channel.includes('voice') && <Phone className="h-4 w-4" />}
                {campaign.channel && campaign.channel.includes('sms') && <Send className="h-4 w-4" />}
                {campaign.channel && campaign.channel.length > 0 && (
                  <span className="ml-1 text-xs">{campaign.channel.length} canais</span>
                )}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Desempenho</p>
              <div className="flex items-center mt-1">
                <BarChart2 className="h-4 w-4 mr-1" />
                <span className="text-xs">
                  {campaign.performance?.leadsGenerated || 0} leads 
                  ({campaign.performance?.conversion || 0}% conversão)
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-3 border-t">
          <h4 className="text-xs font-medium mb-2">Segmentação</h4>
          
          <div className="space-y-2 mb-3">
            {campaign.target?.audience && (
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">{campaign.target.audience}</span>
              </div>
            )}
            
            {campaign.target?.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">{campaign.target.location}</span>
              </div>
            )}
            
            {campaign.target?.courses && campaign.target.courses.length > 0 && (
              <div className="flex items-start gap-1">
                <GraduationCap className="h-3 w-3 text-muted-foreground mt-0.5" />
                <div className="flex flex-wrap gap-1">
                  {campaign.target.courses.map((course, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10 text-xs px-1.5 py-0">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {!campaign.target?.audience && !campaign.target?.location && 
             (!campaign.target?.courses || campaign.target.courses.length === 0) && (
              <p className="text-xs text-muted-foreground italic">
                Nenhuma segmentação definida
              </p>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full flex items-center justify-center gap-1 mt-1"
            onClick={() => onViewDetails(campaign)}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Ver Detalhes
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CampaignCard;
