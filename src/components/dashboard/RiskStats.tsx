
import React from 'react';
import { AlertTriangle, Users, Clock, CheckCircle2 } from 'lucide-react';
import RiskCard from './RiskCard';

interface RiskStatsProps {
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  totalStudents: number;
  highRiskPercentage: string;
}

const RiskStats: React.FC<RiskStatsProps> = ({
  highRiskCount,
  totalStudents,
  highRiskPercentage
}) => {
  return (
    <>
      <RiskCard
        title="Alunos em Alto Risco"
        value={highRiskCount}
        description={`${highRiskPercentage}% do total de alunos`}
        icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
        className="border-l-4 border-l-red-500"
      />
      <RiskCard
        title="Total de Alunos"
        value={totalStudents}
        description="Alunos monitorados"
        icon={<Users className="h-4 w-4 text-blue-500" />}
        className="border-l-4 border-l-blue-500"
      />
      <RiskCard
        title="Alertas Pendentes"
        value={0} // This will be passed from parent in the real implementation
        description="Ações necessárias"
        icon={<Clock className="h-4 w-4 text-yellow-500" />}
        className="border-l-4 border-l-yellow-500"
      />
      <RiskCard
        title="Atendimentos Realizados"
        value={0} // This will be passed from parent in the real implementation
        description="Intervenções concluídas"
        icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
        className="border-l-4 border-l-green-500"
      />
    </>
  );
};

export default RiskStats;
