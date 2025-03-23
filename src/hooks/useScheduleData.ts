
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';

export interface Schedule {
  id: string;
  studentId: string;
  studentName: string;
  date: Date;
  agentName: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
}

export interface FormattedScheduleData {
  formData: FormData;
  scheduleDate: Date;
}

export const useScheduleData = () => {
  const { students, schedules, addSchedule, updateScheduleStatus, generateDemoData } = useData();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  
  const studentsWithoutSchedules = students.filter(student => {
    return !schedules.some(
      schedule => 
        schedule.studentId === student.id && 
        schedule.status === 'scheduled'
    );
  });
  
  useEffect(() => {
    if (students.length === 0) {
      console.log("Generating demo data for scheduling");
      generateDemoData();
    }
    
    if (location.state?.studentId) {
      setShowAddDialog(true);
    }
  }, [students.length, generateDemoData, location.state]);
  
  const formattedMonthYear = selectedDate.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
  
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();
  
  const previousMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };
  
  const nextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };
  
  const handleScheduleSubmit = (formData: FormData) => {
    const studentId = formData.get('studentId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const notes = formData.get('notes') as string;
    
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    const scheduleDate = new Date(year, month - 1, day, hours, minutes);
    
    const newSchedule = {
      id: `schedule-${Date.now()}`,
      studentId,
      studentName: student.name,
      date: scheduleDate,
      agentName: 'Coord. Mariana',
      status: 'scheduled' as const,
      notes,
    };
    
    addSchedule(newSchedule);
    
    toast({
      title: 'Atendimento agendado',
      description: `Agendado para ${scheduleDate.toLocaleDateString()} às ${scheduleDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
    });
    
    setShowAddDialog(false);
  };
  
  const markCompleted = (id: string) => {
    updateScheduleStatus(id, 'completed');
    toast({
      title: 'Atendimento concluído',
      description: 'O atendimento foi marcado como concluído com sucesso.'
    });
  };
  
  const cancelSchedule = (id: string) => {
    updateScheduleStatus(id, 'canceled');
    toast({
      title: 'Atendimento cancelado',
      description: 'O atendimento foi cancelado com sucesso.'
    });
  };
  
  const currentMonthSchedules = schedules.filter(schedule => 
    schedule.date.getMonth() === selectedDate.getMonth() &&
    schedule.date.getFullYear() === selectedDate.getFullYear()
  );
  
  const today = new Date();
  const todaySchedules = schedules.filter(schedule => 
    schedule.date.getDate() === today.getDate() &&
    schedule.date.getMonth() === today.getMonth() &&
    schedule.date.getFullYear() === today.getFullYear() &&
    schedule.status === 'scheduled'
  ).sort((a, b) => a.date.getTime() - b.date.getTime());
  
  const upcomingSchedules = schedules.filter(schedule => 
    schedule.date > today &&
    schedule.status === 'scheduled'
  ).sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, 5);
  
  const hasSchedulesOnDay = (day: number) => {
    return currentMonthSchedules.some(schedule => 
      schedule.date.getDate() === day
    );
  };
  
  const getScheduleCountForDay = (day: number) => {
    return currentMonthSchedules.filter(schedule => 
      schedule.date.getDate() === day
    ).length;
  };
  
  const getScheduleStatusForDay = (day: number) => {
    const daySchedules = currentMonthSchedules.filter(schedule => 
      schedule.date.getDate() === day
    );
    
    if (daySchedules.some(s => s.status === 'scheduled')) {
      return 'scheduled';
    } else if (daySchedules.some(s => s.status === 'completed')) {
      return 'completed';
    } else if (daySchedules.some(s => s.status === 'canceled')) {
      return 'canceled';
    }
    
    return null;
  };
  
  const preSelectedStudentId = location.state?.studentId || '';
  const canSelectPreSelectedStudent = !schedules.some(
    schedule => 
      schedule.studentId === preSelectedStudentId && 
      schedule.status === 'scheduled'
  );
  
  const finalPreSelectedStudentId = canSelectPreSelectedStudent ? preSelectedStudentId : '';

  return {
    students,
    studentsWithoutSchedules,
    schedules,
    selectedDate,
    showAddDialog,
    setShowAddDialog,
    formattedMonthYear,
    daysInMonth,
    firstDayOfMonth,
    today,
    todaySchedules,
    upcomingSchedules,
    previousMonth,
    nextMonth,
    handleScheduleSubmit,
    markCompleted,
    cancelSchedule,
    hasSchedulesOnDay,
    getScheduleCountForDay,
    getScheduleStatusForDay,
    finalPreSelectedStudentId
  };
};
