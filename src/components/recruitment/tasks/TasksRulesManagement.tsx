
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TasksRulesHeader from './components/TasksRulesHeader';
import TasksRulesDistribution from './components/TasksRulesDistribution';
import TasksRulesPriorization from './components/TasksRulesPriorization';
import TasksRulesGeneration from './components/TasksRulesGeneration';
import { useTasksRules } from './hooks/useTasksRules';
import { Settings, Users, Filter } from 'lucide-react';

const TasksRulesManagement: React.FC = () => {
  const {
    distributionRules,
    priorizationRules,
    generationRules,
    updateDistributionRules,
    updatePriorizationRules,
    updateGenerationRules
  } = useTasksRules();
  
  return (
    <div className="space-y-4 w-full h-full">
      <TasksRulesHeader />
      
      <Card className="w-full h-[calc(100vh-200px)] overflow-auto">
        <Tabs defaultValue="generation" className="h-full flex flex-col p-4">
          <TabsList className="mb-4 grid grid-cols-3 w-full md:w-auto">
            <TabsTrigger value="generation" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Geração</span>
            </TabsTrigger>
            <TabsTrigger value="priorization" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Priorização</span>
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Distribuição</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex-grow overflow-auto">
            <TabsContent value="generation" className="h-full">
              <TasksRulesGeneration 
                rules={generationRules} 
                onUpdateRules={updateGenerationRules} 
              />
            </TabsContent>
            
            <TabsContent value="priorization" className="h-full">
              <TasksRulesPriorization 
                rules={priorizationRules} 
                onUpdateRules={updatePriorizationRules} 
              />
            </TabsContent>
            
            <TabsContent value="distribution" className="h-full">
              <TasksRulesDistribution 
                rules={distributionRules} 
                onUpdateRules={updateDistributionRules} 
              />
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
};

export default TasksRulesManagement;
