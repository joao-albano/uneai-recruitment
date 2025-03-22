
import React, { useState } from 'react';
import { AlertTriangle, BookOpen, Calendar, Check, CheckCircle2, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/context/DataContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const AlertsList: React.FC = () => {
  const { alerts, markAlertAsRead, markAlertActionTaken, addSchedule } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTypes, setFilterTypes] = useState<Record<string, boolean>>({
    'high-risk': true,
    'medium-risk': true,
    'low-risk': true,
    'survey-requested': true,
    'meeting-scheduled': true
  });
  const { toast } = useToast();
  
  // Filter alerts based on search term and selected filters
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterTypes[alert.type];
    
    return matchesSearch && matchesType;
  });
  
  // Split alerts into unread and read
  const unreadAlerts = filteredAlerts.filter(alert => !alert.read);
  const readAlerts = filteredAlerts.filter(alert => alert.read);
  
  // Handle scheduling a meeting
  const handleScheduleMeeting = (alertId: string, studentId: string, studentName: string) => {
    // Schedule for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    addSchedule({
      id: `schedule-${Date.now()}`,
      studentId,
      studentName,
      date: tomorrow,
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Acompanhamento para prevenção de evasão'
    });
    
    markAlertActionTaken(alertId);
    
    toast({
      title: 'Atendimento agendado',
      description: `Agendado para ${tomorrow.toLocaleDateString()} às ${tomorrow.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
    });
  };
  
  const getAlertIcon = (type: string) => {
    switch(type) {
      case 'high-risk':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium-risk':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'low-risk':
        return <BookOpen className="h-5 w-5 text-blue-500" />;
      case 'survey-requested':
        return <BookOpen className="h-5 w-5 text-purple-500" />;
      case 'meeting-scheduled':
        return <Calendar className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };
  
  const getAlertBgColor = (type: string) => {
    switch(type) {
      case 'high-risk':
        return 'bg-red-100';
      case 'medium-risk':
        return 'bg-yellow-100';
      case 'low-risk':
        return 'bg-blue-100';
      case 'survey-requested':
        return 'bg-purple-100';
      case 'meeting-scheduled':
        return 'bg-green-100';
      default:
        return 'bg-gray-100';
    }
  };
  
  const renderAlertItem = (alert: typeof alerts[0]) => (
    <div 
      key={alert.id} 
      className={`relative rounded-lg border p-4 transition-all duration-300 ${
        alert.read ? 'opacity-80' : 'shadow-md bg-background'
      }`}
      onClick={() => !alert.read && markAlertAsRead(alert.id)}
    >
      <div className="flex items-start gap-4">
        <div className={`rounded-full p-2 ${getAlertBgColor(alert.type)}`}>
          {getAlertIcon(alert.type)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-medium flex items-center gap-2">
              {alert.studentName}
              <Badge 
                variant="outline" 
                className="text-xs font-normal"
              >
                {alert.studentClass}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(alert.createdAt).toLocaleDateString()}
              {!alert.read && (
                <span className="ml-2 h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
              )}
            </div>
          </div>
          
          <p className="mt-1 text-sm">{alert.message}</p>
          
          <div className="mt-3 flex items-center gap-2">
            {!alert.actionTaken ? (
              <>
                <Button 
                  size="sm" 
                  className="relative overflow-hidden"
                  onClick={() => handleScheduleMeeting(alert.id, alert.studentId, alert.studentName)}
                >
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  Agendar atendimento
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => markAlertActionTaken(alert.id)}
                >
                  <Check className="mr-1 h-3.5 w-3.5" />
                  Marcar como resolvido
                </Button>
              </>
            ) : (
              <Badge variant="outline" className="bg-muted text-muted-foreground">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Ação tomada
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Alertas</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie alertas de riscos e ações necessárias
        </p>
      </div>
      
      <Card className="shadow-md mb-8">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por aluno ou conteúdo do alerta..."
                className="pl-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Tipo de Alerta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filterTypes['high-risk']}
                  onCheckedChange={(checked) => 
                    setFilterTypes(prev => ({ ...prev, 'high-risk': checked }))
                  }
                >
                  Alto Risco
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterTypes['medium-risk']}
                  onCheckedChange={(checked) => 
                    setFilterTypes(prev => ({ ...prev, 'medium-risk': checked }))
                  }
                >
                  Médio Risco
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterTypes['low-risk']}
                  onCheckedChange={(checked) => 
                    setFilterTypes(prev => ({ ...prev, 'low-risk': checked }))
                  }
                >
                  Baixo Risco
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterTypes['survey-requested']}
                  onCheckedChange={(checked) => 
                    setFilterTypes(prev => ({ ...prev, 'survey-requested': checked }))
                  }
                >
                  Pesquisa Solicitada
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterTypes['meeting-scheduled']}
                  onCheckedChange={(checked) => 
                    setFilterTypes(prev => ({ ...prev, 'meeting-scheduled': checked }))
                  }
                >
                  Atendimento Agendado
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="unread">
        <TabsList className="mb-4">
          <TabsTrigger value="unread">
            Não lidos
            {unreadAlerts.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 px-1.5 text-xs font-medium"
              >
                {unreadAlerts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="all">Todos os alertas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="unread">
          {unreadAlerts.length > 0 ? (
            <div className="space-y-4">
              {unreadAlerts.map(renderAlertItem)}
            </div>
          ) : (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Não há alertas não lidos</AlertTitle>
              <AlertDescription>
                Todos os alertas foram visualizados. Verifique a aba "Todos os alertas" para histórico.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
        
        <TabsContent value="all">
          {filteredAlerts.length > 0 ? (
            <div className="space-y-4">
              {unreadAlerts.map(renderAlertItem)}
              
              {readAlerts.length > 0 && (
                <>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-background px-2 text-sm text-muted-foreground">
                        Alertas anteriores
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {readAlerts.map(renderAlertItem)}
                  </div>
                </>
              )}
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Nenhum alerta encontrado</AlertTitle>
              <AlertDescription>
                Não há alertas que correspondam aos critérios de filtro atuais.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsList;
