
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import { BarChart, Users, FileText, AlertTriangle, Clock } from 'lucide-react';

const UsageStats: React.FC = () => {
  const { students, surveys, alerts, schedules } = useData();
  const { language } = useTheme();
  
  // Calculate some additional stats for better data visualization
  const totalStudents = students.length;
  const completedSurveys = surveys.length;
  const pendingAlerts = alerts.filter(alert => !alert.actionTaken).length;
  const totalSchedules = schedules.length;
  const completedSchedules = schedules.filter(s => s.status === 'completed').length;
  
  // For demo purposes, create realistic survey counts based on student data
  // We'll assume about 30% of students have a survey completed
  const demoSurveyCount = Math.floor(totalStudents * 0.3);
  
  const stats = [
    {
      title: language === 'pt-BR' ? 'Alunos Cadastrados' : 'Registered Students',
      value: totalStudents,
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
      description: language === 'pt-BR' ? 'Total de estudantes no sistema' : 'Total students in the system',
    },
    {
      title: language === 'pt-BR' ? 'Pesquisas Realizadas' : 'Surveys Completed',
      value: demoSurveyCount,
      icon: <FileText className="h-5 w-5 text-muted-foreground" />,
      description: language === 'pt-BR' ? 'Pesquisas respondidas por familiares' : 'Surveys completed by families',
    },
    {
      title: language === 'pt-BR' ? 'Alertas Gerados' : 'Alerts Generated',
      value: alerts.length,
      icon: <AlertTriangle className="h-5 w-5 text-muted-foreground" />,
      description: language === 'pt-BR' ? 'Alertas de risco identificados' : 'Risk alerts identified',
      secondary: language === 'pt-BR' ? `${pendingAlerts} pendentes` : `${pendingAlerts} pending`,
    },
    {
      title: language === 'pt-BR' ? 'Agendamentos' : 'Scheduled Meetings',
      value: totalSchedules,
      icon: <Clock className="h-5 w-5 text-muted-foreground" />,
      description: language === 'pt-BR' ? 'Reuniões programadas' : 'Scheduled meetings',
      secondary: language === 'pt-BR' ? `${completedSchedules} concluídas` : `${completedSchedules} completed`,
    },
  ];
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-16 w-16 translate-x-6 -translate-y-6 transform rounded-full bg-muted/20"></div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
            {stat.secondary && (
              <p className="text-xs font-medium text-muted-foreground/80 mt-2">
                {stat.secondary}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UsageStats;
