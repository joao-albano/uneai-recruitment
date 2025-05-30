
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';

const ModelExplanationCard: React.FC = () => {
  const { students } = useData();
  const navigate = useNavigate();
  
  // Get a high risk student as an example
  const exampleStudent = students.find(student => student.riskLevel === 'high') || students[0];
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <Brain className="mr-2 h-5 w-5 text-primary" />
          <CardTitle className="text-base font-medium">Como o Modelo Funciona</CardTitle>
        </div>
        <CardDescription>
          Explicação do processo de análise e previsão
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Caminho de Decisão</h3>
          <div className="rounded-md bg-muted p-3 text-sm">
            <p className="font-medium mb-2">Exemplo para {exampleStudent?.name}:</p>
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
              <li>Verificar frequência: {exampleStudent?.attendance}% {exampleStudent?.attendance < 80 ? '(Abaixo do ideal)' : '(Adequada)'}</li>
              <li>Analisar notas: {exampleStudent?.grade.toFixed(1)} {exampleStudent?.grade < 6.0 ? '(Abaixo da média)' : '(Adequada)'}</li>
              <li>Avaliar comportamento: {exampleStudent?.behavior}/5 {exampleStudent?.behavior < 3 ? '(Preocupante)' : '(Adequado)'}</li>
              <li>Resultado: {exampleStudent?.riskLevel === 'high' ? 'Alto Risco' : exampleStudent?.riskLevel === 'medium' ? 'Médio Risco' : 'Baixo Risco'}</li>
            </ol>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Como Utilizamos Este Modelo</h3>
          <p className="text-sm text-muted-foreground">
            O modelo analisa dados acadêmicos e comportamentais para identificar fatores de risco, 
            permitindo intervenções preventivas antes que problemas maiores se desenvolvam.
          </p>
          <div className="mt-2 space-y-2">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-green-100 p-1 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
              </div>
              <p className="text-sm text-muted-foreground">Alertas automáticos para alunos em risco</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-green-100 p-1 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
              </div>
              <p className="text-sm text-muted-foreground">Recomendações personalizadas para cada caso</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-green-100 p-1 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-green-600"></div>
              </div>
              <p className="text-sm text-muted-foreground">Acompanhamento contínuo da evolução do aluno</p>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-2 flex items-center gap-2" 
          onClick={() => navigate('/alerts')}
        >
          <span>Ver alertas gerados pelo modelo</span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModelExplanationCard;
