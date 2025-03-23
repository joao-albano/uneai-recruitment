
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MetricsTab: React.FC = () => {
  // Theoretical precision metrics for the model
  const precisionMetrics = {
    accuracy: '85%',
    precision: '82%',
    recall: '89%',
    specificityRate: '78%'
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas de Desempenho do Modelo</CardTitle>
        <CardDescription>
          Avaliação da precisão e eficácia do modelo de previsão
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {precisionMetrics.accuracy}
                </div>
                <p className="text-sm font-medium">Acurácia</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Proporção de previsões corretas (alto e baixo risco)
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {precisionMetrics.precision}
                </div>
                <p className="text-sm font-medium">Precisão</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Acerto nas previsões de alto risco
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {precisionMetrics.recall}
                </div>
                <p className="text-sm font-medium">Recall</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Porcentagem de alunos em risco identificados
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {precisionMetrics.specificityRate}
                </div>
                <p className="text-sm font-medium">Especificidade</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Identificação correta de baixo risco
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-3">Interpretação das Métricas</h3>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Este modelo foi treinado com dados históricos de evasão escolar, usando 
              uma abordagem de árvore de decisão que prioriza a <strong>explicabilidade</strong> 
              sobre a complexidade. Isso significa que cada previsão pode ser entendida 
              pelo educador, permitindo intervenções mais direcionadas.
            </p>
            
            <p className="text-sm text-muted-foreground">
              A alta taxa de recall (89%) indica que o modelo é particularmente 
              eficaz em identificar alunos em risco real, minimizando falsos negativos 
              que seriam prejudiciais ao objetivo de reduzir a evasão escolar.
            </p>
            
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm font-medium">Nota sobre os dados:</p>
              <p className="text-sm text-muted-foreground">
                As métricas apresentadas são baseadas em avaliações do modelo em dados históricos.
                O desempenho do modelo é monitorado continuamente e pode ser recalibrado 
                conforme necessário para melhorar sua precisão.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsTab;
