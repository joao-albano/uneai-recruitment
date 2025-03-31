
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../types/leadForm';
import BasicInfoForm from './forms/BasicInfoForm';
import ChildrenForm from './forms/ChildrenForm';
import AdditionalInfoForm from './forms/AdditionalInfoForm';

interface LeadFormTabsProps {
  form: UseFormReturn<LeadFormValues>;
}

const LeadFormTabs: React.FC<LeadFormTabsProps> = ({ form }) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
        <TabsTrigger value="children">Filhos</TabsTrigger>
        <TabsTrigger value="additional">Informações Adicionais</TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4 py-4">
        <BasicInfoForm form={form} />
      </TabsContent>

      <TabsContent value="children" className="py-4">
        <ChildrenForm form={form} />
      </TabsContent>

      <TabsContent value="additional" className="py-4">
        <AdditionalInfoForm />
      </TabsContent>
    </Tabs>
  );
};

export default LeadFormTabs;
