
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVoiceCallConfig } from '@/hooks/useVoiceCallConfig';
import { VoiceCallProvider } from '@/utils/voiceCallIntegration';
import { testVoiceCallConnection } from '@/utils/voiceCallIntegration';
import { Phone } from 'lucide-react';

const VoiceCallApiIntegration: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { config, updateConfig } = useVoiceCallConfig();
  const [isTesting, setIsTesting] = useState(false);
  
  const handleProviderChange = (value: string) => {
    updateConfig({ provider: value as VoiceCallProvider });
  };
  
  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig({ apiKey: e.target.value });
  };
  
  const handleVoiceChange = (value: string) => {
    updateConfig({ voice: value });
  };
  
  const handleWebhookUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig({ webhookUrl: e.target.value });
  };
  
  const handleTestConnection = async () => {
    setIsTesting(true);
    
    try {
      // Pass only the props needed for testing
      const connectionTestConfig = {
        provider: config.provider,
        webhookUrl: config.webhookUrl
      };
      
      const isConnected = await testVoiceCallConnection(connectionTestConfig);
      
      if (isConnected) {
        toast({
          title: language === 'pt-BR' ? 'Conexão bem-sucedida' : 'Connection successful',
          description: language === 'pt-BR' 
            ? 'A conexão com o provedor de voz foi estabelecida com sucesso' 
            : 'The connection with the voice provider was successfully established',
        });
      } else {
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
          {language === 'pt-BR' ? 'Configuração Técnica de Ligações de Voz' : 'Voice Call Technical Configuration'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure o provedor e credenciais para ligações de voz' 
            : 'Configure voice call provider and credentials'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="voice-provider">
            {language === 'pt-BR' ? 'Provedor de Ligações' : 'Voice Call Provider'}
          </Label>
          <Select value={config.provider} onValueChange={handleProviderChange}>
            <SelectTrigger id="voice-provider">
              <SelectValue placeholder={language === 'pt-BR' ? "Selecione o provedor" : "Select provider"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="disabled">{language === 'pt-BR' ? 'Desativado' : 'Disabled'}</SelectItem>
              <SelectItem value="twilio">Twilio</SelectItem>
              <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
              <SelectItem value="openai">OpenAI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {config.provider !== 'disabled' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="api-key">
                {language === 'pt-BR' ? 'Chave da API' : 'API Key'}
              </Label>
              <Input 
                id="api-key" 
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

            {(config.provider === 'elevenlabs' || config.provider === 'openai') && (
              <div className="space-y-2">
                <Label htmlFor="voice">
                  {language === 'pt-BR' ? 'Voz para sintetização' : 'Voice for synthesis'}
                </Label>
                <Select value={config.voice || 'alloy'} onValueChange={handleVoiceChange}>
                  <SelectTrigger id="voice">
                    <SelectValue placeholder={language === 'pt-BR' ? "Selecione a voz" : "Select voice"} />
                  </SelectTrigger>
                  <SelectContent>
                    {config.provider === 'openai' ? (
                      <>
                        <SelectItem value="alloy">Alloy</SelectItem>
                        <SelectItem value="echo">Echo</SelectItem>
                        <SelectItem value="fable">Fable</SelectItem>
                        <SelectItem value="onyx">Onyx</SelectItem>
                        <SelectItem value="nova">Nova</SelectItem>
                        <SelectItem value="shimmer">Shimmer</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Rachel">Rachel</SelectItem>
                        <SelectItem value="Drew">Drew</SelectItem>
                        <SelectItem value="Clyde">Clyde</SelectItem>
                        <SelectItem value="Domi">Domi</SelectItem>
                        <SelectItem value="Daniel">Daniel</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            {config.provider === 'twilio' && (
              <div className="space-y-2">
                <Label htmlFor="webhook-url">
                  {language === 'pt-BR' ? 'URL do Webhook' : 'Webhook URL'}
                </Label>
                <Input 
                  id="webhook-url" 
                  value={config.webhookUrl || ''} 
                  onChange={handleWebhookUrlChange}
                  placeholder="https://..."
                />
                <p className="text-sm text-muted-foreground">
                  {language === 'pt-BR' 
                    ? 'URL do seu webhook para receber eventos de ligações' 
                    : 'URL of your webhook to receive call events'}
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
                    <Phone className="mr-2 h-4 w-4" />
                    {language === 'pt-BR' ? 'Testar Conexão' : 'Test Connection'}
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceCallApiIntegration;
