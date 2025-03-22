
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bell, Shield, Globe, Moon, User, AlertTriangle } from 'lucide-react';

// Settings page content component
const SettingsPageContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie as configurações da plataforma de acordo com as necessidades da sua escola
            </p>
          </div>
          
          <Tabs defaultValue="general" className="max-w-4xl">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
              <TabsTrigger value="advanced">Avançado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Gerais</CardTitle>
                  <CardDescription>
                    Configure as preferências básicas do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="theme">Tema Escuro</Label>
                      <p className="text-sm text-muted-foreground">
                        Ative para usar o tema escuro na interface
                      </p>
                    </div>
                    <Switch id="theme" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="language">Idioma</Label>
                      <p className="text-sm text-muted-foreground">
                        O sistema está configurado para Português (Brasil)
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Português (BR)</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end">
                    <Button>Salvar Alterações</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Preferências de Notificação</CardTitle>
                  <CardDescription>
                    Configure como e quando você deseja receber alertas do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                      <p className="text-sm text-muted-foreground">
                        Receba alertas importantes por e-mail
                      </p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="whatsapp-notifications">Notificações por WhatsApp</Label>
                      <p className="text-sm text-muted-foreground">
                        Envie alertas para responsáveis via WhatsApp
                      </p>
                    </div>
                    <Switch id="whatsapp-notifications" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="risk-alerts">Alertas de Risco Alto</Label>
                      <p className="text-sm text-muted-foreground">
                        Alerta em tempo real para situações de alto risco
                      </p>
                    </div>
                    <Switch id="risk-alerts" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end">
                    <Button>Salvar Preferências</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Segurança e Privacidade</CardTitle>
                  <CardDescription>
                    Configure as opções de segurança e privacidade do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-muted-foreground">
                        Aumenta a segurança da sua conta com verificação adicional
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-privacy">Compartilhamento de Dados</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir compartilhamento anônimo de dados para melhorias
                      </p>
                    </div>
                    <Switch id="data-privacy" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-end">
                    <Button>Salvar Configurações</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="advanced">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações Avançadas</CardTitle>
                  <CardDescription>
                    Opções avançadas e ferramentas administrativas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                        Modo de Depuração
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Ativa logs detalhados para solução de problemas
                      </p>
                    </div>
                    <Switch id="debug-mode" />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-retention">Retenção de Dados</Label>
                      <p className="text-sm text-muted-foreground">
                        Manter histórico de dados por 12 meses
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">12 meses</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <Button variant="outline">Exportar Todos os Dados</Button>
                    <Button>Salvar Configurações</Button>
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
