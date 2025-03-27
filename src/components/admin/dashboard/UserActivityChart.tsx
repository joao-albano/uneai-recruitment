
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const UserActivityChart: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  
  // More comprehensive mock data - in a real app this would come from the backend
  const userData = [
    {
      name: 'Admin',
      logins: 35,
      actions: 120,
      students: 8,
      alerts: 14,
    },
    {
      name: 'Maria Silva',
      logins: 28,
      actions: 98,
      students: 12,
      alerts: 6,
    },
    {
      name: 'João Santos',
      logins: 18,
      actions: 45,
      students: 5,
      alerts: 3,
    },
    {
      name: 'Carla Oliveira',
      logins: 22,
      actions: 67,
      students: 9,
      alerts: 8,
    },
    {
      name: 'Rafael Souza',
      logins: 15,
      actions: 39,
      students: 4,
      alerts: 2,
    },
  ];
  
  const handleDataError = (error: Error) => {
    console.error('Error processing user activity data:', error);
    toast({
      title: language === 'pt-BR' ? 'Erro ao processar dados de atividade' : 'Error processing activity data',
      description: error.message,
      variant: 'destructive'
    });
  };
  
  try {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>
            {language === 'pt-BR' ? 'Atividade dos Usuários' : 'User Activity'}
          </CardTitle>
          <CardDescription>
            {language === 'pt-BR' 
              ? 'Atividades por usuário no último mês' 
              : 'Activities by user in the last month'}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={userData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="name" 
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '6px', 
                  fontSize: '12px' 
                }} 
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar 
                dataKey="logins" 
                name={language === 'pt-BR' ? 'Logins' : 'Logins'} 
                fill="#3b82f6" 
              />
              <Bar 
                dataKey="students" 
                name={language === 'pt-BR' ? 'Alunos' : 'Students'} 
                fill="#10b981" 
              />
              <Bar 
                dataKey="alerts" 
                name={language === 'pt-BR' ? 'Alertas' : 'Alerts'} 
                fill="#f59e0b" 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  } catch (error) {
    if (error instanceof Error) {
      handleDataError(error);
    }
    return <div>Error loading chart</div>;
  }
};

export default UserActivityChart;
