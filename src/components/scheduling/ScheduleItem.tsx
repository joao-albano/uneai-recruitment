
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Check, X, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ScheduleItemProps {
  id: string;
  studentName: string;
  date: Date;
  agentName: string;
  notes?: string;
  onMarkCompleted: (id: string) => void;
  onCancelSchedule: (id: string) => void;
  onDetailsClick?: () => void;
  status?: 'scheduled' | 'completed' | 'canceled';
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  id,
  studentName,
  date,
  agentName,
  notes,
  onMarkCompleted,
  onCancelSchedule,
  onDetailsClick,
  status = 'scheduled'
}) => {
  const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  
  const renderStatusBadge = () => {
    if (status === 'completed') {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-700 border border-green-300">
          Concluído
        </Badge>
      );
    } else if (status === 'canceled') {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-700 border border-red-300">
          Cancelado
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-700 border border-blue-300">
          Agendado
        </Badge>
      );
    }
  };
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer" onClick={onDetailsClick}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-medium text-base">{studentName}</span>
            <span className="text-sm text-muted-foreground">{formattedTime} - {agentName}</span>
            
            {notes && (
              <p className="text-sm mt-2 text-muted-foreground line-clamp-2">{notes}</p>
            )}
            
            <div className="mt-2">
              {renderStatusBadge()}
            </div>
          </div>
          
          {status === 'scheduled' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Opções</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onMarkCompleted(id);
                }} className="cursor-pointer">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Marcar como concluído</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                  e.stopPropagation();
                  onCancelSchedule(id);
                }} className="cursor-pointer">
                  <X className="mr-2 h-4 w-4 text-red-500" />
                  <span>Cancelar agendamento</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleItem;
