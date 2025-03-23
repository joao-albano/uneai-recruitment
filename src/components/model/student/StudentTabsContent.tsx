
import React from 'react';
import { StudentData } from '@/types/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart3, Calendar, BookOpen } from 'lucide-react';
import TrajectoryTab from './TrajectoryTab';
import AnalyticsTab from './AnalyticsTab';
import InterventionsTab from './InterventionsTab';
import DetailsTab from './DetailsTab';

interface StudentTabsContentProps {
  student: StudentData;
}

const StudentTabsContent: React.FC<StudentTabsContentProps> = ({ student }) => {
  return (
    <Tabs defaultValue="trajectory">
      <TabsList>
        <TabsTrigger value="trajectory" className="flex items-center gap-1">
          <LineChart className="h-4 w-4" />
          <span>Trajetória</span>
        </TabsTrigger>
        <TabsTrigger value="analytics" className="flex items-center gap-1">
          <BarChart3 className="h-4 w-4" />
          <span>Análises</span>
        </TabsTrigger>
        <TabsTrigger value="interventions" className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>Intervenções</span>
        </TabsTrigger>
        <TabsTrigger value="details" className="flex items-center gap-1">
          <BookOpen className="h-4 w-4" />
          <span>Detalhes</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="trajectory" className="space-y-4 mt-4">
        <TrajectoryTab student={student} />
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-4 mt-4">
        <AnalyticsTab student={student} />
      </TabsContent>
      
      <TabsContent value="interventions" className="space-y-4 mt-4">
        <InterventionsTab student={student} />
      </TabsContent>
      
      <TabsContent value="details" className="space-y-4 mt-4">
        <DetailsTab student={student} />
      </TabsContent>
    </Tabs>
  );
};

export default StudentTabsContent;
