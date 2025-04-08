
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/types/schedule';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

interface DayViewProps {
  schedules: Schedule[];
  selectedCampus: string;
  selectedUser: string;
}

// Mock data de bloqueios
const blockedTimes = [
  { time: '10:00', reason: 'Reunião de coordenação' },
  { time: '15:30', reason: 'Indisponível' }
];

// Horários disponíveis
const availableTimes = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', 
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

const DayView: React.FC<DayViewProps> = ({ schedules, selectedCampus, selectedUser }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  // Verifica se um horário está bloqueado
  const isTimeBlocked = (time: string) => {
    return blockedTimes.some(block => block.time === time);
  };
  
  // Verifica se um horário tem agendamento
  const getScheduleForTime = (time: string) => {
    return schedules.find(schedule => {
      const scheduleTime = format(new Date(schedule.date), 'HH:mm');
      const scheduleDate = format(new Date(schedule.date), 'yyyy-MM-dd');
      const selectedDateStr = format(selectedDate, 'yyyy-MM-dd');
      return scheduleTime === time && scheduleDate === selectedDateStr;
    });
  };
  
  // Abre modal de agendamento (placeholder)
  const handleScheduleTime = (time: string) => {
    alert(`Agendar horário para: ${format(selectedDate, 'dd/MM/yyyy')} às ${time}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <div className="w-48 mr-4">
          <DatePicker 
            date={selectedDate} 
            setDate={setSelectedDate}
            placeholder="Selecionar data"
          />
        </div>
        <h2 className="text-xl font-medium">
          {format(selectedDate, "EEEE, dd 'de' MMMM", { locale: pt })}
        </h2>
      </div>
      
      <div className="space-y-2">
        {availableTimes.map(time => {
          const isBlocked = isTimeBlocked(time);
          const scheduleForTime = getScheduleForTime(time);
          
          return (
            <div 
              key={time}
              className={`p-4 border rounded-md flex justify-between items-center
                ${isBlocked ? 'bg-gray-300 opacity-50 cursor-not-allowed' : 
                  scheduleForTime ? 'bg-blue-500 text-white' : 
                  'hover:bg-green-100 cursor-pointer'
                }`}
              onClick={() => !isBlocked && !scheduleForTime && handleScheduleTime(time)}
            >
              <div className="flex items-center">
                <span className="font-medium">{time}</span>
                {isBlocked && (
                  <span className="ml-4 text-gray-700">
                    {blockedTimes.find(block => block.time === time)?.reason}
                  </span>
                )}
                {scheduleForTime && (
                  <div className="ml-4">
                    <div className="font-semibold">{scheduleForTime.studentName}</div>
                    <div className="text-sm">{scheduleForTime.notes}</div>
                  </div>
                )}
              </div>
              
              {scheduleForTime && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Detalhes do agendamento: ${scheduleForTime.studentName}`);
                    }}
                  >
                    Detalhes
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Estado vazio */}
      {schedules.length === 0 && (
        <div className="text-center p-8">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Sem agendamentos</h3>
          <p className="text-muted-foreground mb-4">
            Não há agendamentos para este dia.
          </p>
        </div>
      )}
    </div>
  );
};

export default DayView;
