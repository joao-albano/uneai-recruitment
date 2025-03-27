
import React, { useState } from 'react';
import { isAfter, isBefore, isEqual } from 'date-fns';
import { VoiceCall } from '@/types/voicecall';
import { SchoolSegment } from '@/types/data';
import { useVoiceCallHistory } from '@/hooks/useVoiceCallHistory';
import { useStudents } from '@/context/students/StudentsContext';
import EmptyCallState from './voice-history/EmptyCallState';
import CallDetailDialog from './voice-history/CallDetailDialog';
import CallList from './voice-history/CallList';
import FilterToolbar from './voice-history/FilterToolbar';
import CallListHeader from './voice-history/CallListHeader';
import ActiveFilters from './voice-history/ActiveFilters';
import CallPagination from './voice-history/CallPagination';

export const VoiceCallHistory: React.FC = () => {
  const { calls } = useVoiceCallHistory();
  const { students } = useStudents();
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedCall, setSelectedCall] = useState<VoiceCall | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<SchoolSegment | null>(null);
  const callsPerPage = 10;

  // Get all unique segments from students
  const availableSegments = Array.from(new Set(students.map(student => student.segment)));

  const filteredCalls = calls.filter(call => {
    const matchesSearch = 
      call.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.recipientNumber.includes(searchQuery);
    
    let matchesDateRange = true;
    if (startDate) {
      matchesDateRange = matchesDateRange && (isAfter(call.createdAt, startDate) || isEqual(call.createdAt, startDate));
    }
    if (endDate) {
      // Set time to end of day for end date comparison
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      matchesDateRange = matchesDateRange && (isBefore(call.createdAt, endOfDay) || isEqual(call.createdAt, endOfDay));
    }
    
    // Match segment if selected
    let matchesSegment = true;
    if (selectedSegment) {
      const student = students.find(s => s.id === call.studentId);
      matchesSegment = student?.segment === selectedSegment;
    }
    
    return matchesSearch && matchesDateRange && matchesSegment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCalls.length / callsPerPage);
  const startIndex = (currentPage - 1) * callsPerPage;
  const paginatedCalls = filteredCalls.slice(startIndex, startIndex + callsPerPage);

  const handleViewCall = (call: VoiceCall) => {
    setSelectedCall(call);
    setShowDialog(true);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedSegment(null);
  };

  if (calls.length === 0) {
    return <EmptyCallState />;
  }

  return (
    <div className="space-y-4">
      <FilterToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        selectedSegment={selectedSegment}
        setSelectedSegment={setSelectedSegment}
        availableSegments={availableSegments}
        setCurrentPage={setCurrentPage}
        clearAllFilters={clearAllFilters}
        open={open}
        setOpen={setOpen}
      />

      <ActiveFilters 
        selectedSegment={selectedSegment}
        setSelectedSegment={setSelectedSegment}
      />

      <div className="border rounded-md">
        <CallListHeader />
        <CallList 
          calls={paginatedCalls} 
          onViewCall={handleViewCall} 
        />
      </div>

      <CallPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <CallDetailDialog
        call={selectedCall}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </div>
  );
};

export default VoiceCallHistory;
