
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';
import WhatsAppConfigForm, { WhatsAppFormValues } from './WhatsAppConfigForm';

const WhatsAppConfigTab: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { config, updateConfig } = useWhatsAppConfig();
  
  const handleSubmit = async (values: WhatsAppFormValues) => {
    // Update configuration
    updateConfig({
      provider: values.enabled ? 'n8n_webhook' : 'disabled',
      webhookUrl: values.webhookUrl,
    });
    
    toast({
      title: language === 'pt-BR' ? 'Configurações salvas' : 'Settings saved',
      description: language === 'pt-BR' 
        ? 'Configurações do WhatsApp foram atualizadas' 
        : 'WhatsApp settings have been updated',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Configuração do WhatsApp' : 'WhatsApp Configuration'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure a integração com WhatsApp Business via webhook do n8n' 
            : 'Configure WhatsApp Business integration via n8n webhook'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WhatsAppConfigForm 
          config={config} 
          onSubmit={handleSubmit} 
        />
      </CardContent>
    </Card>
  );
};

export default WhatsAppConfigTab;
