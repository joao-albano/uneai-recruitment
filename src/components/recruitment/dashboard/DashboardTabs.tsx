
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChannelsTabContent from './tabs/ChannelsTabContent';
import CoursesTabContent from './tabs/CoursesTabContent';
import LocationsTabContent from './tabs/LocationsTabContent';
import OverviewTabContent from './tabs/OverviewTabContent';

const DashboardTabs: React.FC = () => {
  return (
    <Tabs defaultValue="overview" className="mb-8">
      <TabsList>
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="channels">Canais</TabsTrigger>
        <TabsTrigger value="courses">Cursos</TabsTrigger>
        <TabsTrigger value="locations">Localidades</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="pt-4">
        <OverviewTabContent />
      </TabsContent>
      
      <TabsContent value="channels" className="pt-4">
        <ChannelsTabContent />
      </TabsContent>
      
      <TabsContent value="courses" className="pt-4">
        <CoursesTabContent />
      </TabsContent>
      
      <TabsContent value="locations" className="pt-4">
        <LocationsTabContent />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
