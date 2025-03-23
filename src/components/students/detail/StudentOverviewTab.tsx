
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudentData } from '@/types/data';
import { Calendar, User, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StudentOverviewTabProps {
  student: StudentData;
  onScheduleMeeting: (studentId: string, studentName: string) => void;
}

const StudentOverviewTab: React.FC<StudentOverviewTabProps> = ({ 
  student, 
  onScheduleMeeting
}) => {
  const navigate = useNavigate();
  
  const handleScheduleMeeting = () => {
    onScheduleMeeting(student.id, student.name);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dados Acadêmicos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nota média:</span>
                <span className="font-medium">{student.grade.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequência:</span>
                <span className="font-medium">{student.attendance}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Comportamento:</span>
                <span className="font-medium">{student.behavior}/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Responsável</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{student.parentName || "Não informado"}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{student.parentContact || "Não informado"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Ações Necessárias</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              {student.actionItems && student.actionItems.length > 0 ? (
                student.actionItems.map((action, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{action}</span>
                  </li>
                ))
              ) : (
                <li>Nenhuma ação necessária no momento</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Próximos Atendimentos</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/schedule')}>
              <Calendar className="h-4 w-4 mr-2" />
              Ver todos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-muted-foreground">
              Nenhum atendimento agendado.
            </p>
            <Button variant="link" size="sm" onClick={handleScheduleMeeting}>
              Agendar atendimento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentOverviewTab;
