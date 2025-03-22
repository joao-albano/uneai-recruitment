
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const SecuritySettings: React.FC = () => {
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
          {language === 'pt-BR' ? 'Segurança e Privacidade' : 'Security and Privacy'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR'
            ? 'Configure as opções de segurança e privacidade do sistema'
            : 'Configure system security and privacy options'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="two-factor">
              {language === 'pt-BR' ? 'Autenticação de Dois Fatores' : 'Two-Factor Authentication'}
            </Label>
            <p className="text-sm text-muted-foreground">
              {language === 'pt-BR'
                ? 'Aumenta a segurança da sua conta com verificação adicional'
                : 'Enhance your account security with additional verification'}
            </p>
          </div>
          <Switch id="two-factor" />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="data-privacy">
              {language === 'pt-BR' ? 'Compartilhamento de Dados' : 'Data Sharing'}
            </Label>
            <p className="text-sm text-muted-foreground">
              {language === 'pt-BR'
                ? 'Permitir compartilhamento anônimo de dados para melhorias'
                : 'Allow anonymous data sharing for improvements'}
            </p>
          </div>
          <Switch id="data-privacy" defaultChecked />
        </div>
        
        <Separator />
        
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges}>
            {language === 'pt-BR' ? 'Salvar Configurações' : 'Save Settings'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
