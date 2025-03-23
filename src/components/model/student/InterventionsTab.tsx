
import React, { useState } from 'react';
import { StudentData } from '@/types/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Phone, FileText, LineChart, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface InterventionsTabProps {
  student: StudentData;
}

// Define a interface para histórico de análises
interface AnalysisRecord {
  id: string;
  date: Date;
  riskLevel: 'low' | 'medium' | 'high';
  analysisType: 'automatic' | 'manual';
  performedBy?: string;
  notes?: string;
  indicators: {
    grade: number;
    attendance: number;
    behavior: number;
  };
}

// Define a interface para intervenções
interface Intervention {
  id: string;
  date: Date;
  interventionType: 'meeting' | 'call' | 'material' | 'monitoring';
  status: 'scheduled' | 'completed' | 'canceled';
  performedBy: string;
  notes?: string;
  outcome?: string;
}

// Gerar dados fictícios para histórico de análises
const generateAnalysisHistory = (student: StudentData): AnalysisRecord[] => {
  // Datas para as análises (da mais recente para a mais antiga)
  const dates = [
    new Date(),
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 dias atrás
    new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 dias atrás
    new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 dias atrás
  ];

  // Progressão de indicadores (do mais antigo para o mais recente)
  // Vamos simular uma trajetória que leva ao nível de risco atual
  const indicators = [
    { grade: 7.5, attendance: 90, behavior: 4 }, // começou bem
    { grade: 6.8, attendance: 85, behavior: 3 }, // leve piora
    { grade: 6.0, attendance: 80, behavior: 3 }, // mais deterioração
    { grade: student.grade, attendance: student.attendance, behavior: student.behavior }, // estado atual
  ];

  // Níveis de risco correspondentes
  const riskLevels: ('low' | 'medium' | 'high')[] = [
    'low',
    indicators[1].grade < 7 || indicators[1].attendance < 85 ? 'medium' : 'low',
    indicators[2].grade < 6.5 || indicators[2].attendance < 80 ? 'medium' : 'low',
    student.riskLevel || 'low',
  ];

  // Gerar histórico de análises
  return dates.map((date, index) => ({
    id: `analysis-${index}`,
    date,
    riskLevel: riskLevels[3 - index], // ordem reversa para combinar com as datas
    analysisType: index === 0 ? 'manual' : 'automatic',
    performedBy: index === 0 ? 'Coord. Mariana Silva' : 'Sistema IA',
    indicators: indicators[3 - index], // ordem reversa para combinar com as datas
    notes: index === 0 
      ? 'Análise manual após conversa com professores. Aluno mostra sinais de desmotivação.'
      : undefined,
  }));
};

// Gerar dados fictícios de intervenções
const generateInterventionHistory = (student: StudentData): Intervention[] => {
  // Se o aluno for de baixo risco, terá menos ou nenhuma intervenção
  if (student.riskLevel === 'low') {
    return [];
  }

  const interventions: Intervention[] = [];
  
  // Alunos de alto risco têm mais intervenções no histórico
  if (student.riskLevel === 'high') {
    interventions.push({
      id: 'int-1',
      date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      interventionType: 'meeting',
      status: 'completed',
      performedBy: 'Coord. Mariana Silva',
      notes: 'Reunião com aluno e responsáveis para discutir desempenho e frequência.',
      outcome: 'Pais comprometeram-se a acompanhar tarefas diariamente. Aluno receberá apoio de monitoria.'
    });
    
    interventions.push({
      id: 'int-2',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      interventionType: 'monitoring',
      status: 'completed',
      performedBy: 'Prof. Carlos Santos',
      notes: 'Acompanhamento individual em matemática e português.',
      outcome: 'Dificuldades identificadas em interpretação de texto. Recomendado material complementar.'
    });
    
    // Intervenção agendada para o futuro
    interventions.push({
      id: 'int-3',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      interventionType: 'meeting',
      status: 'scheduled',
      performedBy: 'Psicopedagoga Ana Luíza',
      notes: 'Avaliação das necessidades de aprendizagem e possíveis adaptações de material.',
    });
  }
  
  // Alunos de médio risco têm menos intervenções
  if (student.riskLevel === 'medium') {
    interventions.push({
      id: 'int-1',
      date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      interventionType: 'call',
      status: 'completed',
      performedBy: 'Prof. Marcos Oliveira',
      notes: 'Contato com responsáveis para alertar sobre queda no desempenho.',
      outcome: 'Pais não estavam cientes. Comprometeram-se a acompanhar mais de perto.'
    });
    
    // Intervenção agendada para o futuro
    interventions.push({
      id: 'int-2',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      interventionType: 'monitoring',
      status: 'scheduled',
      performedBy: 'Prof. Marcos Oliveira',
      notes: 'Acompanhamento para verificar progresso após contato com pais.',
    });
  }
  
  return interventions;
};

