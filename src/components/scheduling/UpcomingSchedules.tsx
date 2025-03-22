
import React from 'react';
import { Calendar, Clock, Edit, MoreVertical, Plus, Trash, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Schedule {
  id: string;
  studentId: string;
  studentName: string;
  date: Date;
  agentName: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
}

interface UpcomingSchedulesProps {
  upcomingSchedules: Schedule[];
  onCancelSchedule: (id: string) => void;
  onNewSchedule: () => void;
}

const UpcomingSchedules: React.FC<UpcomingSchedulesProps> = ({
  upcomingSchedules,
  onCancelSchedule,
  onNewSchedule,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Próximos atendimentos</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={onNewSchedule}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {upcomingSchedules.length > 0 ? (
          <ScrollArea className="h-96 pr-4">
            <div className="space-y-4">
              {upcomingSchedules.map(schedule => (
                <div 
                  key={schedule.id}
                  className="flex gap-3 p-3 rounded-lg border transition-colors hover:bg-muted/20"
                >
                  <div className="flex-shrink-0 rounded-full bg-primary/10 p-2 h-10 w-10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{schedule.studentName}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <MoreVertical className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onCancelSchedule(schedule.id)}>
                            <Trash className="mr-2 h-4 w-4" />
                            Cancelar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {schedule.date.toLocaleDateString()}
                      </span>
                      <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                      <span className="text-xs text-muted-foreground">
                        {schedule.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    {schedule.notes && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {schedule.notes.replace(/Discuss attendance and academic performance/g, "Discussão sobre frequência e desempenho acadêmico")
                                      .replace(/Parent meeting to address attendance issues/g, "Reunião com os pais para tratar questões de frequência")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground/40 mb-2" />
            <p className="text-muted-foreground">Nenhum atendimento agendado</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingSchedules;
