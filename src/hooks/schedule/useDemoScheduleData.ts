
import { useEffect } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { useToast } from '@/hooks/use-toast';
import { generateDemoSchedules } from '@/data/demoData';
import { Schedule } from '@/types/schedule';
import { ProductType } from '@/context/product/types';

export const useDemoScheduleData = () => {
  const { schedules, setSchedules } = useSchedules();
  const { toast } = useToast();
  
  useEffect(() => {
    // Load demo data if no schedules exist
    if (schedules.length === 0) {
      const demoSchedules = generateDemoSchedules();
      
      // Add some recruitment-specific schedules for demonstration
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      
      const recruitmentSchedules: Schedule[] = [
        {
          id: `schedule-recruit-1`,
          studentId: 'lead-101',
          studentName: 'Lead Maria Silva',
          date: today,
          agentName: 'Coord. Renata',
          status: 'scheduled' as const,
          notes: 'Interesse em matrícula para o próximo semestre',
          productContext: 'recruitment' as ProductType,
          educationType: 'higher',
          studentPhone: '(11) 98765-4321',
          studentEmail: 'maria.silva@email.com',
          course: 'Administração'
        },
        {
          id: `schedule-recruit-2`,
          studentId: 'lead-102',
          studentName: 'Lead João Santos',
          date: tomorrow,
          agentName: 'Prof. Ricardo',
          status: 'scheduled' as const,
          notes: 'Pai interessado em conhecer a escola',
          productContext: 'recruitment' as ProductType,
          educationType: 'basic',
          parentName: 'Roberto Santos',
          parentPhone: '(11) 91234-5678'
        },
        {
          id: `schedule-recruit-3`,
          studentId: 'lead-103',
          studentName: 'Lead Ana Costa',
          date: nextWeek,
          agentName: 'Coord. Mariana',
          status: 'scheduled' as const,
          notes: 'Potencial transferência de outra universidade',
          productContext: 'recruitment' as ProductType,
          educationType: 'higher',
          studentPhone: '(11) 97777-8888',
          studentEmail: 'ana.costa@email.com',
          course: 'Medicina'
        }
      ];
      
      setSchedules([...demoSchedules, ...recruitmentSchedules]);
      
      toast({
        title: "Dados de demonstração carregados",
        description: "Agendamentos de exemplo foram adicionados para visualização.",
      });
    }
  }, [schedules.length, setSchedules, toast]);
};
