
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface ModelInfoCardProps {
  modelInfo: {
    trainingDate: string;
    predictionsCount: number;
    confidenceLevel: string;
    errorRate: number;
  };
}

const ModelInfoCard: React.FC<ModelInfoCardProps> = ({ modelInfo }) => {
  return (
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
              <div className="text-lg">{modelInfo.trainingDate}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Predições Realizadas</div>
              <div className="text-lg">{modelInfo.predictionsCount}</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-sm font-medium">Nível de Confiança</div>
              <div className="text-lg capitalize">{modelInfo.confidenceLevel}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Taxa de Erro</div>
              <div className="text-lg">{modelInfo.errorRate}%</div>
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
  );
};

export default ModelInfoCard;
