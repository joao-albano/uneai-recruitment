
import React from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';

interface RecruitmentScheduleHeaderProps {
  handleViewReminders: () => void;
}

const RecruitmentScheduleHeader: React.FC<RecruitmentScheduleHeaderProps> = ({
  handleViewReminders
}) => {
  return (
    <div className="flex justify-between items-center mb-4 mt-4 px-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agenda de Captação</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie atendimentos e acompanhamentos de leads
        </p>
      </div>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={handleViewReminders}
      >
        <History className="h-4 w-4" />
        Histórico de Lembretes
      </Button>
    </div>
  );
};

export default RecruitmentScheduleHeader;
