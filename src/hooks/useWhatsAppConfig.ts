
import { useState, useEffect } from 'react';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { WhatsAppProvider } from '@/types/whatsapp';

export const useWhatsAppConfig = () => {
  const [config, setConfig] = useState<WhatsAppConfig>(() => {
    // Try to load config from localStorage
    const savedConfig = localStorage.getItem('whatsapp_config');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        return {
          ...parsedConfig,
          provider: parsedConfig.provider as WhatsAppProvider,
          enabled: parsedConfig.enabled === true,
          connected: parsedConfig.connected === true
        };
      } catch (e) {
        console.error('Error loading WhatsApp config:', e);
      }
    }
    
    // Default configuration
    return {
      provider: 'disabled' as WhatsAppProvider,
      webhookUrl: '',
      enabled: false,
      connected: false,
      reminderTiming: 1, // Default to 1 day before
      templateMessages: {
        introduction: 'Olá {{parentName}}, somos do Colégio XYZ.',
        followUp: 'Você poderia responder algumas perguntas? É bem rápido, prometo!',
        thankYou: 'Muito obrigado pela sua participação!',
        surveyQuestion1: 'O {{studentName}} mudou de escola recentemente? (Sim/Não)',
        surveyQuestion2: 'Vocês têm preocupações com bullying ou problemas sociais? (Sim/Não)',
        surveyQuestion3: 'De 1 a 10, como você avalia a adaptação social do {{studentName}} na escola?',
        appointmentReminder: 'Olá {{parentName}}, lembramos que você tem uma reunião agendada para amanhã ({{appointmentDate}}) referente ao aluno {{studentName}}. Contamos com sua presença!'
      }
    };
  });

  // Save configuration to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('whatsapp_config', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<WhatsAppConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  return {
    config,
    updateConfig,
    setConfig,
  };
};
