
import React, { useState, useEffect } from 'react';
import { DataProvider } from '@/context/DataContext';
import { SchedulesProvider } from '@/context/schedules/SchedulesContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import ScheduleView from '@/components/scheduling/ScheduleView';
import { useAuth } from '@/context/AuthContext';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { generateDemoSchedules } from '@/data/demoData';
import { useToast } from '@/hooks/use-toast';

const ScheduleContent: React.FC = () => {
  const { schedules, setSchedules } = useSchedules();
  const { toast } = useToast();
  
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
          <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie atendimentos e acompanhamentos
          </p>
        </div>
      </div>
      <main className="flex-1 overflow-y-auto p-6 pointer-events-auto">
        <ScheduleView />
      </main>
    </div>
  );
};

const SchedulePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <DataProvider>
      <SchedulesProvider>
        <div className="h-screen flex flex-col md:flex-row overflow-hidden">
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={toggleSidebar} 
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
            <ScheduleContent />
          </div>
        </div>
      </SchedulesProvider>
    </DataProvider>
  );
};

export default SchedulePage;
