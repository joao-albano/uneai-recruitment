
import React, { useState } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useCalendarState } from '@/hooks/useCalendarState';
import { useScheduleFilters } from '@/hooks/schedule/useScheduleFilters';
import { useScheduleOperations } from '@/hooks/schedule/useScheduleOperations';
import { useScheduleDialogs } from '@/hooks/schedule/useScheduleDialogs';
import { useWhatsApp } from '@/context/whatsapp/WhatsAppContext';
import { ProductType } from '@/context/product/types';
import ViewModeRenderer from './ViewModeRenderer';
import ScheduleDialogs from './ScheduleDialogs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CalendarPlus, History } from 'lucide-react';
import ScheduleHistoryView from './ScheduleHistoryView';

interface ScheduleViewProps {
  productContext?: ProductType;
  showAddDialog?: boolean;
  setShowAddDialog?: (show: boolean) => void;
  leadId?: string | null;
  viewMode?: string;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ 
  productContext,
  showAddDialog: externalShowAddDialog,
  setShowAddDialog: externalSetShowAddDialog,
  leadId,
  viewMode = "month"
}) => {
  const { visibleSchedules } = useSchedules();
  const { whatsAppMessages } = useWhatsApp();
  const { markCompleted, cancelSchedule } = useScheduleOperations();
  const today = new Date();
  const [activeTab, setActiveTab] = useState<string>("upcoming");
  
  // Use the dialog hook to manage dialog state
  const {
    dialogState,
    setDialogState,
    handleViewDetails,
    handleNewSchedule,
    handleEditSchedule,
    handleViewReminders,
    handleOpenChange
  } = useScheduleDialogs({
    externalShowAddDialog,
    externalSetShowAddDialog,
    leadId
  });
  
  // Filter schedules based on product context
  const filteredSchedules = productContext 
    ? visibleSchedules.filter(schedule => 
        (schedule.productContext === productContext) ||
        (!schedule.productContext && 
         ((productContext === 'retention' && !schedule.studentId.startsWith('lead-')) ||
          (productContext === 'recruitment' && schedule.studentId.startsWith('lead-'))))
      )
    : visibleSchedules;
  
  // Get calendar state and schedule filters
  const calendarState = useCalendarState(filteredSchedules);
  const { 
    todaySchedules, 
    upcomingSchedules,
    students,
    studentsWithoutSchedules,
    completedSchedules,
    canceledSchedules
  } = useScheduleFilters(filteredSchedules, today);
  
  // Handle completed and canceled schedules
  const handleCompleted = (id: string) => {
    markCompleted(id);
  };
  
  const handleCanceled = (id: string) => {
    cancelSchedule(id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <CalendarPlus className="h-4 w-4" />
                Agendamentos Atuais
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Histórico
              </TabsTrigger>
            </TabsList>
            
            <Button onClick={handleNewSchedule} className="ml-auto">
              Novo Agendamento
            </Button>
          </div>
          
          <TabsContent value="upcoming" className="space-y-8">
            <ViewModeRenderer 
              viewMode={viewMode}
              todaySchedules={todaySchedules}
              upcomingSchedules={upcomingSchedules}
              calendarState={calendarState}
              today={today}
              handleViewDetails={handleViewDetails}
              handleCompleted={handleCompleted}
              handleCanceled={handleCanceled}
              handleEditSchedule={handleEditSchedule}
              handleNewSchedule={handleNewSchedule}
              handleViewReminders={handleViewReminders}
              setDialogState={setDialogState}
            />
          </TabsContent>
          
          <TabsContent value="history" className="space-y-8">
            <ScheduleHistoryView 
              completedSchedules={completedSchedules}
              canceledSchedules={canceledSchedules}
              onViewDetails={handleViewDetails}
              productContext={productContext}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <ScheduleDialogs 
        dialogState={{
          ...dialogState,
          remindersHistoryDialogOpen: dialogState.remindersHistoryDialogOpen || false
        }}
        setDialogState={setDialogState}
        students={students}
        availableStudents={studentsWithoutSchedules}
        productContext={productContext}
        onOpenChange={handleOpenChange}
        preselectedStudentId={dialogState.preselectedStudentId}
      />
    </div>
  );
};

export default ScheduleView;
