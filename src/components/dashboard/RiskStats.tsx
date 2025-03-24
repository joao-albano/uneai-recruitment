
import React from 'react';
import { AlertItem, ScheduleItem } from '@/types/data';
import { useNavigate } from 'react-router-dom';

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
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Visão Geral</h3>
        <p className="text-sm text-muted-foreground">
          Temos um total de {totalStudents} alunos monitorados, com {highRiskCount} ({highRiskPercentage}%) 
          em situação de alto risco, {mediumRiskCount} em médio risco e {lowRiskCount} em baixo risco.
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Alertas e Intervenções</h3>
        <p className="text-sm text-muted-foreground">
          Existem {alerts.filter(alert => !alert.actionTaken).length} alertas pendentes 
          que precisam de atenção. Já foram realizadas {schedules.filter(s => s.status === 'completed').length} 
          intervenções, sendo a maioria delas assistidas por inteligência artificial.
        </p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-2">Próximos Passos</h3>
        <p className="text-sm text-muted-foreground">
          Recomendamos focar nos alunos de alto risco, agendando intervenções 
          e monitorando seu progresso nas próximas semanas.
        </p>
      </div>
    </div>
  );
};

export default RiskStats;
