
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const MetricsExplanationCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Explicação das Métricas</CardTitle>
        <CardDescription>Entendendo as métricas de performance do modelo de IA</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-lg mb-2">Acurácia</h3>
            <p className="text-muted-foreground">
              Percentual de previsões corretas dentre todas as previsões realizadas pelo modelo.
              Uma métrica geral de performance.
            </p>
            
            <h3 className="font-medium text-lg mb-2 mt-4">Precision</h3>
            <p className="text-muted-foreground">
              Entre todos os casos que o modelo previu como matriculados, qual percentual
              realmente se matriculou. Mede a confiabilidade das previsões positivas.
            </p>
            
            <h3 className="font-medium text-lg mb-2 mt-4">Recall</h3>
            <p className="text-muted-foreground">
              Entre todos os alunos que realmente se matricularam, qual percentual o modelo
              conseguiu identificar corretamente. Mede a capacidade de encontrar casos positivos.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">F1 Score</h3>
            <p className="text-muted-foreground">
              Média harmônica entre precision e recall, fornecendo uma medida balanceada
              quando há desequilíbrio entre classes.
            </p>
            
            <h3 className="font-medium text-lg mb-2 mt-4">AUC-ROC</h3>
            <p className="text-muted-foreground">
              Área sob a curva ROC, que mede a capacidade do modelo de distinguir entre
              classes. Quanto mais próximo de 100%, melhor o desempenho.
            </p>
            
            <h3 className="font-medium text-lg mb-2 mt-4">Nível de Confiança</h3>
            <p className="text-muted-foreground">
              Avaliação qualitativa da confiabilidade das previsões do modelo baseada
              na estabilidade e consistência dos resultados em diferentes cenários.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsExplanationCard;
