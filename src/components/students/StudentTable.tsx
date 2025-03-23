
import React from 'react';
import { TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { AlertTriangle, Calendar, MoreHorizontal } from 'lucide-react';
import { StudentData } from '@/types/data';

interface StudentTableProps {
  students: StudentData[];
  handleViewAlerts: (studentId: string) => void;
  handleSchedule: (studentId: string) => void;
  classFilter: string | null;
  clearClassFilter: () => void;
}

const StudentTable: React.FC<StudentTableProps> = ({ 
  students, 
  handleViewAlerts, 
  handleSchedule,
  classFilter,
  clearClassFilter
}) => {
  
  const getRiskColor = (riskLevel?: 'low' | 'medium' | 'high') => {
    switch(riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskText = (riskLevel?: 'low' | 'medium' | 'high') => {
    switch(riskLevel) {
      case 'high':
        return 'Alto Risco';
      case 'medium':
        return 'Médio Risco';
      case 'low':
        return 'Baixo Risco';
      default:
        return 'Sem Classificação';
    }
  };
  
  return (
    <TableBody>
      {students.length > 0 ? (
        students.map((student) => (
          <TableRow key={student.id}>
            <TableCell className="font-medium">{student.name}</TableCell>
            <TableCell>{student.class} • {student.segment}</TableCell>
            <TableCell>
              <Badge className={getRiskColor(student.riskLevel)}>
                {getRiskText(student.riskLevel)}
              </Badge>
            </TableCell>
            <TableCell>{student.grade.toFixed(1)}</TableCell>
            <TableCell>{student.attendance}%</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleViewAlerts(student.id)}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Ver Alertas
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleSchedule(student.id)}
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar Atendimento
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={6} className="text-center py-10">
            {classFilter ? (
              <div className="flex flex-col items-center justify-center space-y-2">
                <p className="text-muted-foreground">Nenhum aluno encontrado na turma {classFilter}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearClassFilter}
                  className="mt-2"
                >
                  Mostrar todos os alunos
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhum aluno cadastrado</p>
            )}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};

export default StudentTable;
