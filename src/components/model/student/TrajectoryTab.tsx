
import React from 'react';
import { StudentData } from '@/types/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TrajectoryTabProps {
  student: StudentData;
}

const TrajectoryTab: React.FC<TrajectoryTabProps> = ({ student }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Risco</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] flex items-center justify-center border-2 border-dashed rounded-md">
            <p className="text-muted-foreground">Gráfico de evolução do risco ao longo do tempo</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Indicadores Acadêmicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Notas</h3>
              <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Gráfico de evolução das notas</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Frequência</h3>
              <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Gráfico de evolução da frequência</p>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Comportamento</h3>
              <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">Gráfico de evolução do comportamento</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrajectoryTab;
