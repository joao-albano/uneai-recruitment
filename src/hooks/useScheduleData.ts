
import { useMemo, useState } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { Schedule } from '@/types/schedule';
import { format, startOfDay, endOfDay, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameDay, isWithinInterval } from 'date-fns';

export const useScheduleData = () => {
  // Estado para filtros e calendário
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
  
  // Estados para filtros
  const [selectedCampus, setSelectedCampus] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  
  // Estado para controlar diálogos e detalhes
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDayDialog, setShowDayDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  
  // Get data from context
  const { schedules, visibleSchedules, updateScheduleStatus, updateSchedule } = useSchedules();
  
  // Fixed today value for reference
  const today = useMemo(() => new Date(), []);
  
  // Calculate week days for week view
  const weekDays = useMemo(() => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [selectedDate]);
  
  // Handle date navigation - previous/next day
  const goToPreviousDay = () => setSelectedDate(prev => addDays(prev, -1));
  const goToNextDay = () => setSelectedDate(prev => addDays(prev, 1));
  
  // Handle week navigation
  const goToPreviousWeek = () => setSelectedDate(prev => addDays(prev, -7));
  const goToNextWeek = () => setSelectedDate(prev => addDays(prev, 7));
  
  // Handle month navigation
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };
  
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  
  // Filter schedules by date range based on view mode
  const filteredSchedulesByDate = useMemo(() => {
    if (!visibleSchedules.length) return [];
    
    let start: Date, end: Date;
    
    switch (viewMode) {
      case 'day':
        start = startOfDay(selectedDate);
        end = endOfDay(selectedDate);
        break;
      case 'week':
        start = startOfWeek(selectedDate, { weekStartsOn: 1 });
        end = endOfWeek(selectedDate, { weekStartsOn: 1 });
        break;
      case 'month':
        start = startOfMonth(currentMonth);
        end = endOfMonth(currentMonth);
        break;
      default:
        start = startOfDay(today);
        end = endOfDay(today);
    }
    
    return visibleSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return isWithinInterval(scheduleDate, { start, end });
    });
  }, [visibleSchedules, selectedDate, currentMonth, viewMode, today]);
  
  // Filter schedules by campus and user
  const filteredSchedules = useMemo(() => {
    let filtered = [...filteredSchedulesByDate];
    
    if (selectedCampus) {
      // In a real implementation, we would filter by campus
      // This is a placeholder for when real data is available
      console.log(`Filtering by campus: ${selectedCampus}`);
    }
    
    if (selectedUser) {
      filtered = filtered.filter(schedule => 
        schedule.agentName.includes(selectedUser)
      );
    }
    
    return filtered;
  }, [filteredSchedulesByDate, selectedCampus, selectedUser]);
  
  // Get schedules for specific day
  const getSchedulesForDay = (day: Date) => {
    return filteredSchedules.filter(schedule => 
      isSameDay(new Date(schedule.date), day)
    );
  };
  
  // Today's schedules
  const todaySchedules = useMemo(() => 
    getSchedulesForDay(today), 
    [filteredSchedules, today]
  );
  
  // Handle opening schedule details
  const handleOpenScheduleDetails = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setShowDetailsDialog(true);
  };
  
  // Handle updating schedule status
  const handleUpdateScheduleStatus = (id: string, status: 'scheduled' | 'completed' | 'canceled') => {
    updateScheduleStatus(id, status);
  };
  
  return {
    // State
    selectedDate,
    setSelectedDate,
    currentMonth,
    setCurrentMonth,
    viewMode,
    setViewMode,
    selectedCampus,
    setSelectedCampus,
    selectedUser,
    setSelectedUser,
    showAddDialog,
    setShowAddDialog,
    showDayDialog,
    setShowDayDialog,
    showDetailsDialog,
    setShowDetailsDialog,
    selectedSchedule,
    setSelectedSchedule,
    
    // Data
    schedules,
    visibleSchedules,
    filteredSchedules,
    
    // Computed
    weekDays,
    today,
    todaySchedules,
    
    // Functions
    goToPreviousDay,
    goToNextDay,
    goToPreviousWeek,
    goToNextWeek,
    goToPreviousMonth,
    goToNextMonth,
    getSchedulesForDay,
    handleOpenScheduleDetails,
    handleUpdateScheduleStatus,
    updateSchedule
  };
};
