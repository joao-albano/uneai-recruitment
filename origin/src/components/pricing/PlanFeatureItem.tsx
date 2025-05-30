
import React from 'react';
import { Check } from 'lucide-react';

interface PlanFeatureItemProps {
  text: string;
  included: boolean;
}

const PlanFeatureItem: React.FC<PlanFeatureItemProps> = ({ text, included }) => {
  return (
    <li className="flex items-start gap-2">
      {included ? (
        <Check className="h-5 w-5 text-green-500 shrink-0" />
      ) : (
        <Check className="h-5 w-5 text-muted-foreground opacity-25 shrink-0" />
      )}
      <span className={included ? "" : "text-muted-foreground"}>
        {text}
      </span>
    </li>
  );
};

export default PlanFeatureItem;
