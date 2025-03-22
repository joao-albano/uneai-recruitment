
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const NotificationSettings: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  
  const handleSaveChanges = () => {
    toast({
      title: language === 'pt-BR' ? 'Alterações salvas' : 'Changes saved',
      description: language === 'pt-BR' 
        ? 'Suas configurações foram atualizadas com sucesso' 
        : 'Your settings have been successfully updated',
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Preferências de Notificação' : 'Notification Preferences'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR'
            ? 'Configure como e quando você deseja receber alertas do sistema'
            : 'Configure how and when you want to receive system alerts'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">
              {language === 'pt-BR' ? 'Notificações por E-mail' : 'Email Notifications'}
            </Label>
            <p className="text-sm text-muted-foreground">
              {language === 'pt-BR'
                ? 'Receba alertas importantes por e-mail'
                : 'Receive important alerts via email'}
            </p>
          </div>
          <Switch id="email-notifications" defaultChecked />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="whatsapp-notifications">
              {language === 'pt-BR' ? 'Notificações por WhatsApp' : 'WhatsApp Notifications'}
            </Label>
            <p className="text-sm text-muted-foreground">
              {language === 'pt-BR'
                ? 'Envie alertas para responsáveis via WhatsApp'
                : 'Send alerts to guardians via WhatsApp'}
            </p>
          </div>
          <Switch id="whatsapp-notifications" defaultChecked />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="risk-alerts">
              {language === 'pt-BR' ? 'Alertas de Risco Alto' : 'High Risk Alerts'}
            </Label>
            <p className="text-sm text-muted-foreground">
              {language === 'pt-BR'
                ? 'Alerta em tempo real para situações de alto risco'
                : 'Real-time alerts for high-risk situations'}
            </p>
          </div>
          <Switch id="risk-alerts" defaultChecked />
        </div>
        
        <Separator />
        
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges}>
            {language === 'pt-BR' ? 'Salvar Preferências' : 'Save Preferences'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
