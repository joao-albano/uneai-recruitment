
import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyScheduleStateProps {
  message: string;
  buttonText: string;
  onAction: () => void;
  showButton?: boolean;
}

const EmptyScheduleState: React.FC<EmptyScheduleStateProps> = ({
  message,
  buttonText,
  onAction,
  showButton = true
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-muted/10 rounded-lg border border-dashed">
      <Calendar className="h-12 w-12 text-muted-foreground/40 mb-4" />
      <p className="text-muted-foreground text-center mb-4">{message}</p>
      
      {showButton && buttonText && (
        <Button variant="outline" onClick={onAction} className="gap-1">
          <Plus className="h-4 w-4" />
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyScheduleState;
