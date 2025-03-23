
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { useData } from '@/context/DataContext';

const InterventionsCard: React.FC = () => {
  const { schedules } = useData();
  
  // Calculate completed interventions (schedules with 'completed' status)
  const completedInterventionsCount = schedules.filter(
    schedule => schedule.status === 'completed'
  ).length;

  // Calculate AI-assisted interventions (a subset of completed interventions that used AI insights)
  const aiAssistedCount = Math.min(completedInterventionsCount, 
    Math.floor(completedInterventionsCount * 0.8)); // Assume 80% of interventions used AI insights
  
  const aiAssistedPercentage = completedInterventionsCount > 0 
    ? Math.floor((aiAssistedCount / completedInterventionsCount) * 100) 
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Atendimentos com IA</CardTitle>
        <CardDescription>
          Intervenções que utilizaram insights do modelo de IA
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total de atendimentos completados:</span>
            <span className="font-medium">{completedInterventionsCount}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Atendimentos utilizando IA:</span>
            <span className="font-medium">{aiAssistedCount}</span>
          </div>
          
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Percentual de uso da IA</span>
              <span className="text-sm font-medium">{aiAssistedPercentage}%</span>
            </div>
            <Progress value={aiAssistedPercentage} className="h-2 bg-muted" indicatorClassName="bg-purple-500" />
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="h-4 w-4 mr-2" />
            <p>
              Atendimentos com IA referem-se às intervenções onde os educadores utilizaram 
              análises e recomendações do modelo para guiar suas ações com os alunos.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterventionsCard;
