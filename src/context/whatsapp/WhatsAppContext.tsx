
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSchedules } from '@/context/schedules/SchedulesContext';

interface WhatsAppConfig {
  enabled: boolean;
  provider: string;
  apiKey: string;
}

interface WhatsAppContextType {
  whatsAppConfig: WhatsAppConfig;
  setWhatsAppConfig: (config: WhatsAppConfig) => void;
  runAppointmentReminders: () => void;
}

const WhatsAppContext = createContext<WhatsAppContextType | undefined>(undefined);

export const WhatsAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [whatsAppConfig, setWhatsAppConfig] = useState<WhatsAppConfig>({
    enabled: false,
    provider: 'disabled',
    apiKey: ''
  });
  
  const { schedules } = useSchedules();
  const { toast } = useToast();
  
  // Simular envio de lembretes de agendamentos
  const runAppointmentReminders = () => {
    // Filtrar agendamentos para amanhã
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const tomorrowSchedules = schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getDate() === tomorrow.getDate() &&
             scheduleDate.getMonth() === tomorrow.getMonth() &&
             scheduleDate.getFullYear() === tomorrow.getFullYear() &&
             schedule.status === 'scheduled';
    });
    
    // Simular envio de mensagens
    if (tomorrowSchedules.length > 0) {
      toast({
        title: 'Lembretes enviados',
        description: `${tomorrowSchedules.length} lembretes enviados para agendamentos de amanhã.`
      });
    } else {
      toast({
        title: 'Nenhum lembrete enviado',
        description: 'Não há agendamentos para amanhã.',
        variant: 'default'
      });
    }
    
    return tomorrowSchedules.length;
  };
  
  return (
    <WhatsAppContext.Provider value={{ 
      whatsAppConfig, 
      setWhatsAppConfig,
      runAppointmentReminders
    }}>
      {children}
    </WhatsAppContext.Provider>
  );
};

export const useWhatsApp = () => {
  const context = useContext(WhatsAppContext);
  if (!context) {
    throw new Error('useWhatsApp must be used within a WhatsAppProvider');
  }
  return context;
};
