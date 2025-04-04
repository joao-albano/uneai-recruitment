
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types/recruitment';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  Calendar,
  MessageSquare,
  Mail,
  Phone,
  Target,
  Users,
  Clock,
  CalendarCheck,
  CalendarClock,
} from 'lucide-react';

interface CampaignDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign: Campaign;
}

const CampaignDetailsDialog: React.FC<CampaignDetailsDialogProps> = ({
  open,
  onOpenChange,
  campaign
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {campaign.name}
            <Badge variant={campaign.status === 'active' ? 'default' : 'outline'}>
              {campaign.status === 'active' ? 'Ativa' : 'Pausada'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            {campaign.description || 'Detalhes da campanha de captação'}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="performance">Desempenho</TabsTrigger>
            <TabsTrigger value="configuration">Configuração</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
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
                        <Phone className="h-3 w-3" />
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
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="configuration" className="space-y-4">
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
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button>
            Editar Campanha
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDetailsDialog;
