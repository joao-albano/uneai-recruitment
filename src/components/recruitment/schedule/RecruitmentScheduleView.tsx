
import React, { useEffect } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useToast } from '@/hooks/use-toast';
import { useProduct } from '@/context/product';
import { generateDemoSchedules } from '@/data/demoData';
import ScheduleView from '@/components/scheduling/ScheduleView';

const RecruitmentScheduleView: React.FC = () => {
  const { schedules, setSchedules, visibleSchedules } = useSchedules();
  const { toast } = useToast();
  const { currentProduct } = useProduct();
  
  useEffect(() => {
    // Load demo data if no schedules exist
    if (schedules.length === 0) {
      const demoSchedules = generateDemoSchedules();
      setSchedules(demoSchedules);
      
      toast({
        title: "Dados de demonstração carregados",
        description: "Agendamentos de exemplo foram adicionados para visualização.",
      });
    }
  }, [schedules.length, setSchedules, toast]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4 mt-4 px-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agenda de Captação</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie atendimentos e acompanhamentos de leads
          </p>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto p-6 pointer-events-auto">
        <ScheduleView productContext="recruitment" />
      </main>
    </div>
  );
};

export default RecruitmentScheduleView;
