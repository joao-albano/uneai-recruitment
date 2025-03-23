
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
    <div className="space-y-20 pb-12 px-4 w-full">
      <div className="mb-20">
        <RiskEvolutionChart trajectoryData={trajectoryData} />
      </div>
      <div className="mb-8">
        <AcademicIndicatorsCard trajectoryData={trajectoryData} />
      </div>
    </div>
  );
};

export default TrajectoryTab;
