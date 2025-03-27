
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Schedule } from '@/types/schedule';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, MapPin, User, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ScheduleDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Schedule | null;
  onStatusChange: (id: string, status: 'scheduled' | 'completed' | 'canceled') => void;
}

const ScheduleDetailsDialog: React.FC<ScheduleDetailsDialogProps> = ({
  open,
  onOpenChange,
  schedule,
  onStatusChange
}) => {
  if (!schedule) return null;
  
  const formattedDate = schedule.date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedTime = schedule.date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const isScheduled = schedule.status === 'scheduled';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes do atendimento</DialogTitle>
        </DialogHeader>
        
        <div className="mt-2 space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{schedule.studentName}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="capitalize">{formattedDate}</div>
              <div className="text-sm text-muted-foreground">{formattedTime}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span>Sala de atendimento {Math.floor(Math.random() * 10) + 1}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <span>{schedule.agentName}</span>
          </div>
          
          {schedule.notes && (
            <>
              <Separator />
              <div>
                <h4 className="font-medium mb-1">Observações:</h4>
                <p className="text-sm text-muted-foreground">{schedule.notes}</p>
              </div>
            </>
          )}
          
          <div className="flex items-center gap-2 mt-2">
            <div className="font-medium">Status:</div>
            {schedule.status === 'scheduled' && (
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border border-blue-300">
                Agendado
              </Badge>
            )}
            {schedule.status === 'completed' && (
              <Badge variant="outline" className="bg-green-100 text-green-700 border border-green-300">
                Concluído
              </Badge>
            )}
            {schedule.status === 'canceled' && (
              <Badge variant="outline" className="bg-red-100 text-red-700 border border-red-300">
                Cancelado
              </Badge>
            )}
          </div>
        </div>
        
        {isScheduled && (
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              className="border-red-200 hover:bg-red-50 text-red-600"
              onClick={() => {
                onStatusChange(schedule.id, 'canceled');
                onOpenChange(false);
              }}
            >
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            
            <Button 
              variant="outline"
              className="border-green-200 hover:bg-green-50 text-green-600"
              onClick={() => {
                onStatusChange(schedule.id, 'completed');
                onOpenChange(false);
              }}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Concluído
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDetailsDialog;
