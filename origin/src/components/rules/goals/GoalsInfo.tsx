
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, BarChart3, Clock, Calendar } from 'lucide-react';

const GoalsInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Metas de Captação</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Defina objetivos para a quantidade de matrículas a serem alcançadas.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Períodos Acadêmicos</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Relacione metas a períodos específicos para melhor planejamento.
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
            <h3 className="font-medium">Acompanhamento</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Monitore o progresso em tempo real em comparação com as metas estabelecidas.
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
            <h3 className="font-medium">Análise de Performance</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Analise o desempenho das estratégias de captação em relação às metas.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsInfo;
