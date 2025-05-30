
import React from 'react';
import { Student } from '@/types/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, AlertTriangle, CalendarRange } from 'lucide-react';

interface StudentsListProps {
  students: Student[];
  onOpenDetails: (student: Student) => void;
  isMobile: boolean;
}

const StudentsList: React.FC<StudentsListProps> = ({ 
  students, 
  onOpenDetails,
  isMobile = false
}) => {
  return (
    <div className="space-y-4 mb-4">
      {students.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-muted-foreground">Nenhum aluno encontrado.</p>
        </div>
      ) : (
        students.map(student => (
          <Card key={student.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{student.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      student.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                      student.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {student.riskLevel === 'high' ? 'Alto Risco' :
                       student.riskLevel === 'medium' ? 'Médio Risco' :
                       'Baixo Risco'}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Turma {student.class} | Matrícula: {student.registrationNumber}
                  </p>
                </div>
                
                <div className="flex gap-2 mt-3 sm:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => onOpenDetails(student)}
                  >
                    <Eye size={16} />
                    {isMobile ? '' : 'Detalhes'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default StudentsList;
