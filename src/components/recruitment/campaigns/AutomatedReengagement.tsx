
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, MessageSquare, Mail, Clock, AlertCircle, CheckCircle, Edit2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface ReengagementRule {
  id: string;
  days: number;
  enabled: boolean;
  channels: Array<'email' | 'whatsapp' | 'sms'>;
  message: string;
  emotionalTone: 'neutral' | 'urgent' | 'friendly' | 'formal';
  lastTriggered?: Date;
  status: 'active' | 'paused';
}

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
    }
  };
  
  const handleSaveRule = () => {
    if (editingRule) {
      setRules(prev => prev.map(rule => 
        rule.id === editingRule.id ? editingRule : rule
      ));
      setEditingRule(null);
      
      toast({
        title: 'Regra atualizada',
        description: `As alterações na regra de ${editingRule.days} dias foram salvas.`,
      });
    }
  };
  
  const handleCancelEdit = () => {
    setEditingRule(null);
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
        return <Badge variant="success" className="bg-green-500">Amigável</Badge>;
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
                      <span>{rule.channels.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')}</span>
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
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Nova Regra de Reengajamento
          </Button>
        </CardFooter>
      </Card>
      
      {editingRule && (
        <Card>
          <CardHeader>
            <CardTitle>Editar Regra de Reengajamento</CardTitle>
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
              <div className="flex flex-wrap gap-2">
                {['email', 'whatsapp', 'sms'].map((channel) => (
                  <div key={channel} className="flex items-center space-x-2">
                    <Switch 
                      checked={editingRule.channels.includes(channel as any)} 
                      onCheckedChange={() => {
                        const newChannels = editingRule.channels.includes(channel as any)
                          ? editingRule.channels.filter(c => c !== channel)
                          : [...editingRule.channels, channel as 'email' | 'whatsapp' | 'sms'];
                        setEditingRule({...editingRule, channels: newChannels});
                      }}
                      id={`channel-${channel}`}
                    />
                    <Label htmlFor={`channel-${channel}`} className="cursor-pointer">
                      {channel.charAt(0).toUpperCase() + channel.slice(1)}
                    </Label>
                  </div>
                ))}
              </div>
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
                Variáveis disponíveis: {{'{{'}}nome{{'}}'}}, {{'{{'}}curso{{'}}'}}, {{'{{'}}instituicao{{'}}'}}, {{'{{'}}data_limite{{'}}'}}
              </p>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={handleCancelEdit}>
                Cancelar
              </Button>
              <Button onClick={handleSaveRule}>
                Salvar Alterações
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AutomatedReengagement;

function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14m-7-7v14" />
    </svg>
  );
}
