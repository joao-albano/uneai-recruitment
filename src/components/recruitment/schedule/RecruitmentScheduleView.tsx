
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
  const [showRemindersHistory, setShowRemindersHistory] = useState<boolean>(false);
  
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

  const handleViewReminders = () => {
    console.log("Opening reminders history dialog");
    setShowRemindersHistory(true);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <RecruitmentScheduleHeader 
        handleViewReminders={handleViewReminders}
      />
      
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
          showRemindersHistory={showRemindersHistory}
          setShowRemindersHistory={setShowRemindersHistory}
        />
      </main>
    </div>
  );
};

export default RecruitmentScheduleView;
