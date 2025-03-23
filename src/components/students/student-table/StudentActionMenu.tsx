
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, AlertTriangle, Calendar, Database } from 'lucide-react';

interface StudentActionMenuProps {
  studentId: string;
  handleViewAlerts: (studentId: string) => void;
  handleSchedule: (studentId: string) => void;
  handleAddAsData: (studentId: string) => void;
}

const StudentActionMenu: React.FC<StudentActionMenuProps> = ({ 
  studentId, 
  handleViewAlerts, 
  handleSchedule,
  handleAddAsData 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleViewAlerts(studentId)}
        >
          <AlertTriangle className="h-4 w-4" />
          Ver Alertas
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleSchedule(studentId)}
        >
          <Calendar className="h-4 w-4" />
          Agendar Atendimento
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleAddAsData(studentId)}
        >
          <Database className="h-4 w-4" />
          Adicionar como Dados
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StudentActionMenu;
