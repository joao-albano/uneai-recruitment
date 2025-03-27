
import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Schedule } from '@/types/schedule';
import ScheduleItem from './ScheduleItem';
import EmptyScheduleState from './EmptyScheduleState';
import { CalendarClock, CheckCircle2, XCircle } from 'lucide-react';

interface DaySchedulesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  schedules: Schedule[];
  onScheduleClick: (schedule: Schedule) => void;
  onAddNew: () => void;
}

const DaySchedulesDialog: React.FC<DaySchedulesDialogProps> = ({
  open,
  onOpenChange,
  date,
  schedules,
  onScheduleClick,
  onAddNew
}) => {
  const formattedDate = format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
  
  const scheduledAppointments = schedules.filter(s => s.status === 'scheduled');
  const completedAppointments = schedules.filter(s => s.status === 'completed');
  const canceledAppointments = schedules.filter(s => s.status === 'canceled');
  
  const renderSchedulesList = (items: Schedule[]) => {
    if (items.length === 0) {
      return (
        <EmptyScheduleState 
          message="Não há atendimentos nesta categoria"
          buttonText=""
          onAction={() => {}}
          showButton={false}
        />
      );
    }
    
    return (
      <div className="space-y-4 mt-2">
        {items.map(schedule => (
          <ScheduleItem
            key={schedule.id}
            id={schedule.id}
            studentName={schedule.studentName}
            date={schedule.date}
            agentName={schedule.agentName}
            notes={schedule.notes}
            onMarkCompleted={() => {}}
            onCancelSchedule={() => {}}
            status={schedule.status}
          />
        ))}
      </div>
    );
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Atendimentos do dia</DialogTitle>
          <DialogDescription className="capitalize">
            {formattedDate}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="scheduled" className="mt-2">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="scheduled" className="flex items-center gap-1">
              <CalendarClock className="h-4 w-4" />
              <span>Agendados ({scheduledAppointments.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              <span>Concluídos ({completedAppointments.length})</span>
            </TabsTrigger>
            <TabsTrigger value="canceled" className="flex items-center gap-1">
              <XCircle className="h-4 w-4" />
              <span>Cancelados ({canceledAppointments.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scheduled" className="pt-4">
            {renderSchedulesList(scheduledAppointments)}
          </TabsContent>
          
          <TabsContent value="completed" className="pt-4">
            {renderSchedulesList(completedAppointments)}
          </TabsContent>
          
          <TabsContent value="canceled" className="pt-4">
            {renderSchedulesList(canceledAppointments)}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DaySchedulesDialog;
