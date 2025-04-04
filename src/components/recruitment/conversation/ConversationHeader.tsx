
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronLeft, MoreVertical, Bot, UserCircle2, User } from 'lucide-react';

interface ConversationHeaderProps {
  leadName: string;
  leadEmail?: string;
  leadPhone?: string;
  isAiMode: boolean;
  showAnalytics: boolean;
  onToggleAttendanceMode: () => void;
  onToggleAnalytics: () => void;
}

const ConversationHeader: React.FC<ConversationHeaderProps> = ({
  leadName,
  leadEmail,
  leadPhone,
  isAiMode,
  showAnalytics,
  onToggleAttendanceMode,
  onToggleAnalytics
}) => {
  return (
    <CardHeader className="pb-2 border-b">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="ml-3">
              <CardTitle className="text-lg">{leadName}</CardTitle>
              <CardDescription className="text-xs">
                {leadEmail && `${leadEmail} • `}
                {leadPhone && leadPhone}
              </CardDescription>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <Switch 
              id="analytics-mode"
              checked={showAnalytics}
              onCheckedChange={onToggleAnalytics}
            />
            <Label htmlFor="analytics-mode" className="text-xs">Exibir Análise</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="attendance-mode"
              checked={isAiMode}
              onCheckedChange={onToggleAttendanceMode}
            />
            <Label htmlFor="attendance-mode" className="text-xs">Modo IA</Label>
          </div>
          
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center mt-2">
        <Badge 
          variant={isAiMode ? "default" : "outline"} 
          className="mr-2"
        >
          {isAiMode ? (
            <div className="flex items-center">
              <Bot className="h-3 w-3 mr-1" />
              <span>Atendimento IA</span>
            </div>
          ) : (
            <div className="flex items-center">
              <UserCircle2 className="h-3 w-3 mr-1" />
              <span>Atendimento Humano</span>
            </div>
          )}
        </Badge>
        
        {!isAiMode && (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            <User className="h-3 w-3 mr-1" />
            <span>Atendente: Juliana Oliveira</span>
          </Badge>
        )}
      </div>
    </CardHeader>
  );
};

export default ConversationHeader;
