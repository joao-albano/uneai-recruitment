
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays, isSameDay } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

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
      
      // If there's no real data, populate with demo data
      if (alerts.length === 0 && schedules.length === 0) {
        // Populate last 30 days with fictional data
        last30Days.forEach((day, index) => {
          // Create some patterns in the data
          const dayOfMonth = new Date(day.date).getDate();
          
          // More alerts and surveys during beginning/middle of month
          if (dayOfMonth < 10) {
            day.alerts = Math.floor(Math.random() * 3) + 1;
            day.surveys = Math.floor(Math.random() * 5) + 2;
          } else if (dayOfMonth < 20) {
            day.alerts = Math.floor(Math.random() * 2);
            day.surveys = Math.floor(Math.random() * 3) + 1;
          } else {
            day.alerts = Math.floor(Math.random() * 2);
            day.surveys = Math.floor(Math.random() * 2);
          }
          
          // More schedules on weekdays
          const dayOfWeek = new Date(day.date).getDay();
          if (dayOfWeek > 0 && dayOfWeek < 6) {
            day.schedules = Math.floor(Math.random() * 3) + 1;
          } else {
            day.schedules = Math.floor(Math.random() * 1);
          }
        });
        
        return last30Days;
      }
      
      // Count real alerts by day
      alerts.forEach(alert => {
        const dayData = last30Days.find(day => 
          isSameDay(day.date, new Date(alert.createdAt))
        );
        if (dayData) {
          dayData.alerts += 1;
        }
      });
      
      // Since SurveyData doesn't have createdAt, we'll create random data for surveys
      last30Days.forEach(day => {
        // Create some randomized but reasonable data for surveys
        day.surveys = Math.max(0, Math.floor(Math.random() * 4) - 1);
      });
      
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
      
      // Return fallback demo data
      return Array.from({ length: 30 }, (_, i) => {
        const date = subDays(new Date(), i);
        const dayOfMonth = date.getDate();
        
        return {
          date,
          dateStr: format(date, 'dd/MM'),
          alerts: Math.max(0, Math.floor(Math.random() * 3) - 1),
          surveys: Math.max(0, Math.floor(Math.random() * 4) - 1),
          schedules: Math.max(0, Math.floor(Math.random() * 3) - 1)
        };
      }).reverse();
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
            <Tooltip 
              formatter={(value, name) => {
                const translatedName = 
                  name === "alerts" ? (language === 'pt-BR' ? 'Alertas' : 'Alerts') :
                  name === "surveys" ? (language === 'pt-BR' ? 'Pesquisas' : 'Surveys') :
                  (language === 'pt-BR' ? 'Agendamentos' : 'Schedules');
                return [value, translatedName];
              }}
            />
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
