
import React, { useState } from 'react';
import { InterventionsTabProps } from './interventions/types';
import { generateAnalysisHistory, generateInterventionHistory } from './interventions/demoData';
import RecommendedInterventions from './interventions/RecommendedInterventions';
import InterventionHistory from './interventions/InterventionHistory';
import AnalysisHistory from './interventions/AnalysisHistory';

const InterventionsTab: React.FC<InterventionsTabProps> = ({ student }) => {
  const [analysisHistory] = useState(generateAnalysisHistory(student));
  const [interventions] = useState(generateInterventionHistory(student));

  return (
    <div className="space-y-4">
      <RecommendedInterventions student={student} />
      <InterventionHistory student={student} interventions={interventions} />
      <AnalysisHistory analysisHistory={analysisHistory} />
    </div>
  );
};

export default InterventionsTab;
