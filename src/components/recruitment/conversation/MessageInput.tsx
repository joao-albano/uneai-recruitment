import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send } from 'lucide-react';
import { useRegistryRules } from '@/components/rules/registry/hooks/useRegistryRules';
import RegistrySelectionDialog from './RegistrySelectionDialog';

interface MessageInputProps {
  isAiMode: boolean;
  onSendMessage: (message: string) => void;
  onEndConversation?: () => void;
  messages: Message[];
}

const MessageInput: React.FC<MessageInputProps> = ({
  isAiMode,
  onSendMessage,
  onEndConversation,
  messages
}) => {
  const [message, setMessage] = useState('');
  const [showRegistryDialog, setShowRegistryDialog] = useState(false);
  const { rules } = useRegistryRules();

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEndWithRegistry = async (code: string, description: string) => {
    onSendMessage(`[Sistema] Atendimento tabulado como: ${code} - ${description}`);
    
    if (onEndConversation) {
      onEndConversation();
    }
  };

  const handleAutoRegistry = async () => {
    const result = await analyzeConversationForRegistry(messages, rules);
    
    if (result) {
      handleEndWithRegistry(result.code, result.description);
    } else {
      setShowRegistryDialog(true);
    }
  };

  const filteredRules = rules.filter(r => r.type === (isAiMode ? 'ai' : 'human'));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="flex-1"
          rows={2}
        />
        <div className="flex flex-col gap-2">
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={isAiMode ? handleAutoRegistry : () => setShowRegistryDialog(true)}
          >
            {isAiMode ? <Bot className="h-4 w-4" /> : <span>#</span>}
          </Button>
        </div>
      </div>

      <RegistrySelectionDialog
        open={showRegistryDialog}
        onClose={() => setShowRegistryDialog(false)}
        onSelect={handleEndWithRegistry}
        rules={filteredRules}
        type={isAiMode ? 'ai' : 'human'}
      />
    </div>
  );
};

export default MessageInput;
