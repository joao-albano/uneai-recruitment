
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { WhatsAppProvider } from '@/types/whatsapp';
import { testWhatsAppConnection } from '@/utils/whatsappIntegration';
import { WhatsAppConfig } from '@/utils/whatsappIntegration';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';
import { MessageSquare } from 'lucide-react';

const WhatsAppApiIntegration: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { config, updateConfig } = useWhatsAppConfig();
  const [isTesting, setIsTesting] = useState(false);

  const handleProviderChange = (value: string) => {
    updateConfig({ provider: value as WhatsAppProvider });
  };

  const handleWebhookUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig({ webhookUrl: e.target.value });
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig({ apiKey: e.target.value });
  };

  const handleTestConnection = async () => {
    setIsTesting(true);
    
    try {
      const isConnected = await testWhatsAppConnection(config);
      
      if (isConnected) {
        updateConfig({ connected: true });
        toast({
          title: language === 'pt-BR' ? 'Conexão bem-sucedida' : 'Connection successful',
          description: language === 'pt-BR' 
            ? 'A conexão com o provedor WhatsApp foi estabelecida com sucesso' 
            : 'The connection with the WhatsApp provider was successfully established',
        });
      } else {
        updateConfig({ connected: false });
        toast({
          title: language === 'pt-BR' ? 'Falha na conexão' : 'Connection failed',
          description: language === 'pt-BR' 
            ? 'Não foi possível estabelecer conexão com o provedor' 
            : 'Could not establish connection with the provider',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error testing connection:', error);
      toast({
        title: language === 'pt-BR' ? 'Erro ao testar' : 'Testing error',
        description: String(error),
        variant: 'destructive',
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Configuração Técnica do WhatsApp' : 'WhatsApp Technical Configuration'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure o provedor e credenciais do WhatsApp' 
            : 'Configure WhatsApp provider and credentials'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="provider">
            {language === 'pt-BR' ? 'Provedor de WhatsApp' : 'WhatsApp Provider'}
          </Label>
          <Select value={config.provider} onValueChange={handleProviderChange}>
            <SelectTrigger id="provider">
              <SelectValue placeholder={language === 'pt-BR' ? "Selecione o provedor" : "Select provider"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="disabled">{language === 'pt-BR' ? 'Desativado' : 'Disabled'}</SelectItem>
              <SelectItem value="n8n_webhook">{language === 'pt-BR' ? 'n8n Webhook' : 'n8n Webhook'}</SelectItem>
              <SelectItem value="whatsapp-web">{language === 'pt-BR' ? 'WhatsApp Web' : 'WhatsApp Web'}</SelectItem>
              <SelectItem value="twilio">Twilio</SelectItem>
              <SelectItem value="messagebird">MessageBird</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {config.provider !== 'disabled' && (
          <>
            {config.provider === 'n8n_webhook' && (
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">
                  {language === 'pt-BR' ? 'URL do Webhook' : 'Webhook URL'}
                </Label>
                <Input 
                  id="webhookUrl" 
                  value={config.webhookUrl || ''} 
                  onChange={handleWebhookUrlChange}
                  placeholder="https://..."
                />
                <p className="text-sm text-muted-foreground">
                  {language === 'pt-BR' 
                    ? 'URL do seu webhook n8n para envio de mensagens' 
                    : 'URL of your n8n webhook for sending messages'}
                </p>
              </div>
            )}

            {(config.provider === 'twilio' || config.provider === 'messagebird') && (
              <div className="space-y-2">
                <Label htmlFor="apiKey">
                  {language === 'pt-BR' ? 'Chave da API' : 'API Key'}
                </Label>
                <Input 
                  id="apiKey" 
                  type="password"
                  value={config.apiKey || ''} 
                  onChange={handleApiKeyChange}
                  placeholder={language === 'pt-BR' ? "Insira sua chave de API" : "Enter your API key"}
                />
                <p className="text-sm text-muted-foreground">
                  {language === 'pt-BR' 
                    ? `Chave de API do ${config.provider}` 
                    : `${config.provider} API key`}
                </p>
              </div>
            )}

            <div className="pt-4">
              <Button 
                type="button" 
                onClick={handleTestConnection}
                disabled={isTesting}
              >
                {isTesting ? (
                  <>
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                    {language === 'pt-BR' ? 'Testando...' : 'Testing...'}
                  </>
                ) : (
                  <>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {language === 'pt-BR' ? 'Testar Conexão' : 'Test Connection'}
                  </>
                )}
              </Button>
            </div>
          </>
        )}

        <div className="flex items-center justify-between rounded-lg border p-3 mt-6">
          <div className="space-y-0.5">
            <Label>
              {language === 'pt-BR' ? 'Ativar integração com WhatsApp' : 'Enable WhatsApp integration'}
            </Label>
            <p className="text-sm text-muted-foreground">
              {language === 'pt-BR' 
                ? 'Ative para habilitar envio de mensagens via WhatsApp Business' 
                : 'Enable to allow sending messages via WhatsApp Business'}
            </p>
          </div>
          <Switch
            checked={config.enabled || false}
            onCheckedChange={(checked) => updateConfig({ enabled: checked })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsAppApiIntegration;
