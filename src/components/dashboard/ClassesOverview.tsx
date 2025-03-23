
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StudentData } from '@/context/DataContext';

interface ClassesOverviewProps {
  students: StudentData[];
  onViewClassDetails: (className: string) => void;
}

const ClassesOverview: React.FC<ClassesOverviewProps> = ({ 
  students, 
  onViewClassDetails 
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from(new Set(students.map(s => s.class))).map(className => {
        const classStudents = students.filter(s => s.class === className);
        return (
          <Card key={className}>
            <CardHeader>
              <CardTitle className="text-lg">Turma {className}</CardTitle>
              <CardDescription>
                {classStudents.length} alunos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alto Risco</span>
                  <span className="text-sm font-medium">
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
                  <span className="text-sm">Médio Risco</span>
                  <span className="text-sm font-medium">
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
                  <span className="text-sm">Baixo Risco</span>
                  <span className="text-sm font-medium">
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
                size="sm"
                onClick={() => onViewClassDetails(className)}
              >
                Ver detalhes
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ClassesOverview;
