
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import AccessKeyCard from './shared/AccessKeyCard';

const WebhookAccessKey: React.FC = () => {
  const { language } = useTheme();
  const webhookKey = "sk_test_webhook_key_12345";

  return (
    <AccessKeyCard
      keyValue={webhookKey}
      keyType="webhook"
      title={language === 'pt-BR' ? 'Chave de Acesso aos Webhooks' : 'Webhook Access Key'}
      description={language === 'pt-BR' 
        ? 'Use esta chave para autenticar requisições de webhook' 
        : 'Use this key to authenticate webhook requests'}
    />
  );
};

export default WebhookAccessKey;
