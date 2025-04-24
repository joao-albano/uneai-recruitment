import React, { useState } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import ScheduleView from '@/components/scheduling/ScheduleView';
import { useDemoScheduleData } from '@/hooks/schedule/useDemoScheduleData';
import RecruitmentScheduleHeader from './RecruitmentScheduleHeader';
import RecruitmentFiltersPanel from './RecruitmentFiltersPanel';

interface RecruitmentScheduleViewProps {
  showAddDialog?: boolean;
  setShowAddDialog?: (show: boolean) => void;
  leadId?: string | null;
}

const RecruitmentScheduleView: React.FC<RecruitmentScheduleViewProps> = ({
  showAddDialog,
  setShowAddDialog,
  leadId
}) => {
  const { visibleSchedules } = useSchedules();
  const [selectedCampus, setSelectedCampus] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<string>("all");
  const [viewMode, setViewMode] = useState<string>("month");
  const [localShowAddDialog, setLocalShowAddDialog] = useState<boolean>(false);
  
  useDemoScheduleData();
  
  const filteredSchedules = visibleSchedules.filter(schedule => 
    (schedule.productContext === 'recruitment') ||
    (!schedule.productContext && schedule.studentId.startsWith('lead-'))
  );
  
  const effectiveShowAddDialog = showAddDialog !== undefined ? showAddDialog : localShowAddDialog;
  
  const handleSetShowAddDialog = (show: boolean) => {
    console.log("Setting show dialog to:", show);
    if (setShowAddDialog) {
      setShowAddDialog(show);
    }
    setLocalShowAddDialog(show);
  };
  
  const handleNewSchedule = () => {
    handleSetShowAddDialog(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full space-y-4">
      <RecruitmentScheduleHeader />
      
      <RecruitmentFiltersPanel
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <div className="flex-1 min-h-0">
        <ScheduleView 
          productContext="recruitment" 
          showAddDialog={effectiveShowAddDialog}
          setShowAddDialog={handleSetShowAddDialog}
          leadId={leadId}
          viewMode={viewMode}
        />
      </div>
    </div>
  );
};

export default RecruitmentScheduleView;
