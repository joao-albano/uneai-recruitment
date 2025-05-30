
import React from 'react';
import { TableHeader, TableRow, TableHead } from '@/components/ui/table';
import { ArrowUpDown } from 'lucide-react';

export interface StudentTableHeaderProps {
  toggleSort: (key: 'name' | 'riskLevel' | 'grade' | 'attendance') => void;
  sortKey: 'name' | 'riskLevel' | 'grade' | 'attendance';
  currentSortKey?: 'name' | 'riskLevel' | 'grade' | 'attendance';
  sortOrder?: 'asc' | 'desc';
  label?: string;  // Add this prop
}

const StudentTableHeader: React.FC<StudentTableHeaderProps> = ({ 
  toggleSort,
  sortKey,
  label  // Add this parameter
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="cursor-pointer" onClick={() => toggleSort('name')}>
          <div className="flex items-center gap-1">
            Nome <ArrowUpDown size={16} />
          </div>
        </TableHead>
        <TableHead>Turma / Segmento</TableHead>
        <TableHead className="cursor-pointer" onClick={() => toggleSort('riskLevel')}>
          <div className="flex items-center gap-1">
            Nível de Risco <ArrowUpDown size={16} />
          </div>
        </TableHead>
        <TableHead className="cursor-pointer" onClick={() => toggleSort('grade')}>
          <div className="flex items-center gap-1">
            Nota Média <ArrowUpDown size={16} />
          </div>
        </TableHead>
        <TableHead className="cursor-pointer" onClick={() => toggleSort('attendance')}>
          <div className="flex items-center gap-1">
            Frequência <ArrowUpDown size={16} />
          </div>
        </TableHead>
        <TableHead className="text-right">Ações</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default StudentTableHeader;
