
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StudentData } from '@/context/DataContext';

interface RiskExplanationProps {
  student: StudentData;
}

const RiskExplanation: React.FC<RiskExplanationProps> = ({ student }) => {
  if (!student.decisionPath) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Análise de Risco</CardTitle>
          <CardDescription>
            Não há dados suficientes para mostrar o caminho de decisão
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-medium">Análise de Risco</CardTitle>
            <CardDescription>
              Como a IA chegou a essa conclusão
            </CardDescription>
          </div>
          <Badge 
            variant={student.riskLevel === 'high' ? 'destructive' : 
                    student.riskLevel === 'medium' ? 'default' : 'outline'}
            className="ml-2"
          >
            {student.riskLevel === 'high' ? (
              <><AlertTriangle className="mr-1 h-3 w-3" /> Alto Risco</>
            ) : student.riskLevel === 'medium' ? (
              <><AlertCircle className="mr-1 h-3 w-3" /> Médio Risco</>
            ) : (
              <><CheckCircle className="mr-1 h-3 w-3" /> Baixo Risco</>
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-md bg-muted p-3">
            <h3 className="font-medium mb-2 flex items-center text-sm">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Caminho de Decisão
            </h3>
            <ol className="space-y-2 ml-2 text-sm">
              {student.decisionPath.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  <span className={index === student.decisionPath.length - 1 ? "font-medium" : ""}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-sm">Ações Recomendadas</h3>
            <ul className="space-y-1 ml-2 text-sm">
              {student.actionItems.map((action, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskExplanation;
