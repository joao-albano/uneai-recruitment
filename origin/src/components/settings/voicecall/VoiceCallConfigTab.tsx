
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Phone } from 'lucide-react';
import { useVoiceCallConfig } from '@/hooks/useVoiceCallConfig';

const VoiceCallConfigTab: React.FC = () => {
  const { language } = useTheme();
  const { config, updateConfig } = useVoiceCallConfig();
  
  const handleToggleEnabled = (checked: boolean) => {
    updateConfig({ enabled: checked });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Configuração de Ligações de Voz' : 'Voice Call Configuration'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Configure as ligações automáticas para pesquisas.' 
            : 'Configure automated calls for surveys.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {config.provider !== 'disabled' ? (
          <Alert className="bg-green-50 border-green-200">
            <Phone className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-700">
              {language === 'pt-BR' ? 'Serviço de ligações configurado' : 'Voice call service configured'}
            </AlertTitle>
            <AlertDescription className="text-green-700">
              {language === 'pt-BR' 
                ? `Provedor atual: ${config.provider}. Para alterar as configurações técnicas, acesse o menu de Administração de APIs.` 
                : `Current provider: ${config.provider}. To change technical settings, access the API Administration menu.`}
            </AlertDescription>
          </Alert>
        ) : (
          <Alert variant="destructive">
            <Phone className="h-4 w-4" />
            <AlertTitle>
              {language === 'pt-BR' ? 'Serviço de ligações desativado' : 'Voice call service disabled'}
            </AlertTitle>
            <AlertDescription>
              {language === 'pt-BR' 
                ? 'Para configurar o serviço de ligações, solicite ao Administrador do Sistema.' 
                : 'To configure the voice call service, contact your System Administrator.'}
            </AlertDescription>
          </Alert>
        )}

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
            disabled={config.provider === 'disabled'}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCallConfigTab;
