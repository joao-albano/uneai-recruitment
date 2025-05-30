
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { InterventionsTabProps } from './types';

const RecommendedInterventions: React.FC<InterventionsTabProps> = ({ student }) => {
  return (
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
  );
};

export default RecommendedInterventions;
