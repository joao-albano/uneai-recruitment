
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Check, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  BarChart2, 
  Target, 
  CalendarRange, 
  AlertCircle,
  Zap,
  CheckCircle,
  Search
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';

interface CampaignCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CampaignCreationDialog: React.FC<CampaignCreationDialogProps> = ({ open, onOpenChange }) => {
  const [currentTab, setCurrentTab] = useState('basic');
  const [generateAI, setGenerateAI] = useState(true);
  const { createCampaign } = useCampaigns();
  
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    status: 'draft' as 'draft' | 'active' | 'paused' | 'completed',
    budget: 0,
    channel: ['mail', 'whatsapp'] as string[],
    target: {
      audience: '',
      location: ''
    },
    message: {
      subject: '',
      content: '',
      emotionalTone: 'neutral' as 'neutral' | 'urgent' | 'friendly' | 'formal',
      callToAction: 'Agendar Visita'
    },
    isAutomated: false,
    triggers: {
      onInactivity: false,
      inactivityDays: 7
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCampaignData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setCampaignData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleChannelToggle = (channel: string) => {
    setCampaignData(prev => {
      const channels = prev.channel.includes(channel) 
        ? prev.channel.filter(c => c !== channel)
        : [...prev.channel, channel];
      
      return {
        ...prev,
        channel: channels
      };
    });
  };
  
  const generateMessageWithAI = () => {
    // Simulação de geração de mensagem com IA
    const aiMessages = [
      "Oi {{nome}}! Estamos oferecendo condições especiais para o curso de {{curso}} na nossa instituição. Aproveite a oportunidade de transformar seu futuro com uma educação de qualidade. Agende uma visita ao nosso campus!",
      "Olá {{nome}}, tudo bem? Vi que você tem interesse em {{curso}}. Nossa instituição está com matrículas abertas e oferecendo desconto especial para novos alunos. Gostaria de conhecer mais sobre nossos diferenciais?",
      "{{nome}}, percebemos seu interesse em {{curso}}. Que tal conversarmos sobre como nosso programa pode atender suas expectativas de carreira? Estamos à disposição para esclarecer suas dúvidas!"
    ];
    
    const randomMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)];
    
    setCampaignData(prev => ({
      ...prev,
      message: {
        ...prev.message,
        subject: `Oportunidade especial para ${campaignData.target.audience || 'você'}!`,
        content: randomMessage
      }
    }));
    
