
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, UserRound, LineChart, BookOpen } from 'lucide-react';
import OverviewTab from './tabs/OverviewTab';
import StudentsTab from './tabs/StudentsTab';
import MetricsTab from './tabs/MetricsTab';
import DocumentationTab from './tabs/DocumentationTab';

const ModelTabsContent: React.FC = () => {
  return (
    <Tabs defaultValue="overview" className="mb-8">
      <TabsList className="mb-4">
        <TabsTrigger value="overview" className="flex items-center gap-1">
          <Brain className="h-4 w-4" />
          <span>Visão Geral</span>
        </TabsTrigger>
        <TabsTrigger value="students" className="flex items-center gap-1">
          <UserRound className="h-4 w-4" />
          <span>Alunos Analisados</span>
        </TabsTrigger>
        <TabsTrigger value="metrics" className="flex items-center gap-1">
          <LineChart className="h-4 w-4" />
          <span>Métricas</span>
        </TabsTrigger>
        <TabsTrigger value="docs" className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          <span>Documentação</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <OverviewTab />
      </TabsContent>
      
      <TabsContent value="students">
        <StudentsTab />
      </TabsContent>
      
      <TabsContent value="metrics">
        <MetricsTab />
      </TabsContent>
      
      <TabsContent value="docs">
        <DocumentationTab />
      </TabsContent>
    </Tabs>
  );
};

export default ModelTabsContent;
