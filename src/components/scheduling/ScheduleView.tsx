
import React, { useState } from 'react';
import { useScheduleData } from '@/hooks/useScheduleData';
import CalendarView from './CalendarView';
import ScheduleDialog from './ScheduleDialog';
import DaySchedulesDialog from './DaySchedulesDialog';
import ScheduleDetailsDialog from './ScheduleDetailsDialog';
import TodaySchedules from './TodaySchedules';
import UpcomingSchedules from './UpcomingSchedules';
import ScheduleStats from './ScheduleStats';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Calendar } from 'lucide-react';
import { useWhatsApp } from '@/context/whatsapp/WhatsAppContext';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/context/ThemeContext';
import { useStudents } from '@/context/students/StudentsContext';
import { sendAppointmentReminders } from '@/utils/appointmentReminders';
import { useAlerts } from '@/context/alerts/AlertsContext';

const ScheduleView: React.FC = () => {
  const scheduleData = useScheduleData();
  const { whatsAppConfig, whatsAppMessages } = useWhatsApp();
  const { toast } = useToast();
  const { language } = useTheme();
  const { students } = useStudents();
  const { addAlert } = useAlerts();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Calcula estatísticas adicionais
  const completedCount = scheduleData.visibleSchedules.filter(s => s.status === 'completed').length;
  const canceledCount = scheduleData.visibleSchedules.filter(s => s.status === 'canceled').length;
  
  const handleSendReminders = async () => {
    if (isProcessing) return;
    
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
    
    setIsProcessing(true);
    
    try {
      // Enviar lembretes de agendamento para o dia seguinte
      const messageCount = await sendAppointmentReminders(
        scheduleData.schedules,
        students,
        whatsAppConfig,
        (message) => {
          // Aqui usaríamos o hook de WhatsApp para adicionar a mensagem
          console.log("Mensagem enviada:", message);
        },
        addAlert
      );
      
      toast({
        title: language === 'pt-BR' ? 'Lembretes processados' : 'Reminders processed',
        description: language === 'pt-BR' 
          ? `${messageCount} lembretes de agendamento foram enviados com sucesso.` 
          : `${messageCount} appointment reminders were successfully sent.`
      });
    } catch (error) {
      console.error("Erro ao enviar lembretes:", error);
      toast({
        title: language === 'pt-BR' ? 'Erro ao enviar lembretes' : 'Error sending reminders',
        description: language === 'pt-BR'
          ? 'Ocorreu um erro ao tentar enviar os lembretes. Tente novamente.'
          : 'An error occurred while trying to send reminders. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
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
          
          <div className="md:w-1/3 flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => scheduleData.setShowAddDialog(true)}
              className="flex items-center gap-2 w-full justify-start"
            >
              <Plus className="h-4 w-4" />
              {language === 'pt-BR' ? 'Novo Atendimento' : 'New Appointment'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSendReminders}
              disabled={isProcessing}
              className="flex items-center gap-2 w-full justify-start"
            >
              <MessageSquare className="h-4 w-4" />
              {isProcessing
                ? (language === 'pt-BR' ? 'Enviando...' : 'Sending...')
                : (language === 'pt-BR' ? 'Enviar Lembretes' : 'Send Reminders')}
            </Button>
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
          onOpenChange={scheduleData.setShowDayDialog}
          date={scheduleData.selectedDate}
          schedules={scheduleData.schedulesForSelectedDay}
          onScheduleClick={scheduleData.handleOpenDetails}
          onAddNew={() => scheduleData.setShowAddDialog(true)}
        />
      )}
      
      <ScheduleDetailsDialog 
        open={scheduleData.showDetailsDialog}
        onOpenChange={scheduleData.setShowDetailsDialog}
        schedule={scheduleData.selectedSchedule}
        onStatusChange={scheduleData.updateScheduleStatus}
      />
    </div>
  );
};

export default ScheduleView;