    toast({
      title: "Mensagem gerada com IA",
      description: "A IA criou uma mensagem baseada no público-alvo e tom emocional selecionados.",
    });
  };
  
  const handleSubmit = () => {
    // Validação básica
    if (!campaignData.name.trim()) {
      toast({
        title: "Erro de validação",
        description: "Por favor, informe o nome da campanha.",
        variant: "destructive"
      });
      return;
    }
    
    // Criar campanha
    createCampaign({
      name: campaignData.name,
      description: campaignData.description,
      startDate: new Date(campaignData.startDate),
      endDate: campaignData.endDate ? new Date(campaignData.endDate) : undefined,
      status: campaignData.isAutomated ? 'active' : 'draft',
      budget: campaignData.budget,
      channel: campaignData.channel as any,
      target: campaignData.target,
      isAutomated: campaignData.isAutomated
    });
    
    toast({
      title: "Campanha criada com sucesso!",
      description: `A campanha "${campaignData.name}" foi ${campaignData.isAutomated ? 'ativada' : 'salva como rascunho'}.`
    });
    
    onOpenChange(false);
    
    // Reset form
    setCampaignData({
      name: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      status: 'draft',
      budget: 0,
      channel: ['mail', 'whatsapp'],
      target: {
        audience: '',
        location: ''
      },
      message: {
        subject: '',
        content: '',
        emotionalTone: 'neutral',
        callToAction: 'Agendar Visita'
      },
      isAutomated: false,
      triggers: {
        onInactivity: false,
        inactivityDays: 7
      }
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Criar Nova Campanha</DialogTitle>
          <DialogDescription>
            Configure todos os detalhes da sua campanha para alcançar os melhores resultados
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                <span>Informações Básicas</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="target">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                <span>Público-alvo</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="message">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Mensagem</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="automation">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Automação</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome da Campanha</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Ex: Campanha de Matrículas 2024.2" 
                  value={campaignData.name}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Descreva o objetivo e abordagem da campanha" 
                  rows={3}
                  value={campaignData.description}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input 
                    id="startDate"
                    name="startDate"
                    type="date" 
                    value={campaignData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">Data de Término (Opcional)</Label>
                  <Input 
                    id="endDate"
                    name="endDate"
                    type="date" 
                    value={campaignData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="budget">Orçamento (R$)</Label>
                  <Input 
                    id="budget"
                    name="budget"
                    type="number" 
                    placeholder="0.00" 
                    value={campaignData.budget || ''}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Canais de comunicação</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                    { id: 'mail', label: 'E-mail', icon: Mail },
                    { id: 'sms', label: 'SMS', icon: Smartphone },
                    { id: 'facebook', label: 'Facebook', icon: () => <Badge>FB</Badge> },
                    { id: 'instagram', label: 'Instagram', icon: () => <Badge>IG</Badge> }
                  ].map(channel => (
                    <Button
                      key={channel.id}
                      type="button"
                      size="sm"
                      variant={campaignData.channel.includes(channel.id) ? "default" : "outline"}
                      className="gap-1"
                      onClick={() => handleChannelToggle(channel.id)}
                    >
                      <channel.icon className={typeof channel.icon === 'function' ? '' : "h-4 w-4"} />
                      <span>{channel.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setCurrentTab('target')}>
                Próximo: Público-alvo
                <Check className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="target" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="targetAudience">Público-alvo</Label>
                <Input 
                  id="targetAudience"
                  name="target.audience"
                  placeholder="Ex: Alunos do Ensino Médio, Profissionais de TI" 
                  value={campaignData.target.audience}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="targetLocation">Localização</Label>
                <Input 
                  id="targetLocation"
                  name="target.location"
                  placeholder="Ex: Zona Sul, Região Central" 
                  value={campaignData.target.location}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Segmentação avançada</Label>
                <div className="border rounded-lg p-4 bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-3">
                    Crie regras mais específicas para segmentar seu público-alvo.
                  </p>
                  
                  <Button variant="outline" size="sm" className="gap-2">
                    <Search className="h-3.5 w-3.5" />
                    <span>Segmentação Avançada</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentTab('basic')}>
                Voltar
              </Button>
              <Button onClick={() => setCurrentTab('message')}>
                Próximo: Mensagem
                <Check className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="message" className="space-y-4">
            <div className="grid gap-4">
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Geração de mensagem com IA</h3>
                  </div>
                  <Switch 
                    checked={generateAI} 
                    onCheckedChange={setGenerateAI} 
                  />
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  Permita que nossa IA gere mensagens personalizadas com base no seu público-alvo e tom emocional.
                </p>
                
                {generateAI && (
                  <div className="mt-4 grid gap-2">
                    <Label htmlFor="emotionalTone">Tom da Mensagem</Label>
                    <select 
                      id="emotionalTone"
                      name="message.emotionalTone"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={campaignData.message.emotionalTone}
                      onChange={handleInputChange}
                    >
                      <option value="neutral">Neutro</option>
                      <option value="urgent">Urgente/Senso de urgência</option>
                      <option value="friendly">Amigável/Casual</option>
                      <option value="formal">Formal/Profissional</option>
                    </select>
                  </div>
                )}
                
                {generateAI && (
                  <Button 
                    variant="secondary" 
                    className="mt-4 w-full gap-2"
                    onClick={generateMessageWithAI}
                  >
                    <Zap className="h-4 w-4" />
                    <span>Gerar Mensagem com IA</span>
                  </Button>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="subject">Assunto (para e-mail)</Label>
                <Input 
                  id="subject"
                  name="message.subject"
                  placeholder="Ex: Garanta seu futuro com nossos cursos!" 
                  value={campaignData.message.subject}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="content">Conteúdo da Mensagem</Label>
                <Textarea 
                  id="content"
                  name="message.content"
                  placeholder="Digite o conteúdo da mensagem ou utilize a geração por IA" 
                  rows={6}
                  value={campaignData.message.content}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Variáveis disponíveis: {{'{{'}}nome{{'}}'}}, {{'{{'}}curso{{'}}'}}, {{'{{'}}instituicao{{'}}'}}, {{'{{'}}prazo{{'}}'}}
                </p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="callToAction">Chamada para Ação</Label>
                <Input 
                  id="callToAction"
                  name="message.callToAction"
                  placeholder="Ex: Agendar Visita, Fazer Inscrição" 
                  value={campaignData.message.callToAction}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentTab('target')}>
                Voltar
              </Button>
              <Button onClick={() => setCurrentTab('automation')}>
                Próximo: Automação
                <Check className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="automation" className="space-y-4">
            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">Ativação Automática</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Configure gatilhos automáticos para envio da campanha
                    </p>
                  </div>
                  <Switch 
                    checked={campaignData.isAutomated} 
                    onCheckedChange={(checked) => setCampaignData(prev => ({ ...prev, isAutomated: checked }))} 
                  />
                </div>
                
                {campaignData.isAutomated && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="onInactivity"
                        checked={campaignData.triggers.onInactivity} 
                        onCheckedChange={(checked) => setCampaignData(prev => ({ 
                          ...prev, 
                          triggers: { ...prev.triggers, onInactivity: checked } 
                        }))} 
                      />
                      <Label htmlFor="onInactivity">Inatividade do Lead</Label>
                    </div>
                    
                    {campaignData.triggers.onInactivity && (
                      <div className="pl-8 grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="inactivityDays">Dias sem interação</Label>
                          <Input 
                            id="inactivityDays"
                            type="number" 
                            min="1" 
                            value={campaignData.triggers.inactivityDays} 
                            onChange={(e) => setCampaignData(prev => ({ 
                              ...prev, 
                              triggers: { ...prev.triggers, inactivityDays: parseInt(e.target.value) || 0 } 
                            }))} 
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-medium">Resumo da Campanha</h3>
                
                <div className="mt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Nome:</p>
                      <p className="font-medium">{campaignData.name || 'Não definido'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Período:</p>
                      <p className="font-medium">
                        {campaignData.startDate ? new Date(campaignData.startDate).toLocaleDateString('pt-BR') : 'Não definido'}
                        {campaignData.endDate && ` até ${new Date(campaignData.endDate).toLocaleDateString('pt-BR')}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Público-alvo:</p>
                      <p className="font-medium">{campaignData.target.audience || 'Geral'}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Canais:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {campaignData.channel.map(channel => (
                          <Badge key={channel} variant="outline" className="text-xs">
                            {channel}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Automação:</p>
                      <div className="flex items-center gap-1 mt-1">
                        {campaignData.isAutomated ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-green-600">Ativada</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span className="text-amber-600">Desativada</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tom emocional:</p>
                      <p className="font-medium capitalize">
                        {campaignData.message.emotionalTone === 'urgent' && 'Urgente'}
                        {campaignData.message.emotionalTone === 'friendly' && 'Amigável'}
                        {campaignData.message.emotionalTone === 'formal' && 'Formal'}
                        {campaignData.message.emotionalTone === 'neutral' && 'Neutro'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentTab('message')}>
                Voltar
              </Button>
              <Button onClick={handleSubmit}>
                {campaignData.isAutomated ? 'Ativar Campanha' : 'Criar Rascunho'}
                <Check className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignCreationDialog;
