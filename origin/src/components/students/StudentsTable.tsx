
import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { StudentData } from '@/types/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, AlertTriangle, CalendarRange } from 'lucide-react';

interface StudentsTableProps {
  students: StudentData[];
  onViewAlerts: (studentId: string) => void;
  onSchedule: (studentId: string) => void;
  onViewDetails: (student: StudentData) => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({ 
  students, 
  onViewAlerts,
  onSchedule,
  onViewDetails
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Turma</TableHead>
            <TableHead>Matrícula</TableHead>
            <TableHead>Nível de Risco</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.class}</TableCell>
              <TableCell>{student.registrationNumber}</TableCell>
              <TableCell>
                <Badge variant={
                  student.riskLevel === 'high' ? 'destructive' :
                  student.riskLevel === 'medium' ? 'default' : 'outline'
                }>
                  {student.riskLevel === 'high' ? 'Alto' :
                   student.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onViewDetails(student)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Detalhes
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentsTable;
