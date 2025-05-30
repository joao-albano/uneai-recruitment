
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../../types/leadForm';
import ObservationsCard from './ObservationsCard';
import PreferenceCard from './PreferenceCard';

interface AdditionalInfoFormProps {
  form: UseFormReturn<LeadFormValues>;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ form }) => {
  return (
    <div className="space-y-4 overflow-y-auto">
      <ObservationsCard form={form} />
      <PreferenceCard form={form} />
    </div>
  );
};

export default AdditionalInfoForm;
