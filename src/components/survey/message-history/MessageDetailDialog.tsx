
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { WhatsAppMessage } from '@/types/whatsapp';
import { MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import MessageStatusBadge from './MessageStatusBadge';
import { useData } from '@/context/DataContext';

interface MessageDetailDialogProps {
  message: WhatsAppMessage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MessageDetailDialog: React.FC<MessageDetailDialogProps> = ({ 
  message, 
  open, 
  onOpenChange 
}) => {
  const { students } = useData();
  
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
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Detalhes da mensagem
          </DialogTitle>
          <DialogDescription>
            Enviada para {message.parentName} em{' '}
            {format(message.createdAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
              locale: ptBR,
            })}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-medium">Informações</h4>
              <div className="flex items-center gap-1.5">
                <MessageStatusBadge status={message.status} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Estudante:</p>
                <p className="font-medium">{message.studentName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Responsável:</p>
                <p className="font-medium">{message.parentName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Número:</p>
                <p className="font-medium">{message.recipientNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Data de envio:</p>
                <p className="font-medium">
                  {format(message.createdAt, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                </p>
              </div>
              {message.updatedAt && (
                <div>
                  <p className="text-muted-foreground">Última atualização:</p>
                  <p className="font-medium">
                    {format(message.updatedAt, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </p>
                </div>
              )}
            </div>
            {message.errorMessage && (
              <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                <p className="font-medium">Erro:</p>
                <p>{message.errorMessage}</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Conversa completa</h4>
            <div className="p-3 bg-muted rounded-md whitespace-pre-line text-sm max-h-[350px] overflow-y-auto">
              {conversationContent}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetailDialog;
