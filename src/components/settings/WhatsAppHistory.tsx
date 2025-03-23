
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { WhatsAppMessage } from '@/types/whatsapp';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import SettingsEmptyMessageState from './message-history/SettingsEmptyMessageState';
import SettingsMessageList from './message-history/SettingsMessageList';
import SettingsMessageDetailDialog from './message-history/SettingsMessageDetailDialog';

interface WhatsAppHistoryProps {
  messages: WhatsAppMessage[];
}

const WhatsAppHistory: React.FC<WhatsAppHistoryProps> = ({ messages }) => {
  const { language } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<WhatsAppMessage | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  
  // Filter messages by search term
  const filteredMessages = messages.filter(msg => 
    msg.studentName.toLowerCase().includes(search.toLowerCase()) || 
    msg.parentName.toLowerCase().includes(search.toLowerCase()) ||
    msg.recipientNumber.includes(search)
  );
  
  const handleViewMessage = (message: WhatsAppMessage) => {
    setSelectedMessage(message);
    setShowDialog(true);
  };
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={language === 'pt-BR' ? "Buscar por aluno, responsável ou número..." : "Search by student, parent or number..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8"
        />
      </div>
      
      {filteredMessages.length === 0 ? (
        <SettingsEmptyMessageState hasSearch={search !== ''} />
      ) : (
        <SettingsMessageList 
          messages={filteredMessages} 
          onViewMessage={handleViewMessage} 
        />
      )}
      
      <SettingsMessageDetailDialog
        message={selectedMessage}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </div>
  );
};

export default WhatsAppHistory;
