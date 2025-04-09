
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, CalendarDays, CalendarPlus, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import PeriodsHeader from './PeriodsHeader';
import PeriodsInfo from './PeriodsInfo';

const PeriodsConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('academic');
  const { toast } = useToast();
  const [periods, setPeriods] = useState<any[]>([]);

  const handleAddPeriod = (newPeriod: any) => {
    setPeriods(prevPeriods => [...prevPeriods, newPeriod]);
    
    toast({
      title: "Período adicionado",
      description: "O novo período foi adicionado com sucesso.",
      duration: 3000,
    });
  };

  const handleEditPeriod = () => {
    toast({
      title: "Edição em desenvolvimento",
      description: "A edição de períodos estará disponível em breve.",
      duration: 3000,
    });
  };

  const handleDeletePeriod = () => {
    toast({
      title: "Exclusão em desenvolvimento",
      description: "A exclusão de períodos estará disponível em breve.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <PeriodsHeader onAddPeriod={handleAddPeriod} />
      
      <Alert variant="default" className="bg-primary/5 border-primary/20">
        <InfoIcon className="h-4 w-4 text-primary" />
        <AlertTitle>Este recurso está em fase de implementação</AlertTitle>
        <AlertDescription>
          A configuração de períodos permitirá definir o calendário acadêmico, marcos importantes
          para captação e períodos de análise para o sistema de previsão.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="academic" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="academic">Períodos Acadêmicos</TabsTrigger>
          <TabsTrigger value="milestones">Marcos Importantes</TabsTrigger>
          <TabsTrigger value="analysis">Períodos de Análise</TabsTrigger>
        </TabsList>
        
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Períodos Acadêmicos</CardTitle>
                <CardDescription>
                  Configure os períodos letivos para planejamento de captação
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Período 1 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <CalendarDays className="h-5 w-5 text-primary mr-2" />
                          <h3 className="font-semibold text-base">2025.1</h3>
                          <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">Ativo</Badge>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Início:</span> 01/02/2025
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Fim:</span> 30/06/2025
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Captação:</span> 01/10/2024 até 28/02/2025
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Período 2 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <CalendarDays className="h-5 w-5 text-primary mr-2" />
                          <h3 className="font-semibold text-base">2024.2</h3>
                          <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-200">Em andamento</Badge>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Início:</span> 01/08/2024
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Fim:</span> 15/12/2024
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Captação:</span> 15/05/2024 até 15/08/2024
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Período 3 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <CalendarDays className="h-5 w-5 text-primary mr-2" />
                          <h3 className="font-semibold text-base">2024.1</h3>
                          <Badge className="ml-2 bg-slate-100 text-slate-800 hover:bg-slate-200">Concluído</Badge>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Início:</span> 05/02/2024
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Fim:</span> 30/06/2024
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Captação:</span> 01/10/2023 até 28/02/2024
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Add newly created periods */}
                {periods.filter(p => p.type === 'academic').map((period) => (
                  <Card key={period.id} className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <CalendarDays className="h-5 w-5 text-primary mr-2" />
                            <h3 className="font-semibold text-base">{period.name}</h3>
                            <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">
                              {period.status === 'active' && 'Ativo'}
                              {period.status === 'inProgress' && 'Em andamento'}
                              {period.status === 'completed' && 'Concluído'}
                            </Badge>
                          </div>
                          <div className="text-sm mb-1">
                            <span className="font-medium">Início:</span> {new Date(period.startDate).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-sm mb-1">
                            <span className="font-medium">Fim:</span> {new Date(period.endDate).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Captação:</span> {new Date(period.recruitmentStartDate).toLocaleDateString('pt-BR')} até {new Date(period.recruitmentEndDate).toLocaleDateString('pt-BR')}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Marcos Importantes</CardTitle>
                <CardDescription>
                  Defina datas críticas para o processo de captação
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Marco 1 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-base">Vestibular 2025.1</h3>
                          <Badge className="ml-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Planejado</Badge>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Data:</span> 10/12/2024
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Período:</span> 2025.1
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Descrição:</span> Prova principal do vestibular para ingressos em 2025.1
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Marco 2 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-base">Matrículas 2025.1</h3>
                          <Badge className="ml-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Planejado</Badge>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Início:</span> 05/01/2025
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Fim:</span> 31/01/2025
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Descrição:</span> Período de matrículas para calouros do primeiro semestre
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Marco 3 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-base">Início das aulas 2025.1</h3>
                          <Badge className="ml-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">Planejado</Badge>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Data:</span> 03/02/2025
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Período:</span> 2025.1
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Descrição:</span> Primeiro dia de aulas do período 2025.1
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Add newly created milestones */}
                {periods.filter(p => p.type === 'milestone').map((milestone) => (
                  <Card key={milestone.id} className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="font-semibold text-base">{milestone.name}</h3>
                            <Badge className="ml-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                              {milestone.status === 'planned' && 'Planejado'}
                              {milestone.status === 'completed' && 'Concluído'}
                              {milestone.status === 'delayed' && 'Atrasado'}
                            </Badge>
                          </div>
                          <div className="text-sm mb-1">
                            <span className="font-medium">Data:</span> {new Date(milestone.date).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-sm mb-1">
                            <span className="font-medium">Período:</span> {milestone.period}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Descrição:</span> {milestone.description || 'Sem descrição'}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>Períodos de Análise</CardTitle>
                <CardDescription>
                  Configure os intervalos para análise de previsões
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Análise 1 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-base">Análise de Captação 2025.1</h3>
                          <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">Em andamento</Badge>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Início:</span> 01/10/2024
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Fim:</span> 28/02/2025
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Descrição:</span> Análise de captação para o período 2025.1
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Análise 2 */}
                <Card className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="font-semibold text-base">Revisão Semestral 2024.2</h3>
                          <Badge className="ml-2 bg-slate-100 text-slate-800 hover:bg-slate-200">Concluído</Badge>
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Início:</span> 15/05/2024
                        </div>
                        <div className="text-sm mb-1">
                          <span className="font-medium">Fim:</span> 15/08/2024
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Descrição:</span> Revisão da captação para o período 2024.2
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Add newly created analysis periods */}
                {periods.filter(p => p.type === 'analysis').map((analysis) => (
                  <Card key={analysis.id} className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="font-semibold text-base">{analysis.name}</h3>
                            <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                              {analysis.status === 'planned' && 'Planejado'}
                              {analysis.status === 'inProgress' && 'Em andamento'}
                              {analysis.status === 'completed' && 'Concluído'}
                            </Badge>
                          </div>
                          <div className="text-sm mb-1">
                            <span className="font-medium">Início:</span> {new Date(analysis.startDate).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-sm mb-1">
                            <span className="font-medium">Fim:</span> {new Date(analysis.endDate).toLocaleDateString('pt-BR')}
                          </div>
                          <div className="text-sm">
                            <span className="font-medium">Descrição:</span> {analysis.description || 'Sem descrição'}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={handleEditPeriod}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={handleDeletePeriod}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <PeriodsInfo />
    </div>
  );
};

export default PeriodsConfiguration;
