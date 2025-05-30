
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';
import { Phone, PhoneCall, PhoneOff, PhoneForwarded, DollarSign } from 'lucide-react';
import { useVoiceCallHistory } from '@/hooks/useVoiceCallHistory';

const VoiceCallStats: React.FC = () => {
  const { language } = useTheme();
  const { calls } = useVoiceCallHistory();
  
  // Calculate statistics from calls
  const stats = useMemo(() => {
    const total = calls.length;
    const completed = calls.filter(call => call.status === 'completed').length;
    const noAnswer = calls.filter(call => call.status === 'no-answer').length;
    const failed = calls.filter(call => call.status === 'failed').length;
    
    // Calculate total duration in seconds
    const totalDurationSeconds = calls.reduce((acc, call) => {
      return acc + (call.duration || 0);
    }, 0);
    
    // Calculate estimated cost (this is a simplified model)
    // Adjust these values based on your actual voice API pricing
    const costPerMinute = 0.03; // Example: 3 cents per minute
    const totalCost = ((totalDurationSeconds / 60) * costPerMinute).toFixed(2);
    
    return {
      total,
      completed,
      noAnswer,
      failed,
      totalDurationSeconds,
      totalCost
    };
  }, [calls]);
  
  // Format duration in MM:SS format
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const statsItems = [
    {
      title: language === 'pt-BR' ? 'Total de Ligações' : 'Total Calls',
      value: stats.total,
      icon: <Phone className="h-5 w-5 text-blue-600" />,
      description: language === 'pt-BR' ? 'Ligações realizadas' : 'Calls made'
    },
    {
      title: language === 'pt-BR' ? 'Ligações Completadas' : 'Completed Calls',
      value: stats.completed,
      icon: <PhoneCall className="h-5 w-5 text-green-600" />,
      description: language === 'pt-BR' ? 'Ligações atendidas e finalizadas' : 'Calls answered and completed'
    },
    {
      title: language === 'pt-BR' ? 'Sem Resposta' : 'No Answer',
      value: stats.noAnswer,
      icon: <PhoneForwarded className="h-5 w-5 text-amber-600" />,
      description: language === 'pt-BR' ? 'Ligações não atendidas' : 'Calls not answered'
    },
    {
      title: language === 'pt-BR' ? 'Tempo Total' : 'Total Time',
      value: formatDuration(stats.totalDurationSeconds),
      icon: <PhoneOff className="h-5 w-5 text-purple-600" />,
      description: language === 'pt-BR' ? 'Duração total das ligações' : 'Total call duration'
    },
    {
      title: language === 'pt-BR' ? 'Custo Estimado' : 'Estimated Cost',
      value: `R$ ${stats.totalCost}`,
      icon: <DollarSign className="h-5 w-5 text-red-600" />,
      description: language === 'pt-BR' ? 'Custo estimado das ligações' : 'Estimated cost of calls'
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Estatísticas de Ligações' : 'Voice Call Statistics'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Métricas de comunicação via voz' 
            : 'Voice communication metrics'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {statsItems.map((item, index) => (
            <div key={index} className="bg-card border rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-background mb-3">
                {item.icon}
              </div>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm font-medium mt-1">{item.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceCallStats;
