
import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { WhatsAppMessage } from '@/types/whatsapp';
import { Check, AlertTriangle, Clock, Search, Eye, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export const WhatsAppHistory: React.FC = () => {
  const { whatsAppMessages } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<WhatsAppMessage | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const filteredMessages = whatsAppMessages.filter(
    (msg) =>
      msg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.recipientNumber.includes(searchQuery) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewMessage = (message: WhatsAppMessage) => {
    setSelectedMessage(message);
    setShowDialog(true);
  };

  const getStatusIcon = (status: WhatsAppMessage['status']) => {
    switch (status) {
      case 'sent':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'delivered':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'read':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: WhatsAppMessage['status']) => {
    switch (status) {
      case 'sent':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Enviada</Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Entregue</Badge>;
      case 'read':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Lida</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Falha</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  if (whatsAppMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <MessageSquare className="h-12 w-12 mb-4 text-muted-foreground/30" />
        <h3 className="text-lg font-medium mb-2">Nenhuma mensagem enviada</h3>
        <p className="text-muted-foreground max-w-md">
          Quando você enviar mensagens via WhatsApp, elas aparecerão aqui no histórico.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por nome, número ou conteúdo..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <div className="grid grid-cols-12 gap-2 p-3 bg-muted/50 text-sm font-medium border-b">
          <div className="col-span-3">Estudante</div>
          <div className="col-span-3">Responsável</div>
          <div className="col-span-2">Enviado em</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Ações</div>
        </div>

        <ScrollArea className="h-[400px]">
          {filteredMessages.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Nenhuma mensagem encontrada com os critérios de busca.
            </div>
          ) : (
            filteredMessages.map((message) => (
              <div
                key={message.id}
                className="grid grid-cols-12 gap-2 p-3 text-sm border-b last:border-0 hover:bg-muted/30"
              >
                <div className="col-span-3 truncate">{message.studentName}</div>
                <div className="col-span-3 truncate">
                  {message.parentName} • {message.recipientNumber}
                </div>
                <div className="col-span-2">
                  {format(message.createdAt, 'dd/MM/yy HH:mm', { locale: ptBR })}
                </div>
                <div className="col-span-2 flex items-center gap-1.5">
                  {getStatusIcon(message.status)}
                  <span>{getStatusBadge(message.status)}</span>
                </div>
                <div className="col-span-2 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewMessage(message)}
                    className="h-8 px-2"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        {selectedMessage && (
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Detalhes da mensagem
              </DialogTitle>
              <DialogDescription>
                Enviada para {selectedMessage.parentName} em{' '}
                {format(selectedMessage.createdAt, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Informações</h4>
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(selectedMessage.status)}
                    <span className="text-sm">{getStatusBadge(selectedMessage.status)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Estudante:</p>
                    <p className="font-medium">{selectedMessage.studentName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Responsável:</p>
                    <p className="font-medium">{selectedMessage.parentName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Número:</p>
                    <p className="font-medium">{selectedMessage.recipientNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Data de envio:</p>
                    <p className="font-medium">
                      {format(selectedMessage.createdAt, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                    </p>
                  </div>
                  {selectedMessage.updatedAt && (
                    <div>
                      <p className="text-muted-foreground">Última atualização:</p>
                      <p className="font-medium">
                        {format(selectedMessage.updatedAt, 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </p>
                    </div>
                  )}
                </div>
                {selectedMessage.errorMessage && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                    <p className="font-medium">Erro:</p>
                    <p>{selectedMessage.errorMessage}</p>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Conteúdo da mensagem</h4>
                <div className="p-3 bg-muted rounded-md whitespace-pre-line text-sm">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};
