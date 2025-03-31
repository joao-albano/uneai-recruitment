
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LeadsTabs: React.FC = () => {
  return (
    <Tabs defaultValue="all" className="mb-6">
      <TabsList>
        <TabsTrigger value="all">Todos os Leads</TabsTrigger>
        <TabsTrigger value="new">Novos</TabsTrigger>
        <TabsTrigger value="in-progress">Em Andamento</TabsTrigger>
        <TabsTrigger value="scheduled">Agendados</TabsTrigger>
        <TabsTrigger value="enrolled">Matriculados</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default LeadsTabs;
