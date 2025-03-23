
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import { BarChart, ChartIcon, Users, FileText, AlertTriangle } from 'lucide-react';

const UsageStats: React.FC = () => {
  const { students, surveys, alerts, schedules } = useData();
  const { language } = useTheme();
  
  const stats = [
    {
      title: language === 'pt-BR' ? 'Alunos Cadastrados' : 'Registered Students',
      value: students.length,
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
      description: language === 'pt-BR' ? 'Total de estudantes no sistema' : 'Total students in the system',
    },
    {
      title: language === 'pt-BR' ? 'Pesquisas Realizadas' : 'Surveys Completed',
      value: surveys.length,
      icon: <FileText className="h-5 w-5 text-muted-foreground" />,
      description: language === 'pt-BR' ? 'Pesquisas respondidas por familiares' : 'Surveys completed by families',
    },
    {
      title: language === 'pt-BR' ? 'Alertas Gerados' : 'Alerts Generated',
      value: alerts.length,
      icon: <AlertTriangle className="h-5 w-5 text-muted-foreground" />,
      description: language === 'pt-BR' ? 'Alertas de risco identificados' : 'Risk alerts identified',
    },
    {
      title: language === 'pt-BR' ? 'Agendamentos' : 'Scheduled Meetings',
      value: schedules.length,
      icon: <BarChart className="h-5 w-5 text-muted-foreground" />,
      description: language === 'pt-BR' ? 'Reuniões programadas' : 'Scheduled meetings',
    },
  ];
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default UsageStats;
