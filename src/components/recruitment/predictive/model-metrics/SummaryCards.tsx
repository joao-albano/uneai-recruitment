
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Info, CheckCircle, AlertTriangle } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  getBadgeColor: (value: number) => string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, getBadgeColor }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}%</div>
      <Progress 
        value={value} 
        className={`h-2 mt-2 ${getBadgeColor(value).includes('green') ? 'bg-green-500' : 'bg-amber-500'}`} 
      />
    </CardContent>
  </Card>
);

interface StatusCardProps {
  status: string;
  lastEvaluation: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, lastEvaluation }) => {
  const getStatusBadge = () => {
    switch(status) {
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
            <Info className="h-3 w-3" />
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {getStatusBadge()}
          <div className="text-xs text-muted-foreground">
            Última avaliação: {lastEvaluation}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface SummaryCardsProps {
  metrics: {
    accuracy: number;
    f1Score: number;
    precision: number;
    recall: number;
    aucRoc: number;
    status: string;
    lastEvaluation: string;
  };
  getBadgeColor: (value: number) => string;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ metrics, getBadgeColor }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <MetricCard title="Precisão do Modelo" value={metrics.accuracy} getBadgeColor={getBadgeColor} />
      <MetricCard title="F1 Score" value={metrics.f1Score} getBadgeColor={getBadgeColor} />
      <MetricCard title="Precisão" value={metrics.precision} getBadgeColor={getBadgeColor} />
      <MetricCard title="Recall" value={metrics.recall} getBadgeColor={getBadgeColor} />
      <MetricCard title="AUC-ROC" value={metrics.aucRoc} getBadgeColor={getBadgeColor} />
      <StatusCard status={metrics.status} lastEvaluation={metrics.lastEvaluation} />
    </div>
  );
};

export default SummaryCards;
