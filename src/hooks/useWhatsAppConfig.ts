
import { useState, useEffect } from 'react';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { WhatsAppProvider } from '@/types/whatsapp';

export const useWhatsAppConfig = () => {
  const [config, setConfig] = useState<WhatsAppConfig>(() => {
    // Try to load config from localStorage
    const savedConfig = localStorage.getItem('whatsapp_config');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.error('Error loading WhatsApp config:', e);
      }
    }
    
    // Default configuration
    return {
      provider: 'disabled' as WhatsAppProvider,
      webhookUrl: '',
      enabled: false,
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
