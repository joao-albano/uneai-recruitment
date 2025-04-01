
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  MessageSquare, 
  Mail, 
  Phone, 
  BarChart2, 
  Calendar, 
  MoreVertical, 
  PauseCircle, 
  Play, 
  Archive, 
  Edit 
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';

const CampaignsList: React.FC = () => {
  const { campaigns } = useCampaigns();
  
  if (campaigns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Campanhas Ativas</CardTitle>
          <CardDescription>
            Visualize e gerencie suas campanhas de captação em andamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border p-4 text-center">
            <p className="text-muted-foreground">
              Você ainda não tem campanhas ativas. Crie uma nova campanha para começar.
            </p>
            <Button variant="outline" className="mt-4">
              Criar Campanha
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {campaigns.map(campaign => (
        <Card key={campaign.id} className="overflow-hidden">
          <div className="flex border-b">
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-medium">{campaign.name}</h3>
                  <Badge variant={campaign.status === 'active' ? 'default' : 'outline'}>
                    {campaign.status === 'active' ? 'Ativa' : 'Pausada'}
                  </Badge>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      {campaign.status === 'active' ? (
                        <>
                          <PauseCircle className="mr-2 h-4 w-4" />
                          <span>Pausar</span>
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          <span>Ativar</span>
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      <span>Arquivar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                    {campaign.channel.includes('facebook') && <Badge variant="outline">FB</Badge>}
                    {campaign.channel.includes('instagram') && <Badge variant="outline">IG</Badge>}
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
                  {campaign.target?.location && <Badge variant="outline">{campaign.target.location}</Badge>}
                </div>
              </div>
              
              <div className="mt-auto pt-4">
                <Button variant="secondary" className="w-full" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CampaignsList;
