
import React from 'react';
import { AlertItem, ScheduleItem } from '@/types/data';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Bell, Calendar, Brain, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface RiskStatsProps {
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  totalStudents: number;
  highRiskPercentage: string;
  alerts: AlertItem[];
  schedules: ScheduleItem[];
}

const RiskStats: React.FC<RiskStatsProps> = ({
  highRiskCount,
  mediumRiskCount,
  lowRiskCount,
  totalStudents,
  highRiskPercentage,
  alerts,
  schedules
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow mt-8">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Overview Section */}
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-blue-100 p-2 mt-1">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-blue-900">Visão Geral</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Temos um total de <span className="font-semibold">{totalStudents} alunos</span> monitorados, com{' '}
                <span className="font-semibold text-red-600">{highRiskCount} ({highRiskPercentage}%)</span> em situação de alto risco,{' '}
                <span className="font-semibold text-orange-500">{mediumRiskCount}</span> em médio risco e{' '}
                <span className="font-semibold text-green-600">{lowRiskCount}</span> em baixo risco.
              </p>
            </div>
          </div>
          
          <Separator />
          
          {/* Alerts Section */}
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-amber-100 p-2 mt-1">
              <Bell className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-amber-900">Alertas e Intervenções</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Existem <span className="font-semibold text-amber-600">{alerts.filter(alert => !alert.actionTaken).length} alertas pendentes</span> que precisam de atenção.
                Já foram realizadas <span className="font-semibold text-purple-600">{schedules.filter(s => s.status === 'completed').length} intervenções</span>,
                sendo a maioria delas assistidas por inteligência artificial.
              </p>
            </div>
          </div>
          
          <Separator />
          
          {/* Next Steps Section */}
          <div className="flex items-start space-x-4">
            <div className="rounded-full bg-green-100 p-2 mt-1">
              <Calendar className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2 text-green-900">Próximos Passos</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Recomendamos focar nos alunos de alto risco, agendando intervenções e monitorando seu progresso nas próximas semanas.
              </p>
              <button 
                onClick={() => navigate('/schedule')}
                className="mt-3 flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Agendar intervenções
                <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskStats;
