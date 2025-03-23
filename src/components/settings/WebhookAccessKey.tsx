
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2 } from 'lucide-react';

const WebhookAccessKey: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyKey = () => {
    const webhookKey = "sk_test_webhook_key_12345";
    navigator.clipboard.writeText(webhookKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: language === 'pt-BR' ? 'Chave copiada' : 'Key copied',
      description: language === 'pt-BR' 
        ? 'A chave do webhook foi copiada para a área de transferência' 
        : 'The webhook key has been copied to your clipboard',
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Chave de Acesso aos Webhooks' : 'Webhook Access Key'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Use esta chave para autenticar requisições de webhook' 
            : 'Use this key to authenticate webhook requests'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
          <div className="font-mono text-sm">sk_test_webhook_key_••••••••••••</div>
          <Button variant="outline" size="sm" onClick={copyKey}>
            {copied ? (
              <CheckCircle2 className="h-4 w-4 mr-1" />
            ) : (
              <Copy className="h-4 w-4 mr-1" />
            )}
            {language === 'pt-BR' ? 'Copiar' : 'Copy'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookAccessKey;
