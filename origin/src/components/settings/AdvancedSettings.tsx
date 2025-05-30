
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle } from 'lucide-react';

const AdvancedSettings: React.FC = () => {
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
          {language === 'pt-BR' ? 'Configurações Avançadas' : 'Advanced Settings'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR'
            ? 'Opções avançadas e ferramentas administrativas'
            : 'Advanced options and administrative tools'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
              {language === 'pt-BR' ? 'Modo de Depuração' : 'Debug Mode'}
            </Label>
            <p className="text-sm text-muted-foreground">
              {language === 'pt-BR'
                ? 'Ativa logs detalhados para solução de problemas'
                : 'Enable detailed logs for troubleshooting'}
            </p>
          </div>
          <Switch id="debug-mode" />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="data-retention">
              {language === 'pt-BR' ? 'Retenção de Dados' : 'Data Retention'}
            </Label>
            <p className="text-sm text-muted-foreground">
              {language === 'pt-BR'
                ? 'Manter histórico de dados por 12 meses'
                : 'Keep data history for 12 months'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {language === 'pt-BR' ? '12 meses' : '12 months'}
            </span>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex justify-between">
          <Button variant="outline">
            {language === 'pt-BR' ? 'Exportar Todos os Dados' : 'Export All Data'}
          </Button>
          <Button onClick={handleSaveChanges}>
            {language === 'pt-BR' ? 'Salvar Configurações' : 'Save Settings'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSettings;
