
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Student } from '@/types/data';

interface StudentDialogHeaderProps {
  student: Student;
}

const StudentDialogHeader: React.FC<StudentDialogHeaderProps> = ({ student }) => {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        {student.name}
        <span className={`text-xs px-2 py-1 rounded-full ${
          student.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
          student.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {student.riskLevel === 'high' ? 'Alto Risco' :
           student.riskLevel === 'medium' ? 'Médio Risco' :
           'Baixo Risco'}
        </span>
      </DialogTitle>
      <DialogDescription>
        Turma {student.class} | Matrícula: {student.registrationNumber}
      </DialogDescription>
    </DialogHeader>
  );
};

export default StudentDialogHeader;
