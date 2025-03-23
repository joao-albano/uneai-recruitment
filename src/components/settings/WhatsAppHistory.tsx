
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { WhatsAppMessage } from '@/types/whatsapp';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Trash2 } from 'lucide-react';
import SettingsEmptyMessageState from './message-history/SettingsEmptyMessageState';
import SettingsMessageList from './message-history/SettingsMessageList';
import SettingsMessageDetailDialog from './message-history/SettingsMessageDetailDialog';

interface WhatsAppHistoryProps {
  messages: WhatsAppMessage[];
  onClearHistory: () => void;
}

const WhatsAppHistory: React.FC<WhatsAppHistoryProps> = ({ messages, onClearHistory }) => {
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
      </CardContent>
    </Card>
  );
};

export default WhatsAppHistory;
