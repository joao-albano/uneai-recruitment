
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TaskContact } from '@/types/recruitment/tasks';
import { MessageSquare, Phone, Video, User } from 'lucide-react';

interface ContactHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contacts: TaskContact[];
}

const ContactHistoryDialog: React.FC<ContactHistoryDialogProps> = ({
  open,
  onOpenChange,
  contacts
}) => {
  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'telefone':
        return <Phone className="h-4 w-4" />;
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      case 'presencial':
        return <User className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'atendido':
        return 'bg-green-100 text-green-800';
      case 'não_atendido':
        return 'bg-red-100 text-red-800';
      case 'caixa_postal':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Histórico de Contatos
          </DialogTitle>
        </DialogHeader>

        {contacts.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            Nenhuma tentativa de contato registrada.
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div
                  key={contact.id || index}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(contact.method)}
                      <span className="font-medium">
                        {contact.method.charAt(0).toUpperCase() + contact.method.slice(1)}
                      </span>
                    </div>
                    <Badge className={getResultColor(contact.result)}>
                      {contact.result.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(contact.timestamp), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                  </div>
                  
                  {contact.notes && (
                    <p className="mt-2 text-sm">{contact.notes}</p>
                  )}
                  
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>Agente: {contact.agentId}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactHistoryDialog;
