
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useVoiceCallConfig } from '@/hooks/useVoiceCallConfig';
import { testVoiceCallConnection } from '@/utils/voiceCallIntegration';

const VoiceCallConfigTab: React.FC = () => {
  const { language } = useTheme();
  const { config, updateConfig } = useVoiceCallConfig();
  const [isTestingConnection, setIsTestingConnection] = React.useState(false);
  const [connectionStatus, setConnectionStatus] = React.useState<'success' | 'error' | null>(null);
  
  const handleToggleEnabled = (checked: boolean) => {
    updateConfig({ enabled: checked });
  };

  const handleProviderChange = (value: string) => {
    updateConfig({ provider: value as any });
  };

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateConfig({ apiKey: e.target.value });
  };

  const handleVoiceChange = (value: string) => {
    updateConfig({ voice: value });
  };

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus(null);
    
    try {
      const success = await testVoiceCallConnection({
        provider: config.provider,
        webhookUrl: config.webhookUrl,
      });
      
      setConnectionStatus(success ? 'success' : 'error');
    } catch (error) {
      console.error('Test connection error:', error);
      setConnectionStatus('error');
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Configuração de Ligações de Voz' : 'Voice Call Configuration'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure o provedor de ligações de voz para pesquisas automáticas.' 
            : 'Configure voice call provider for automated surveys.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>
              {language === 'pt-BR' ? 'Habilitar Ligações Automáticas' : 'Enable Automated Calls'}
            </Label>
            <div className="text-sm text-muted-foreground">
              {language === 'pt-BR' 
                ? 'Permite que o sistema faça ligações automáticas para os responsáveis.' 
                : 'Allows the system to make automated calls to parents.'}
            </div>
          </div>
          <Switch 
            checked={config.enabled || false} 
            onCheckedChange={handleToggleEnabled} 
          />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="provider">
              {language === 'pt-BR' ? 'Provedor de API' : 'API Provider'}
            </Label>
            <Select 
              value={config.provider} 
              onValueChange={handleProviderChange}
              disabled={!config.enabled}
            >
              <SelectTrigger id="provider">
                <SelectValue placeholder={language === 'pt-BR' ? 'Selecione um provedor' : 'Select a provider'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disabled">
                  {language === 'pt-BR' ? 'Desabilitado' : 'Disabled'}
                </SelectItem>
                <SelectItem value="twilio">Twilio</SelectItem>
                <SelectItem value="elevenlabs">Eleven Labs</SelectItem>
                <SelectItem value="openai">OpenAI</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {config.provider !== 'disabled' && (
            <div className="space-y-2">
              <Label htmlFor="apiKey">
                {language === 'pt-BR' ? 'Chave da API' : 'API Key'}
              </Label>
              <Input
                id="apiKey"
                type="password"
                value={config.apiKey || ''}
                onChange={handleApiKeyChange}
                placeholder={language === 'pt-BR' ? 'Insira sua chave de API' : 'Enter your API key'}
                disabled={!config.enabled}
              />
            </div>
          )}

          {config.provider !== 'disabled' && (
            <div className="space-y-2">
              <Label htmlFor="voice">
                {language === 'pt-BR' ? 'Voz' : 'Voice'}
              </Label>
              <Select 
                value={config.voice || 'alloy'} 
                onValueChange={handleVoiceChange}
                disabled={!config.enabled}
              >
                <SelectTrigger id="voice">
                  <SelectValue placeholder={language === 'pt-BR' ? 'Selecione uma voz' : 'Select a voice'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alloy">Alloy</SelectItem>
                  <SelectItem value="echo">Echo</SelectItem>
                  <SelectItem value="fable">Fable</SelectItem>
                  <SelectItem value="onyx">Onyx</SelectItem>
                  <SelectItem value="nova">Nova</SelectItem>
                  <SelectItem value="shimmer">Shimmer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {language === 'pt-BR' 
                  ? 'A voz que será usada para fazer as ligações automáticas.' 
                  : 'The voice that will be used for automated calls.'}
              </p>
            </div>
          )}

          {config.provider !== 'disabled' && (
            <div className="flex items-center space-x-2 pt-4">
              <Button 
                onClick={handleTestConnection} 
                disabled={isTestingConnection || !config.enabled || !config.apiKey}
                variant="outline"
              >
                {isTestingConnection 
                  ? (language === 'pt-BR' ? 'Testando...' : 'Testing...') 
                  : (language === 'pt-BR' ? 'Testar Conexão' : 'Test Connection')}
              </Button>
              
              {connectionStatus === 'success' && (
                <p className="text-sm text-green-600">
                  {language === 'pt-BR' ? 'Conexão bem-sucedida!' : 'Connection successful!'}
                </p>
              )}
              
              {connectionStatus === 'error' && (
                <p className="text-sm text-red-600">
                  {language === 'pt-BR' ? 'Falha na conexão. Verifique suas credenciais.' : 'Connection failed. Check your credentials.'}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCallConfigTab;
