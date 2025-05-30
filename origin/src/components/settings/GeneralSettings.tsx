
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const GeneralSettings: React.FC = () => {
  const { theme, language, toggleTheme, setLanguage } = useTheme();
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
          {language === 'pt-BR' ? 'Configurações Gerais' : 'General Settings'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR'
            ? 'Configure as preferências básicas do sistema'
            : 'Configure basic system preferences'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="theme">
              {language === 'pt-BR' ? 'Tema Escuro' : 'Dark Theme'}
            </Label>
            <p className="text-sm text-muted-foreground">
              {language === 'pt-BR'
                ? 'Ative para usar o tema escuro na interface'
                : 'Enable to use dark theme across the interface'}
            </p>
          </div>
          <Switch 
            id="theme" 
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
          />
        </div>
        
        <Separator />
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="language">
              {language === 'pt-BR' ? 'Idioma' : 'Language'}
            </Label>
            <p className="text-sm text-muted-foreground">
              {language === 'pt-BR'
                ? 'O sistema está configurado para Português (Brasil)'
                : 'The system is configured for English'}
            </p>
          </div>
          <Select 
            value={language} 
            onValueChange={(value) => setLanguage(value as 'pt-BR' | 'en-US')}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'pt-BR' ? 'Selecione o idioma' : 'Select language'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pt-BR">Português (BR)</SelectItem>
              <SelectItem value="en-US">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Separator />
        
        <div className="flex justify-end">
          <Button onClick={handleSaveChanges}>
            {language === 'pt-BR' ? 'Salvar Alterações' : 'Save Changes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralSettings;
