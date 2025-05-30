
import { useEffect } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { generateDemoSchedules } from '@/data/demoData';
import { useToast } from '@/hooks/use-toast';

export const useDemoScheduleData = () => {
  const { schedules, setSchedules } = useSchedules();
  const { toast } = useToast();
  
  useEffect(() => {
    // Load demo data if no schedules exist
    if (schedules.length === 0) {
      const demoSchedules = generateDemoSchedules();
      setSchedules(demoSchedules);
      
      toast({
        title: "Dados de demonstração",
        description: "Agendamentos de exemplo foram carregados para visualização.",
      });
      
      console.log("Demo schedules loaded:", demoSchedules.length);
    }
  }, [schedules.length, setSchedules, toast]);
  
  return null;
};
