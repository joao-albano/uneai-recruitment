
import React from 'react';

const RecruitmentScheduleHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-4 mt-4 px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agenda de Captação</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie atendimentos e acompanhamentos de leads
        </p>
      </div>
    </div>
  );
};

export default RecruitmentScheduleHeader;
