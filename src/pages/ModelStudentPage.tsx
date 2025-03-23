
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { DataProvider, useData } from '@/context/DataContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart3, Calendar, LineChart, BookOpen } from 'lucide-react';
import RiskExplanation from '@/components/dashboard/RiskExplanation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ModelStudentContent: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { students } = useData();
  const navigate = useNavigate();
  
  const student = students.find(s => s.id === studentId);
  
  if (!student) {
    return (
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-xl font-semibold mb-2">Aluno não encontrado</h2>
            <p className="text-muted-foreground mb-4">O aluno solicitado não existe ou foi removido.</p>
            <Button onClick={() => navigate('/model')}>Voltar ao Modelo</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => navigate('/model')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Trajetória Analítica do Aluno</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-muted p-4 rounded-lg">
        <div>
          <h2 className="text-xl font-bold">{student.name}</h2>
          <p className="text-muted-foreground">Turma {student.class} • RA: {student.registrationNumber}</p>
        </div>
        <div className={`mt-2 sm:mt-0 text-sm font-medium rounded-full px-3 py-1 ${
          student.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
          student.riskLevel === 'medium' ? 'bg-amber-100 text-amber-700' : 
          'bg-green-100 text-green-700'
        }`}>
          Risco {student.riskLevel === 'high' ? 'Alto' :
                 student.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
        </div>
      </div>
      
      <Tabs defaultValue="trajectory">
        <TabsList>
          <TabsTrigger value="trajectory" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            <span>Trajetória</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Análises</span>
          </TabsTrigger>
          <TabsTrigger value="interventions" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Intervenções</span>
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>Detalhes</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="trajectory" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Gráfico de evolução do risco ao longo do tempo</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Indicadores Acadêmicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Notas</h3>
                  <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
                    <p className="text-muted-foreground">Gráfico de evolução das notas</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Frequência</h3>
                  <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
                    <p className="text-muted-foreground">Gráfico de evolução da frequência</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Comportamento</h3>
                  <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
                    <p className="text-muted-foreground">Gráfico de evolução do comportamento</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4 mt-4">
          <RiskExplanation student={student} />
          
          <Card>
            <CardHeader>
              <CardTitle>Fatores de Risco Identificados</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {student.grade < 6 && (
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Baixo desempenho acadêmico</p>
                      <p className="text-sm text-muted-foreground">Média atual: {student.grade.toFixed(1)} - Abaixo do mínimo esperado (6.0)</p>
                    </div>
                  </li>
                )}
                {student.attendance < 75 && (
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Frequência insuficiente</p>
                      <p className="text-sm text-muted-foreground">Frequência atual: {student.attendance}% - Abaixo do mínimo legal (75%)</p>
                    </div>
                  </li>
                )}
                {student.behavior <= 2 && (
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <div>
                      <p className="font-medium">Problemas comportamentais</p>
                      <p className="text-sm text-muted-foreground">Indicador comportamental: {student.behavior}/5 - Considerado crítico</p>
                    </div>
                  </li>
                )}
                {student.grade >= 6 && student.attendance >= 75 && student.behavior > 2 && (
                  <li>Nenhum fator de risco crítico identificado no momento.</li>
                )}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interventions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Intervenções Recomendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {student.actionItems && student.actionItems.length > 0 ? (
                  student.actionItems.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{action}</span>
                    </li>
                  ))
                ) : (
                  <li>Nenhuma intervenção recomendada no momento.</li>
                )}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Intervenções</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhuma intervenção registrada para este aluno.
                </p>
                <Button variant="outline" className="mt-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar atendimento
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Aluno</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Nome</dt>
                  <dd className="mt-1">{student.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Registro Acadêmico</dt>
                  <dd className="mt-1">{student.registrationNumber}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Turma</dt>
                  <dd className="mt-1">{student.class}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Responsável</dt>
                  <dd className="mt-1">{student.parentName || "Não informado"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Contato do Responsável</dt>
                  <dd className="mt-1">{student.parentContact || "Não informado"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Nível de Risco Atual</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      student.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                      student.riskLevel === 'medium' ? 'bg-amber-100 text-amber-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {student.riskLevel === 'high' ? 'Alto' :
                       student.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                    </span>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Análise da Decisão do Modelo</CardTitle>
            </CardHeader>
            <CardContent>
              {student.decisionPath && student.decisionPath.length > 0 ? (
                <ol className="space-y-2 list-decimal list-inside">
                  {student.decisionPath.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted-foreground">
                  Caminho de decisão não disponível para este aluno.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Wrap with Layout and DataProvider
const ModelStudentPage: React.FC = () => {
  return (
    <DataProvider>
      <Layout>
        <ModelStudentContent />
      </Layout>
    </DataProvider>
  );
};

export default ModelStudentPage;
