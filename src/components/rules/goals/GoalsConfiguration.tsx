
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import GoalsInfo from './GoalsInfo';
import GoalsList from './GoalsList';
import GoalsHeader from './GoalsHeader';
import { useToast } from '@/components/ui/use-toast';

const GoalsConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();
  
  const handleAddGoal = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A criação de novas metas estará disponível em breve.",
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-6">
      <GoalsHeader onAddGoal={handleAddGoal} />
      
      <Alert variant="default" className="bg-primary/5 border-primary/20">
        <InfoIcon className="h-4 w-4 text-primary" />
        <AlertTitle>Este recurso está em fase de implementação</AlertTitle>
        <AlertDescription>
          O painel de configuração de metas permitirá definir objetivos para matrículas por curso, período e unidade.
          Estas metas serão utilizadas no sistema de previsão para acompanhar o progresso e calcular estimativas.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="general" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">Configuração Geral</TabsTrigger>
          <TabsTrigger value="course">Metas por Curso</TabsTrigger>
          <TabsTrigger value="campus">Metas por Unidade</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuração Geral de Metas</CardTitle>
              <CardDescription>
                Configure metas gerais para o período de captação atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoalsList category="general" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="course" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metas por Curso</CardTitle>
              <CardDescription>
                Configure metas específicas para cada curso oferecido
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoalsList category="course" />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="campus" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metas por Unidade</CardTitle>
              <CardDescription>
                Configure metas específicas para cada unidade ou campus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoalsList category="campus" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <GoalsInfo />
    </div>
  );
};

export default GoalsConfiguration;
