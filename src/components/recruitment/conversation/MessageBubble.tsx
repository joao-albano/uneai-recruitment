
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bot } from 'lucide-react';

interface MessageBubbleProps {
  id: string;
  content: string;
  timestamp: Date;
  isFromLead: boolean;
  isFromAi?: boolean;
  emotion?: string;
  intent?: string;
  objection?: string;
  showAnalytics: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  timestamp,
  isFromLead,
  isFromAi,
  emotion,
  intent,
  objection,
  showAnalytics
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEmotionColor = (emotion?: string) => {
    switch(emotion) {
      case 'positivo': return 'bg-green-500';
      case 'negativo': return 'bg-red-500';
      case 'interessado': return 'bg-blue-500';
      case 'confuso': return 'bg-orange-500';
      case 'hesitante': return 'bg-yellow-500';
      case 'entusiasmado': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const renderEmotionBadge = (emotion?: string) => {
    if (!emotion || emotion === 'neutro' || !showAnalytics) return null;
    
    return (
      <Badge className={`${getEmotionColor(emotion)} text-xs ml-2`}>
        {emotion}
      </Badge>
    );
  };
  
  const renderIntentBadge = (intent?: string) => {
    if (!intent || !showAnalytics) return null;
    
    return (
      <Badge variant="outline" className="text-xs ml-2">
        {intent.replace('_', ' ')}
      </Badge>
    );
  };
  
  const renderObjectionBadge = (objection?: string) => {
    if (!objection || objection === 'nenhuma' || !showAnalytics) return null;
    
    return (
      <Badge variant="destructive" className="text-xs ml-2">
        {objection.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className={`flex mb-4 ${isFromLead ? 'justify-start' : 'justify-end'}`}>
      <div 
        className={`max-w-[85%] p-3 rounded-lg break-words ${
          isFromLead 
            ? 'bg-muted text-foreground rounded-tl-none' 
            : isFromAi
              ? 'bg-primary text-primary-foreground rounded-tr-none'
              : 'bg-green-600 text-white rounded-tr-none'
        }`}
      >
        {!isFromLead && !isFromAi && (
          <div className="text-xs opacity-70 mb-1 italic">
            Atendente: Juliana Oliveira
          </div>
        )}
        
        <div className="text-sm">{content}</div>
        <div className="text-xs mt-1 opacity-70 flex justify-between items-center flex-wrap">
          <span>{formatTime(timestamp)}</span>
          <div className="flex flex-wrap gap-1 ml-2">
            {isFromLead && (
              <>
                {renderEmotionBadge(emotion)}
                {renderIntentBadge(intent)}
                {renderObjectionBadge(objection)}
              </>
            )}
            
            {!isFromLead && isFromAi && (
              <Bot className="h-3 w-3 ml-1" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
