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
  MessageCircle,
  SendHorizontal,
  Image,
  FileText,
  Link,
  Settings,
  PersonStanding,
  PlusCircle,
  RefreshCw,
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import { Campaign, ChannelType } from '@/types/recruitment';
import { toast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CampaignCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const channelOptions: { value: ChannelType; label: string; icon: React.ReactNode }[] = [
  { value: 'mail', label: 'Email', icon: <Mail className="h-4 w-4" /> },
  { value: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="h-4 w-4" /> },
  { value: 'sms', label: 'SMS', icon: <Phone className="h-4 w-4" /> },
  { value: 'voice', label: 'Ligação de IA (Voz)', icon: <Phone className="h-4 w-4" /> },
];

const audienceOptions = [
  { id: 'ensino-medio', label: 'Ensino Médio' },
  { id: 'graduacao', label: 'Graduação' },
  { id: 'pos-graduacao', label: 'Pós-Graduação' },
  { id: 'leads-mornos', label: 'Leads Mornos (30+ dias)' },
  { id: 'leads-inativos', label: 'Leads Inativos (90+ dias)' },
];

const courseOptions = [
  { id: 'administracao', label: 'Administração' },
  { id: 'direito', label: 'Direito' },
  { id: 'medicina', label: 'Medicina' },
  { id: 'engenharia-civil', label: 'Engenharia Civil' },
  { id: 'engenharia-computacao', label: 'Engenharia de Computação' },
  { id: 'psicologia', label: 'Psicologia' },
  { id: 'enfermagem', label: 'Enfermagem' },
  { id: 'ciencia-computacao', label: 'Ciência da Computação' },
];

const locationOptions = [
  { id: 'zona-norte', label: 'Zona Norte' },
  { id: 'zona-sul', label: 'Zona Sul' },
  { id: 'zona-leste', label: 'Zona Leste' },
  { id: 'zona-oeste', label: 'Zona Oeste' },
  { id: 'centro', label: 'Centro' },
  { id: 'regiao-metropolitana', label: 'Região Metropolitana' },
];

const contentTemplates = [
  { 
    id: 'welcome', 
    name: 'Boas-vindas', 
    content: 'Olá {nome}, tudo bem? Estamos muito felizes em receber seu interesse em nossos cursos. Podemos ajudar com mais informações?',
    emoji: '👋'
  },
  { 
    id: 'info', 
    name: 'Informações do Curso', 
    content: 'Olá {nome}, o curso de {curso} tem duração de {duracao} e mensalidades a partir de R$ {valor}. Posso enviar mais detalhes?',
    emoji: '📚'
  },
  { 
    id: 'discount', 
    name: 'Oferta Especial', 
    content: 'Olá {nome}, temos uma condição especial para o curso de {curso} com {desconto}% de desconto nas primeiras mensalidades!',
    emoji: '����'
  },
  { 
    id: 'reminder', 
    name: 'Lembrete de Prazo', 
    content: 'Olá {nome}, o prazo para inscrição no curso de {curso} está acabando! Não perca essa oportunidade.',
    emoji: '⏰'
  },
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
  
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const [contentStrategy, setContentStrategy] = useState<'ai' | 'manual' | 'templates'>('ai');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [customContent, setCustomContent] = useState<string>('');
  const [messagePreview, setMessagePreview] = useState<string>('');
  const [previewType, setPreviewType] = useState<ChannelType>('whatsapp');
  
  const [templateVariables, setTemplateVariables] = useState<{[key: string]: string}>({
    nome: 'Maria',
    curso: 'Administração',
    duracao: '4 anos',
    valor: '499,90',
    desconto: '30'
  });
  
  const [newVariableKey, setNewVariableKey] = useState('');
  const [newVariableValue, setNewVariableValue] = useState('');
  const [showVariableForm, setShowVariableForm] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
    
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
  
  const handleCourseSelect = (courseId: string) => {
    const isSelected = selectedCourses.includes(courseId);
    const updatedCourses = isSelected 
      ? selectedCourses.filter(id => id !== courseId)
      : [...selectedCourses, courseId];
    
    setSelectedCourses(updatedCourses);
    
    const courseLabels = updatedCourses.map(
      id => courseOptions.find(option => option.id === id)?.label || ''
    ).filter(Boolean);
    
    setCampaignData(prev => ({
      ...prev,
      target: {
        ...prev.target,
        courses: courseLabels
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
      const campaignToCreate = {
        ...campaignData,
        performance: campaignData.performance || {
          leadsGenerated: 0,
          conversion: 0,
          cost: 0,
        }
      };
      
      const newCampaign = createCampaign(campaignToCreate);
      
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
  
  const handleContentStrategyChange = (strategy: 'ai' | 'manual' | 'templates') => {
    setContentStrategy(strategy);
    
    if (strategy === 'templates' && selectedTemplate) {
      const template = contentTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        setCustomContent(template.content);
        generateMessagePreview(template.content);
      }
    } else if (strategy === 'ai') {
      setCustomContent('');
      setMessagePreview('');
    }
  };
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = contentTemplates.find(t => t.id === templateId);
    if (template) {
      setCustomContent(template.content);
      generateMessagePreview(template.content);
    }
  };
  
  const generateMessagePreview = (content: string) => {
    let preview = content;
    
    Object.entries(templateVariables).forEach(([key, value]) => {
      const regex = new RegExp(`{${key}}`, 'g');
      preview = preview.replace(regex, value);
    });
    
    preview = preview.replace(/@{nome}/g, templateVariables.nome || 'Maria');
    
    setMessagePreview(preview);
  };
  
  const handleContentChange = (content: string) => {
    setCustomContent(content);
    generateMessagePreview(content);
  };
  
  const handleVariableChange = (key: string, value: string) => {
    setTemplateVariables(prev => ({
      ...prev,
      [key]: value
    }));
    
    generateMessagePreview(customContent);
  };
  
  const handleAddVariable = () => {
    if (!newVariableKey.trim()) {
      toast({
        title: "Nome da variável obrigatório",
        description: "Por favor, informe um nome para a variável.",
        variant: "destructive"
      });
      return;
    }
    
    const normalizedKey = newVariableKey.trim().replace(/\s+/g, '_');
    
    setTemplateVariables(prev => ({
      ...prev,
      [normalizedKey]: newVariableValue
    }));
    
    setNewVariableKey('');
    setNewVariableValue('');
    setShowVariableForm(false);
    
    toast({
      title: "Variável adicionada",
      description: `A variável {${normalizedKey}} foi adicionada.`
    });
    
    setCampaignData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        variables: [
          ...(prev.content?.variables || []),
          normalizedKey
        ]
      }
    }));
  };
  
  const generateAiContent = () => {
    setTimeout(() => {
      const audienceText = campaignData.target?.audience || 'estudantes em potencial';
      const coursesText = campaignData.target?.courses?.join(', ') || 'nossos cursos';
      const locationText = campaignData.target?.location || '';
      
      let aiGenerated = `Olá {nome}, tudo bem?\n\n`;
      
      if (campaignData.channel.includes('whatsapp')) {
        aiGenerated += `Sou consultor educacional da ${campaignData.name.split(' ')[0] || 'Instituição'} e estamos com uma campanha especial para ${audienceText} interessados em ${coursesText}.`;
      } else {
        aiGenerated += `Estamos com vagas abertas para ${coursesText} e gostaríamos de apresentar nossas opções e benefícios para você.`;
      }
      
      if (locationText) {
        aiGenerated += `\n\nEstamos localizados na região ${locationText}, com fácil acesso e infraestrutura completa.`;
      }
      
      aiGenerated += `\n\nGostaria de receber mais informações? Estou à disposição para ajudar.`;
      
      setCustomContent(aiGenerated);
      generateMessagePreview(aiGenerated);
      
      setCampaignData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          template: aiGenerated
        }
      }));
      
      toast({
        title: 'Conteúdo gerado com sucesso',
        description: 'A IA gerou uma mensagem personalizada baseada nos dados da campanha.',
      });
    }, 1500);
  };
  
  const handleEditorToolClick = (toolType: 'image' | 'link' | 'mention') => {
    let textToInsert = '';
    
    switch (toolType) {
      case 'image':
        textToInsert = ' [IMAGEM: descrição da imagem] ';
        toast({
          title: 'Imagem adicionada',
          description: 'Substitua "descrição da imagem" com uma descrição adequada.',
        });
        break;
      case 'link':
        textToInsert = ' [LINK: https://exemplo.com.br] ';
        toast({
          title: 'Link adicionado',
          description: 'Substitua "https://exemplo.com.br" com a URL desejada.',
        });
        break;
      case 'mention':
        textToInsert = ' @{nome} ';
        toast({
          title: 'Menção adicionada',
          description: 'A variável @{nome} será substituída pelo nome do destinatário.',
        });
        break;
    }
    
    handleContentChange(customContent + textToInsert);
  };
  
  React.useEffect(() => {
    setCampaignData(prev => ({
      ...prev,
      content: {
        strategy: 'ai',
        template: '',
        variables: ['nome', 'curso', 'duracao', 'valor', 'desconto']
      }
    }));
  }, []);
  
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
              <Label>Cursos (Estratégia de Campanha)</Label>
              <div className="grid grid-cols-2 gap-2">
                {courseOptions.map(option => (
                  <div 
                    key={option.id} 
                    className="flex items-center space-x-2"
                  >
                    <Checkbox 
                      id={`course-${option.id}`} 
                      checked={selectedCourses.includes(option.id)}
                      onCheckedChange={() => handleCourseSelect(option.id)}
                    />
                    <Label 
                      htmlFor={`course-${option.id}`}
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
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <div className="space-y-4">
              <Label>Estratégia de Conteúdo</Label>
              <RadioGroup 
                value={contentStrategy} 
                onValueChange={handleContentStrategyChange}
                className="grid grid-cols-3 gap-4"
              >
                <label 
                  className={`flex flex-col items-center gap-2 border rounded-lg p-4 cursor-pointer transition-all ${contentStrategy === 'ai' ? 'border-primary bg-primary/5' : 'border-border'}`}
                  htmlFor="radio-ai"
                >
                  <RadioGroupItem value="ai" id="radio-ai" />
                  <Sparkles className="h-8 w-8 text-amber-500" />
                  <span className="font-medium">IA Generativa</span>
                  <p className="text-xs text-center text-muted-foreground">Geração automatizada de mensagens personalizadas</p>
                </label>
                
                <label 
                  className={`flex flex-col items-center gap-2 border rounded-lg p-4 cursor-pointer transition-all ${contentStrategy === 'templates' ? 'border-primary bg-primary/5' : 'border-border'}`}
                  htmlFor="radio-templates"
                >
                  <RadioGroupItem value="templates" id="radio-templates" />
                  <FileText className="h-8 w-8 text-blue-500" />
                  <span className="font-medium">Templates</span>
                  <p className="text-xs text-center text-muted-foreground">Modelos pré-definidos adaptáveis</p>
                </label>
                
                <label 
                  className={`flex flex-col items-center gap-2 border rounded-lg p-4 cursor-pointer transition-all ${contentStrategy === 'manual' ? 'border-primary bg-primary/5' : 'border-border'}`}
                  htmlFor="radio-manual"
                >
                  <RadioGroupItem value="manual" id="radio-manual" />
                  <FileText className="h-8 w-8 text-green-500" />
                  <span className="font-medium">Manual</span>
                  <p className="text-xs text-center text-muted-foreground">Criação personalizada de mensagens</p>
                </label>
              </RadioGroup>
              
              {(contentStrategy === 'ai' || contentStrategy === 'templates') && (
                <Card className="border-dashed border-muted-foreground/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Variáveis da Mensagem</CardTitle>
                    <CardDescription>
                      Configure os valores que serão usados para substituir as variáveis no conteúdo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {!showVariableForm ? (
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(templateVariables).map(([key, value]) => (
                            <div key={key} className="space-y-1">
                              <Label htmlFor={`var-${key}`} className="text-xs font-medium">
                                {`{${key}}`}
                              </Label>
                              <Input 
                                id={`var-${key}`}
                                value={value}
                                onChange={(e) => handleVariableChange(key, e.target.value)}
                                className="h-8"
                                placeholder={`Valor para ${key}`}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Label htmlFor="new-var-key">Nome da Variável</Label>
                            <Input 
                              id="new-var-key"
                              value={newVariableKey}
                              onChange={(e) => setNewVariableKey(e.target.value)}
                              placeholder="Ex: telefone, idade, etc."
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="new-var-value">Valor Padrão</Label>
                            <Input 
                              id="new-var-value"
                              value={newVariableValue}
                              onChange={(e) => setNewVariableValue(e.target.value)}
                              placeholder="Valor padrão para a variável"
                            />
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setShowVariableForm(false)}
                              size="sm"
                            >
                              Cancelar
                            </Button>
                            <Button 
                              type="button" 
                              onClick={handleAddVariable}
                              size="sm"
                            >
                              Adicionar
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {!showVariableForm && (
                        <div className="flex justify-between items-center">
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => setShowVariableForm(true)}
                          >
                            <PlusCircle className="h-3.5 w-3.5" />
                            Nova Variável
                          </Button>
                          
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            className="flex items-center gap-1 text-muted-foreground"
                            onClick={() => generateMessagePreview(customContent)}
                          >
                            <RefreshCw className="h-3.5 w-3.5" />
                            Atualizar Preview
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {contentStrategy === 'ai' && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      Geração de Conteúdo por IA
                    </CardTitle>
                    <CardDescription>
                      Nossa IA analisará seu público-alvo e criará mensagens personalizadas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <Label>Personalização da IA</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="friendly" defaultChecked />
                            <Label htmlFor="friendly" className="text-sm">Tom amigável</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="formal" />
                            <Label htmlFor="formal" className="text-sm">Tom formal</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="emojis" defaultChecked />
                            <Label htmlFor="emojis" className="text-sm">Usar emojis</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="benefits" defaultChecked />
                            <Label htmlFor="benefits" className="text-sm">Destacar benefícios</Label>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        type="button" 
                        onClick={generateAiContent}
                        className="w-full"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Gerar conteúdo com IA
                      </Button>
                      
                      {customContent && (
                        <div className="space-y-2">
                          <Label>Conteúdo gerado (editável)</Label>
                          <Textarea 
                            rows={5}
                            value={customContent}
                            onChange={(e) => handleContentChange(e.target.value)}
                            className="font-mono text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {contentStrategy === 'templates' && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      Templates de Mensagens
                    </CardTitle>
                    <CardDescription>
                      Escolha um modelo pré-definido e personalize conforme necessário
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Select 
                        value={selectedTemplate} 
                        onValueChange={handleTemplateSelect}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um template" />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTemplates.map(template => (
                            <SelectItem key={template.id} value={template.id}>
                              <div className="flex items-center">
                                <span className="mr-2">{template.emoji}</span>
                                {template.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      {selectedTemplate && (
                        <div className="space-y-2">
                          <Label>Conteúdo do template (editável)</Label>
                          <Textarea 
                            rows={5}
                            value={customContent}
                            onChange={(e) => handleContentChange(e.target.value)}
                            className="font-mono text-sm"
                          />
                          <p className="text-xs text-muted-foreground">
                            Use variáveis como {'{nome}'} que serão substituídas automaticamente pelos valores configurados.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {contentStrategy === 'manual' && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-500" />
                      Criação Manual
                    </CardTitle>
                    <CardDescription>
                      Crie sua própria mensagem personalizada do zero
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Conteúdo da mensagem</Label>
                        <Textarea 
                          rows={5}
                          placeholder="Digite a mensagem da sua campanha aqui..."
                          value={customContent}
                          onChange={(e) => handleContentChange(e.target.value)}
                          className="font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground">
                          Dica: Use {'{nome}'} para personalizar a mensagem com o nome do destinatário.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm mb-2 block">Ferramentas de edição</Label>
                          <div className="flex gap-1">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              type="button" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditorToolClick('image')}
                              title="Adicionar imagem"
                            >
                              <Image className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              type="button" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditorToolClick('link')}
                              title="Adicionar link"
                            >
                              <Link className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              type="button" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditorToolClick('mention')}
                              title="Adicionar menção"
                            >
                              <PersonStanding className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <Label className="text-sm mb-2 block">Variáveis</Label>
                          <div className="flex flex-wrap gap-1">
                            {Object.keys(templateVariables).map(key => (
                              <Badge 
                                key={key}
                                variant="outline" 
                                className="cursor-pointer" 
                                onClick={() => handleContentChange(customContent + ` {${key}}`)}
                              >
                                {`{${key}}`}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {messagePreview && (
                <Card className="border-dashed">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Pré-visualização da Mensagem
                    </CardTitle>
                    <div className="flex justify-between items-center">
                      <CardDescription>
                        Visualize como sua mensagem aparecerá para o destinatário
                      </CardDescription>
                      
                      <Select 
                        value={previewType} 
                        onValueChange={(value: ChannelType) => setPreviewType(value)}
                      >
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="mail">Email</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className={`rounded-lg p-4 ${
                      previewType === 'whatsapp' 
                        ? 'bg-green-50 border border-green-200' 
                        : previewType === 'mail' 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        {previewType === 'whatsapp' && (
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {previewType === 'mail' && (
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <Mail className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {previewType === 'sms' && (
                          <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <div className="text-sm font-medium mb-1">
                            {previewType === 'whatsapp' && 'WhatsApp Message'}
                            {previewType === 'mail' && 'Contato Campus Virtual'}
                            {previewType === 'sms' && 'SMS Campus Virtual'}
                          </div>
                          <div className="whitespace-pre-line text-sm">
                            {messagePreview}
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {new Date().toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
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
