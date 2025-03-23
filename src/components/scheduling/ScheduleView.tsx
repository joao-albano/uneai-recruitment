
import React from 'react';
import CalendarView from './CalendarView';
import TodaySchedules from './TodaySchedules';
import UpcomingSchedules from './UpcomingSchedules';
import ScheduleStats from './ScheduleStats';
import ScheduleDialog from './ScheduleDialog';
import ScheduleDetailsDialog from './ScheduleDetailsDialog';
import { useScheduleData } from '@/hooks/useScheduleData';

const ScheduleView: React.FC = () => {
  const {
    students,
    studentsWithoutSchedules,
    schedules,
    showAddDialog,
    setShowAddDialog,
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
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie atendimentos e acompanhamentos
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-3 space-y-4">
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
            onNewSchedule={() => setShowAddDialog(true)}
          />
          
          <TodaySchedules
            todaySchedules={todaySchedules}
            onMarkCompleted={markCompleted}
            onCancelSchedule={cancelSchedule}
            onNewSchedule={() => setShowAddDialog(true)}
          />
        </div>
        
        <div className="md:col-span-2 space-y-4">
          <UpcomingSchedules
            upcomingSchedules={upcomingSchedules}
            onCancelSchedule={cancelSchedule}
            onNewSchedule={() => setShowAddDialog(true)}
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
    </div>
  );
};

export default ScheduleView;
