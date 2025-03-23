
import React from 'react';
import { StudentData } from '@/types/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import RiskExplanation from '@/components/dashboard/RiskExplanation';

interface AnalyticsTabProps {
  student: StudentData;
}

const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ student }) => {
  return (
    <div className="space-y-4">
      <RiskExplanation student={student} />
      
      <Card>
        <CardHeader>
          <CardTitle>Fatores de Risco Identificados</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {student.grade < 6 && (
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <div>
                  <p className="font-medium">Baixo desempenho acadêmico</p>
                  <p className="text-sm text-muted-foreground">Média atual: {student.grade.toFixed(1)} - Abaixo do mínimo esperado (6.0)</p>
                </div>
              </li>
            )}
            {student.attendance < 75 && (
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <div>
                  <p className="font-medium">Frequência insuficiente</p>
                  <p className="text-sm text-muted-foreground">Frequência atual: {student.attendance}% - Abaixo do mínimo legal (75%)</p>
                </div>
              </li>
            )}
            {student.behavior <= 2 && (
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <div>
                  <p className="font-medium">Problemas comportamentais</p>
                  <p className="text-sm text-muted-foreground">Indicador comportamental: {student.behavior}/5 - Considerado crítico</p>
                </div>
              </li>
            )}
            {student.grade >= 6 && student.attendance >= 75 && student.behavior > 2 && (
              <li>Nenhum fator de risco crítico identificado no momento.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
