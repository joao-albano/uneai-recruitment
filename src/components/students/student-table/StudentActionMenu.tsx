
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, AlertTriangle, Calendar, Database } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

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
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const handleViewAlertsClick = () => {
    if (isAdmin) {
      handleViewAlerts(studentId);
    } else {
      toast({
        title: "Acesso restrito",
        description: "Apenas administradores podem visualizar todos os alertas",
        variant: "destructive"
      });
      
      // Still call the function, it will show limited alerts for users
      handleViewAlerts(studentId);
    }
  };

  const handleScheduleClick = () => {
    handleSchedule(studentId);
  };

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
          onClick={handleViewAlertsClick}
        >
          <AlertTriangle className="h-4 w-4" />
          Ver Alertas
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleScheduleClick}
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
