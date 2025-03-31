import React, { useState, useEffect } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AlertsList from '@/components/alerts/AlertsList';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft, Calendar, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useProduct } from '@/context/product';
import { Navigate } from 'react-router-dom';

const AlertDetails = ({ alertId }: { alertId: string }) => {
  const { alerts, markAlertActionTaken, addSchedule, generateDemoData } = useData();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (alerts.length === 0) {
      generateDemoData();
    }
  }, [alerts.length, generateDemoData]);
  
  const alert = alerts.find(a => a.id === alertId);
  
  if (!alert) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p>Alerta não encontrado</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/alerts')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para alertas
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const getAlertIcon = (type: string) => {
    switch(type) {
      case 'high-risk':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium-risk':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getAlertSeverityText = (type: string) => {
    switch(type) {
      case 'high-risk':
        return 'Alto Risco';
      case 'medium-risk':
        return 'Médio Risco';
      case 'low-risk':
        return 'Baixo Risco';
      default:
        return 'Informação';
    }
  };
  
  const getBgColor = (type: string) => {
    switch(type) {
      case 'high-risk':
        return 'bg-red-100';
      case 'medium-risk':
        return 'bg-yellow-100';
      case 'low-risk':
        return 'bg-blue-100';
      default:
        return 'bg-gray-100';
    }
  };
  
  const handleScheduleMeeting = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    addSchedule({
      id: `schedule-${Date.now()}`,
      studentId: alert.studentId,
      studentName: alert.studentName,
      date: tomorrow,
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Acompanhamento para prevenção de evasão'
    });
    
    markAlertActionTaken(alert.id);
    navigate('/alerts');
  };
  
  const handleMarkResolved = () => {
    markAlertActionTaken(alert.id);
    navigate('/alerts');
  };
  
  const getDetailedMessage = () => {
    if (alert.type === 'high-risk') {
      return (
        <div className="space-y-4">
          <p>
            Este aluno possui múltiplos fatores de risco que indicam alta probabilidade de evasão escolar:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Frequência abaixo de 80% nas últimas semanas</li>
            <li>Notas abaixo da média em mais de 3 disciplinas</li>
            <li>Problemas comportamentais relatados por professores</li>
            <li>Falta de participação em atividades escolares</li>
          </ul>
          <p className="font-medium">
            Recomendação: Agendar atendimento com responsáveis o mais breve possível.
          </p>
        </div>
      );
    } else if (alert.type === 'medium-risk') {
      return (
        <div className="space-y-4">
          <p>
            Este aluno apresenta sinais de alerta que precisam de atenção:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Frequência entre 75-85% nas últimas semanas</li>
            <li>Queda de desempenho em 2 disciplinas</li>
            <li>Dificuldade de socialização com colegas</li>
          </ul>
          <p className="font-medium">
            Recomendação: Monitorar de perto e considerar intervenção pedagógica.
          </p>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <p>
            Este aluno apresenta pequenas dificuldades que podem ser acompanhadas:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Queda de rendimento em uma disciplina específica</li>
            <li>Pequenas faltas justificadas</li>
          </ul>
          <p className="font-medium">
            Recomendação: Conversar com o professor da disciplina em questão.
          </p>
        </div>
      );
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/alerts')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para alertas
        </Button>
        <h2 className="text-2xl font-bold">Detalhes do Alerta</h2>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`rounded-full p-2 ${getBgColor(alert.type)}`}>
                {getAlertIcon(alert.type)}
              </div>
              <div>
                <CardTitle className="text-xl">{alert.studentName}</CardTitle>
                <CardDescription>
                  <Badge className="mt-1">{alert.studentClass}</Badge>
                  <Badge variant="outline" className="ml-2">
                    {getAlertSeverityText(alert.type)}
                  </Badge>
                </CardDescription>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Criado em: {new Date(alert.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 rounded-lg border">
              {getDetailedMessage()}
            </div>
            
            {!alert.actionTaken ? (
              <div className="flex flex-wrap gap-4 mt-6">
                <Button 
                  className="flex gap-2 items-center"
                  onClick={handleScheduleMeeting}
                >
                  <Calendar className="h-4 w-4" />
                  Agendar Atendimento
                </Button>
                <Button 
                  variant="outline"
                  className="flex gap-2 items-center"
                  onClick={handleMarkResolved}
                >
                  <Check className="h-4 w-4" />
                  Marcar como Resolvido
                </Button>
              </div>
            ) : (
              <div className="bg-muted p-4 rounded-lg flex items-center gap-2 text-muted-foreground">
                <Check className="h-4 w-4" />
                Este alerta já foi processado
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AlertsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchParams] = useSearchParams();
  const alertId = searchParams.get('id');
  const { alerts, generateDemoData } = useData();
  const location = useLocation();
  const { currentProduct } = useProduct();
  
  if (currentProduct !== 'retention') {
    return <Navigate to="/hub" replace />;
  }
  
  useEffect(() => {
    if (alerts.length === 0) {
      console.log("Gerando dados de demonstração para alertas");
      generateDemoData();
    }
  }, [alerts.length, generateDemoData]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={toggleSidebar} 
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
        
        <main className="flex-1 p-6">
          {alertId ? (
            <AlertDetails alertId={alertId} />
          ) : (
            <AlertsList />
          )}
        </main>
      </div>
    </div>
  );
};

const AlertsPageWithProvider: React.FC = () => {
  return (
    <DataProvider>
      <AlertsPage />
    </DataProvider>
  );
};

export default AlertsPageWithProvider;
