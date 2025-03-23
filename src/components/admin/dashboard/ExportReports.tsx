
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { Download, FileType, Users, AlertTriangle, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportReportsProps {
  onError: (error: Error) => void;
}

const ExportReports: React.FC<ExportReportsProps> = ({ onError }) => {
  const { students, alerts, schedules, surveys } = useData();
  const { language } = useTheme();
  const { toast } = useToast();
  const [exporting, setExporting] = useState<string | null>(null);
  
  const exportData = (type: string) => {
    try {
      setExporting(type);
      
      let data;
      let filename;
      
      switch (type) {
        case 'students':
          data = students;
          filename = language === 'pt-BR' ? 'alunos.json' : 'students.json';
          break;
        case 'alerts':
          data = alerts;
          filename = language === 'pt-BR' ? 'alertas.json' : 'alerts.json';
          break;
        case 'schedules':
          data = schedules;
          filename = language === 'pt-BR' ? 'agendamentos.json' : 'schedules.json';
          break;
        case 'surveys':
          data = surveys;
          filename = language === 'pt-BR' ? 'pesquisas.json' : 'surveys.json';
          break;
        default:
          throw new Error('Invalid export type');
      }
      
      // Create blob and trigger download
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: language === 'pt-BR' ? 'Exportação concluída' : 'Export completed',
        description: language === 'pt-BR' 
          ? `Dados exportados com sucesso: ${filename}` 
          : `Data successfully exported: ${filename}`,
      });
    } catch (error) {
      console.error(`Error exporting ${type} data:`, error);
      if (error instanceof Error) {
        onError(error);
      } else {
        onError(new Error('Unknown error during export'));
      }
    } finally {
      setExporting(null);
    }
  };
  
  const reports = [
    {
      title: language === 'pt-BR' ? 'Relatório de Alunos' : 'Student Report',
      description: language === 'pt-BR' 
        ? 'Exporta lista de alunos e dados associados' 
        : 'Exports list of students and associated data',
      icon: <Users className="h-5 w-5" />,
      action: () => exportData('students'),
      type: 'students'
    },
    {
      title: language === 'pt-BR' ? 'Relatório de Alertas' : 'Alerts Report',
      description: language === 'pt-BR' 
        ? 'Exporta histórico de alertas e notificações' 
        : 'Exports history of alerts and notifications',
      icon: <AlertTriangle className="h-5 w-5" />,
      action: () => exportData('alerts'),
      type: 'alerts'
    },
    {
      title: language === 'pt-BR' ? 'Relatório de Agendamentos' : 'Schedules Report',
      description: language === 'pt-BR' 
        ? 'Exporta histórico de reuniões e agendamentos' 
        : 'Exports history of meetings and schedules',
      icon: <Calendar className="h-5 w-5" />,
      action: () => exportData('schedules'),
      type: 'schedules'
    },
    {
      title: language === 'pt-BR' ? 'Relatório de Pesquisas' : 'Surveys Report',
      description: language === 'pt-BR' 
        ? 'Exporta respostas de pesquisas diagnósticas' 
        : 'Exports diagnostic survey responses',
      icon: <FileType className="h-5 w-5" />,
      action: () => exportData('surveys'),
      type: 'surveys'
    },
  ];
  
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reports.map((report, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{report.title}</CardTitle>
              {report.icon}
            </div>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={report.action}
              disabled={exporting !== null}
              className="w-full"
            >
              {exporting === report.type ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  {language === 'pt-BR' ? 'Exportando...' : 'Exporting...'}
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  {language === 'pt-BR' ? 'Exportar Dados' : 'Export Data'}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExportReports;
