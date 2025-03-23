
import React from 'react';
import { AlertTriangle, Users, Clock, CheckCircle2, AlertCircle, ShieldCheck, Brain } from 'lucide-react';
import RiskCard from './RiskCard';
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
  
  // Count pending alerts (those that need action and haven't been marked as actioned)
  const pendingAlertsCount = alerts.filter(alert => !alert.actionTaken).length;
  
  // Count completed interventions (schedules with 'completed' status)
  const completedInterventionsCount = schedules.filter(
    schedule => schedule.status === 'completed'
  ).length;

  // Calculate AI assisted interventions (a subset of completed interventions)
  const aiAssistedCount = Math.min(completedInterventionsCount, 
    Math.floor(completedInterventionsCount * 0.8)); // Assume 80% of interventions are AI-assisted
    
  const handleModelCardClick = () => {
    navigate('/model');
  };

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
        title="Alunos em Médio Risco"
        value={mediumRiskCount}
        description="Risco moderado de evasão"
        icon={<AlertCircle className="h-4 w-4 text-orange-500" />}
        className="border-l-4 border-l-orange-500"
      />
      <RiskCard
        title="Alunos em Baixo Risco"
        value={lowRiskCount}
        description="Baixo risco de evasão"
        icon={<ShieldCheck className="h-4 w-4 text-green-500" />}
        className="border-l-4 border-l-green-500"
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
        value={pendingAlertsCount}
        description="Ações necessárias"
        icon={<Clock className="h-4 w-4 text-yellow-500" />}
        className="border-l-4 border-l-yellow-500"
      />
      <RiskCard
        title="Atendimentos com IA"
        value={aiAssistedCount}
        description="Intervenções guiadas por IA"
        icon={<Brain className="h-4 w-4 text-purple-500" />}
        className="border-l-4 border-l-purple-500"
        onClick={handleModelCardClick}
      />
    </>
  );
};

export default RiskStats;
