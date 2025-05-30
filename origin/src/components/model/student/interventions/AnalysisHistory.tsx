
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { AnalysisRecord } from './types';
import { formatDate } from './utils';

interface AnalysisHistoryProps {
  analysisHistory: AnalysisRecord[];
}

const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ analysisHistory }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Análises</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analysisHistory.map((analysis) => (
            <div 
              key={analysis.id} 
              className={`p-4 border rounded-md relative border-l-4 ${
                analysis.riskLevel === 'high' ? 'border-l-red-500' :
                analysis.riskLevel === 'medium' ? 'border-l-amber-500' : 
                'border-l-green-500'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Análise {analysis.analysisType === 'automatic' ? 'Automática' : 'Manual'}</h4>
                <Badge 
                  variant={
                    analysis.riskLevel === 'high' ? 'destructive' : 
                    analysis.riskLevel === 'medium' ? 'default' : 'outline'
                  }
                >
                  Risco {analysis.riskLevel === 'high' ? 'Alto' : 
                         analysis.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm text-muted-foreground">Data da Análise</p>
                  <p className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(analysis.date)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Realizada por</p>
                  <p>{analysis.performedBy}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 my-3">
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">Nota</p>
                  <p className="font-medium">{analysis.indicators.grade.toFixed(1)}</p>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">Frequência</p>
                  <p className="font-medium">{analysis.indicators.attendance}%</p>
                </div>
                <div className="text-center p-2 bg-muted rounded">
                  <p className="text-xs text-muted-foreground">Comportamento</p>
                  <p className="font-medium">{analysis.indicators.behavior}/5</p>
                </div>
              </div>
              
              {analysis.notes && (
                <div>
                  <p className="text-sm text-muted-foreground">Observações</p>
                  <p className="text-sm">{analysis.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisHistory;
