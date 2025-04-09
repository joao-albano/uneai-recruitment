
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { RedialInterval, DialingFailureType } from '@/types/voicecall';

const failureTypeLabels: Record<DialingFailureType, string> = {
  'voicemail': 'Caixa Postal',
  'no-answer': 'Não Atende',
  'busy': 'Ocupado',
  'failure': 'Falha',
  'error': 'Erro',
  'invalid-number': 'Número Inválido'
};

interface RedialIntervalsTabProps {
  redialIntervals: RedialInterval[];
  updateRedialInterval: (failureType: DialingFailureType, field: 'intervalMinutes' | 'maxAttempts', value: number) => void;
}

const RedialIntervalsTab: React.FC<RedialIntervalsTabProps> = ({
  redialIntervals,
  updateRedialInterval
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Intervalos de Rediscagem por Tipo de Falha</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Configure os intervalos de tempo entre as tentativas para cada tipo de falha de chamada.
          </p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Tipo de Falha</TableHead>
                <TableHead className="w-1/3">Intervalo (minutos)</TableHead>
                <TableHead className="w-1/3">Máximo de Tentativas</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {redialIntervals.map((interval) => (
                <TableRow key={interval.failureType}>
                  <TableCell>{failureTypeLabels[interval.failureType]}</TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      min={0}
                      value={interval.intervalMinutes} 
                      onChange={(e) => updateRedialInterval(
                        interval.failureType, 
                        'intervalMinutes', 
                        Number(e.target.value)
                      )}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      min={0}
                      value={interval.maxAttempts} 
                      onChange={(e) => updateRedialInterval(
                        interval.failureType, 
                        'maxAttempts', 
                        Number(e.target.value)
                      )}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RedialIntervalsTab;
