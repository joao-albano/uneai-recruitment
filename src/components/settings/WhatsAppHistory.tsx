
import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { useTheme } from '@/context/ThemeContext';
import { WhatsAppMessage } from '@/types/whatsapp';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, Clock, X, MessageSquare, Trash2, Search, Eye } from 'lucide-react';

interface WhatsAppHistoryProps {
  messages: WhatsAppMessage[];
  onClearHistory: () => void;
}

const WhatsAppHistory: React.FC<WhatsAppHistoryProps> = ({ messages, onClearHistory }) => {
  const { language } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<WhatsAppMessage | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  
  // Data locale based on language
  const dateLocale = language === 'pt-BR' ? ptBR : enUS;
  
  // Filter messages by search term
  const filteredMessages = messages.filter(msg => 
    msg.studentName.toLowerCase().includes(search.toLowerCase()) || 
    msg.parentName.toLowerCase().includes(search.toLowerCase()) ||
    msg.recipientNumber.includes(search)
  );
  
  const getStatusBadge = (status: WhatsAppMessage['status']) => {
    switch(status) {
      case 'sent':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Clock className="h-3 w-3 mr-1" /> 
          {language === 'pt-BR' ? 'Enviado' : 'Sent'}
        </Badge>;
      case 'delivered':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          <Check className="h-3 w-3 mr-1" /> 
          {language === 'pt-BR' ? 'Entregue' : 'Delivered'}
        </Badge>;
      case 'read':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Check className="h-3 w-3 mr-1" /> 
          {language === 'pt-BR' ? 'Lido' : 'Read'}
        </Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <X className="h-3 w-3 mr-1" /> 
          {language === 'pt-BR' ? 'Falhou' : 'Failed'}
        </Badge>;
      default:
        return null;
    }
  };
  
  const handleViewMessage = (message: WhatsAppMessage) => {
    setSelectedMessage(message);
    setShowDialog(true);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>
            {language === 'pt-BR' ? 'Histórico de Mensagens' : 'Message History'}
          </CardTitle>
          <CardDescription>
            {language === 'pt-BR' 
              ? 'Histórico de mensagens enviadas via WhatsApp' 
              : 'History of messages sent via WhatsApp'}
          </CardDescription>
        </div>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={onClearHistory}
          title={language === 'pt-BR' ? 'Limpar histórico' : 'Clear history'}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'pt-BR' ? "Buscar por aluno, responsável ou número..." : "Search by student, parent or number..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">
              {language === 'pt-BR' ? 'Nenhuma mensagem encontrada' : 'No messages found'}
            </h3>
            <p className="text-muted-foreground mt-1">
              {search 
                ? (language === 'pt-BR' ? 'Tente uma busca diferente' : 'Try a different search') 
                : (language === 'pt-BR' ? 'Nenhuma mensagem foi enviada ainda' : 'No messages have been sent yet')}
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {language === 'pt-BR' ? 'Aluno' : 'Student'}
                  </TableHead>
                  <TableHead>
                    {language === 'pt-BR' ? 'Responsável' : 'Parent'}
                  </TableHead>
                  <TableHead>
                    {language === 'pt-BR' ? 'Enviado em' : 'Sent at'}
                  </TableHead>
                  <TableHead>
                    {language === 'pt-BR' ? 'Status' : 'Status'}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === 'pt-BR' ? 'Ações' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">
                      {message.studentName}
                    </TableCell>
                    <TableCell>
                      {message.parentName}
                      <div className="text-xs text-muted-foreground">
                        {message.recipientNumber}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(message.createdAt, 'dd MMM yyyy, HH:mm', { locale: dateLocale })}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(message.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewMessage(message)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {language === 'pt-BR' ? 'Detalhes da Mensagem' : 'Message Details'}
              </DialogTitle>
              <DialogDescription>
                {selectedMessage && (
                  <span>
                    {language === 'pt-BR' 
                      ? `Enviada para ${selectedMessage.parentName} em ${format(selectedMessage.createdAt, 'dd/MM/yyyy, HH:mm', { locale: dateLocale })}` 
                      : `Sent to ${selectedMessage.parentName} on ${format(selectedMessage.createdAt, 'MM/dd/yyyy, HH:mm', { locale: dateLocale })}`}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            
            {selectedMessage && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      {language === 'pt-BR' ? 'Aluno' : 'Student'}
                    </h4>
                    <p>{selectedMessage.studentName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">
                      {language === 'pt-BR' ? 'Status' : 'Status'}
                    </h4>
                    <p>{getStatusBadge(selectedMessage.status)}</p>
                    {selectedMessage.status === 'failed' && selectedMessage.errorMessage && (
                      <p className="text-sm text-red-600 mt-1">{selectedMessage.errorMessage}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                    {language === 'pt-BR' ? 'Mensagem Enviada' : 'Message Sent'}
                  </h4>
                  <ScrollArea className="h-[200px] rounded-md border p-4">
                    <div className="whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default WhatsAppHistory;
