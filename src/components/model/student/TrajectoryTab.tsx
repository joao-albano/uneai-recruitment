
import React from 'react';
import { StudentData } from '@/types/data';
import RiskEvolutionChart from './trajectory/RiskEvolutionChart';
import AcademicIndicatorsCard from './trajectory/AcademicIndicatorsCard';
import { generateTrajectoryData } from './trajectory/utils';

interface TrajectoryTabProps {
  student: StudentData;
}

const TrajectoryTab: React.FC<TrajectoryTabProps> = ({ student }) => {
  const trajectoryData = generateTrajectoryData(student);
  
  return (
    <div className="space-y-24 pb-16 px-4 w-full">
      <div className="mb-16">
        <RiskEvolutionChart trajectoryData={trajectoryData} />
      </div>
      <div className="mt-16">
        <AcademicIndicatorsCard trajectoryData={trajectoryData} />
      </div>
    </div>
  );
};

export default TrajectoryTab;
