
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StudentRiskBadgeProps {
  riskLevel?: 'low' | 'medium' | 'high';
}

const StudentRiskBadge: React.FC<StudentRiskBadgeProps> = ({ riskLevel }) => {
  const getRiskColor = (riskLevel?: 'low' | 'medium' | 'high') => {
    switch(riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskText = (riskLevel?: 'low' | 'medium' | 'high') => {
    switch(riskLevel) {
      case 'high':
        return 'Alto Risco';
      case 'medium':
        return 'Médio Risco';
      case 'low':
        return 'Baixo Risco';
      default:
        return 'Sem Classificação';
    }
  };

  return (
    <Badge className={getRiskColor(riskLevel)}>
      {getRiskText(riskLevel)}
    </Badge>
  );
};

export default StudentRiskBadge;
