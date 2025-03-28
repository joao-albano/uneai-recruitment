
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { EnrollmentPrediction } from '@/types/recruitment';
import { Lightbulb, TrendingUp, BarChart3, Clock } from 'lucide-react';

interface EnrollmentScoreCardProps {
  prediction?: EnrollmentPrediction;
  isLoading?: boolean;
}

const EnrollmentScoreCard: React.FC<EnrollmentScoreCardProps> = ({
  prediction,
  isLoading = false
}) => {
  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-red-500';
    if (score < 60) return 'text-amber-500';
    return 'text-green-500';
  };

  const getScoreBackground = (score: number) => {
    if (score < 30) return 'bg-red-500';
    if (score < 60) return 'bg-amber-500';
    return 'bg-green-500';
  };

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Predição de Matrícula</CardTitle>
          <CardDescription>Carregando...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-32 bg-muted rounded-md"></div>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Predição de Matrícula</CardTitle>
          <CardDescription>Nenhum dado disponível</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-center py-8">
            Dados insuficientes para gerar predição
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Predição de Matrícula</CardTitle>
        <CardDescription>
          Última atualização: {prediction.lastUpdated.toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <span className={`text-4xl font-bold ${getScoreColor(prediction.score)}`}>
              {prediction.score}%
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              Probabilidade de matrícula
            </p>
          </div>
          
          <Progress 
            value={prediction.score} 
            className="h-2 w-full"
            indicatorClassName={getScoreBackground(prediction.score)}
          />
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-1 text-blue-500" />
                <span className="font-medium">Engajamento</span>
              </div>
              <Progress value={prediction.factors.engagement} className="h-1" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-purple-500" />
                <span className="font-medium">Resposta</span>
              </div>
              <Progress value={prediction.factors.responseSpeed} className="h-1" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-1 text-amber-500" />
                <span className="font-medium">Frequência</span>
              </div>
              <Progress value={prediction.factors.interactionFrequency} className="h-1" />
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center">
                <Lightbulb className="h-4 w-4 mr-1 text-green-500" />
                <span className="font-medium">Sentimento</span>
              </div>
              <Progress value={prediction.factors.sentiment} className="h-1" />
            </div>
          </div>
          
          {prediction.recommendation && (
            <div className="bg-muted p-3 rounded-md text-sm">
              <div className="font-medium mb-1">Recomendação:</div>
              <p className="text-muted-foreground">{prediction.recommendation}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnrollmentScoreCard;
