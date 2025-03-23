
import React, { useState } from 'react';
import { format, isAfter, isBefore, isEqual } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useData } from '@/context/DataContext';
import { WhatsAppMessage } from '@/types/whatsapp';
import { Search, Calendar, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import EmptyMessageState from './message-history/EmptyMessageState';
import MessageDetailDialog from './message-history/MessageDetailDialog';
import MessageList from './message-history/MessageList';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { SchoolSegment } from '@/types/data';

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
  
  const clearDateFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const applyDateFilter = () => {
    setOpen(false); // Close the popover when applying the filter
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
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome, número ou conteúdo..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          {/* Date Filter */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Filtrar por data
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Data Inicial
                  </p>
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    className="rounded-md border pointer-events-auto"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Data Final
                  </p>
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => startDate ? isBefore(date, startDate) : false}
                    className="rounded-md border pointer-events-auto"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={clearDateFilter}>
                    Limpar
                  </Button>
                  <Button variant="default" size="sm" onClick={applyDateFilter}>
                    Aplicar
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Segment Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {selectedSegment ? `Segmento: ${selectedSegment}` : 'Filtrar por segmento'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Segmento Escolar</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {availableSegments.map((segment) => (
                <DropdownMenuCheckboxItem
                  key={segment}
                  checked={selectedSegment === segment}
                  onCheckedChange={() => {
                    setSelectedSegment(selectedSegment === segment ? null : segment);
                    setCurrentPage(1); // Reset to first page on filter change
                  }}
                >
                  {segment}
                </DropdownMenuCheckboxItem>
              ))}
              {selectedSegment && (
                <>
                  <DropdownMenuSeparator />
                  <div className="px-2 py-1.5">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => setSelectedSegment(null)}
                    >
                      Limpar filtro
                    </Button>
                  </div>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear all filters button - only show if there are active filters */}
          {(searchQuery || startDate || endDate || selectedSegment) && (
            <Button variant="ghost" size="icon" onClick={clearAllFilters} title="Limpar todos os filtros">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </Button>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {(selectedSegment) && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSegment && (
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              Segmento: {selectedSegment}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedSegment(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </Button>
            </Badge>
          )}
        </div>
      )}

      <div className="border rounded-md">
        <div className="grid grid-cols-12 gap-2 p-3 bg-muted/50 text-sm font-medium border-b">
          <div className="col-span-3">Estudante</div>
          <div className="col-span-3">Responsável</div>
          <div className="col-span-2">Enviado em</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">Ações</div>
        </div>

        <MessageList 
          messages={paginatedMessages} 
          onViewMessage={handleViewMessage} 
        />
      </div>

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

      <MessageDetailDialog
        message={selectedMessage}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </div>
  );
};
