
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, isSameDay } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { AlertItem } from '@/types/data';

const SystemActivity: React.FC = () => {
  const { alerts, surveys, schedules } = useData();
  const { language } = useTheme();
  const { toast } = useToast();
  
  const activityData = useMemo(() => {
    try {
      // Generate data for last 30 days
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = subDays(new Date(), i);
        return {
          date,
          dateStr: format(date, 'dd/MM'),
          alerts: 0,
          surveys: 0,
          schedules: 0
        };
      }).reverse();
      
      // Count alerts by day
      alerts.forEach(alert => {
        const dayData = last30Days.find(day => 
          isSameDay(day.date, new Date(alert.createdAt))
        );
        if (dayData) {
          dayData.alerts += 1;
        }
      });
      
      // Since SurveyData doesn't have createdAt, we'll skip that part
      // or you could add a timestamp field to your surveys when they're created
      
      // Count schedules by day
      schedules.forEach(schedule => {
        const dayData = last30Days.find(day => 
          isSameDay(day.date, new Date(schedule.date))
        );
        if (dayData) {
          dayData.schedules += 1;
        }
      });
      
      return last30Days;
    } catch (error) {
      console.error('Error calculating system activity:', error);
      toast({
        title: language === 'pt-BR' ? 'Erro ao calcular atividade do sistema' : 'Error calculating system activity',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive'
      });
      return [];
    }
  }, [alerts, surveys, schedules, language]);
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Atividade do Sistema' : 'System Activity'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Atividades registradas nos últimos 30 dias' 
            : 'System activities over the last 30 days'}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activityData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dateStr" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="alerts" 
              name={language === 'pt-BR' ? 'Alertas' : 'Alerts'} 
              stroke="#ef4444" 
              activeDot={{ r: 8 }} 
            />
            <Line 
              type="monotone" 
              dataKey="surveys" 
              name={language === 'pt-BR' ? 'Pesquisas' : 'Surveys'}  
              stroke="#3b82f6" 
            />
            <Line 
              type="monotone" 
              dataKey="schedules" 
              name={language === 'pt-BR' ? 'Agendamentos' : 'Schedules'}  
              stroke="#22c55e" 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SystemActivity;
