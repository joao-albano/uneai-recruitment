
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const StudentsTab: React.FC = () => {
  const { students } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleStudentClick = (studentId: string) => {
    // First check if student exists in the data context
    const studentExists = students.find(student => student.id === studentId);
    
    if (studentExists) {
      // Navigate to model-specific student detail page
      navigate(`/model/student/${studentId}`);
      
      toast({
        title: 'Análise do Aluno',
        description: 'Visualizando trajetória analítica do aluno'
      });
    } else {
      toast({
        title: 'Erro',
        description: 'Aluno não encontrado no sistema',
        variant: 'destructive'
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alunos Analisados pelo Modelo</CardTitle>
        <CardDescription>
          Exemplos de análises e previsões realizadas pelo modelo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.slice(0, 6).map(student => (
            <Card 
              key={student.id} 
              className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
                student.riskLevel === 'high' ? 'border-l-red-500' :
                student.riskLevel === 'medium' ? 'border-l-amber-500' : 
                'border-l-green-500'
              }`}
              onClick={() => handleStudentClick(student.id)}
            >
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">Turma {student.class} • RA: {student.registrationNumber}</p>
                    </div>
                    <div className={`text-xs font-medium rounded-full px-2 py-1 ${
                      student.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                      student.riskLevel === 'medium' ? 'bg-amber-100 text-amber-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {student.riskLevel === 'high' ? 'Alto' :
                       student.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center p-1 bg-muted rounded">
                      <p className="text-muted-foreground">Nota</p>
                      <p className="font-medium">{student.grade.toFixed(1)}</p>
                    </div>
                    <div className="text-center p-1 bg-muted rounded">
                      <p className="text-muted-foreground">Freq.</p>
                      <p className="font-medium">{student.attendance}%</p>
                    </div>
                    <div className="text-center p-1 bg-muted rounded">
                      <p className="text-muted-foreground">Comport.</p>
                      <p className="font-medium">{student.behavior}/5</p>
                    </div>
                  </div>
                  
                  {student.actionItems && student.actionItems.length > 0 && (
                    <div className="text-xs">
                      <p className="font-medium">Ações recomendadas:</p>
                      <ul className="list-disc pl-4 text-muted-foreground">
                        {student.actionItems.slice(0, 2).map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentsTab;
