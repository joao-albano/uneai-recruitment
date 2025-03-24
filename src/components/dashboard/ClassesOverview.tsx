
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StudentData } from '@/context/DataContext';

interface ClassesOverviewProps {
  students: StudentData[];
  onViewClassDetails: (className: string) => void;
  isMobile?: boolean;
}

const ClassesOverview: React.FC<ClassesOverviewProps> = ({ 
  students, 
  onViewClassDetails,
  isMobile = false
}) => {
  // Group students by class
  const classesBySegment = students.reduce((acc, student) => {
    const key = `${student.class}-${student.segment}`;
    if (!acc[key]) {
      acc[key] = {
        className: student.class,
        segment: student.segment,
        students: []
      };
    }
    acc[key].students.push(student);
    return acc;
  }, {} as Record<string, { className: string, segment: string, students: StudentData[] }>);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {Object.values(classesBySegment).map(({ className, segment, students: classStudents }) => (
        <Card key={`${className}-${segment}`}>
          <CardHeader className={isMobile ? "p-3" : "p-4"}>
            <CardTitle className={`${isMobile ? "text-sm" : "text-lg"} font-medium`}>Turma {className}</CardTitle>
            <CardDescription className={isMobile ? "text-xs" : "text-sm"}>
              {segment} • {classStudents.length} alunos
            </CardDescription>
          </CardHeader>
          <CardContent className={isMobile ? "p-3 pt-0" : "p-4 pt-2"}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={isMobile ? "text-xs" : "text-sm"}>Alto Risco</span>
                <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}>
                  {classStudents.filter(s => s.riskLevel === 'high').length} alunos
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full"
                  style={{ 
                    width: `${(classStudents.filter(s => s.riskLevel === 'high').length / classStudents.length) * 100}%` 
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <span className={isMobile ? "text-xs" : "text-sm"}>Médio Risco</span>
                <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}>
                  {classStudents.filter(s => s.riskLevel === 'medium').length} alunos
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ 
                    width: `${(classStudents.filter(s => s.riskLevel === 'medium').length / classStudents.length) * 100}%` 
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <span className={isMobile ? "text-xs" : "text-sm"}>Baixo Risco</span>
                <span className={`${isMobile ? "text-xs" : "text-sm"} font-medium`}>
                  {classStudents.filter(s => s.riskLevel === 'low').length} alunos
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ 
                    width: `${(classStudents.filter(s => s.riskLevel === 'low').length / classStudents.length) * 100}%` 
                  }}
                />
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              size={isMobile ? "sm" : "sm"}
              onClick={() => onViewClassDetails(className)}
            >
              Ver detalhes
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ClassesOverview;
