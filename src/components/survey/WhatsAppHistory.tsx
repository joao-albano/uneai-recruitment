
import React, { useState } from 'react';
import { isAfter, isBefore, isEqual } from 'date-fns';
import { useData } from '@/context/DataContext';
import { WhatsAppMessage } from '@/types/whatsapp';
import { SchoolSegment } from '@/types/data';
import EmptyMessageState from './message-history/EmptyMessageState';
import MessageDetailDialog from './message-history/MessageDetailDialog';
import MessageList from './message-history/MessageList';
import FilterToolbar from './message-history/FilterToolbar';
import MessageListHeader from './message-history/MessageListHeader';
import ActiveFilters from './message-history/ActiveFilters';
import MessagePagination from './message-history/MessagePagination';

export const WhatsAppHistory: React.FC = () => {
  const { whatsAppMessages, students } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedMessage, setSelectedMessage] = useState<WhatsAppMessage | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<SchoolSegment | null>(null);
  const messagesPerPage = 10;

  // Get all unique segments from students
  const availableSegments = Array.from(new Set(students.map(student => student.segment)));

  const filteredMessages = whatsAppMessages.filter(msg => {
    const matchesSearch = 
      msg.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.recipientNumber.includes(searchQuery) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesDateRange = true;
    if (startDate) {
      matchesDateRange = matchesDateRange && (isAfter(msg.createdAt, startDate) || isEqual(msg.createdAt, startDate));
    }
    if (endDate) {
      // Set time to end of day for end date comparison
      const endOfDay = new Date(endDate);
      endOfDay.setHours(23, 59, 59, 999);
      matchesDateRange = matchesDateRange && (isBefore(msg.createdAt, endOfDay) || isEqual(msg.createdAt, endOfDay));
    }
    
    // Match segment if selected
    let matchesSegment = true;
    if (selectedSegment) {
      const student = students.find(s => s.id === msg.studentId);
      matchesSegment = student?.segment === selectedSegment;
    }
    
    return matchesSearch && matchesDateRange && matchesSegment;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMessages.length / messagesPerPage);
  const startIndex = (currentPage - 1) * messagesPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + messagesPerPage);

  const handleViewMessage = (message: WhatsAppMessage) => {
    setSelectedMessage(message);
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

  if (whatsAppMessages.length === 0) {
    return <EmptyMessageState />;
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
        <MessageListHeader />
        <MessageList 
          messages={paginatedMessages} 
          onViewMessage={handleViewMessage} 
        />
      </div>

      <MessagePagination 
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <MessageDetailDialog
        message={selectedMessage}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </div>
  );
};

export default WhatsAppHistory;
