
import React, { useState } from 'react';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import ScheduleView from '@/components/scheduling/ScheduleView';
import { useDemoScheduleData } from '@/hooks/schedule/useDemoScheduleData';
import RecruitmentScheduleHeader from './RecruitmentScheduleHeader';
import RecruitmentFiltersPanel from './RecruitmentFiltersPanel';
import { Button } from '@/components/ui/button';
import { CalendarPlus } from 'lucide-react';

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
  
  // Load demo data
  useDemoScheduleData();
  
  // Filter schedules for recruitment context
  const filteredSchedules = visibleSchedules.filter(schedule => 
    (schedule.productContext === 'recruitment') ||
    (!schedule.productContext && schedule.studentId.startsWith('lead-'))
  );
  
  // Fix for dialog management - prevent immediate closing
  const effectiveShowAddDialog = showAddDialog !== undefined ? showAddDialog : localShowAddDialog;
  
  // Create wrapped set function that doesn't immediately trigger state updates between components
  const handleSetShowAddDialog = (show: boolean) => {
    console.log("Setting show dialog to:", show);
    if (setShowAddDialog) {
      setShowAddDialog(show);
    }
    setLocalShowAddDialog(show);
  };
  
  // Handle new appointment button click
  const handleNewSchedule = () => {
    handleSetShowAddDialog(true);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <RecruitmentScheduleHeader />
      
      <RecruitmentFiltersPanel
        selectedCampus={selectedCampus}
        setSelectedCampus={setSelectedCampus}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      <main className="flex-1 overflow-y-auto p-6 pointer-events-auto">
        <ScheduleView 
          productContext="recruitment" 
          showAddDialog={effectiveShowAddDialog}
          setShowAddDialog={handleSetShowAddDialog}
          leadId={leadId}
          viewMode={viewMode}
        />
      </main>
    </div>
  );
};

export default RecruitmentScheduleView;
