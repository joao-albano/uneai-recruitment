
import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Schedule } from '@/types/schedule';

interface UpcomingAppointmentsProps {
  schedules: Schedule[];
  onScheduleClick: (schedule: Schedule) => void;
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ 
  schedules, 
  onScheduleClick 
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Próximos Atendimentos</CardTitle>
        <CardDescription>Agendamentos para intervenção</CardDescription>
      </CardHeader>
      <CardContent>
        {schedules.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {schedules.map((schedule) => (
              <Card 
                key={schedule.id} 
                className="border-t-4 border-t-primary cursor-pointer transition-shadow hover:shadow-md"
                onClick={() => onScheduleClick(schedule)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col space-y-2">
                    <span className="text-xs text-muted-foreground">
                      {schedule.date.toLocaleDateString()}, {schedule.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    <span className="font-semibold">{schedule.studentName}</span>
                    <span className="text-sm text-muted-foreground">
                      {schedule.notes?.replace(/Discuss attendance and academic performance/g, "Discussão sobre frequência e desempenho acadêmico")
                                  .replace(/Parent meeting to address attendance issues/g, "Reunião com os pais para tratar questões de frequência")}
                    </span>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {schedule.agentName}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <Clock className="h-10 w-10 text-muted-foreground/40 mb-2" />
            <p className="text-muted-foreground">Nenhum atendimento agendado</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingAppointments;
