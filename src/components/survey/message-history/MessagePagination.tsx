
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface MessagePaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const MessagePagination: React.FC<MessagePaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }
  
  return (
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
  );
};

export default MessagePagination;
