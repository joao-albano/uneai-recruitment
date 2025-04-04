
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Campaign } from '@/types/recruitment';
import { Mail, MessageSquare, Phone, Send } from 'lucide-react';

interface CampaignOverviewTabProps {
  campaign: Campaign;
}

const CampaignOverviewTab: React.FC<CampaignOverviewTabProps> = ({ campaign }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Status:</dt>
                <dd className="text-sm font-medium">
                  {campaign.status === 'active' ? 'Ativa' : 
                  campaign.status === 'paused' ? 'Pausada' : 
                  campaign.status === 'completed' ? 'Finalizada' : 'Rascunho'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Data de Início:</dt>
                <dd className="text-sm font-medium">{new Date(campaign.startDate).toLocaleDateString('pt-BR')}</dd>
              </div>
              {campaign.endDate && (
                <div className="flex justify-between">
                  <dt className="text-sm text-muted-foreground">Data de Término:</dt>
                  <dd className="text-sm font-medium">{new Date(campaign.endDate).toLocaleDateString('pt-BR')}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Orçamento:</dt>
                <dd className="text-sm font-medium">
                  {campaign.budget ? `R$ ${campaign.budget.toLocaleString('pt-BR')}` : 'Não definido'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Automática:</dt>
                <dd className="text-sm font-medium">{campaign.isAutomated ? 'Sim' : 'Não'}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Canais de Comunicação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {campaign.channel.includes('mail') && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span>Email</span>
                </Badge>
              )}
              {campaign.channel.includes('whatsapp') && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>WhatsApp</span>
                </Badge>
              )}
              {campaign.channel.includes('sms') && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Send className="h-3 w-3" />
                  <span>SMS</span>
                </Badge>
              )}
              {campaign.channel.includes('voice') && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>Ligação de IA (Voz)</span>
                </Badge>
              )}
            </div>
            
            {campaign.channel.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Nenhum canal configurado
              </p>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Segmentação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Público-alvo</h4>
                <div className="flex flex-wrap gap-2">
                  {campaign.target?.audience ? (
                    <Badge variant="outline">{campaign.target.audience}</Badge>
                  ) : (
                    <p className="text-sm text-muted-foreground">Não definido</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Localização</h4>
                <div className="flex flex-wrap gap-2">
                  {campaign.target?.location ? (
                    <Badge variant="outline">{campaign.target.location}</Badge>
                  ) : (
                    <p className="text-sm text-muted-foreground">Não definido</p>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Cursos</h4>
                <div className="flex flex-wrap gap-2">
                  {campaign.target?.courses && campaign.target.courses.length > 0 ? (
                    campaign.target.courses.map((course, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10">
                        {course}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Não definido</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CampaignOverviewTab;
