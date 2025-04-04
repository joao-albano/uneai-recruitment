
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, MessageSquare, Mail, Clock, AlertCircle, CheckCircle, Edit2, PlusIcon, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ReengagementRule } from '@/types/recruitment';
import { v4 as uuidv4 } from 'uuid';
import { useVoiceCallConfig } from '@/hooks/useVoiceCallConfig';

const DEFAULT_RULES: ReengagementRule[] = [
  {
    id: '1',
    days: 3,
    enabled: true,
    channels: ['email', 'whatsapp'],
    message: 'Olá {{nome}}, notamos que você demonstrou interesse em {{curso}}. Podemos ajudar com alguma informação adicional?',
    emotionalTone: 'friendly',
    lastTriggered: new Date(Date.now() - 86400000), // ontem
    status: 'active'
  },
  {
    id: '2',
    days: 7,
    enabled: true,
    channels: ['whatsapp'],
    message: 'Olá {{nome}}! O prazo para inscrições no {{curso}} está se aproximando. Não perca essa oportunidade de transformar seu futuro!',
    emotionalTone: 'urgent',
    status: 'active'
  },
  {
    id: '3',
    days: 15,
    enabled: true,
    channels: ['email', 'whatsapp'],
    message: 'Prezado(a) {{nome}}, ainda estamos disponíveis para esclarecer suas dúvidas sobre o {{curso}}. Que tal marcarmos uma visita ao campus?',
    emotionalTone: 'formal',
    lastTriggered: new Date(Date.now() - 345600000), // 4 dias atrás
    status: 'active'
  }
];

