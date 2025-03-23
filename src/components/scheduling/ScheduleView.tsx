import React from 'react';
import CalendarView from './CalendarView';
import TodaySchedules from './TodaySchedules';
import UpcomingSchedules from './UpcomingSchedules';
import ScheduleStats from './ScheduleStats';
import ScheduleDialog from './ScheduleDialog';
import ScheduleDetailsDialog from './ScheduleDetailsDialog';
import EditScheduleDialog from './EditScheduleDialog';
import { useScheduleData } from '@/hooks/useScheduleData';

const ScheduleView: React.FC = () => {
  const {
    students,
    studentsWithoutSchedules,
    schedules,
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
  
  return (
    <div className="w-full animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie atendimentos e acompanhamentos
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-5">
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
          
          <ScheduleStats schedules={schedules} />
        </div>
      </div>
      
      <ScheduleDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        students={students}
        studentsWithoutSchedules={studentsWithoutSchedules}
        preSelectedStudentId={finalPreSelectedStudentId}
        onSubmit={handleScheduleSubmit}
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
      />
    </div>
  );
};

export default ScheduleView;
