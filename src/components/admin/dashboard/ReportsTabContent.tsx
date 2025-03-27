
import React from 'react';
import ExportReports from './ExportReports';

interface ReportsTabContentProps {
  onError: (error: Error) => void;
}

const ReportsTabContent: React.FC<ReportsTabContentProps> = ({ onError }) => {
  return (
    <div className="space-y-6">
      <ExportReports onError={onError} />
    </div>
  );
};

export default ReportsTabContent;
