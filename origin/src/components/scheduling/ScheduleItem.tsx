
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Calendar, X, User, Clock, FileText, ExternalLink, Edit } from 'lucide-react';
import { formatDateForDisplay, formatTimeForDisplay } from '@/data/schedules/scheduleUtils';
import { Schedule } from '@/types/schedule';

interface ScheduleItemProps {
  id: string;
  studentName: string;
  date: Date;
  agentName: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'canceled';
  onMarkCompleted?: (id: string) => void;
  onCancelSchedule?: (id: string) => void;
  onDetailsClick?: () => void;
  onEdit?: () => void;
  showActions?: boolean;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  id,
  studentName,
  date,
  agentName,
  notes,
  status,
  onMarkCompleted,
  onCancelSchedule,
  onDetailsClick,
  onEdit,
  showActions = true
}) => {
  const formattedDate = formatDateForDisplay(date);
  const formattedTime = formatTimeForDisplay(date);
  
  const statusColor = {
    scheduled: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
    completed: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300',
    canceled: 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  };
  
  const statusText = {
    scheduled: 'Agendado',
    completed: 'Concluído',
    canceled: 'Cancelado',
  };
  
  return (
    <div 
      className={`p-3 rounded-lg transition-colors ${
        status === 'scheduled' 
          ? 'bg-card hover:bg-muted/50 border border-muted cursor-pointer' 
          : 'bg-muted/30 border border-muted'
      }`}
      onClick={onDetailsClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4 text-primary" />
            <span className="font-medium">{studentName}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3" />
            <span>{formattedTime}</span>
          </div>
        </div>
        <div>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColor[status]}`}>
            {statusText[status]}
          </span>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground">Responsável:</span>
          <span>{agentName}</span>
        </div>
        
        {notes && (
          <div className="mt-2 text-xs text-muted-foreground flex items-start gap-1">
            <FileText className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2">{notes}</span>
          </div>
        )}
      </div>
      
      {status === 'scheduled' && showActions && (
        <div className="flex justify-between gap-2 mt-2">
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Edit className="h-3 w-3" />
              <span>Editar</span>
            </Button>
          )}
          
          {onMarkCompleted && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onMarkCompleted(id);
              }}
            >
              <Check className="h-3 w-3" />
              <span>Concluir</span>
            </Button>
          )}
          
          {onCancelSchedule && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs text-destructive hover:text-destructive flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onCancelSchedule(id);
              }}
            >
              <X className="h-3 w-3" />
              <span>Cancelar</span>
            </Button>
          )}
        </div>
      )}
      
      {(status === 'completed' || status === 'canceled') && onDetailsClick && showActions && (
        <div className="flex gap-2">
          {onEdit && (
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1 text-xs flex-1"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Edit className="h-3 w-3" />
              <span>Editar</span>
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs flex items-center justify-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              onDetailsClick();
            }}
          >
            <ExternalLink className="h-3 w-3" />
            <span>Detalhes</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScheduleItem;
