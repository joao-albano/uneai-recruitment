
import React, { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/types/schedule';
import { format, addDays, startOfWeek, isWithinInterval } from 'date-fns';
import { pt } from 'date-fns/locale';

interface WeekViewProps {
  schedules: Schedule[];
  selectedCampus: string;
  selectedUser: string;
}

// Horários disponíveis
const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

// Bloqueios de horário por dia (0 = domingo, 1 = segunda, etc)
const blockedByDay = [
  { day: 1, time: '10:00' }, // segunda, 10:00
  { day: 3, time: '14:00' }, // quarta, 14:00
  { day: 5, time: '15:00' }  // sexta, 15:00
];

const WeekView: React.FC<WeekViewProps> = ({ schedules, selectedCampus, selectedUser }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    // Começar na segunda-feira da semana atual
    const today = new Date();
    return startOfWeek(today, { weekStartsOn: 1 });
  });

  // Gerar dias da semana a partir do dia inicial
  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, index) => 
      addDays(currentWeekStart, index)
    );
  }, [currentWeekStart]);

  // Verificar se o time slot está bloqueado para o dia específico
  const isTimeBlocked = (day: Date, time: string) => {
    const dayOfWeek = day.getDay(); // 0 = domingo, 1 = segunda, etc
    return blockedByDay.some(block => block.day === dayOfWeek && block.time === time);
  };

  // Obter agendamento para um dia e horário específicos
  const getScheduleForTimeSlot = (day: Date, time: string) => {
    const dayStart = new Date(day);
    const [hours, minutes] = time.split(':').map(Number);
    dayStart.setHours(hours, minutes, 0, 0);
    
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(hours, minutes + 59, 59, 999);
    
    return schedules.find(schedule => {
      const scheduleDate = new Date(schedule.date);
      return isWithinInterval(scheduleDate, { start: dayStart, end: dayEnd });
    });
  };

  // Navegar para semana anterior
  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, -7));
  };

  // Navegar para próxima semana
  const goToNextWeek = () => {
    setCurrentWeekStart(prev => addDays(prev, 7));
  };
  
  // Abre modal de agendamento (placeholder)
  const handleScheduleTime = (day: Date, time: string) => {
    alert(`Agendar horário para: ${format(day, 'dd/MM/yyyy')} às ${time}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={goToPreviousWeek}>Semana Anterior</Button>
        <h2 className="text-lg font-medium">
          {format(weekDays[0], "dd/MM")} - {format(weekDays[6], "dd/MM/yyyy")}
        </h2>
        <Button variant="outline" onClick={goToNextWeek}>Próxima Semana</Button>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="grid grid-cols-8 gap-1">
            {/* Cabeçalho com células vazias e dias da semana */}
            <div className="h-12"></div> {/* Célula vazia no canto superior esquerdo */}
            {weekDays.map((day, index) => (
              <div 
                key={index} 
                className="h-12 flex flex-col items-center justify-center font-medium bg-gray-50 rounded"
              >
                <div>{format(day, 'EEE', { locale: pt })}</div>
                <div>{format(day, 'dd/MM')}</div>
              </div>
            ))}
            
            {/* Grade de horários e dias */}
            {timeSlots.map(time => (
              <React.Fragment key={time}>
                {/* Coluna de horários */}
                <div className="h-16 flex items-center justify-center font-medium bg-gray-50">
                  {time}
                </div>
                
                {/* Células para cada dia da semana */}
                {weekDays.map((day, dayIndex) => {
                  const isBlocked = isTimeBlocked(day, time);
                  const scheduleForSlot = getScheduleForTimeSlot(day, time);
                  
                  return (
                    <div
                      key={`${time}-${dayIndex}`}
                      className={`h-16 border rounded p-1 ${
                        isBlocked 
                          ? 'bg-gray-300 opacity-50 cursor-not-allowed' 
                          : scheduleForSlot 
                            ? 'bg-blue-500 text-white' 
                            : 'hover:bg-green-100 cursor-pointer'
                      }`}
                      onClick={() => !isBlocked && !scheduleForSlot && handleScheduleTime(day, time)}
                    >
                      {scheduleForSlot && (
                        <div className="text-xs h-full flex flex-col justify-between">
                          <div className="font-semibold truncate">{scheduleForSlot.studentName}</div>
                          <div className="truncate">{scheduleForSlot.notes?.substring(0, 20)}{scheduleForSlot.notes?.length > 20 ? '...' : ''}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Estado vazio */}
      {schedules.length === 0 && (
        <div className="text-center p-8">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Sem agendamentos</h3>
          <p className="text-muted-foreground mb-4">
            Não há agendamentos para esta semana.
          </p>
        </div>
      )}
    </div>
  );
};

export default WeekView;
