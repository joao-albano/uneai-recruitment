
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Calendar, MessageCircle, Mail, Phone, ArrowRight } from 'lucide-react';

interface LeadHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: any;
}

// Gera um histórico fictício para demonstração
const generateMockHistory = (lead: any) => {
  if (!lead) return [];
  
  // Data atual
  const now = new Date();
  
  // Histórico de ações baseado no estágio atual
  const history = [
    {
      id: 1,
      type: 'creation',
      description: 'Lead cadastrado no sistema',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 10),
      user: 'Sistema',
      icon: <Mail className="h-4 w-4 text-blue-500" />
    },
    {
      id: 2,
      type: 'contact',
      description: 'Primeiro contato realizado por telefone',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 8),
      user: 'João Silva',
      icon: <Phone className="h-4 w-4 text-green-500" />
    }
  ];
  
  // Adiciona histórico baseado na etapa atual
  if (lead.stage === 'Agendamento' || lead.stage === 'Visita' || lead.stage === 'Matrícula') {
    history.push({
      id: 3,
      type: 'stage',
      description: 'Alteração de etapa: Contato Inicial → Agendamento',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5),
      user: 'Maria Oliveira',
      icon: <ArrowRight className="h-4 w-4 text-amber-500" />
    });
    
    history.push({
      id: 4,
      type: 'schedule',
      description: 'Visita agendada para 22/11/2023',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 5),
      user: 'Maria Oliveira',
      icon: <Calendar className="h-4 w-4 text-purple-500" />
    });
  }
  
  if (lead.stage === 'Visita' || lead.stage === 'Matrícula') {
    history.push({
      id: 5,
      type: 'stage',
      description: 'Alteração de etapa: Agendamento → Visita',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2),
      user: 'Pedro Santos',
      icon: <ArrowRight className="h-4 w-4 text-amber-500" />
    });
    
    history.push({
      id: 6,
      type: 'note',
      description: 'Visita realizada. Família demonstrou muito interesse.',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2),
      user: 'Pedro Santos',
      icon: <MessageCircle className="h-4 w-4 text-indigo-500" />
    });
  }
  
  if (lead.stage === 'Matrícula') {
    history.push({
      id: 7,
      type: 'stage',
      description: 'Alteração de etapa: Visita → Matrícula',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1),
      user: 'Ana Costa',
      icon: <ArrowRight className="h-4 w-4 text-amber-500" />
    });
    
    history.push({
      id: 8,
      type: 'note',
      description: 'Matrícula finalizada com sucesso. Início previsto para o próximo semestre.',
      date: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 1),
      user: 'Ana Costa',
      icon: <MessageCircle className="h-4 w-4 text-indigo-500" />
    });
  }
  
  return history.sort((a, b) => b.date.getTime() - a.date.getTime());
};

const LeadHistoryDialog: React.FC<LeadHistoryDialogProps> = ({ 
  open, 
  onOpenChange,
  lead
}) => {
  const [activeTab, setActiveTab] = useState('history');
  const historyData = generateMockHistory(lead);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Histórico do Lead - {lead?.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="w-full">
            <TabsTrigger value="history" className="flex-1">Histórico de Ações</TabsTrigger>
            <TabsTrigger value="changes" className="flex-1">Alterações de Etapa</TabsTrigger>
            <TabsTrigger value="notes" className="flex-1">Observações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="mt-4">
            <ScrollArea className="h-[400px] rounded border p-4">
              <div className="space-y-4">
                {historyData.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b">
                    <div className="mt-1">{item.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium">{item.description}</p>
                      <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                        <span>Por: {item.user}</span>
                        <span>•</span>
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {historyData.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhum registro encontrado.
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="changes" className="mt-4">
            <ScrollArea className="h-[400px] rounded border p-4">
              <div className="space-y-4">
                {historyData
                  .filter(item => item.type === 'stage')
                  .map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b">
                      <div className="mt-1">{item.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                          <span>Por: {item.user}</span>
                          <span>•</span>
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                {historyData.filter(item => item.type === 'stage').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma alteração de etapa registrada.
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="notes" className="mt-4">
            <ScrollArea className="h-[400px] rounded border p-4">
              <div className="space-y-4">
                {historyData
                  .filter(item => item.type === 'note')
                  .map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b">
                      <div className="mt-1">{item.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                          <span>Por: {item.user}</span>
                          <span>•</span>
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                {historyData.filter(item => item.type === 'note').length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma observação registrada.
                  </div>
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LeadHistoryDialog;
