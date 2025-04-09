
import React from 'react';
import { AlarmClock, Users, CalendarClock, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RulesInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <AlarmClock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Horários de Discagem</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure períodos específicos para realizar chamadas e respeitar horários comerciais.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Canais Simultâneos</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Defina o número de chamadas que podem ser realizadas ao mesmo tempo pelo sistema.
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
            <h3 className="font-medium">Intervalos de Rediscagem</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Configure quanto tempo esperar até tentar novamente após uma chamada não atendida.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-start space-x-4">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Segmentação</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Crie regras específicas por curso, funil ou etapa do funil para otimizar estratégias.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RulesInfo;
