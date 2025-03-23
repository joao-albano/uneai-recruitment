
import React, { useState } from 'react';
import { useData } from '@/context/DataContext';
import { WhatsAppMessage } from '@/types/whatsapp';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import EmptyMessageState from './message-history/EmptyMessageState';
import MessageDetailDialog from './message-history/MessageDetailDialog';
import MessageList from './message-history/MessageList';

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

  if (whatsAppMessages.length === 0) {
    return <EmptyMessageState />;
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

        <MessageList 
          messages={filteredMessages} 
          onViewMessage={handleViewMessage} 
        />
      </div>

      <MessageDetailDialog
        message={selectedMessage}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </div>
  );
};
