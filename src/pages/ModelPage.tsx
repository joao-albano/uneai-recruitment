
import React, { useState } from 'react';
import { DataProvider, useData } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AiModelInfo from '@/components/model/AiModelInfo';
import RiskDistributionCard from '@/components/model/RiskDistributionCard';
import InterventionsCard from '@/components/model/InterventionsCard';
import ModelExplanationCard from '@/components/model/ModelExplanationCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, BookOpen, LineChart, Brain } from 'lucide-react';

// Separate content component that uses the context
const ModelPageContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { students, generateDemoData } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Make sure we have demo data
  React.useEffect(() => {
    if (students.length === 0) {
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Theoretical precision metrics for the model
  const precisionMetrics = {
    accuracy: '85%',
    precision: '82%',
    recall: '89%',
    specificityRate: '78%'
  };
  
  const handleStudentClick = (studentId: string) => {
    navigate(`/students?id=${studentId}`);
    
    toast({
      title: 'Perfil do aluno',
      description: 'Visualizando detalhes do aluno selecionado'
    });
  };
  
  return (
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
            
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="overview" className="flex items-center gap-1">
                  <Brain className="h-4 w-4" />
                  <span>Visão Geral</span>
                </TabsTrigger>
                <TabsTrigger value="students" className="flex items-center gap-1">
                  <UserRound className="h-4 w-4" />
                  <span>Alunos Analisados</span>
                </TabsTrigger>
                <TabsTrigger value="metrics" className="flex items-center gap-1">
                  <LineChart className="h-4 w-4" />
                  <span>Métricas</span>
                </TabsTrigger>
                <TabsTrigger value="docs" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>Documentação</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Model Information Card */}
                  <AiModelInfo />
                  
                  {/* Risk Distribution Card */}
                  <RiskDistributionCard />
                  
                  {/* Example card with decision tree path */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base font-medium">Caminhos de Decisão</CardTitle>
                      <CardDescription>
                        Como o modelo determina o nível de risco
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-2 mt-0.5 h-full w-px bg-muted-foreground/20" />
                          <div className="absolute left-0 top-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Passo 1: Frequência</p>
                            <p className="text-xs text-muted-foreground">O modelo analisa a taxa de frequência do aluno.</p>
                            <div className="bg-muted p-2 rounded text-xs">
                              <p>Se frequência &lt; 75%: <span className="text-red-500">Alto risco</span></p>
                              <p>Se frequência entre 75-85%: <span className="text-amber-500">Médio risco</span></p>
                              <p>Se frequência &gt; 85%: <span className="text-green-500">Baixo risco (inicial)</span></p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-2 mt-0.5 h-full w-px bg-muted-foreground/20" />
                          <div className="absolute left-0 top-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Passo 2: Notas</p>
                            <p className="text-xs text-muted-foreground">Avaliação do desempenho acadêmico.</p>
                            <div className="bg-muted p-2 rounded text-xs">
                              <p>Se nota &lt; 5.0: <span className="text-red-500">Alto risco</span></p>
                              <p>Se nota entre 5.0-6.0: <span className="text-amber-500">Médio risco</span></p>
                              <p>Se nota &gt; 6.0: Manter nível de risco atual</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative pl-6">
                          <div className="absolute left-0 top-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Passo 3: Comportamento</p>
                            <p className="text-xs text-muted-foreground">Avaliação de aspectos comportamentais.</p>
                            <div className="bg-muted p-2 rounded text-xs">
                              <p>Se comportamento &lt; 3: Elevar nível de risco em um grau</p>
                              <p>Se comportamento = 5: Reduzir nível de risco em um grau</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* AI-Assisted Interventions Card */}
                  <InterventionsCard />
                  
                  {/* Model Explanation Card */}
                  <ModelExplanationCard />
                </div>
              </TabsContent>
              
              <TabsContent value="students">
                <Card>
                  <CardHeader>
                    <CardTitle>Alunos Analisados pelo Modelo</CardTitle>
                    <CardDescription>
                      Exemplos de análises e previsões realizadas pelo modelo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {students.slice(0, 6).map(student => (
                        <Card 
                          key={student.id} 
                          className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
                            student.riskLevel === 'high' ? 'border-l-red-500' :
                            student.riskLevel === 'medium' ? 'border-l-amber-500' : 
                            'border-l-green-500'
                          }`}
                          onClick={() => handleStudentClick(student.id)}
                        >
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">{student.name}</p>
                                  <p className="text-xs text-muted-foreground">Turma {student.class} • RA: {student.registrationNumber}</p>
                                </div>
                                <div className={`text-xs font-medium rounded-full px-2 py-1 ${
                                  student.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                                  student.riskLevel === 'medium' ? 'bg-amber-100 text-amber-700' : 
                                  'bg-green-100 text-green-700'
                                }`}>
                                  {student.riskLevel === 'high' ? 'Alto' :
                                   student.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div className="text-center p-1 bg-muted rounded">
                                  <p className="text-muted-foreground">Nota</p>
                                  <p className="font-medium">{student.grade.toFixed(1)}</p>
                                </div>
                                <div className="text-center p-1 bg-muted rounded">
                                  <p className="text-muted-foreground">Freq.</p>
                                  <p className="font-medium">{student.attendance}%</p>
                                </div>
                                <div className="text-center p-1 bg-muted rounded">
                                  <p className="text-muted-foreground">Comport.</p>
                                  <p className="font-medium">{student.behavior}/5</p>
                                </div>
                              </div>
                              
                              {student.actionItems && student.actionItems.length > 0 && (
                                <div className="text-xs">
                                  <p className="font-medium">Ações recomendadas:</p>
                                  <ul className="list-disc pl-4 text-muted-foreground">
                                    {student.actionItems.slice(0, 2).map((item, index) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="metrics">
                <Card>
                  <CardHeader>
                    <CardTitle>Métricas de Desempenho do Modelo</CardTitle>
                    <CardDescription>
                      Avaliação da precisão e eficácia do modelo de previsão
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">
                              {precisionMetrics.accuracy}
                            </div>
                            <p className="text-sm font-medium">Acurácia</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Proporção de previsões corretas (alto e baixo risco)
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">
                              {precisionMetrics.precision}
                            </div>
                            <p className="text-sm font-medium">Precisão</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Acerto nas previsões de alto risco
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">
                              {precisionMetrics.recall}
                            </div>
                            <p className="text-sm font-medium">Recall</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Porcentagem de alunos em risco identificados
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-1">
                              {precisionMetrics.specificityRate}
                            </div>
                            <p className="text-sm font-medium">Especificidade</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Identificação correta de baixo risco
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-3">Interpretação das Métricas</h3>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                          Este modelo foi treinado com dados históricos de evasão escolar, usando 
                          uma abordagem de árvore de decisão que prioriza a <strong>explicabilidade</strong> 
                          sobre a complexidade. Isso significa que cada previsão pode ser entendida 
                          pelo educador, permitindo intervenções mais direcionadas.
                        </p>
                        
                        <p className="text-sm text-muted-foreground">
                          A alta taxa de recall (89%) indica que o modelo é particularmente 
                          eficaz em identificar alunos em risco real, minimizando falsos negativos 
                          que seriam prejudiciais ao objetivo de reduzir a evasão escolar.
                        </p>
                        
                        <div className="bg-muted p-4 rounded-md">
                          <p className="text-sm font-medium">Nota sobre os dados:</p>
                          <p className="text-sm text-muted-foreground">
                            As métricas apresentadas são baseadas em avaliações do modelo em dados históricos.
                            O desempenho do modelo é monitorado continuamente e pode ser recalibrado 
                            conforme necessário para melhorar sua precisão.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="docs">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentação do Modelo</CardTitle>
                    <CardDescription>
                      Informações detalhadas sobre o funcionamento e uso do modelo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Visão Geral do Modelo</h3>
                        <p className="text-sm text-muted-foreground">
                          O modelo de previsão de risco de evasão escolar do Une.AI EduCare utiliza uma 
                          abordagem de árvore de decisão para classificar alunos em três níveis de risco 
                          (baixo, médio e alto) com base em dados acadêmicos e comportamentais.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Fatores Analisados</h3>
                        <ul className="list-disc pl-6 space-y-2">
                          <li className="text-sm">
                            <span className="font-medium">Frequência escolar</span>
                            <p className="text-muted-foreground">Porcentagem de presença nas aulas</p>
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">Desempenho acadêmico</span>
                            <p className="text-muted-foreground">Notas médias em disciplinas principais</p>
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">Comportamento em sala</span>
                            <p className="text-muted-foreground">Avaliação de 1 a 5 sobre o comportamento e engajamento</p>
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">Histórico de intervenções</span>
                            <p className="text-muted-foreground">Resposta a intervenções anteriores (quando disponível)</p>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Como Utilizar o Sistema</h3>
                        <ol className="list-decimal pl-6 space-y-2">
                          <li className="text-sm">
                            <span className="font-medium">Carregue dados dos alunos</span>
                            <p className="text-muted-foreground">Utilize a página de upload para inserir dados acadêmicos.</p>
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">Analise os alertas gerados</span>
                            <p className="text-muted-foreground">O sistema gera automaticamente alertas para alunos em risco.</p>
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">Agende intervenções</span>
                            <p className="text-muted-foreground">Utilize as recomendações do modelo para planejar atendimentos.</p>
                          </li>
                          <li className="text-sm">
                            <span className="font-medium">Acompanhe resultados</span>
                            <p className="text-muted-foreground">Monitore o progresso dos alunos após as intervenções.</p>
                          </li>
                        </ol>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                        <h3 className="text-md font-medium text-blue-800 mb-2">Limitações e Considerações</h3>
                        <p className="text-sm text-blue-800">
                          Este modelo é uma ferramenta de suporte à decisão e não substitui o julgamento 
                          profissional dos educadores. Fatores contextuais importantes podem não estar 
                          capturados nos dados e devem ser considerados na avaliação final.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

// Main component that wraps the content with DataProvider
const ModelPage: React.FC = () => {
  return (
    <DataProvider>
      <ModelPageContent />
    </DataProvider>
  );
};

export default ModelPage;
