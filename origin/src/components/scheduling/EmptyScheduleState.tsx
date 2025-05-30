
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, AlertCircle, Plus, Calendar as CalendarIcon } from 'lucide-react';

export interface EmptyScheduleStateProps {
  message: string;
  buttonText?: string;
  onAction?: () => void;
  showButton?: boolean;
  icon?: string;
}

const EmptyScheduleState: React.FC<EmptyScheduleStateProps> = ({
  message,
  buttonText = "Agendar Atendimento",
  onAction,
  showButton = true,
  icon = "calendar"
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'calendar':
        return <Calendar className="h-12 w-12 text-muted-foreground/50" />;
      case 'alert':
        return <AlertCircle className="h-12 w-12 text-muted-foreground/50" />;
      default:
        return <Calendar className="h-12 w-12 text-muted-foreground/50" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        {getIcon()}
      </div>
      <h3 className="text-lg font-semibold mb-2">Nenhum agendamento</h3>
      <p className="text-muted-foreground mb-4 max-w-sm">{message}</p>
      
      {showButton && onAction && (
        <Button 
          variant="outline" 
          onClick={onAction}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyScheduleState;
