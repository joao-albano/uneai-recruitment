
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ModelMetricsChart } from './charts/ModelMetricsChart';
import { ModelHistoryChart } from './charts/ModelHistoryChart';
import { InfoCircle, CheckCircle, AlertTriangle } from 'lucide-react';

// Mock model metrics data
const modelMetrics = {
  overall: {
    accuracy: 89.4,
    precision: 86.2,
    recall: 83.5,
    f1Score: 84.8,
    aucRoc: 92.1,
    trainingDate: '2024-04-15',
    status: 'stable',
    predictionsCount: 1254,
    confidenceLevel: 'alta',
    errorRate: 10.6,
    lastEvaluation: '2024-05-02'
  },
  bySegment: [
    { name: 'Graduação', accuracy: 91.2, precision: 88.4, recall: 85.6, f1Score: 87.0, aucRoc: 93.2 },
    { name: 'Pós-Graduação', accuracy: 86.5, precision: 82.8, recall: 79.3, f1Score: 81.0, aucRoc: 89.5 },
    { name: 'Mestrado', accuracy: 88.7, precision: 85.6, recall: 83.2, f1Score: 84.4, aucRoc: 91.3 },
    { name: 'EAD', accuracy: 84.2, precision: 80.5, recall: 77.1, f1Score: 78.8, aucRoc: 88.7 }
  ],
  history: [
    { date: '2023-11', accuracy: 83.2, precision: 79.5, recall: 75.8, f1Score: 77.6, aucRoc: 86.4 },
    { date: '2023-12', accuracy: 84.7, precision: 81.3, recall: 77.9, f1Score: 79.6, aucRoc: 87.8 },
    { date: '2024-01', accuracy: 85.9, precision: 82.6, recall: 79.4, f1Score: 81.0, aucRoc: 89.1 },
    { date: '2024-02', accuracy: 87.2, precision: 83.9, recall: 81.2, f1Score: 82.5, aucRoc: 90.3 },
    { date: '2024-03', accuracy: 88.5, precision: 85.1, recall: 82.3, f1Score: 83.7, aucRoc: 91.4 },
    { date: '2024-04', accuracy: 89.4, precision: 86.2, recall: 83.5, f1Score: 84.8, aucRoc: 92.1 }
  ]
};

interface ModelPerformanceMetricsProps {
  selectedPeriod: string;
}

const ModelPerformanceMetrics: React.FC<ModelPerformanceMetricsProps> = ({ selectedPeriod }) => {
  // Simple function to determine badge color based on metric value
  const getBadgeColor = (value: number) => {
    if (value >= 85) return 'bg-green-100 text-green-800';
    if (value >= 75) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };
  
  // Get status indicator
  const getStatusBadge = () => {
    switch(modelMetrics.overall.status) {
      case 'stable':
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Estável
          </Badge>
        );
      case 'warning':
        return (
          <Badge className="bg-amber-100 text-amber-800 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Atenção
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <InfoCircle className="h-3 w-3" />
            {modelMetrics.overall.status}
          </Badge>
        );
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Precisão do Modelo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{modelMetrics.overall.accuracy}%</div>
            <Progress 
              value={modelMetrics.overall.accuracy} 
              className={`h-2 mt-2 ${getBadgeColor(modelMetrics.overall.accuracy).includes('green') ? 'bg-green-500' : 'bg-amber-500'}`} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">F1 Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{modelMetrics.overall.f1Score}%</div>
            <Progress 
              value={modelMetrics.overall.f1Score} 
              className={`h-2 mt-2 ${getBadgeColor(modelMetrics.overall.f1Score).includes('green') ? 'bg-green-500' : 'bg-amber-500'}`} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Precisão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{modelMetrics.overall.precision}%</div>
            <Progress 
              value={modelMetrics.overall.precision} 
              className={`h-2 mt-2 ${getBadgeColor(modelMetrics.overall.precision).includes('green') ? 'bg-green-500' : 'bg-amber-500'}`} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Recall</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{modelMetrics.overall.recall}%</div>
            <Progress 
              value={modelMetrics.overall.recall} 
              className={`h-2 mt-2 ${getBadgeColor(modelMetrics.overall.recall).includes('green') ? 'bg-green-500' : 'bg-amber-500'}`} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AUC-ROC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{modelMetrics.overall.aucRoc}%</div>
            <Progress 
              value={modelMetrics.overall.aucRoc} 
              className={`h-2 mt-2 ${getBadgeColor(modelMetrics.overall.aucRoc).includes('green') ? 'bg-green-500' : 'bg-amber-500'}`} 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {getStatusBadge()}
              <div className="text-xs text-muted-foreground">
                Última avaliação: {modelMetrics.overall.lastEvaluation}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Model Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informações do Modelo Preditivo</CardTitle>
          <CardDescription>Detalhes do modelo de IA e seu desempenho atual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium">Último Treinamento</div>
                <div className="text-lg">{modelMetrics.overall.trainingDate}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Predições Realizadas</div>
                <div className="text-lg">{modelMetrics.overall.predictionsCount}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium">Nível de Confiança</div>
                <div className="text-lg capitalize">{modelMetrics.overall.confidenceLevel}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Taxa de Erro</div>
                <div className="text-lg">{modelMetrics.overall.errorRate}%</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium">Método de Treinamento</div>
                <div className="text-lg">Aprendizado Supervisionado</div>
              </div>
              <div>
                <div className="text-sm font-medium">Algoritmo Principal</div>
                <div className="text-lg">Ensemble (XGBoost + RF)</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução Histórica das Métricas</CardTitle>
            <CardDescription>Desempenho do modelo ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ModelHistoryChart />
          </CardContent>
        </Card>
      </div>
      
      {/* Segment Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Segmento</CardTitle>
          <CardDescription>Métricas do modelo divididas por tipo de curso</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Segmento</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Precisão</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Precision</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Recall</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">F1 Score</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">AUC-ROC</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {modelMetrics.bySegment.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-muted/30'}>
                    <td className="px-4 py-3 text-sm">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Badge className={getBadgeColor(item.accuracy)}>
                        {item.accuracy}%
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Badge className={getBadgeColor(item.precision)}>
                        {item.precision}%
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Badge className={getBadgeColor(item.recall)}>
                        {item.recall}%
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Badge className={getBadgeColor(item.f1Score)}>
                        {item.f1Score}%
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Badge className={getBadgeColor(item.aucRoc)}>
                        {item.aucRoc}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Model explanation */}
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
    </div>
  );
};

export default ModelPerformanceMetrics;
