
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserPlus, CalendarCheck, School, TrendingUp } from 'lucide-react';

const RecruitmentStats: React.FC = () => {
  // Estatísticas de exemplo para o dashboard
  const stats = [
    {
      label: 'Total de Leads',
      value: '539',
      change: '+12%',
      icon: <UserPlus className="h-5 w-5" />,
      color: 'bg-blue-500',
    },
    {
      label: 'Agendamentos',
      value: '285',
      change: '+5%',
      icon: <CalendarCheck className="h-5 w-5" />,
      color: 'bg-amber-500',
    },
    {
      label: 'Matrículas',
      value: '117',
      change: '+8%',
      icon: <School className="h-5 w-5" />,
      color: 'bg-green-500',
    },
    {
      label: 'Taxa de Conversão',
      value: '21.7%',
      change: '+2.4%',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <div className="flex items-center justify-end">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className={`text-xs ${
                    stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                  } ml-2`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecruitmentStats;
