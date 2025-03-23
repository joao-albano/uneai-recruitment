
import React from 'react';
import { StudentData } from '@/types/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface InterventionsTabProps {
  student: StudentData;
}

const InterventionsTab: React.FC<InterventionsTabProps> = ({ student }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Intervenções Recomendadas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {student.actionItems && student.actionItems.length > 0 ? (
              student.actionItems.map((action, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>{action}</span>
                </li>
              ))
            ) : (
              <li>Nenhuma intervenção recomendada no momento.</li>
            )}
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Intervenções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma intervenção registrada para este aluno.
            </p>
            <Button variant="outline" className="mt-2">
              <Calendar className="mr-2 h-4 w-4" />
              Agendar atendimento
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterventionsTab;
