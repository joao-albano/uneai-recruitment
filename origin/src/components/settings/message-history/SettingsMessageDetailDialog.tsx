
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { WhatsAppMessage } from '@/types/whatsapp';
import { useTheme } from '@/context/ThemeContext';
import { ChevronDown, ChevronUp } from 'lucide-react';
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
  const [isConversationExpanded, setIsConversationExpanded] = useState(false);
  
  if (!message) return null;

  // Conversa completa simulada com perguntas e respostas
  const conversationContent = `Olá ${message.parentName}, gostaríamos de fazer uma pesquisa sobre ${message.studentName}. Por favor, responda as seguintes perguntas:

1. A família mudou de residência nos últimos 6 meses?
Resposta: Não, estamos no mesmo endereço há mais de 2 anos.

2. O aluno relatou episódios de bullying ou tratamento inadequado?
Resposta: Sim, ela mencionou que alguns colegas fizeram comentários desagradáveis sobre o cabelo dela na semana passada.

3. Como você avalia a integração social do aluno na escola? (1-5)
Resposta: Eu diria 3. Ela tem alguns amigos próximos, mas às vezes se sente excluída de alguns grupos.

4. Com que frequência o aluno enfrenta dificuldades para chegar à escola?
Resposta: Raramente. Apenas quando há problemas no transporte público, o que acontece uma ou duas vezes por mês.

5. Alguma observação adicional?
Resposta: Gostaria de mencionar que ela tem demonstrado bastante interesse em aulas de música. Seria possível a escola oferecer atividades extracurriculares nessa área?

De nada! Agradeço o contato e a preocupação com o desenvolvimento do(a) meu/minha filho(a).`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
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
            <button
              onClick={() => setIsConversationExpanded(!isConversationExpanded)}
              className="flex w-full items-center justify-between rounded-md border p-2 text-sm font-medium mb-2"
            >
              <span>{language === 'pt-BR' ? 'Conversa Completa' : 'Complete Conversation'}</span>
              {isConversationExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {isConversationExpanded && (
              <ScrollArea className="rounded-md border h-[250px]">
                <div className="whitespace-pre-wrap p-4">
                  {conversationContent}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsMessageDetailDialog;
