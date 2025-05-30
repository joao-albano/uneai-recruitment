
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { WebhookType } from './schemas';

interface WebhooksListProps {
  webhooks: WebhookType[];
  toggleWebhook: (id: string) => void;
  deleteWebhook: (id: string) => void;
}

const WebhooksList: React.FC<WebhooksListProps> = ({ 
  webhooks, 
  toggleWebhook, 
  deleteWebhook 
}) => {
  const { language } = useTheme();

  if (webhooks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">
        {language === 'pt-BR' ? 'Webhooks Configurados' : 'Configured Webhooks'}
      </h3>
      
      {webhooks.map((webhook) => (
        <div key={webhook.id} className="flex items-center justify-between p-3 border rounded-md">
          <div className="space-y-1 flex-1">
            <p className="text-sm font-medium truncate">{webhook.url}</p>
            {webhook.description && (
              <p className="text-xs text-muted-foreground">{webhook.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={webhook.enabled}
              onCheckedChange={() => toggleWebhook(webhook.id)}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteWebhook(webhook.id)}
              className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
            >
              {language === 'pt-BR' ? 'Remover' : 'Remove'}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WebhooksList;
