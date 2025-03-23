
import React from 'react';
import { Calendar, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyScheduleStateProps {
  message: string;
  buttonText: string;
  onAction: () => void;
}

const EmptyScheduleState: React.FC<EmptyScheduleStateProps> = ({
  message,
  buttonText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-center">
      <Calendar className="h-10 w-10 text-muted-foreground/40 mb-2" />
      <p className="text-muted-foreground">{message}</p>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-4"
        onClick={onAction}
      >
        <Plus className="mr-1 h-3.5 w-3.5" />
        {buttonText}
      </Button>
    </div>
  );
};

export default EmptyScheduleState;
