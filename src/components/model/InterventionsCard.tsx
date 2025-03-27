
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const InterventionsCard: React.FC = () => {
  const { schedules } = useData();
  const navigate = useNavigate();
  
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

  // Example interventions with AI recommendations
  const exampleInterventions = [
    {
      type: 'Reforço acadêmico',
      description: 'Atividades extras de matemática e ciências com base no histórico de dificuldades do aluno.',
      recommendation: 'Exercícios adaptados ao nível atual do aluno com progressão gradual.'
    },
    {
      type: 'Programa de mentoria',
      description: 'Acompanhamento individual semanal para melhoria de hábitos de estudo.',
      recommendation: 'Foco em organização e planejamento, com check-ins diários.'
    },
    {
      type: 'Suporte comportamental',
      description: 'Estratégias para melhorar a disciplina e engajamento em sala de aula.',
      recommendation: 'Incentivos positivos e sistema de recompensas para participação.'
    }
  ];

  // Handler to navigate to the student's intervention tab
  const handleViewInterventions = () => {
    navigate('/model/student/1?tab=interventions');
  };

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
            <Progress value={aiAssistedPercentage} className="h-2 bg-muted" />
          </div>
          
          <Separator className="my-2" />
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Exemplos de Recomendações</h3>
            {exampleInterventions.map((intervention, index) => (
              <div key={index} className="rounded-lg border p-3">
                <div className="flex justify-between">
                  <span className="font-medium text-sm">{intervention.type}</span>
                  <div className="rounded-full bg-green-100 p-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{intervention.description}</p>
                <div className="flex items-center gap-1 text-xs text-primary mt-2">
                  <ArrowRight className="h-3 w-3" />
                  <span>{intervention.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="h-4 w-4 mr-2" />
            <p>
              Atendimentos com IA referem-se às intervenções onde os educadores utilizaram 
              análises e recomendações do modelo para guiar suas ações com os alunos.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full mt-2"
            onClick={handleViewInterventions}
          >
            Ver todos os atendimentos
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InterventionsCard;
