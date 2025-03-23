
import React from 'react';
import { StudentData } from '@/types/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface DetailsTabProps {
  student: StudentData;
}

const DetailsTab: React.FC<DetailsTabProps> = ({ student }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Detalhes do Aluno</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Nome</dt>
              <dd className="mt-1">{student.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Registro Acadêmico</dt>
              <dd className="mt-1">{student.registrationNumber}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Turma</dt>
              <dd className="mt-1">{student.class}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Responsável</dt>
              <dd className="mt-1">{student.parentName || "Não informado"}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Contato do Responsável</dt>
              <dd className="mt-1">{student.parentContact || "Não informado"}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Nível de Risco Atual</dt>
              <dd className="mt-1">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  student.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                  student.riskLevel === 'medium' ? 'bg-amber-100 text-amber-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {student.riskLevel === 'high' ? 'Alto' :
                   student.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                </span>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Análise da Decisão do Modelo</CardTitle>
        </CardHeader>
        <CardContent>
          {student.decisionPath && student.decisionPath.length > 0 ? (
            <ol className="space-y-2 list-decimal list-inside">
              {student.decisionPath.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          ) : (
            <p className="text-muted-foreground">
              Caminho de decisão não disponível para este aluno.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsTab;
