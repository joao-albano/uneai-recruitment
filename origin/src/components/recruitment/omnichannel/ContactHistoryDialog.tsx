
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowDownUp, CalendarIcon, Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface ContactHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactHistoryDialog: React.FC<ContactHistoryDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [date, setDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState('all');

  // Mock data for the contact history
  const contactHistory = [
    {
      id: '1',
      leadId: 'L001',
      leadName: 'João Silva',
      channel: 'WhatsApp',
      message: 'Olá! Temos um curso que pode interessar você.',
      status: 'enviado',
      date: new Date(2025, 3, 8, 14, 30),
    },
    {
      id: '2',
      leadId: 'L002',
      leadName: 'Maria Oliveira',
      channel: 'Email',
      message: 'Convite para evento de portas abertas',
      status: 'entregue',
      date: new Date(2025, 3, 7, 10, 15),
    },
    {
      id: '3',
      leadId: 'L003',
      leadName: 'Pedro Santos',
      channel: 'SMS',
      message: 'Lembrete: Processo seletivo em 3 dias',
      status: 'falha',
      date: new Date(2025, 3, 6, 9, 45),
    },
    {
      id: '4',
      leadId: 'L004',
      leadName: 'Ana Costa',
      channel: 'Ligação',
      message: 'Conversa sobre opções de bolsa',
      status: 'completo',
      date: new Date(2025, 3, 5, 16, 0),
    },
  ];

  // Filter contacts based on selected date and tab
  const filteredContacts = contactHistory.filter(contact => {
    const matchesDate = !date || format(contact.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'whatsapp' && contact.channel === 'WhatsApp') ||
      (activeTab === 'email' && contact.channel === 'Email') ||
      (activeTab === 'sms' && contact.channel === 'SMS') ||
      (activeTab === 'voice' && contact.channel === 'Ligação');
    
    return matchesDate && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enviado': return 'bg-blue-100 text-blue-800';
      case 'entregue': return 'bg-green-100 text-green-800';
      case 'falha': return 'bg-red-100 text-red-800';
      case 'completo': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Histórico de Contatos</DialogTitle>
          <DialogDescription>
            Visualize o histórico de mensagens enviadas aos leads por diferentes canais
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center mb-4">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="sms">SMS</TabsTrigger>
              <TabsTrigger value="voice">Ligação</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal w-[200px]",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: ptBR }) : "Filtrar por data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="icon" onClick={() => setDate(undefined)}>
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 border rounded-md">
          <table className="w-full">
            <thead className="bg-muted/50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Lead</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Canal</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Mensagem</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <tr key={contact.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-sm">{contact.leadName}</td>
                    <td className="px-4 py-3 text-sm">{contact.channel}</td>
                    <td className="px-4 py-3 text-sm">{contact.message}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {format(contact.date, 'dd/MM/yyyy HH:mm')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Nenhum contato encontrado com os filtros selecionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Exportar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactHistoryDialog;
