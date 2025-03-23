
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { Layout } from '@/components/layout/Layout';
import ScheduleView from '@/components/scheduling/ScheduleView';

const ScheduleContent: React.FC = () => {
  const { clearAllSchedules } = useSchedules();
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const handleClearSchedules = () => {
    clearAllSchedules();
    toast({
      title: "Dados limpos",
      description: "Todos os registros de agendamento foram removidos."
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4 mt-4 px-6">
        <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
        {isAdmin && (
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleClearSchedules}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Limpar dados
          </Button>
        )}
      </div>
      <main className="flex-1 overflow-y-auto p-6 pointer-events-auto">
        <ScheduleView />
      </main>
    </div>
  );
};

const SchedulePage: React.FC = () => {
  return (
    <Layout>
      <ScheduleContent />
    </Layout>
  );
};

export default SchedulePage;
