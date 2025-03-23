
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from 'lucide-react';

const ModelExplanationCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Como o Modelo Funciona</CardTitle>
        <CardDescription>
          Processo decisório da árvore de decisão
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
              <span className="text-xs font-bold">1</span>
            </div>
            <div>
              <p className="text-sm font-medium">Análise de Frequência</p>
              <p className="text-xs text-muted-foreground">O modelo verifica primeiro a frequência do aluno, identificando padrões de ausência.</p>
            </div>
          </div>
          
          <ArrowRight className="h-4 w-4 text-muted-foreground mx-auto" />
          
          <div className="flex items-start space-x-2">
            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
              <span className="text-xs font-bold">2</span>
            </div>
            <div>
              <p className="text-sm font-medium">Verificação de Notas</p>
              <p className="text-xs text-muted-foreground">Em seguida, avalia o desempenho acadêmico através das notas do aluno.</p>
            </div>
          </div>
          
          <ArrowRight className="h-4 w-4 text-muted-foreground mx-auto" />
          
          <div className="flex items-start space-x-2">
            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
              <span className="text-xs font-bold">3</span>
            </div>
            <div>
              <p className="text-sm font-medium">Análise Comportamental</p>
              <p className="text-xs text-muted-foreground">Avalia o comportamento do aluno em sala de aula e sua interação social.</p>
            </div>
          </div>
          
          <ArrowRight className="h-4 w-4 text-muted-foreground mx-auto" />
          
          <div className="flex items-start space-x-2">
            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
              <span className="text-xs font-bold">4</span>
            </div>
            <div>
              <p className="text-sm font-medium">Classificação de Risco</p>
              <p className="text-xs text-muted-foreground">Baseado nos fatores combinados, classifica o aluno em um nível de risco de evasão.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelExplanationCard;
