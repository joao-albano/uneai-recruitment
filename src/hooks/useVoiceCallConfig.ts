
import { useState, useEffect } from 'react';
import { VoiceCallConfig } from '@/utils/voiceCallIntegration';

export const useVoiceCallConfig = () => {
  const [config, setConfig] = useState<VoiceCallConfig>(() => {
    // Try to load config from localStorage
    const savedConfig = localStorage.getItem('voicecall_config');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.error('Error loading Voice Call config:', e);
      }
    }
    
    // Default configuration
    return {
      provider: 'disabled',
      webhookUrl: '',
      enabled: false,
      voice: 'alloy'
    };
  });

  // Save configuration to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('voicecall_config', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<VoiceCallConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  return {
    config,
    updateConfig,
    setConfig,
  };
};
