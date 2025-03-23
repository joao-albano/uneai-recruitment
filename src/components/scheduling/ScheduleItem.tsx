
import React from 'react';
import { Check, MoreVertical, X, Edit } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ScheduleItemProps {
  id: string;
  studentName: string;
  date: Date;
  agentName: string;
  notes?: string;
  onMarkCompleted: (id: string) => void;
  onCancelSchedule: (id: string) => void;
  onEditSchedule?: (id: string) => void;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  id,
  studentName,
  date,
  agentName,
  notes,
  onMarkCompleted,
  onCancelSchedule,
  onEditSchedule,
}) => {
  return (
    <Card key={id} className="overflow-hidden">
      <div className="flex">
        <div className="w-2 bg-primary" />
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{studentName}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {onEditSchedule && (
                    <DropdownMenuItem onClick={() => onEditSchedule(id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar agendamento
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => onMarkCompleted(id)}>
                    <Check className="mr-2 h-4 w-4" />
                    Marcar como concluído
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onCancelSchedule(id)}>
                    <X className="mr-2 h-4 w-4" />
                    Cancelar atendimento
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {notes && (
            <p className="mt-1 text-sm text-muted-foreground">{notes}</p>
          )}
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline" className="text-xs bg-muted/50">
              {agentName}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScheduleItem;
