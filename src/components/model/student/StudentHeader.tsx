
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { StudentData } from '@/types/data';

interface StudentHeaderProps {
  student: StudentData;
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ student }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => navigate('/model')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Trajetória Analítica do Aluno</h1>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-muted p-4 rounded-lg">
        <div>
          <h2 className="text-xl font-bold">{student.name}</h2>
          <p className="text-muted-foreground">Turma {student.class} • RA: {student.registrationNumber}</p>
        </div>
        <div className={`mt-2 sm:mt-0 text-sm font-medium rounded-full px-3 py-1 ${
          student.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
          student.riskLevel === 'medium' ? 'bg-amber-100 text-amber-700' : 
          'bg-green-100 text-green-700'
        }`}>
          Risco {student.riskLevel === 'high' ? 'Alto' :
                 student.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
        </div>
      </div>
    </>
  );
};

export default StudentHeader;
