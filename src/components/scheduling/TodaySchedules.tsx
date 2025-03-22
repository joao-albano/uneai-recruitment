
import React from 'react';
import { Calendar, Check, MoreVertical, Plus, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Schedule {
  id: string;
  studentId: string;
  studentName: string;
  date: Date;
  agentName: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
}

interface TodaySchedulesProps {
  todaySchedules: Schedule[];
  onMarkCompleted: (id: string) => void;
  onCancelSchedule: (id: string) => void;
  onNewSchedule: () => void;
}

const TodaySchedules: React.FC<TodaySchedulesProps> = ({
  todaySchedules,
  onMarkCompleted,
  onCancelSchedule,
  onNewSchedule,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Atendimentos de hoje</CardTitle>
        <CardDescription>
          {todaySchedules.length === 0 
            ? 'Não há atendimentos agendados para hoje.'
            : `${todaySchedules.length} atendimento(s) hoje.`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {todaySchedules.length > 0 ? (
          <div className="space-y-3">
            {todaySchedules.map(schedule => (
              <Card key={schedule.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-2 bg-primary" />
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{schedule.studentName}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {schedule.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
                            <DropdownMenuItem onClick={() => onMarkCompleted(schedule.id)}>
                              <Check className="mr-2 h-4 w-4" />
                              Marcar como concluído
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onCancelSchedule(schedule.id)}>
                              <X className="mr-2 h-4 w-4" />
                              Cancelar atendimento
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    {schedule.notes && (
                      <p className="mt-1 text-sm text-muted-foreground">{schedule.notes}</p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-muted/50">
                        {schedule.agentName}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/40 mb-2" />
            <p className="text-muted-foreground">Não há atendimentos agendados para hoje</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={onNewSchedule}
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Agendar atendimento
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaySchedules;
