
import React from 'react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { WhatsAppMessage } from '@/types/whatsapp';
import { useTheme } from '@/context/ThemeContext';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import SettingsMessageStatusBadge from './SettingsMessageStatusBadge';

interface SettingsMessageDetailDialogProps {
  message: WhatsAppMessage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsMessageDetailDialog: React.FC<SettingsMessageDetailDialogProps> = ({ 
  message, 
  open, 
  onOpenChange 
}) => {
  const { language } = useTheme();
  const dateLocale = language === 'pt-BR' ? ptBR : enUS;
  
  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {language === 'pt-BR' ? 'Detalhes da Mensagem' : 'Message Details'}
          </DialogTitle>
          <DialogDescription>
            {language === 'pt-BR' 
              ? `Enviada para ${message.parentName} em ${format(message.createdAt, 'dd/MM/yyyy, HH:mm', { locale: dateLocale })}` 
              : `Sent to ${message.parentName} on ${format(message.createdAt, 'MM/dd/yyyy, HH:mm', { locale: dateLocale })}`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                {language === 'pt-BR' ? 'Aluno' : 'Student'}
              </h4>
              <p>{message.studentName}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                {language === 'pt-BR' ? 'Status' : 'Status'}
              </h4>
              <p><SettingsMessageStatusBadge status={message.status} /></p>
              {message.status === 'failed' && message.errorMessage && (
                <p className="text-sm text-red-600 mt-1">{message.errorMessage}</p>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              {language === 'pt-BR' ? 'Mensagem Enviada' : 'Message Sent'}
            </h4>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              <div className="whitespace-pre-wrap">
                {message.message}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsMessageDetailDialog;
