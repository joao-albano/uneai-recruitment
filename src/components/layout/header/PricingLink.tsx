
import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PricingLink: React.FC = () => {
  return (
    <Link to="/pricing">
      <Button variant="ghost" size="sm" className="gap-1">
        <DollarSign className="h-4 w-4" />
        <span>Planos</span>
      </Button>
    </Link>
  );
};

export default PricingLink;
