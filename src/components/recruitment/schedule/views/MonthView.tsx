
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/types/schedule';
import { format, isSameDay, addMonths, subMonths } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthViewProps {
  schedules: Schedule[];
  selectedCampus: string;
  selectedUser: string;
}

const MonthView: React.FC<MonthViewProps> = ({ schedules, selectedCampus, selectedUser }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Navegar para mês anterior
  const goToPreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  // Navegar para próximo mês
  const goToNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  // Obter agendamentos para um dia específico
  const getSchedulesForDay = (day: Date) => {
    return schedules.filter(schedule => 
      isSameDay(new Date(schedule.date), day)
    );
  };

  // Renderizar dias com decoração personalizada
  const renderDay = (day: Date) => {
    const daySchedules = getSchedulesForDay(day);
    const hasSchedules = daySchedules.length > 0;
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        {day.getDate()}
        {hasSchedules && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-1.5 rounded-full bg-blue-500"></div>
        )}
      </div>
    );
  };

  // Lista de agendamentos do dia selecionado
  const selectedDaySchedules = selectedDate ? getSchedulesForDay(selectedDate) : [];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
            Mês Anterior
          </Button>
          <h2 className="text-lg font-medium">
            {format(currentMonth, "MMMM yyyy", { locale: require('date-fns/locale/pt') })}
          </h2>
          <Button variant="outline" size="sm" onClick={goToNextMonth}>
            Próximo Mês
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          locale={require('date-fns/locale/pt')}
          components={{
            Day: ({ date }: { date: Date }) => renderDay(date),
          }}
          className="rounded-md border"
        />
      </div>
      
      <div className="flex-1">
        <div className="rounded-md border p-4">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            {selectedDate ? format(selectedDate, "dd 'de' MMMM, yyyy", { locale: require('date-fns/locale/pt') }) : 'Selecione uma data'}
          </h3>
          
          {selectedDaySchedules.length > 0 ? (
            <div className="space-y-3">
              {selectedDaySchedules.map(schedule => (
                <div key={schedule.id} className="p-3 bg-blue-100 rounded-md">
                  <div className="font-medium">{format(new Date(schedule.date), 'HH:mm')} - {schedule.studentName}</div>
                  <div className="text-sm text-gray-700">{schedule.notes}</div>
                  <div className="mt-2 text-sm text-gray-500">Responsável: {schedule.agentName}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6">
              <CalendarIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                {selectedDate ? 'Não há agendamentos para esta data.' : 'Selecione uma data para ver os agendamentos.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthView;
