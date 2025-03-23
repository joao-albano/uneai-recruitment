
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const UserActivityChart: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  
  // Mock data - in a real app this would come from the backend
  const userData = [
    {
      name: 'Admin',
      logins: 35,
      actions: 120,
    },
    {
      name: 'Maria Silva',
      logins: 28,
      actions: 98,
    },
    {
      name: 'João Santos',
      logins: 18,
      actions: 45,
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="logins" 
                name={language === 'pt-BR' ? 'Logins' : 'Logins'} 
                fill="#3b82f6" 
              />
              <Bar 
                dataKey="actions" 
                name={language === 'pt-BR' ? 'Ações' : 'Actions'} 
                fill="#8b5cf6" 
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
