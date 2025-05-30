
import React from 'react';
import { PlanOption } from '@/utils/billing/planOptions';
import { useTheme } from '@/context/ThemeContext';
import PlanCard from './PlanCard';

interface PlanSidebarListProps {
  plans: PlanOption[];
  selectedPlanId: string | null;
  onPlanSelect: (planId: string) => void;
  onEditClick: (plan: PlanOption) => void;
}

const PlanSidebarList: React.FC<PlanSidebarListProps> = ({
  plans,
  selectedPlanId,
  onPlanSelect,
  onEditClick
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        {isPtBR ? "Planos Disponíveis" : "Available Plans"}
      </h3>
      
      {plans.map((plan) => (
        <PlanCard 
          key={plan.id}
          plan={plan}
          isSelected={selectedPlanId === plan.id}
          onEditClick={onEditClick}
          onSelect={onPlanSelect}
        />
      ))}
    </div>
  );
};

export default PlanSidebarList;
