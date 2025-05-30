
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import GradesChart from './GradesChart';
import AttendanceChart from './AttendanceChart';
import BehaviorChart from './BehaviorChart';
import { useIsMobile } from '@/hooks/use-mobile';

interface AcademicIndicatorsCardProps {
  trajectoryData: any[];
}

const AcademicIndicatorsCard: React.FC<AcademicIndicatorsCardProps> = ({ trajectoryData }) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="w-full">
      <CardHeader className={isMobile ? "p-3 pb-2" : "pb-2"}>
        <CardTitle className={`${isMobile ? "text-lg" : "text-xl"} text-center`}>Indicadores Acadêmicos</CardTitle>
      </CardHeader>
      <CardContent className={isMobile ? "p-2" : "p-4 sm:p-6"}>
        <div className={`grid grid-cols-1 ${isMobile ? "gap-4" : "md:grid-cols-2 lg:grid-cols-3 gap-8"} mt-2`}>
          <GradesChart trajectoryData={trajectoryData} />
          <AttendanceChart trajectoryData={trajectoryData} />
          <BehaviorChart trajectoryData={trajectoryData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicIndicatorsCard;
