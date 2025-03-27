
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { StudentData } from '@/types/data';
import { Button } from '@/components/ui/button';

interface RiskExplanationProps {
  student: StudentData;
}

const RiskExplanation: React.FC<RiskExplanationProps> = ({ student }) => {
  const [showFullPath, setShowFullPath] = useState(false);
  
  // Se não houver caminho de decisão, não renderizar o componente
  if (!student.decisionPath || student.decisionPath.length === 0) {
    return null;
  }
  
  // Encontrar menções a fatores da pesquisa no caminho de decisão
  const containsSurveyData = student.decisionPath.some(step => 
    step.includes('pesquisa') || 
    step.includes('mudou recentemente') || 
    step.includes('bullying') || 
    step.includes('integração social')
  );
  
  const getBadgeColor = () => {
    switch (student.riskLevel) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center">
            <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
            Como o modelo avaliou este aluno
          </CardTitle>
          <div className={`px-2 py-1 text-xs rounded-full border ${getBadgeColor()}`}>
            {student.riskLevel === 'high' ? 'Alto Risco' : 
             student.riskLevel === 'medium' ? 'Médio Risco' : 'Baixo Risco'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {containsSurveyData && (
            <div className="px-3 py-2 bg-blue-50 text-blue-700 rounded-md text-sm flex items-start">
              <div className="min-w-4 mr-2">ℹ️</div>
              <p>Este cálculo de risco inclui dados da pesquisa diagnóstica.</p>
            </div>
          )}
          
          <div className="space-y-2">
            {showFullPath ? (
              <>
                <div className="space-y-2">
                  {student.decisionPath.map((step, index) => (
                    <div key={index} className="relative pl-5 py-1">
                      {index < student.decisionPath!.length - 1 && (
                        <div className="absolute left-2 top-3 h-full w-px bg-gray-300" />
                      )}
                      <div className="absolute left-0 top-2.5 h-3 w-3 rounded-full bg-gray-400" />
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center w-full justify-center text-sm" 
                  onClick={() => setShowFullPath(false)}
                >
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Mostrar menos
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  {/* Mostrar apenas os primeiros 2 e o último passo */}
                  {student.decisionPath.slice(0, 2).map((step, index) => (
                    <div key={index} className="relative pl-5 py-1">
                      <div className="absolute left-0 top-2.5 h-3 w-3 rounded-full bg-gray-400" />
                      <p className="text-sm">{step}</p>
                    </div>
                  ))}
                  
                  {student.decisionPath.length > 3 && (
                    <div className="pl-5 py-1 text-sm text-muted-foreground">
                      {student.decisionPath.length - 3} passos adicionais...
                    </div>
                  )}
                  
                  <div className="relative pl-5 py-1">
                    <div className="absolute left-0 top-2.5 h-3 w-3 rounded-full bg-gray-400" />
                    <p className="text-sm font-medium">
                      {student.decisionPath[student.decisionPath.length - 1]}
                    </p>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center w-full justify-center text-sm" 
                  onClick={() => setShowFullPath(true)}
                >
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Ver caminho completo de decisão
                </Button>
              </>
            )}
          </div>
          
          <div className="border-t pt-3 mt-2">
            <h4 className="text-sm font-medium mb-2">Próximos passos recomendados:</h4>
            <ul className="space-y-1">
              {student.actionItems && student.actionItems.map((item, index) => (
                <li key={index} className="text-sm flex items-start">
                  <span className="mr-2">•</span>
                  <span>{item}</span>
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
