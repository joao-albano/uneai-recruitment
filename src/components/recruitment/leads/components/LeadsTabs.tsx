
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface LeadsTabsProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  counts: {
    all: number;
    new: number;
    inProgress: number;
    scheduled: number;
    enrolled: number;
  };
}

const LeadsTabs: React.FC<LeadsTabsProps> = ({ 
  activeFilter,
  setActiveFilter,
  counts
}) => {
  return (
    <div className="my-4">
      <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
        <TabsList className="mb-2 w-full justify-start bg-muted/30">
          <TabsTrigger value="all" className="relative">
            Todos os Leads
            <span className="ml-2 rounded-full bg-muted-foreground/20 px-1.5 py-0.5 text-xs">
              {counts.all}
            </span>
          </TabsTrigger>
          <TabsTrigger value="new" className="relative">
            Novos
            <span className="ml-2 rounded-full bg-green-500/20 px-1.5 py-0.5 text-xs">
              {counts.new}
            </span>
          </TabsTrigger>
          <TabsTrigger value="inProgress" className="relative">
            Em Andamento
            <span className="ml-2 rounded-full bg-blue-500/20 px-1.5 py-0.5 text-xs">
              {counts.inProgress}
            </span>
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="relative">
            Agendados
            <span className="ml-2 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-xs">
              {counts.scheduled}
            </span>
          </TabsTrigger>
          <TabsTrigger value="enrolled" className="relative">
            Matriculados
            <span className="ml-2 rounded-full bg-purple-500/20 px-1.5 py-0.5 text-xs">
              {counts.enrolled}
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default LeadsTabs;
