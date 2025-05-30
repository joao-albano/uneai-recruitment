
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadCloud, FileText, AlertTriangle, UserCheck, BarChart } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { useToast } from '@/hooks/use-toast';

type ExportReportsProps = {
  onError: (error: Error) => void;
};

type ReportType = {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  format: string;
};

const ExportReports: React.FC<ExportReportsProps> = ({ onError }) => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { students, alerts, schedules } = useData();
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  
  const reports: ReportType[] = [
    {
      id: 'students',
      title: language === 'pt-BR' ? 'Relatório de Alunos' : 'Students Report',
      description: language === 'pt-BR' 
        ? `Detalhes completos de ${students.length} alunos e análise de risco` 
        : `Complete details of ${students.length} students and risk analysis`,
      icon: <UserCheck className="h-5 w-5" />,
      format: 'PDF/EXCEL'
    },
    {
      id: 'alerts',
      title: language === 'pt-BR' ? 'Relatório de Alertas' : 'Alerts Report',
      description: language === 'pt-BR' 
        ? `Resumo de ${alerts.length} alertas gerados no sistema` 
        : `Summary of ${alerts.length} alerts generated in the system`,
      icon: <AlertTriangle className="h-5 w-5" />,
      format: 'PDF/CSV'
    },
    {
      id: 'attendance',
      title: language === 'pt-BR' ? 'Relatório de Atendimentos' : 'Attendance Report',
      description: language === 'pt-BR' 
        ? `Dados de ${schedules.length} atendimentos realizados e agendados` 
        : `Data from ${schedules.length} completed and scheduled meetings`,
      icon: <FileText className="h-5 w-5" />,
      format: 'PDF/CSV'
    },
    {
      id: 'metrics',
      title: language === 'pt-BR' ? 'Métricas do Sistema' : 'System Metrics',
      description: language === 'pt-BR' 
        ? 'Indicadores de desempenho e estatísticas completas' 
        : 'Performance indicators and complete statistics',
      icon: <BarChart className="h-5 w-5" />,
      format: 'PDF/EXCEL'
    }
  ];
  
  const handleExport = (reportId: string) => {
    setLoading({ ...loading, [reportId]: true });
    
    // Simulate export operation
    setTimeout(() => {
      setLoading({ ...loading, [reportId]: false });
      
      toast({
        title: language === 'pt-BR' ? 'Relatório exportado' : 'Report exported',
        description: language === 'pt-BR' 
          ? 'O relatório foi gerado com sucesso' 
          : 'The report was successfully generated',
      });
    }, 1500);
  };
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {reports.map((report) => (
        <Card key={report.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {report.icon}
                <CardTitle className="text-base">{report.title}</CardTitle>
              </div>
              <div className="text-xs bg-muted px-2 py-1 rounded-md">
                {report.format}
              </div>
            </div>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end mt-auto">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => handleExport(report.id)}
              disabled={loading[report.id]}
            >
              {loading[report.id] ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <DownloadCloud className="h-4 w-4" />
              )}
              {language === 'pt-BR' ? 'Exportar' : 'Export'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ExportReports;
