
import React, { useState } from 'react';
import { format, isAfter, isBefore, isEqual, parseISO } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { useTheme } from '@/context/ThemeContext';
import { WhatsAppMessage } from '@/types/whatsapp';
import { Input } from '@/components/ui/input';
import { Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import SettingsEmptyMessageState from './message-history/SettingsEmptyMessageState';
import SettingsMessageList from './message-history/SettingsMessageList';
import SettingsMessageDetailDialog from './message-history/SettingsMessageDetailDialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface WhatsAppHistoryProps {
  messages: WhatsAppMessage[];
}

const WhatsAppHistory: React.FC<WhatsAppHistoryProps> = ({ messages }) => {
  const { language } = useTheme();
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [selectedMessage, setSelectedMessage] = useState<WhatsAppMessage | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const messagesPerPage = 10;
  
  const dateLocale = language === 'pt-BR' ? ptBR : enUS;
  
  // Filter messages by search term and date range
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.studentName.toLowerCase().includes(search.toLowerCase()) || 
                          msg.parentName.toLowerCase().includes(search.toLowerCase()) ||
                          msg.recipientNumber.includes(search);
    
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
    
    return matchesSearch && matchesDateRange;
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
  
  const clearDateFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'pt-BR' ? "Buscar por aluno, responsável ou número..." : "Search by student, parent or number..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                {language === 'pt-BR' ? 'Filtrar por data' : 'Filter by date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {language === 'pt-BR' ? 'Data Inicial' : 'Start Date'}
                  </p>
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {language === 'pt-BR' ? 'Data Final' : 'End Date'}
                  </p>
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => startDate ? isBefore(date, startDate) : false}
                    className="rounded-md border"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={clearDateFilter}>
                    {language === 'pt-BR' ? 'Limpar' : 'Clear'}
                  </Button>
                  <Button variant="default" size="sm" onClick={() => document.body.click()}>
                    {language === 'pt-BR' ? 'Aplicar' : 'Apply'}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {filteredMessages.length === 0 ? (
        <SettingsEmptyMessageState hasSearch={search !== '' || !!startDate || !!endDate} />
      ) : (
        <>
          <SettingsMessageList 
            messages={paginatedMessages} 
            onViewMessage={handleViewMessage} 
          />
          
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : 0}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : 0}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
      
      <SettingsMessageDetailDialog
        message={selectedMessage}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </div>
  );
};

export default WhatsAppHistory;
