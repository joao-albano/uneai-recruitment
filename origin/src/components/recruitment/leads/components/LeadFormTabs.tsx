
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../types/leadForm';
import BasicInfoForm from './forms/basic-info';
import ChildrenForm from './forms/ChildrenForm';
import AdditionalInfoForm from './forms/AdditionalInfoForm';

interface LeadFormTabsProps {
  form: UseFormReturn<LeadFormValues>;
}

const LeadFormTabs: React.FC<LeadFormTabsProps> = ({ form }) => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="w-full grid grid-cols-3 mb-4">
        <TabsTrigger value="basic" className="text-xs sm:text-sm whitespace-nowrap px-1 sm:px-2">
          Informações Básicas
        </TabsTrigger>
        <TabsTrigger value="children" className="text-xs sm:text-sm whitespace-nowrap px-1 sm:px-2">
          Filhos
        </TabsTrigger>
        <TabsTrigger value="additional" className="text-xs sm:text-sm whitespace-nowrap px-1 sm:px-2">
          Informações Adicionais
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basic" className="space-y-4 py-2">
        <BasicInfoForm form={form} />
      </TabsContent>

      <TabsContent value="children" className="py-2">
        <ChildrenForm form={form} />
      </TabsContent>

      <TabsContent value="additional" className="py-2">
        <AdditionalInfoForm form={form} />
      </TabsContent>
    </Tabs>
  );
};

export default LeadFormTabs;
