import React, { useEffect } from 'react';
import { AlertTriangle, BookOpen, CheckCircle2, Clock, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import RiskCard from './RiskCard';
import Chart from './Chart';

const Dashboard: React.FC = () => {
  const { students, alerts, schedules, isLoading, generateDemoData } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (students.length === 0 && !isLoading) {
      generateDemoData();
      toast({
        title: 'Dados de demonstração',
        description: 'Carregamos alguns dados de exemplo para você explorar o sistema.',
      });
    }
  }, [students.length, generateDemoData, isLoading, toast]);
  
  const highRiskCount = students.filter(s => s.riskLevel === 'high').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'medium').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'low').length;
  
  const totalStudents = students.length;
  const highRiskPercentage = totalStudents > 0 
    ? ((highRiskCount / totalStudents) * 100).toFixed(1) 
    : '0';
    
  const recentAlerts = alerts.slice(0, 5);
  
  const upcomingSchedules = schedules
    .filter(s => s.status === 'scheduled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);
  
  const handleViewAlertDetails = (alertId: string) => {
    navigate(`/alerts?id=${alertId}`);
  };
  
  const handleViewClassDetails = (className: string) => {
    navigate(`/students?class=${className}`);
    
    toast({
      title: `Turma ${className}`,
      description: `Visualizando todos os alunos da turma ${className}`,
    });
  };

  const handleScheduleClick = (schedule: typeof schedules[0]) => {
    navigate('/schedule', { state: { studentId: schedule.studentId } });
    
    toast({
      title: 'Visualizando agendamento',
      description: `Detalhes do agendamento de ${schedule.studentName}`,
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral do risco de evasão escolar
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        </div>
      ) : totalStudents === 0 ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bem-vindo ao Une.AI EduCare</CardTitle>
            <CardDescription>
              Para começar, faça o upload de dados ou use nossos dados de demonstração.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button 
              onClick={generateDemoData}
              size="lg"
              className="w-full max-w-md"
            >
              Carregar dados de demonstração
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <RiskCard
              title="Alunos em Alto Risco"
              value={highRiskCount}
              description={`${highRiskPercentage}% do total de alunos`}
              icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
              className="border-l-4 border-l-red-500"
            />
            <RiskCard
              title="Total de Alunos"
              value={totalStudents}
              description="Alunos monitorados"
              icon={<Users className="h-4 w-4 text-blue-500" />}
              className="border-l-4 border-l-blue-500"
            />
            <RiskCard
              title="Alertas Pendentes"
              value={alerts.filter(a => !a.actionTaken).length}
              description="Ações necessárias"
              icon={<Clock className="h-4 w-4 text-yellow-500" />}
              className="border-l-4 border-l-yellow-500"
            />
            <RiskCard
              title="Atendimentos Realizados"
              value={schedules.filter(s => s.status === 'completed').length}
              description="Intervenções concluídas"
              icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
              className="border-l-4 border-l-green-500"
            />
          </div>
          
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="classes">Por Turma</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Chart
                  students={students}
                  title="Distribuição de Risco"
                  description="Porcentagem de alunos por nível de risco"
                />
                
                <Card className="shadow-md transition-all duration-300 hover:shadow-lg card-glow">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">Últimos Alertas</CardTitle>
                    <CardDescription>Alertas recentes que precisam de atenção</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-72 pr-4">
                      {recentAlerts.length > 0 ? (
                        <div className="space-y-3">
                          {recentAlerts.map((alert) => (
                            <div key={alert.id} className="flex items-start gap-3 rounded-lg border p-3">
                              <div className="flex-shrink-0">
                                {alert.type === 'high-risk' ? (
                                  <div className="rounded-full bg-red-100 p-1">
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                  </div>
                                ) : alert.type === 'medium-risk' ? (
                                  <div className="rounded-full bg-yellow-100 p-1">
                                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                                  </div>
                                ) : (
                                  <div className="rounded-full bg-blue-100 p-1">
                                    <BookOpen className="h-5 w-5 text-blue-500" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div className="font-medium">
                                    {alert.studentName}
                                    <Badge 
                                      variant="outline" 
                                      className="ml-2 text-xs font-normal"
                                    >
                                      {alert.studentClass}
                                    </Badge>
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(alert.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {alert.type === 'high-risk' 
                                    ? `${alert.studentName} possui múltiplos fatores de risco: notas baixas, frequência abaixo de 80% e problemas comportamentais.`
                                    : alert.type === 'medium-risk'
                                    ? `${alert.studentName} possui problemas de frequência (${Math.floor(Math.random() * 20) + 70}%) e notas limítrofes.`
                                    : `${alert.studentName} precisa de atenção para melhorar seu desempenho acadêmico.`
                                  }
                                </p>
                                <div className="mt-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleViewAlertDetails(alert.id)}
                                  >
                                    Ver detalhes
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-56 text-center">
                          <CheckCircle2 className="h-10 w-10 text-muted-foreground/40 mb-2" />
                          <p className="text-muted-foreground">Nenhum alerta pendente</p>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Próximos Atendimentos</CardTitle>
                  <CardDescription>Agendamentos para intervenção</CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSchedules.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {upcomingSchedules.map((schedule) => (
                        <Card 
                          key={schedule.id} 
                          className="border-t-4 border-t-primary cursor-pointer transition-shadow hover:shadow-md"
                          onClick={() => handleScheduleClick(schedule)}
                        >
                          <CardContent className="p-4">
                            <div className="flex flex-col space-y-2">
                              <span className="text-xs text-muted-foreground">
                                {schedule.date.toLocaleDateString()}, {schedule.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                              <span className="font-semibold">{schedule.studentName}</span>
                              <span className="text-sm text-muted-foreground">
                                {schedule.notes?.replace(/Discuss attendance and academic performance/g, "Discussão sobre frequência e desempenho acadêmico")
                                             .replace(/Parent meeting to address attendance issues/g, "Reunião com os pais para tratar questões de frequência")}
                              </span>
                              <div className="mt-2 flex items-center">
                                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                  {schedule.agentName}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                      <Clock className="h-10 w-10 text-muted-foreground/40 mb-2" />
                      <p className="text-muted-foreground">Nenhum atendimento agendado</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="classes" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                {Array.from(new Set(students.map(s => s.class))).map(className => {
                  const classStudents = students.filter(s => s.class === className);
                  return (
                    <Card key={className}>
                      <CardHeader>
                        <CardTitle className="text-lg">Turma {className}</CardTitle>
                        <CardDescription>
                          {classStudents.length} alunos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Alto Risco</span>
                            <span className="text-sm font-medium">
                              {classStudents.filter(s => s.riskLevel === 'high').length} alunos
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-red-500 rounded-full"
                              style={{ 
                                width: `${(classStudents.filter(s => s.riskLevel === 'high').length / classStudents.length) * 100}%` 
                              }}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-sm">Médio Risco</span>
                            <span className="text-sm font-medium">
                              {classStudents.filter(s => s.riskLevel === 'medium').length} alunos
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-yellow-500 rounded-full"
                              style={{ 
                                width: `${(classStudents.filter(s => s.riskLevel === 'medium').length / classStudents.length) * 100}%` 
                              }}
                            />
                          </div>
                          
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-sm">Baixo Risco</span>
                            <span className="text-sm font-medium">
                              {classStudents.filter(s => s.riskLevel === 'low').length} alunos
                            </span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ 
                                width: `${(classStudents.filter(s => s.riskLevel === 'low').length / classStudents.length) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          className="w-full mt-4" 
                          size="sm"
                          onClick={() => handleViewClassDetails(className)}
                        >
                          Ver detalhes
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Dashboard;
