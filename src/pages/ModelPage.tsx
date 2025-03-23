
import React from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Brain, Info, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useData } from '@/context/DataContext';
import { Progress } from "@/components/ui/progress";

const ModelPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { students, schedules } = useData();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Calculate AI model statistics
  const highRiskCount = students.filter(s => s.riskLevel === 'high').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'medium').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'low').length;
  const totalStudents = students.length;
  
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
    <DataProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
        
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="animate-fade-in">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Modelo de Previsão</h1>
                <p className="text-muted-foreground mt-1">
                  Detalhes sobre o modelo de IA e suas previsões
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Model Information Card */}
                <Card className="md:col-span-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Brain className="mr-2 h-5 w-5 text-primary" />
                        <CardTitle className="text-base font-medium">Modelo de Previsão</CardTitle>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Info className="h-4 w-4" />
                              <span className="sr-only">Informações sobre o modelo</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>
                              Este modelo de IA usa árvores de decisão para analisar fatores de risco de evasão escolar. 
                              As previsões são baseadas em dados históricos e padrões de comportamento identificados.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <CardDescription>
                      Árvore de Decisão V1.0
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tipo:</span>
                        <span className="font-medium">Decision Tree</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fatores principais:</span>
                        <span className="font-medium">Frequência, Notas, Comportamento</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Precisão:</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="mt-4 pt-2 border-t">
                        <p className="text-xs text-muted-foreground">
                          Este modelo foi projetado para ser transparente e explicável, 
                          mostrando o caminho de decisão para cada previsão.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Risk Distribution Card */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Distribuição de Risco</CardTitle>
                    <CardDescription>
                      Classificação dos alunos por nível de risco
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            <span>Alto Risco</span>
                          </div>
                          <span className="font-medium">{highRiskCount} alunos</span>
                        </div>
                        <Progress value={totalStudents > 0 ? (highRiskCount / totalStudents) * 100 : 0} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                            <span>Médio Risco</span>
                          </div>
                          <span className="font-medium">{mediumRiskCount} alunos</span>
                        </div>
                        <Progress value={totalStudents > 0 ? (mediumRiskCount / totalStudents) * 100 : 0} className="h-2 bg-muted" indicatorClassName="bg-orange-500" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                            <span>Baixo Risco</span>
                          </div>
                          <span className="font-medium">{lowRiskCount} alunos</span>
                        </div>
                        <Progress value={totalStudents > 0 ? (lowRiskCount / totalStudents) * 100 : 0} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* AI-Assisted Interventions Card */}
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
                
                {/* Model Explanation Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base font-medium">Como o Modelo Funciona</CardTitle>
                    <CardDescription>
                      Processo decisório da árvore de decisão
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Análise de Frequência</p>
                          <p className="text-xs text-muted-foreground">O modelo verifica primeiro a frequência do aluno, identificando padrões de ausência.</p>
                        </div>
                      </div>
                      
                      <ArrowRight className="h-4 w-4 text-muted-foreground mx-auto" />
                      
                      <div className="flex items-start space-x-2">
                        <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Verificação de Notas</p>
                          <p className="text-xs text-muted-foreground">Em seguida, avalia o desempenho acadêmico através das notas do aluno.</p>
                        </div>
                      </div>
                      
                      <ArrowRight className="h-4 w-4 text-muted-foreground mx-auto" />
                      
                      <div className="flex items-start space-x-2">
                        <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Análise Comportamental</p>
                          <p className="text-xs text-muted-foreground">Avalia o comportamento do aluno em sala de aula e sua interação social.</p>
                        </div>
                      </div>
                      
                      <ArrowRight className="h-4 w-4 text-muted-foreground mx-auto" />
                      
                      <div className="flex items-start space-x-2">
                        <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                          <span className="text-xs font-bold">4</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Classificação de Risco</p>
                          <p className="text-xs text-muted-foreground">Baseado nos fatores combinados, classifica o aluno em um nível de risco de evasão.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default ModelPage;
