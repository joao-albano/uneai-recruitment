
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { 
  Button,
  buttonVariants
} from '@/components/ui/button';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MessageCircle, 
  ArrowDownUp, 
  Settings, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Types for channel priority
type ChannelType = 'whatsapp' | 'email' | 'voice' | 'sms' | 'webchat';

interface ChannelConfig {
  id: ChannelType;
  name: string;
  enabled: boolean;
  priority: number;
  icon: React.ElementType;
  fallbackTo?: ChannelType;
  responseRate: number;
  averageTime: string;
  status: 'online' | 'limited' | 'offline';
}

const OmnichannelOrchestration: React.FC = () => {
  // Initial channel configuration
  const [channels, setChannels] = useState<ChannelConfig[]>([
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      enabled: true,
      priority: 1,
      icon: MessageSquare,
      fallbackTo: 'sms',
      responseRate: 92,
      averageTime: '3min',
      status: 'online'
    },
    {
      id: 'email',
      name: 'E-mail',
      enabled: true,
      priority: 3,
      icon: Mail,
      fallbackTo: 'whatsapp',
      responseRate: 71,
      averageTime: '2h',
      status: 'online'
    },
    {
      id: 'voice',
      name: 'Ligação',
      enabled: true,
      priority: 2,
      icon: Phone,
      fallbackTo: 'whatsapp',
      responseRate: 48,
      averageTime: '3min',
      status: 'limited'
    },
    {
      id: 'sms',
      name: 'SMS',
      enabled: true,
      priority: 4,
      icon: MessageCircle,
      fallbackTo: 'email',
      responseRate: 65,
      averageTime: '30min',
      status: 'online'
    },
    {
      id: 'webchat',
      name: 'Web Chat',
      enabled: true,
      priority: 5,
      icon: MessageCircle,
      fallbackTo: 'email',
      responseRate: 88,
      averageTime: '5min',
      status: 'online'
    }
  ]);

  // State for priority edit mode
  const [editMode, setEditMode] = useState(false);
  
  const toggleChannel = (id: string) => {
    setChannels(channels.map(channel => 
      channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
    ));
    
    const channel = channels.find(ch => ch.id === id);
    if (channel) {
      toast({
        title: `${channel.name} ${channel.enabled ? 'desativado' : 'ativado'}`,
        description: `O canal de comunicação foi ${channel.enabled ? 'desativado' : 'ativado'} com sucesso.`,
      });
    }
  };
  
  const movePriorityUp = (id: string) => {
    setChannels(prevChannels => {
      const index = prevChannels.findIndex(c => c.id === id);
      if (index <= 0) return prevChannels;
      
      const newChannels = [...prevChannels];
      
      // Swap priorities
      const priorityToSwitch = newChannels[index-1].priority;
      newChannels[index-1].priority = newChannels[index].priority;
      newChannels[index].priority = priorityToSwitch;
      
      // Sort by new priorities
      return newChannels.sort((a, b) => a.priority - b.priority);
    });
  };
  
  const movePriorityDown = (id: string) => {
    setChannels(prevChannels => {
      const index = prevChannels.findIndex(c => c.id === id);
      if (index >= prevChannels.length - 1) return prevChannels;
      
      const newChannels = [...prevChannels];
      
      // Swap priorities
      const priorityToSwitch = newChannels[index+1].priority;
      newChannels[index+1].priority = newChannels[index].priority;
      newChannels[index].priority = priorityToSwitch;
      
      // Sort by new priorities
      return newChannels.sort((a, b) => a.priority - b.priority);
    });
  };
  
  const setFallback = (channelId: string, fallbackId: string) => {
    setChannels(channels.map(channel => 
      channel.id === channelId ? { ...channel, fallbackTo: fallbackId as ChannelType } : channel
    ));
    
    toast({
      title: "Fallback atualizado",
      description: "A configuração de canal alternativo foi atualizada.",
    });
  };
  
  const getChannelStatusIcon = (status: string) => {
    switch(status) {
      case 'online': 
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'limited': 
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'offline': 
        return <XCircle className="h-4 w-4 text-red-500" />;
      default: 
        return null;
    }
  };
  
  const getChannelStatusText = (status: string) => {
    switch(status) {
      case 'online': return 'Online';
      case 'limited': return 'Limitado';
      case 'offline': return 'Offline';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownUp className="h-5 w-5" /> Orquestração Omnichannel
              </CardTitle>
              <CardDescription>
                Configure a priorização e fallback entre os canais de comunicação
              </CardDescription>
            </div>
            <Button 
              variant={editMode ? "default" : "outline"}
              size="sm"
              onClick={() => setEditMode(!editMode)}
            >
              <Settings className="h-4 w-4 mr-2" />
              {editMode ? "Salvar Prioridades" : "Editar Prioridades"}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Canal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Taxa de Resposta</TableHead>
                <TableHead>Tempo Médio</TableHead>
                <TableHead>Fallback</TableHead>
                <TableHead className="w-20 text-right">Ativo</TableHead>
                {editMode && <TableHead className="w-20">Ordem</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {channels.sort((a, b) => a.priority - b.priority).map((channel) => (
                <TableRow key={channel.id}>
                  <TableCell>{channel.priority}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <channel.icon className="h-4 w-4" />
                      <span>{channel.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getChannelStatusIcon(channel.status)}
                      <span className="text-sm">{getChannelStatusText(channel.status)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            channel.responseRate > 80 ? 'bg-green-500' : 
                            channel.responseRate > 50 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${channel.responseRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{channel.responseRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{channel.averageTime}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <select
                      className="w-full h-8 rounded-md border border-input bg-background text-sm"
                      value={channel.fallbackTo || ''}
                      onChange={(e) => setFallback(channel.id, e.target.value)}
                      disabled={!channel.enabled || !editMode}
                    >
                      <option value="">Nenhum</option>
                      {channels
                        .filter(c => c.id !== channel.id && c.enabled)
                        .map(c => (
                          <option key={`${channel.id}-fallback-${c.id}`} value={c.id}>
                            {c.name}
                          </option>
                        ))
                      }
                    </select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={channel.enabled}
                      onCheckedChange={() => toggleChannel(channel.id)}
                      aria-label={`Ativar ${channel.name}`}
                    />
                  </TableCell>
                  {editMode && (
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => movePriorityUp(channel.id)}
                          disabled={channel.priority === 1}
                        >
                          <ArrowDownUp className="h-3.5 w-3.5 rotate-180" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7" 
                          onClick={() => movePriorityDown(channel.id)}
                          disabled={channel.priority === channels.length}
                        >
                          <ArrowDownUp className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        
        <CardFooter className="flex-col space-y-4">
          <div className="w-full p-4 rounded-md bg-muted/50 border">
            <h3 className="text-sm font-medium mb-2">Como funciona a orquestração omnichannel</h3>
            <p className="text-sm text-muted-foreground">
              O sistema tentará contatar o lead pelo canal prioritário. Se não houver resposta após 
              24 horas, o próximo canal na lista será utilizado automaticamente. Os fallbacks são 
              acionados apenas se um canal estiver indisponível ou apresentar falhas.
            </p>
          </div>
          
          <div className="flex gap-2">
            <a 
              href="#" 
              className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
            >
              Ver Histórico de Contatos
            </a>
            <Button className="flex-1">
              Testar Configurações
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OmnichannelOrchestration;
