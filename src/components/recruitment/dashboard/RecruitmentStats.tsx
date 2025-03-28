
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, LineChart, Calendar, CheckCircle } from 'lucide-react';

const RecruitmentStats: React.FC = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Novos Leads</CardTitle>
            <CardDescription>Este mês</CardDescription>
          </div>
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
            <UserPlus className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">127</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1 space-x-1">
            <LineChart className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+14.6%</span>
            <span>vs. mês anterior</span>
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Agendamentos</CardTitle>
            <CardDescription>Visitas agendadas</CardDescription>
          </div>
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-500">
            <Calendar className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1 space-x-1">
            <LineChart className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+7.2%</span>
            <span>vs. mês anterior</span>
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Taxa de Conversão</CardTitle>
            <CardDescription>Lead para matrícula</CardDescription>
          </div>
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-500">
            <LineChart className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">23.8%</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1 space-x-1">
            <LineChart className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+1.4%</span>
            <span>vs. período anterior</span>
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-medium">Matrículas</CardTitle>
            <CardDescription>Este mês</CardDescription>
          </div>
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-500">
            <CheckCircle className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">32</div>
          <p className="text-xs text-muted-foreground flex items-center mt-1 space-x-1">
            <LineChart className="h-3 w-3 text-green-500" />
            <span className="text-green-500">+9.7%</span>
            <span>vs. meta mensal (29)</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentStats;
