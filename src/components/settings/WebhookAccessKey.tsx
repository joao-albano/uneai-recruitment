
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const WebhookAccessKey: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const webhookKey = "sk_test_webhook_key_12345";

  const copyKey = () => {
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

  const toggleVisibility = () => {
    setShowKey(!showKey);
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
          <div className="font-mono text-sm">
            {showKey ? webhookKey : 'sk_test_webhook_key_••••••••••••'}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={toggleVisibility}>
              {showKey ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  {language === 'pt-BR' ? 'Ocultar' : 'Hide'}
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  {language === 'pt-BR' ? 'Mostrar' : 'Show'}
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={copyKey}>
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  {language === 'pt-BR' ? 'Copiado' : 'Copied'}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  {language === 'pt-BR' ? 'Copiar' : 'Copy'}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookAccessKey;
