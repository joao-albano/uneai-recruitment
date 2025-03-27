
import React from 'react';
import { useScheduleData } from '@/hooks/useScheduleData';
import { useReminderSending } from '@/hooks/schedule/useReminderSending';
import CalendarView from './CalendarView';
import TodaySchedules from './TodaySchedules';
import UpcomingSchedules from './UpcomingSchedules';
import ScheduleStats from './ScheduleStats';
import ScheduleActionButtons from './ScheduleActionButtons';
import ScheduleDialogs from './ScheduleDialogs';

const ScheduleView: React.FC = () => {
  const scheduleData = useScheduleData();
  
  // Extract reminder functionality to a custom hook
  const reminderManager = useReminderSending(scheduleData.schedules);
  
  // Calculate additional stats
  const completedCount = scheduleData.visibleSchedules.filter(s => s.status === 'completed').length;
  const canceledCount = scheduleData.visibleSchedules.filter(s => s.status === 'canceled').length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-8 flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <div className="md:w-2/3">
            <ScheduleStats 
              todayCount={scheduleData.todaySchedules.length} 
              upcomingCount={scheduleData.upcomingSchedules.length}
              completedCount={completedCount}
              canceledCount={canceledCount}
            />
          </div>
          
          <div className="md:w-1/3">
            <ScheduleActionButtons
              onNewAppointment={() => scheduleData.setShowAddDialog(true)}
              onSendReminders={reminderManager.handleSendReminders}
              isProcessing={reminderManager.isProcessing}
              onShowHistory={() => reminderManager.setShowRemindersHistory(true)}
            />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-md shadow p-4">
          <CalendarView 
            formattedMonthYear={scheduleData.formattedMonthYear}
            firstDayOfMonth={scheduleData.firstDayOfMonth}
            daysInMonth={scheduleData.daysInMonth}
            today={scheduleData.today}
            selectedDate={scheduleData.selectedDate}
            previousMonth={scheduleData.previousMonth}
            nextMonth={scheduleData.nextMonth}
            hasSchedulesOnDay={scheduleData.hasSchedulesOnDay}
            getScheduleCountForDay={scheduleData.getScheduleCountForDay}
            getScheduleStatusForDay={scheduleData.getScheduleStatusForDay}
            onDayClick={scheduleData.handleDayClick}
          />
        </div>
      </div>
      
      <div className="md:col-span-4 space-y-4">
        <TodaySchedules 
          todaySchedules={scheduleData.todaySchedules} 
          onCompleted={scheduleData.markCompleted}
          onCanceled={scheduleData.cancelSchedule}
          onDetailsClick={scheduleData.handleOpenDetails}
        />
        
        <UpcomingSchedules 
          upcomingSchedules={scheduleData.upcomingSchedules} 
          onDetailsClick={scheduleData.handleOpenDetails}
          onCompleted={scheduleData.markCompleted}
          onCanceled={scheduleData.cancelSchedule}
        />
      </div>
      
      <ScheduleDialogs
        showAddDialog={scheduleData.showAddDialog}
        setShowAddDialog={scheduleData.setShowAddDialog}
        showDayDialog={scheduleData.showDayDialog}
        setShowDayDialog={scheduleData.setShowDayDialog}
        showDetailsDialog={scheduleData.showDetailsDialog}
        setShowDetailsDialog={scheduleData.setShowDetailsDialog}
        showRemindersHistory={reminderManager.showRemindersHistory}
        setShowRemindersHistory={reminderManager.setShowRemindersHistory}
        selectedDate={scheduleData.selectedDate}
        selectedSchedule={scheduleData.selectedSchedule}
        schedulesForSelectedDay={scheduleData.schedulesForSelectedDay}
        studentsWithoutSchedules={scheduleData.studentsWithoutSchedules}
        whatsAppMessages={reminderManager.whatsAppMessages}
        handleScheduleSubmit={scheduleData.handleScheduleSubmit}
        handleOpenDetails={scheduleData.handleOpenDetails}
        updateScheduleStatus={scheduleData.updateScheduleStatus}
      />
    </div>
  );
};

export default ScheduleView;
