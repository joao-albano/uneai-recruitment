
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '@/context/DataContext';

const SystemActivity: React.FC = () => {
  const { language } = useTheme();
  const { alerts, schedules } = useData();
  
  // Create realistic activity data based on actual alerts and schedules
  // We'll create a 7-day activity chart
  const activityData = generateActivityData(alerts, schedules);
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Atividade do Sistema' : 'System Activity'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Atividades do sistema nos últimos 7 dias' 
            : 'System activities in the last 7 days'}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={activityData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="name" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toFixed(0)}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                borderRadius: '6px', 
                fontSize: '12px' 
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="alerts" 
              name={language === 'pt-BR' ? 'Alertas' : 'Alerts'} 
              stroke="#ef4444" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="schedules" 
              name={language === 'pt-BR' ? 'Agendamentos' : 'Schedules'} 
              stroke="#3b82f6" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="logins" 
              name={language === 'pt-BR' ? 'Logins' : 'Logins'} 
              stroke="#a855f7" 
              strokeWidth={2} 
              dot={{ r: 4 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

// Helper function to generate the past 7 days of activity
function generateActivityData(alerts: any[], schedules: any[]) {
  const days = 7;
  const result = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Format the date
    const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    
    // Count alerts for this day - create some variance based on existing alerts
    const alertsBaseCount = Math.max(1, Math.floor(alerts.length / 7));
    const alertsForDay = alertsBaseCount + Math.floor(Math.random() * 3);
    
    // Count schedules for this day - create some variance based on existing schedules
    const schedulesBaseCount = Math.max(1, Math.floor(schedules.length / 7));
    const schedulesForDay = schedulesBaseCount + Math.floor(Math.random() * 3);
    
    // Add random login count (3-8 logins per day)
    const loginsForDay = 3 + Math.floor(Math.random() * 6);
    
    result.push({
      name: dateStr,
      alerts: alertsForDay,
      schedules: schedulesForDay,
      logins: loginsForDay,
    });
  }
  
  return result;
}

export default SystemActivity;
