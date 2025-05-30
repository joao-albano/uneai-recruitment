
import React from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudentsHeaderProps {
  studentCount: number;
}

const StudentsHeader: React.FC<StudentsHeaderProps> = ({ studentCount }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Alunos</h1>
        <p className="text-muted-foreground">
          Gerencie e acompanhe todos os {studentCount} alunos cadastrados no sistema.
        </p>
      </div>
    </div>
  );
};

export default StudentsHeader;
