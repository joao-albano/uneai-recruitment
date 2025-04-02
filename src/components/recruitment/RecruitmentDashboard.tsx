
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from './dashboard/DashboardHeader';
import RecruitmentStats from './dashboard/RecruitmentStats';
import FunnelChartCard from './dashboard/FunnelChartCard';
import RecentLeadsCard from './dashboard/RecentLeadsCard';
import OperationalVisualizationTable from './dashboard/OperationalVisualizationTable';
import ChannelsTabContent from './dashboard/tabs/ChannelsTabContent';
import CoursesTabContent from './dashboard/tabs/CoursesTabContent';
import LocationsTabContent from './dashboard/tabs/LocationsTabContent';

const RecruitmentDashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <DashboardHeader />
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="locations">Localidades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4">
          <RecruitmentStats />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <FunnelChartCard />
            <RecentLeadsCard />
          </div>
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
      
      <OperationalVisualizationTable />
    </div>
  );
};

export default RecruitmentDashboard;
