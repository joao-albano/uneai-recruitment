
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from 'lucide-react';
import { StudentData } from '@/types/data';
import RiskExplanation from '../../dashboard/RiskExplanation';

interface StudentRiskTabProps {
  student: StudentData;
}

const StudentRiskTab: React.FC<StudentRiskTabProps> = ({ student }) => {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Indicadores de Risco</CardTitle>
            <Button variant="ghost" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ver histórico
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="p-2 border rounded-md">
                <p className="text-xs text-muted-foreground">Acadêmico</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="font-medium">{student.grade < 6 ? 'Crítico' : student.grade < 7 ? 'Atenção' : 'Adequado'}</p>
                  <span className={`h-2 w-2 rounded-full ${
                    student.grade < 6 ? 'bg-red-500' : 
                    student.grade < 7 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></span>
                </div>
              </div>
              
              <div className="p-2 border rounded-md">
                <p className="text-xs text-muted-foreground">Frequência</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="font-medium">{student.attendance < 70 ? 'Crítico' : student.attendance < 85 ? 'Atenção' : 'Adequado'}</p>
                  <span className={`h-2 w-2 rounded-full ${
                    student.attendance < 70 ? 'bg-red-500' : 
                    student.attendance < 85 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></span>
                </div>
              </div>
              
              <div className="p-2 border rounded-md">
                <p className="text-xs text-muted-foreground">Comportamento</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="font-medium">{student.behavior <= 2 ? 'Crítico' : student.behavior <= 3 ? 'Atenção' : 'Adequado'}</p>
                  <span className={`h-2 w-2 rounded-full ${
                    student.behavior <= 2 ? 'bg-red-500' : 
                    student.behavior <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <RiskExplanation student={student} />
    </>
  );
};

export default StudentRiskTab;
