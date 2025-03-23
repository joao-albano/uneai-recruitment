
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface StudentEmptyStateProps {
  classFilter: string | null;
  clearClassFilter: () => void;
}

const StudentEmptyState: React.FC<StudentEmptyStateProps> = ({ 
  classFilter, 
  clearClassFilter 
}) => {
  return (
    <TableRow>
      <TableCell colSpan={6} className="text-center py-10">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="text-muted-foreground">Nenhum aluno encontrado com os filtros aplicados</p>
          {classFilter ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearClassFilter}
              className="mt-2"
            >
              Mostrar todos os alunos
            </Button>
          ) : null}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default StudentEmptyState;
