
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useNavigate } from 'react-router-dom';
import { pt } from 'date-fns/locale';

interface AppointmentsTabProps {
  leadId?: string;
  leadName?: string;
}

const AppointmentsTab: React.FC<AppointmentsTabProps> = ({ leadId = '', leadName = '' }) => {
  const { schedules } = useSchedules();
  const navigate = useNavigate();
  
  // Filter schedules for this lead
  const leadSchedules = schedules.filter(schedule => 
    schedule.studentId === leadId
  );
  
  // Navigate to scheduling page
  const handleNavigateToSchedule = () => {
    navigate('/recruitment/schedule');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos</CardTitle>
        <CardDescription>
          Histórico e agendamentos futuros
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[600px] overflow-y-auto">
        {leadSchedules.length > 0 ? (
          <div className="space-y-4">
            {leadSchedules.map(schedule => (
              <div 
                key={schedule.id}
                className={`p-4 border rounded-md ${
                  schedule.status === 'completed' ? 'bg-green-50 border-green-200' :
                  schedule.status === 'canceled' ? 'bg-red-50 border-red-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">
                      {format(new Date(schedule.date), 'EEEE, dd/MM/yyyy', { locale: pt })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {format(new Date(schedule.date), 'HH:mm')}
                    </div>
                  </div>
                  <div className={`text-xs rounded-full px-2 py-1 ${
                    schedule.status === 'completed' ? 'bg-green-200 text-green-800' :
                    schedule.status === 'canceled' ? 'bg-red-200 text-red-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {schedule.status === 'completed' ? 'Concluído' : 
                     schedule.status === 'canceled' ? 'Cancelado' : 
                     'Agendado'}
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="text-sm">{schedule.notes}</div>
                </div>
                
                <div className="mt-2 text-xs text-gray-500">
                  Responsável: {schedule.agentName}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-12">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">Sem agendamentos</h3>
            <p className="text-muted-foreground mb-6">
              Esse lead ainda não possui agendamentos.
            </p>
            <Button onClick={handleNavigateToSchedule}>
              <Plus className="h-4 w-4 mr-2" />
              Agendar Visita
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsTab;
