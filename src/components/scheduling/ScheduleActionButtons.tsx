
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, History } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ScheduleActionButtonsProps {
  onNewAppointment: () => void;
  onSendReminders: () => void;
  isProcessing: boolean;
  onShowHistory: () => void;
}

const ScheduleActionButtons: React.FC<ScheduleActionButtonsProps> = ({
  onNewAppointment,
  onSendReminders,
  isProcessing,
  onShowHistory
}) => {
  const { language } = useTheme();
  
  return (
    <div className="flex flex-col gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onSendReminders}
        disabled={isProcessing}
        className="flex items-center gap-2 w-full justify-start"
      >
        <MessageSquare className="h-4 w-4" />
        {isProcessing
          ? (language === 'pt-BR' ? 'Enviando...' : 'Sending...')
          : (language === 'pt-BR' ? 'Enviar Lembretes' : 'Send Reminders')}
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onShowHistory}
        className="flex items-center gap-2 w-full justify-start"
      >
        <History className="h-4 w-4" />
        {language === 'pt-BR' ? 'Histórico de Lembretes' : 'Reminders History'}
      </Button>
    </div>
  );
};

export default ScheduleActionButtons;
