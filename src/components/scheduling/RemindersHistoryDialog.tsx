
import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, Info } from 'lucide-react';
import { WhatsAppMessage } from '@/types/whatsapp';
import { useTheme } from '@/context/ThemeContext';
import MessageStatusBadge from '../survey/message-history/MessageStatusBadge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface RemindersHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messages: WhatsAppMessage[];
}

const RemindersHistoryDialog: React.FC<RemindersHistoryDialogProps> = ({ 
  open, 
  onOpenChange, 
  messages 
}) => {
  const { language } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const dateLocale = language === 'pt-BR' ? ptBR : enUS;
  const [selectedMessage, setSelectedMessage] = useState<WhatsAppMessage | null>(null);
  
  // Filter only appointment reminder messages
  const reminderMessages = useMemo(() => {
    return messages.filter(msg => 
      // Filter for reminder-type messages (either by explicit messageType or by content)
      (msg.messageType === 'notification' || 
       (msg.message && (
         msg.message.includes('agendamento') || 
         msg.message.includes('reunião') || 
         msg.message.includes('appointment') ||
         msg.message.includes('atendimento')
       ))
      )
    );
  }, [messages]);
  
  // Filter by search query
  const filteredMessages = useMemo(() => {
    if (!searchQuery) return reminderMessages;
    
    const query = searchQuery.toLowerCase();
    return reminderMessages.filter(msg => 
      (msg.studentName && msg.studentName.toLowerCase().includes(query)) ||
      (msg.parentName && msg.parentName.toLowerCase().includes(query)) ||
      (msg.recipientNumber && msg.recipientNumber.includes(query)) ||
      (msg.message && msg.message.toLowerCase().includes(query))
    );
  }, [reminderMessages, searchQuery]);

  // Format date with time
  const formatDateTime = (date: Date) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: dateLocale });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {language === 'pt-BR' ? 'Histórico de Lembretes de Agendamento' : 'Appointment Reminders History'}
          </DialogTitle>
          <DialogDescription>
            {language === 'pt-BR' 
              ? 'Mensagens de lembrete enviadas aos responsáveis' 
              : 'Reminder messages sent to parents'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'pt-BR' ? "Buscar por aluno, responsável ou conteúdo..." : "Search by student, parent or content..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <ScrollArea className="flex-1 border rounded-md">
          {filteredMessages.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {language === 'pt-BR' 
                ? 'Nenhum lembrete de agendamento encontrado' 
                : 'No appointment reminders found'}
            </div>
          ) : (
            <div className="divide-y">
              <div className="grid grid-cols-12 p-3 text-xs font-medium bg-muted">
                <div className="col-span-3">{language === 'pt-BR' ? 'Aluno' : 'Student'}</div>
                <div className="col-span-3">{language === 'pt-BR' ? 'Responsável' : 'Parent'}</div>
                <div className="col-span-3">{language === 'pt-BR' ? 'Data de Envio' : 'Sent Date'}</div>
                <div className="col-span-2">{language === 'pt-BR' ? 'Status' : 'Status'}</div>
                <div className="col-span-1"></div>
              </div>
              
              {filteredMessages.map((message) => (
                <div key={message.id} className="grid grid-cols-12 p-3 text-sm hover:bg-muted/50">
                  <div className="col-span-3 truncate">{message.studentName}</div>
                  <div className="col-span-3 truncate">
                    <div>{message.parentName}</div>
                    <div className="text-xs text-muted-foreground">{message.recipientNumber}</div>
                  </div>
                  <div className="col-span-3">
                    {message.createdAt ? formatDateTime(message.createdAt) : '—'}
                  </div>
                  <div className="col-span-2">
                    <MessageStatusBadge status={message.status} />
                    {message.status === 'failed' && message.errorMessage && (
                      <div className="text-xs text-destructive mt-1">{message.errorMessage}</div>
                    )}
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setSelectedMessage(message)}
                            className="h-8 w-8"
                          >
                            <Info className="h-4 w-4" />
                            <span className="sr-only">Detalhes</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{language === 'pt-BR' ? 'Ver detalhes' : 'View details'}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        {selectedMessage && (
          <div className="mt-4 p-4 bg-muted/30 rounded-md border text-sm">
            <div className="font-medium mb-2">
              {language === 'pt-BR' ? 'Conteúdo da mensagem:' : 'Message content:'}
            </div>
            <div className="whitespace-pre-wrap mb-2">{selectedMessage.message}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'pt-BR' ? 'Enviado em: ' : 'Sent at: '}
              {selectedMessage.createdAt ? formatDateTime(selectedMessage.createdAt) : '—'}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedMessage(null)}
              className="mt-2"
            >
              {language === 'pt-BR' ? 'Fechar detalhes' : 'Close details'}
            </Button>
          </div>
        )}
        
        <DialogFooter className="mt-4">
          <Button onClick={() => onOpenChange(false)}>
            {language === 'pt-BR' ? 'Fechar' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemindersHistoryDialog;
