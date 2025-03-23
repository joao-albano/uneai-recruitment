
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
    <div className="space-y-24 pb-16 px-6 w-full">
      <div className="mb-24">
        <RiskEvolutionChart trajectoryData={trajectoryData} />
      </div>
      <div className="mb-12">
        <AcademicIndicatorsCard trajectoryData={trajectoryData} />
      </div>
    </div>
  );
};

export default TrajectoryTab;
