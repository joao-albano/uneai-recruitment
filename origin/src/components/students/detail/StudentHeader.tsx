
import React from 'react';
import { Button } from "@/components/ui/button";
import { StudentData } from '@/types/data';

interface StudentHeaderProps {
  student: StudentData;
  onScheduleMeeting: (studentId: string, studentName: string) => void;
  onSendSurvey: (studentId: string) => void;
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ 
  student, 
  onScheduleMeeting,
  onSendSurvey
}) => {
  const handleScheduleMeeting = () => {
    onScheduleMeeting(student.id, student.name);
  };
  
  const handleSendSurvey = () => {
    onSendSurvey(student.id);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold">{student.name}</h2>
        <p className="text-muted-foreground">Turma {student.class} | ID: {student.id}</p>
      </div>
      <div className="flex mt-4 sm:mt-0 space-x-2">
        <Button variant="outline" size="sm" onClick={handleSendSurvey}>
          Enviar Pesquisa
        </Button>
        <Button size="sm" onClick={handleScheduleMeeting}>
          Agendar Atendimento
        </Button>
      </div>
    </div>
  );
};

export default StudentHeader;
