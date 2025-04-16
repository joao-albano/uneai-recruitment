
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import GoalsInfo from './GoalsInfo';
import GoalsList from './GoalsList';
import GoalsHeader from './GoalsHeader';
import { useToast } from '@/components/ui/use-toast';

const GoalsConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { toast } = useToast();
  const [goals, setGoals] = useState<any[]>([]);
  
  const handleAddGoal = (newGoal: any) => {
    setGoals(prevGoals => [...prevGoals, newGoal]);
  };
  
  return (
    <div className="space-y-6">
      <GoalsHeader onAddGoal={handleAddGoal} activeCategory={activeTab} />
      
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
              <GoalsList category="general" goals={goals} />
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
              <GoalsList category="course" goals={goals} />
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
              <GoalsList category="campus" goals={goals} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <GoalsInfo />
    </div>
  );
};

export default GoalsConfiguration;