const InterventionsTab: React.FC<InterventionsTabProps> = ({ student }) => {
  const [analysisHistory] = useState<AnalysisRecord[]>(generateAnalysisHistory(student));
  const [interventions] = useState<Intervention[]>(generateInterventionHistory(student));

  // Função para renderizar o ícone baseado no tipo de intervenção
  const getInterventionIcon = (type: Intervention['interventionType']) => {
    switch (type) {
      case 'meeting': return <Calendar className="h-4 w-4" />;
      case 'call': return <Phone className="h-4 w-4" />;
      case 'material': return <FileText className="h-4 w-4" />;
      case 'monitoring': return <LineChart className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };
  
  // Função para formatar data em português
  const formatDate = (date: Date): string => {
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <div className="space-y-4">
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
          <CardTitle className="flex items-center justify-between">
            <span>Histórico de Intervenções</span>
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Agendar atendimento
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {interventions.length > 0 ? (
            <div className="space-y-4">
              {interventions.map((intervention) => (
                <div 
                  key={intervention.id} 
                  className="p-4 border rounded-md relative"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      {getInterventionIcon(intervention.interventionType)}
                      <span className="ml-2 font-medium">
                        {intervention.interventionType === 'meeting' ? 'Reunião' : 
                         intervention.interventionType === 'call' ? 'Contato Telefônico' :
                         intervention.interventionType === 'material' ? 'Material de Apoio' : 
                         'Monitoramento'}
                      </span>
                    </div>
                    <Badge 
                      variant={
                        intervention.status === 'completed' ? 'default' : 
                        intervention.status === 'scheduled' ? 'outline' : 'secondary'
                      }
                    >
                      {intervention.status === 'completed' ? 'Concluído' : 
                       intervention.status === 'scheduled' ? 'Agendado' : 'Cancelado'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Data</p>
                      <p className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(intervention.date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Responsável</p>
                      <p>{intervention.performedBy}</p>
                    </div>
                  </div>
                  
                  {intervention.notes && (
                    <div className="mb-2">
                      <p className="text-sm text-muted-foreground">Observações</p>
                      <p className="text-sm">{intervention.notes}</p>
                    </div>
                  )}
                  
                  {intervention.outcome && (
                    <div>
                      <p className="text-sm text-muted-foreground">Resultado</p>
                      <p className="text-sm">{intervention.outcome}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhuma intervenção registrada para este aluno.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Análises</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analysisHistory.map((analysis) => (
              <div 
                key={analysis.id} 
                className={`p-4 border rounded-md relative border-l-4 ${
                  analysis.riskLevel === 'high' ? 'border-l-red-500' :
                  analysis.riskLevel === 'medium' ? 'border-l-amber-500' : 
                  'border-l-green-500'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Análise {analysis.analysisType === 'automatic' ? 'Automática' : 'Manual'}</h4>
                  <Badge 
                    variant={
                      analysis.riskLevel === 'high' ? 'destructive' : 
                      analysis.riskLevel === 'medium' ? 'default' : 'outline'
                    }
                  >
                    Risco {analysis.riskLevel === 'high' ? 'Alto' : 
                           analysis.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Data da Análise</p>
                    <p className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(analysis.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Realizada por</p>
                    <p>{analysis.performedBy}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 my-3">
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Nota</p>
                    <p className="font-medium">{analysis.indicators.grade.toFixed(1)}</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Frequência</p>
                    <p className="font-medium">{analysis.indicators.attendance}%</p>
                  </div>
                  <div className="text-center p-2 bg-muted rounded">
                    <p className="text-xs text-muted-foreground">Comportamento</p>
                    <p className="font-medium">{analysis.indicators.behavior}/5</p>
                  </div>
                </div>
                
                {analysis.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Observações</p>
                    <p className="text-sm">{analysis.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterventionsTab;
