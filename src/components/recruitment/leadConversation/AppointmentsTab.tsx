
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

const AppointmentsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos</CardTitle>
        <CardDescription>
          Histórico e agendamentos futuros
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[600px] flex items-center justify-center">
        <div className="text-center p-4">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Sem agendamentos</h3>
          <p className="text-muted-foreground mb-4">
            Esse lead ainda não possui agendamentos.
          </p>
          <Button>Agendar Visita</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsTab;