const AutomatedReengagement: React.FC = () => {
  const [rules, setRules] = useState<ReengagementRule[]>(DEFAULT_RULES);
  const [editingRule, setEditingRule] = useState<ReengagementRule | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { config: voiceCallConfig } = useVoiceCallConfig();
  
  const handleToggleRule = (id: string) => {
    setRules(prev => prev.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
    
    const rule = rules.find(r => r.id === id);
    if (rule) {
      toast({
        title: rule.enabled ? 'Regra desativada' : 'Regra ativada',
        description: `Reengajamento automático de ${rule.days} dias foi ${rule.enabled ? 'desativado' : 'ativado'}.`,
      });
    }
  };
  
  const handleEditRule = (id: string) => {
    const rule = rules.find(r => r.id === id);
    if (rule) {
      setEditingRule({ ...rule });
      setIsCreating(false);
    }
  };
  
  const handleSaveRule = () => {
    if (editingRule) {
      if (isCreating) {
        // Add new rule
        setRules(prev => [...prev, editingRule]);
        toast({
          title: 'Regra criada',
          description: `Nova regra de reengajamento de ${editingRule.days} dias foi criada.`,
        });
      } else {
        // Update existing rule
        setRules(prev => prev.map(rule => 
          rule.id === editingRule.id ? editingRule : rule
        ));
        toast({
          title: 'Regra atualizada',
          description: `As alterações na regra de ${editingRule.days} dias foram salvas.`,
        });
      }
      setEditingRule(null);
      setIsCreating(false);
    }
  };
  
  const handleCreateNewRule = () => {
    // Initialize a new rule with default values
    setEditingRule({
      id: uuidv4(),
      days: 10,
      enabled: true,
      channels: ['email'],
      message: 'Olá {{nome}}, gostaríamos de falar sobre sua inscrição para o curso de {{curso}}.',
      emotionalTone: 'friendly',
      status: 'active'
    });
    setIsCreating(true);
  };
  
  const handleCancelEdit = () => {
    setEditingRule(null);
    setIsCreating(false);
  };
  
  const getToneColor = (tone: string): string => {
    switch (tone) {
      case 'urgent': return 'text-red-500';
      case 'friendly': return 'text-green-500';
      case 'formal': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };
  
  const getToneBadge = (tone: string) => {
    switch (tone) {
      case 'urgent':
        return <Badge variant="destructive">Urgente</Badge>;
      case 'friendly':
        return <Badge variant="secondary" className="bg-green-500 text-white">Amigável</Badge>;
      case 'formal':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Formal</Badge>;
      default:
        return <Badge variant="secondary">Neutro</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" /> Reengajamento Automático
              </CardTitle>
              <CardDescription>
                Configure mensagens automáticas para leads inativos baseado em períodos de tempo
              </CardDescription>
            </div>
            <Switch 
              checked={rules.some(r => r.enabled)}
              onCheckedChange={() => {
                const allEnabled = rules.every(r => r.enabled);
                setRules(prev => prev.map(rule => ({ ...rule, enabled: !allEnabled })));
                
                toast({
                  title: allEnabled ? 'Sistema desativado' : 'Sistema ativado',
                  description: `Todas as regras de reengajamento foram ${allEnabled ? 'desativadas' : 'ativadas'}.`,
                });
              }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {rules.map((rule) => (
            <Card key={rule.id} className={`border ${!rule.enabled ? 'bg-muted/50' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base">
                      {rule.days} {rule.days === 1 ? 'dia' : 'dias'} de inatividade
                    </CardTitle>
                    {getToneBadge(rule.emotionalTone)}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Switch 
                        checked={rule.enabled}
                        onCheckedChange={() => handleToggleRule(rule.id)}
                        aria-label={`Ativar regra de ${rule.days} dias`}
                      />
                      <span className="text-sm text-muted-foreground">
                        {rule.enabled ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEditRule(rule.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-sm space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <div className="flex items-center">
                      {rule.channels.includes('whatsapp') && <MessageSquare className="h-3.5 w-3.5 mr-1" />}
                      {rule.channels.includes('email') && <Mail className="h-3.5 w-3.5 mr-1" />}
                      {rule.channels.includes('voice') && <Phone className="h-3.5 w-3.5 mr-1" />}
                      <span>{rule.channels.map(c => {
                        if (c === 'voice') return 'Ligação de Voz';
                        return c.charAt(0).toUpperCase() + c.slice(1);
                      }).join(', ')}</span>
                    </div>
                    {rule.lastTriggered && (
                      <div className="flex items-center gap-1">
                        <span>•</span>
                        <span>Última execução: {new Date(rule.lastTriggered).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                  <p className={`p-3 bg-muted rounded-md ${getToneColor(rule.emotionalTone)}`}>
                    {rule.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
        
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={handleCreateNewRule}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Adicionar Nova Regra de Reengajamento
          </Button>
        </CardFooter>
      </Card>
      
      {editingRule && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? 'Nova Regra de Reengajamento' : 'Editar Regra de Reengajamento'}</CardTitle>
            <CardDescription>
              Personalize a mensagem e configurações de reengajamento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="days">Dias de inatividade</Label>
                <Input 
                  id="days" 
                  type="number" 
                  min="1" 
                  value={editingRule.days} 
                  onChange={(e) => setEditingRule({...editingRule, days: parseInt(e.target.value)})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Tom emocional</Label>
                <select 
                  id="tone"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  value={editingRule.emotionalTone}
                  onChange={(e) => setEditingRule({
                    ...editingRule, 
                    emotionalTone: e.target.value as 'neutral' | 'urgent' | 'friendly' | 'formal'
                  })}
                >
                  <option value="neutral">Neutro</option>
                  <option value="urgent">Urgente</option>
                  <option value="friendly">Amigável</option>
                  <option value="formal">Formal</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Canais</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={editingRule.channels.includes('email')} 
                    onCheckedChange={() => {
                      const newChannels = editingRule.channels.includes('email')
                        ? editingRule.channels.filter(c => c !== 'email')
                        : [...editingRule.channels, 'email'];
                      setEditingRule({...editingRule, channels: newChannels});
                    }}
                    id="channel-email"
                  />
                  <Label htmlFor="channel-email" className="cursor-pointer flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={editingRule.channels.includes('whatsapp')} 
                    onCheckedChange={() => {
                      const newChannels = editingRule.channels.includes('whatsapp')
                        ? editingRule.channels.filter(c => c !== 'whatsapp')
                        : [...editingRule.channels, 'whatsapp'];
                      setEditingRule({...editingRule, channels: newChannels});
                    }}
                    id="channel-whatsapp"
                  />
                  <Label htmlFor="channel-whatsapp" className="cursor-pointer flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={editingRule.channels.includes('sms')} 
                    onCheckedChange={() => {
                      const newChannels = editingRule.channels.includes('sms')
                        ? editingRule.channels.filter(c => c !== 'sms')
                        : [...editingRule.channels, 'sms'];
                      setEditingRule({...editingRule, channels: newChannels});
                    }}
                    id="channel-sms"
                  />
                  <Label htmlFor="channel-sms" className="cursor-pointer">
                    SMS
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={editingRule.channels.includes('voice')} 
                    onCheckedChange={() => {
                      const newChannels = editingRule.channels.includes('voice')
                        ? editingRule.channels.filter(c => c !== 'voice')
                        : [...editingRule.channels, 'voice'];
                      setEditingRule({...editingRule, channels: newChannels});
                    }}
                    id="channel-voice"
                    disabled={voiceCallConfig.provider === 'disabled'}
                  />
                  <Label 
                    htmlFor="channel-voice" 
                    className={`cursor-pointer flex items-center gap-2 ${voiceCallConfig.provider === 'disabled' ? 'text-muted-foreground' : ''}`}
                  >
                    <Phone className="h-4 w-4" />
                    Ligação de Voz
                  </Label>
                </div>
              </div>
              
              {voiceCallConfig.provider === 'disabled' && editingRule.channels.includes('voice') && (
                <div className="mt-2 text-xs text-amber-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  A integração de chamadas de voz não está configurada. Configure nas configurações do sistema.
                </div>
              )}
            </div>
          
            <div className="space-y-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea 
                id="message" 
                rows={5}
                value={editingRule.message}
                onChange={(e) => setEditingRule({...editingRule, message: e.target.value})}
                placeholder="Digite a mensagem de reengajamento. Use {{nome}} e {{curso}} como variáveis."
                className={getToneColor(editingRule.emotionalTone)}
              />
              <p className="text-xs text-muted-foreground">
                Variáveis disponíveis: {"{{nome}}"}, {"{{curso}}"}, {"{{instituicao}}"}, {"{{data_limite}}"}
              </p>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={handleCancelEdit}>
                Cancelar
              </Button>
              <Button onClick={handleSaveRule}>
                {isCreating ? 'Criar Regra' : 'Salvar Alterações'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutomatedReengagement;
