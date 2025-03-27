
import React from 'react';
import { useScheduleData } from '@/hooks/useScheduleData';
import CalendarView from './CalendarView';
import ScheduleDialog from './ScheduleDialog';
import DaySchedulesDialog from './DaySchedulesDialog';
import ScheduleDetailsDialog from './ScheduleDetailsDialog';
import TodaySchedules from './TodaySchedules';
import UpcomingSchedules from './UpcomingSchedules';
import ScheduleStats from './ScheduleStats';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useWhatsApp } from '@/context/whatsapp/WhatsAppContext';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';

const ScheduleView: React.FC = () => {
  const scheduleData = useScheduleData();
  const { runAppointmentReminders, whatsAppConfig } = useWhatsApp();
  const { toast } = useToast();
  const { language } = useTheme();
  
  const handleSendReminders = () => {
    if (!whatsAppConfig.enabled) {
      toast({
        title: language === 'pt-BR' ? 'WhatsApp desativado' : 'WhatsApp disabled',
        description: language === 'pt-BR' 
          ? 'Ative a integração com WhatsApp nas configurações para enviar lembretes.' 
          : 'Enable WhatsApp integration in settings to send reminders.',
        variant: 'destructive'
      });
      return;
    }
    
    runAppointmentReminders();
    
    toast({
      title: language === 'pt-BR' ? 'Lembretes enviados' : 'Reminders sent',
      description: language === 'pt-BR' 
        ? 'Os lembretes de agendamento foram processados com sucesso.' 
        : 'Appointment reminders were processed successfully.'
    });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-8 flex flex-col space-y-4">
        <div className="flex justify-between items-center mb-2">
          <ScheduleStats 
            todayCount={scheduleData.todaySchedules.length} 
            upcomingCount={scheduleData.upcomingSchedules.length} 
          />
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleSendReminders}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            {language === 'pt-BR' ? 'Enviar Lembretes' : 'Send Reminders'}
          </Button>
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
            onDayClick={(day) => {
              // Set the selected date to the clicked day
              const newDate = new Date(scheduleData.selectedDate);
              newDate.setDate(day);
              
              // Get schedules for this day and open dialog
              const daySchedules = scheduleData.visibleSchedules.filter(s => {
                const scheduleDate = new Date(s.date);
                return scheduleDate.getDate() === day &&
                       scheduleDate.getMonth() === newDate.getMonth() &&
                       scheduleDate.getFullYear() === newDate.getFullYear();
              });
              
              if (daySchedules.length > 0) {
                // If there are schedules, show the day dialog
                if (scheduleData.setShowDayDialog) {
                  scheduleData.setShowDayDialog(true);
                }
              } else {
                // If there are no schedules, show the add dialog
                scheduleData.setShowAddDialog(true);
              }
            }}
          />
        </div>
      </div>
      
      <div className="md:col-span-4 space-y-4">
        <TodaySchedules 
          todaySchedules={scheduleData.todaySchedules} 
          onCompleted={scheduleData.markCompleted}
          onCanceled={scheduleData.cancelSchedule}
          onDetailsClick={scheduleData.handleOpenDetails || (() => {})}
        />
        
        <UpcomingSchedules 
          upcomingSchedules={scheduleData.upcomingSchedules} 
          onDetailsClick={scheduleData.handleOpenDetails || (() => {})}
        />
      </div>
      
      <ScheduleDialog 
        open={scheduleData.showAddDialog} 
        onOpenChange={scheduleData.setShowAddDialog}
        students={scheduleData.studentsWithoutSchedules}
        onSubmit={scheduleData.handleScheduleSubmit}
        isOpen={scheduleData.showAddDialog}
        onClose={() => scheduleData.setShowAddDialog(false)}
      />
      
      {scheduleData.showDayDialog && (
        <DaySchedulesDialog 
          open={scheduleData.showDayDialog}
          onOpenChange={scheduleData.setShowDayDialog || (() => {})}
          date={scheduleData.selectedDate}
          schedules={scheduleData.visibleSchedules.filter(s => {
            const scheduleDate = new Date(s.date);
            return scheduleDate.getDate() === scheduleData.selectedDate.getDate() &&
                  scheduleDate.getMonth() === scheduleData.selectedDate.getMonth() &&
                  scheduleDate.getFullYear() === scheduleData.selectedDate.getFullYear();
          })}
          onScheduleClick={scheduleData.handleOpenDetails || (() => {})}
          onAddNew={() => scheduleData.setShowAddDialog(true)}
        />
      )}
      
      <ScheduleDetailsDialog 
        open={scheduleData.showDetailsDialog || false}
        onOpenChange={scheduleData.setShowDetailsDialog || (() => {})}
        schedule={scheduleData.selectedSchedule}
        onStatusChange={scheduleData.updateScheduleStatus || (() => {})}
      />
    </div>
  );
};

export default ScheduleView;
