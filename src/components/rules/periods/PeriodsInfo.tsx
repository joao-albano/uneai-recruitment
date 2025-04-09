
import React from 'react';
import { CalendarDays, Clock, Flag, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const PeriodsInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Períodos Acadêmicos</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure semestres ou anos letivos para planejamento da captação.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Flag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Marcos Importantes</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Defina datas críticas como vestibular, matrículas e início das aulas.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Contagem Regressiva</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Visualize o tempo restante para atingir metas e datas importantes.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Análise Temporal</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure períodos para análise de dados e geração de previsões avançadas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeriodsInfo;
