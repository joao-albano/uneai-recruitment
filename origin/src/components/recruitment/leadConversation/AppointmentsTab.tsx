
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSchedules } from '@/context/schedules/SchedulesContext';

interface AppointmentsTabProps {
  leadId?: string;
}

const AppointmentsTab: React.FC<AppointmentsTabProps> = ({ leadId }) => {
  const navigate = useNavigate();
  const { visibleSchedules } = useSchedules();
  
  // If leadId is provided, filter schedules for this lead
  const leadSchedules = leadId 
    ? visibleSchedules.filter(schedule => 
        schedule.studentId === leadId || 
        schedule.studentId === `lead-${leadId}`)
    : [];
  
  const handleScheduleVisit = () => {
    // Navigate to the schedule page with the lead ID as a parameter
    navigate(`/recruitment/schedule?action=new${leadId ? `&leadId=${leadId}` : ''}`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos</CardTitle>
        <CardDescription>
          Histórico e agendamentos futuros
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[600px] flex items-center justify-center">
        {leadSchedules.length > 0 ? (
          <div className="w-full">
            <div className="space-y-4">
              {leadSchedules.map(schedule => (
                <div key={schedule.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{schedule.studentName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(schedule.date).toLocaleDateString()} às {new Date(schedule.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      schedule.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : schedule.status === 'canceled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {schedule.status === 'completed' 
                        ? 'Concluído' 
                        : schedule.status === 'canceled'
                        ? 'Cancelado'
                        : 'Agendado'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{schedule.notes}</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Responsável: {schedule.agentName}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button onClick={handleScheduleVisit} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Agendar Nova Visita
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Sem agendamentos</h3>
            <p className="text-muted-foreground mb-4">
              Esse lead ainda não possui agendamentos.
            </p>
            <Button onClick={handleScheduleVisit} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Agendar Visita
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsTab;
