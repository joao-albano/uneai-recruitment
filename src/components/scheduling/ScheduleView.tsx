
import React, { useState } from 'react';
import CalendarView from './CalendarView';
import TodaySchedules from './TodaySchedules';
import UpcomingSchedules from './UpcomingSchedules';
import ScheduleStats from './ScheduleStats';
import ScheduleDialog from './ScheduleDialog';
import ScheduleDetailsDialog from './ScheduleDetailsDialog';
import EditScheduleDialog from './EditScheduleDialog';
import DaySchedulesDialog from './DaySchedulesDialog';
import { useAuth } from '@/context/AuthContext';
import { useScheduleData } from '@/hooks/useScheduleData';

const ScheduleView: React.FC = () => {
  const [showDaySchedules, setShowDaySchedules] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const { userEmail } = useAuth();
  
  const {
    students,
    studentsWithoutSchedules,
    schedules,
    visibleSchedules,
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    scheduleToEdit,
    formattedMonthYear,
    daysInMonth,
    firstDayOfMonth,
    today,
    selectedDate,
    todaySchedules,
    upcomingSchedules,
    previousMonth,
    nextMonth,
    handleScheduleSubmit,
    handleEditScheduleSubmit,
    startEditSchedule,
    markCompleted,
    cancelSchedule,
    hasSchedulesOnDay,
    getScheduleCountForDay,
    getScheduleStatusForDay,
    finalPreSelectedStudentId,
    showScheduleDetails,
    setShowScheduleDetails,
    selectedSchedule
  } = useScheduleData();
  
  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setShowDaySchedules(true);
  };
  
  const getSchedulesForDay = () => {
    if (selectedDay === null) return [];
    
    return visibleSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getDate() === selectedDay &&
             scheduleDate.getMonth() === selectedDate.getMonth() &&
             scheduleDate.getFullYear() === selectedDate.getFullYear();
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };
  
  const getSelectedDayDate = () => {
    if (selectedDay === null) return new Date();
    
    return new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDay
    );
  };
  
  return (
    <div className="w-full animate-fade-in">
      <div className="grid gap-8 lg:grid-cols-5 mt-4">
        <div className="lg:col-span-3 space-y-6">
          <CalendarView
            formattedMonthYear={formattedMonthYear}
            firstDayOfMonth={firstDayOfMonth}
            daysInMonth={daysInMonth}
            today={today}
            selectedDate={selectedDate}
            previousMonth={previousMonth}
            nextMonth={nextMonth}
            hasSchedulesOnDay={hasSchedulesOnDay}
            getScheduleCountForDay={getScheduleCountForDay}
            getScheduleStatusForDay={getScheduleStatusForDay}
            onDayClick={handleDayClick}
          />
          
          <TodaySchedules
            todaySchedules={todaySchedules}
            onMarkCompleted={markCompleted}
            onCancelSchedule={cancelSchedule}
            onNewSchedule={() => setShowAddDialog(true)}
          />
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <UpcomingSchedules
            upcomingSchedules={upcomingSchedules}
            onCancelSchedule={cancelSchedule}
            onNewSchedule={() => setShowAddDialog(true)}
            onEditSchedule={startEditSchedule}
          />
          
          <ScheduleStats schedules={visibleSchedules} />
        </div>
      </div>
      
      <ScheduleDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        students={students}
        studentsWithoutSchedules={studentsWithoutSchedules}
        preSelectedStudentId={finalPreSelectedStudentId}
        onSubmit={handleScheduleSubmit}
        currentUserEmail={userEmail}
      />
      
      {selectedSchedule && (
        <ScheduleDetailsDialog
          open={showScheduleDetails}
          onOpenChange={setShowScheduleDetails}
          schedule={selectedSchedule}
          onMarkCompleted={markCompleted}
          onCancelSchedule={cancelSchedule}
        />
      )}
      
      <EditScheduleDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        schedule={scheduleToEdit}
        onSubmit={handleEditScheduleSubmit}
        currentUserEmail={userEmail}
      />
      
      <DaySchedulesDialog
        isOpen={showDaySchedules}
        onClose={() => setShowDaySchedules(false)}
        date={getSelectedDayDate()}
        schedules={getSchedulesForDay()}
        onMarkCompleted={markCompleted}
        onCancelSchedule={cancelSchedule}
      />
    </div>
  );
};

export default ScheduleView;
