
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import GradesChart from './GradesChart';
import AttendanceChart from './AttendanceChart';
import BehaviorChart from './BehaviorChart';

interface AcademicIndicatorsCardProps {
  trajectoryData: any[];
}

const AcademicIndicatorsCard: React.FC<AcademicIndicatorsCardProps> = ({ trajectoryData }) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-center">Indicadores Acadêmicos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 mt-2">
          <GradesChart trajectoryData={trajectoryData} />
          <AttendanceChart trajectoryData={trajectoryData} />
          <BehaviorChart trajectoryData={trajectoryData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicIndicatorsCard;
