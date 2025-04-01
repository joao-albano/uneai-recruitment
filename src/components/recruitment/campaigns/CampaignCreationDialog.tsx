
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon,
  Check,
  Mail, 
  MessageSquare, 
  Phone, 
  Facebook, 
  Instagram,
  Target,
  Users,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import { Campaign, ChannelType } from '@/types/recruitment';
import { toast } from '@/hooks/use-toast';

interface CampaignCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const channelOptions: { value: ChannelType; label: string; icon: React.ReactNode }[] = [
  { value: 'mail', label: 'Email', icon: <Mail className="h-4 w-4" /> },
  { value: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="h-4 w-4" /> },
  { value: 'sms', label: 'SMS', icon: <Phone className="h-4 w-4" /> },
  { value: 'facebook', label: 'Facebook', icon: <Facebook className="h-4 w-4" /> },
  { value: 'instagram', label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
];

const audienceOptions = [
  { id: 'ensino-medio', label: 'Ensino Médio' },
  { id: 'graduacao', label: 'Graduação' },
  { id: 'pos-graduacao', label: 'Pós-Graduação' },
  { id: 'leads-mornos', label: 'Leads Mornos (30+ dias)' },
  { id: 'leads-inativos', label: 'Leads Inativos (90+ dias)' },
];

const locationOptions = [
  { id: 'zona-norte', label: 'Zona Norte' },
  { id: 'zona-sul', label: 'Zona Sul' },
  { id: 'zona-leste', label: 'Zona Leste' },
  { id: 'zona-oeste', label: 'Zona Oeste' },
  { id: 'centro', label: 'Centro' },
  { id: 'regiao-metropolitana', label: 'Região Metropolitana' },
];

const CampaignCreationDialog: React.FC<CampaignCreationDialogProps> = ({ 
  open, 
  onOpenChange 
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const { createCampaign } = useCampaigns();
  
  const [campaignData, setCampaignData] = useState<Omit<Campaign, 'id'>>({
    name: '',
    description: '',
    startDate: new Date(),
    status: 'draft',
    channel: [],
    performance: {
      leadsGenerated: 0,
      conversion: 0,
      cost: 0,
    },
    target: {
      audience: '',
    }
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    channel: false,
  });
  
  const [useAiAssistance, setUseAiAssistance] = useState(false);
  
  const handleInputChange = (field: string, value: any) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for the field if it exists
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: false }));
    }
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleChannelToggle = (channel: ChannelType) => {
    const updatedChannels = campaignData.channel.includes(channel)
      ? campaignData.channel.filter(c => c !== channel)
      : [...campaignData.channel, channel];
    
    setCampaignData(prev => ({ 
      ...prev, 
      channel: updatedChannels 
    }));
    
    if (updatedChannels.length > 0 && formErrors.channel) {
      setFormErrors(prev => ({ ...prev, channel: false }));
    }
  };
  
  const handleAudienceSelect = (audienceId: string) => {
    const label = audienceOptions.find(option => option.id === audienceId)?.label || '';
    setCampaignData(prev => ({ 
      ...prev, 
      target: { 
        ...prev.target,
        audience: label
      } 
    }));
  };
  
  const handleLocationSelect = (locationId: string) => {
    const label = locationOptions.find(option => option.id === locationId)?.label || '';
    setCampaignData(prev => ({ 
      ...prev, 
      target: { 
        ...prev.target,
        location: label
      } 
    }));
  };
  
  const resetForm = () => {
    setCampaignData({
      name: '',
      description: '',
      startDate: new Date(),
      status: 'draft',
      channel: [],
      performance: {
        leadsGenerated: 0,
        conversion: 0,
        cost: 0,
      },
      target: {
        audience: '',
      }
    });
    setFormErrors({ name: false, channel: false });
    setActiveTab('basic');
    setUseAiAssistance(false);
  };
  
  const validateForm = (): boolean => {
    const errors = {
      name: !campaignData.name.trim(),
      channel: campaignData.channel.length === 0,
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };
  
  const handleSubmit = () => {
    if (!validateForm()) {
      setActiveTab(formErrors.name ? 'basic' : 'channels');
      return;
    }
    
    try {
      const newCampaign = createCampaign(campaignData);
      
      toast({
        title: 'Campanha criada com sucesso',
        description: `A campanha "${newCampaign.name}" foi criada e está como rascunho.`,
      });
      
      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Erro ao criar campanha',
        description: 'Houve um erro ao criar a campanha. Tente novamente.',
        variant: 'destructive',
      });
    }
  };
  
  const generateAiDescription = () => {
    // Simular a geração de descrição por IA
    setTimeout(() => {
      const audienceText = campaignData.target?.audience || 'público alvo específico';
      const aiGenerated = `Campanha estratégica para captação de leads de ${audienceText} com foco em conversão através de ${
        campaignData.channel.length > 0 
          ? campaignData.channel.map((c: string) => c.charAt(0).toUpperCase() + c.slice(1)).join(', ') 
          : 'múltiplos canais'
      }.`;
      
      setCampaignData(prev => ({
        ...prev,
        description: aiGenerated
      }));
      
      toast({
        title: 'Descrição gerada com sucesso',
        description: 'A IA gerou uma descrição baseada nos dados da campanha.',
      });
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Criar Nova Campanha</DialogTitle>
          <DialogDescription>
            Configure os detalhes da sua nova campanha de captação
          </DialogDescription>
        </DialogHeader>
        
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange} 
          className="w-full"
        >
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="basic">
              Informações Básicas
            </TabsTrigger>
            <TabsTrigger value="channels">
              Canais
            </TabsTrigger>
            <TabsTrigger value="targeting">
              Segmentação
            </TabsTrigger>
            <TabsTrigger value="content">
              Conteúdo
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className={formErrors.name ? 'text-destructive' : ''}>
                Nome da Campanha {formErrors.name && '*'}
              </Label>
              <Input 
                id="name"
                value={campaignData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Captação Vestibular 2024"
                className={formErrors.name ? 'border-destructive' : ''}
              />
              {formErrors.name && (
                <p className="text-xs text-destructive">
                  O nome da campanha é obrigatório
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Descrição</Label>
                <div className="flex items-center">
                  <Switch
                    id="ai-assistance"
                    checked={useAiAssistance}
                    onCheckedChange={setUseAiAssistance}
                    className="mr-2"
                  />
                  <Label htmlFor="ai-assistance" className="text-sm cursor-pointer flex items-center">
                    <Sparkles className="h-3.5 w-3.5 mr-1 text-amber-500" />
                    Assistência IA
                  </Label>
                </div>
              </div>
              <div className="relative">
                <Textarea 
                  id="description"
                  value={campaignData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Descreva o objetivo e detalhes da campanha"
                  rows={3}
                />
                {useAiAssistance && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="absolute bottom-2 right-2"
                    onClick={generateAiDescription}
                  >
                    <Sparkles className="h-3.5 w-3.5 mr-1 text-amber-500" />
                    Gerar descrição
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {campaignData.startDate ? (
                        format(campaignData.startDate, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={campaignData.startDate}
                      onSelect={(date) => handleInputChange('startDate', date || new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">Data de Término (opcional)</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {campaignData.endDate ? (
                        format(campaignData.endDate, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={campaignData.endDate}
                      onSelect={(date) => handleInputChange('endDate', date)}
                      fromDate={campaignData.startDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="channels" className="space-y-4">
            <div className="space-y-2">
              <Label className={formErrors.channel ? 'text-destructive' : ''}>
                Canais de Comunicação {formErrors.channel && '*'}
              </Label>
              {formErrors.channel && (
                <p className="text-xs text-destructive">
                  Selecione pelo menos um canal
                </p>
              )}
              <div className="grid grid-cols-2 gap-3">
                {channelOptions.map(({ value, label, icon }) => (
                  <div 
                    key={value} 
                    className={`
                      flex items-center p-3 border rounded-lg cursor-pointer transition-colors
                      ${campaignData.channel.includes(value) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-accent'}
                    `}
                    onClick={() => handleChannelToggle(value)}
                  >
                    <div className="mr-3">
                      {icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{label}</p>
                    </div>
                    <div className="flex items-center justify-center rounded-full w-5 h-5 border">
                      {campaignData.channel.includes(value) && (
                        <Check className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento (R$)</Label>
              <Input 
                id="budget"
                type="number"
                min="0"
                step="100"
                value={campaignData.budget || ''}
                onChange={(e) => handleInputChange('budget', Number(e.target.value))}
                placeholder="Ex: 5000"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="targeting" className="space-y-4">
            <div className="space-y-2">
              <Label>Público-alvo</Label>
              <div className="grid grid-cols-2 gap-2">
                {audienceOptions.map(option => (
                  <div 
                    key={option.id} 
                    className="flex items-center space-x-2"
                  >
                    <Checkbox 
                      id={`audience-${option.id}`} 
                      checked={campaignData.target?.audience === option.label}
                      onCheckedChange={() => handleAudienceSelect(option.id)}
                    />
                    <Label 
                      htmlFor={`audience-${option.id}`}
                      className="cursor-pointer text-sm"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Localização</Label>
              <div className="grid grid-cols-2 gap-2">
                {locationOptions.map(option => (
                  <div 
                    key={option.id} 
                    className="flex items-center space-x-2"
                  >
                    <Checkbox 
                      id={`location-${option.id}`} 
                      checked={campaignData.target?.location === option.label}
                      onCheckedChange={() => handleLocationSelect(option.id)}
                    />
                    <Label 
                      htmlFor={`location-${option.id}`}
                      className="cursor-pointer text-sm"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="border-dashed border-muted-foreground/20 bg-muted/50">
              <CardContent className="py-4 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Segmentação Inteligente</p>
                  <p className="text-muted-foreground">
                    Utilizar dados de comportamento para refinar o público-alvo.
                  </p>
                </div>
                <div className="ml-auto">
                  <Badge variant="outline" className="bg-muted">
                    Em breve
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <div>
              <p className="text-muted-foreground mb-6">
                O conteúdo da campanha será configurado após a criação da campanha.
              </p>
              <div className="grid gap-4">
                <Card className="border-dashed border-primary/30 bg-primary/5">
                  <CardContent className="py-4 flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Geração de Conteúdo por IA</p>
                      <p className="text-muted-foreground">
                        Sistema inteligente para criação de mensagens personalizadas
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Badge>Recomendado</Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-dashed border-muted-foreground/20">
                  <CardContent className="py-4 flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      <Users className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Segmentação Avançada</p>
                      <p className="text-muted-foreground">
                        Mensagens específicas para diferentes segmentos do público
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="rounded-md border p-4 bg-amber-50/50">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Dica de conteúdo</p>
                  <p className="text-amber-800/80">
                    As mensagens mais eficazes focam em benefícios tangíveis e incluem um chamado à ação claro.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="gap-2 sm:gap-0 mt-4">
          <div className="flex-1 flex items-center">
            {activeTab !== "basic" && (
              <Button 
                type="button" 
                variant="ghost"
                onClick={() => {
                  const tabs = ["basic", "channels", "targeting", "content"];
                  const currentIndex = tabs.indexOf(activeTab);
                  setActiveTab(tabs[currentIndex - 1]);
                }}
              >
                Voltar
              </Button>
            )}
          </div>
          
          <div className="space-x-2 flex">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              Cancelar
            </Button>
            
            {activeTab !== "content" ? (
              <Button 
                type="button" 
                onClick={() => {
                  const tabs = ["basic", "channels", "targeting", "content"];
                  const currentIndex = tabs.indexOf(activeTab);
                  setActiveTab(tabs[currentIndex + 1]);
                }}
              >
                Continuar
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit}>
                Criar Campanha
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignCreationDialog;
