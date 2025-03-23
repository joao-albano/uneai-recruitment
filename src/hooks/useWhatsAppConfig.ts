
import { useState, useEffect } from 'react';
import { WhatsAppConfig, WhatsAppProvider } from '@/utils/whatsappIntegration';

export const useWhatsAppConfig = () => {
  const [config, setConfig] = useState<WhatsAppConfig>(() => {
    // Tenta carregar a configuração do localStorage
    const savedConfig = localStorage.getItem('whatsapp_config');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.error('Erro ao carregar configuração do WhatsApp:', e);
      }
    }
    
    // Configuração padrão
    return {
      provider: 'disabled' as WhatsAppProvider,
    };
  });

  // Salva configuração no localStorage quando muda
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
