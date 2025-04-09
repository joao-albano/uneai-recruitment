
import React from 'react';
import { Target, BarChart, CalendarClock, BriefcaseIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const GoalsInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Target className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Metas Globais</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure metas gerais de captação para toda a instituição.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <BarChart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Metas por Curso</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Defina expectativas específicas para cada curso conforme demanda e capacidade.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <CalendarClock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Prazos e Períodos</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Estabeleça prazos e defina períodos para monitoramento eficiente.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <BriefcaseIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Metas por Unidade</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure metas específicas para cada campus ou unidade da instituição.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoalsInfo;
