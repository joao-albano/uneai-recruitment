
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../../types/leadForm';
import ChildrenInfoCard from './ChildrenInfoCard';

interface ChildrenFormProps {
  form: UseFormReturn<LeadFormValues>;
}

const ChildrenForm: React.FC<ChildrenFormProps> = ({ form }) => {
  const requiresChildrenInfo = form.watch('requiresChildrenInfo');

  return (
    <div className="space-y-4 overflow-y-auto">
      <ChildrenInfoCard form={form} requiresChildrenInfo={requiresChildrenInfo} />
    </div>
  );
};

export default ChildrenForm;
