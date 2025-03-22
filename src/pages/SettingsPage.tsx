
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Shield, Globe, Moon, User, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Settings page content component
const SettingsPageContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, language, toggleTheme, setLanguage } = useTheme();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleSaveChanges = () => {
    toast({
      title: language === 'pt-BR' ? 'Alterações salvas' : 'Changes saved',
      description: language === 'pt-BR' 
        ? 'Suas configurações foram atualizadas com sucesso' 
        : 'Your settings have been successfully updated',
    });
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {language === 'pt-BR' ? 'Configurações' : 'Settings'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'pt-BR' 
                ? 'Gerencie as configurações da plataforma de acordo com as necessidades da sua escola'
                : 'Manage platform settings according to your school\'s needs'}
            </p>
          </div>
          
          <Tabs defaultValue="general" className="max-w-4xl">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="general">
                {language === 'pt-BR' ? 'Geral' : 'General'}
              </TabsTrigger>
              <TabsTrigger value="notifications">
                {language === 'pt-BR' ? 'Notificações' : 'Notifications'}
              </TabsTrigger>
              <TabsTrigger value="security">
                {language === 'pt-BR' ? 'Segurança' : 'Security'}
              </TabsTrigger>
              <TabsTrigger value="advanced">
                {language === 'pt-BR' ? 'Avançado' : 'Advanced'}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
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
            </TabsContent>
            
            <TabsContent value="notifications">
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
            </TabsContent>
            
            <TabsContent value="security">
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
            </TabsContent>
            
            <TabsContent value="advanced">
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
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

// Wrapper with DataProvider
const SettingsPage: React.FC = () => {
  return (
    <DataProvider>
      <SettingsPageContent />
    </DataProvider>
  );
};

export default SettingsPage;
