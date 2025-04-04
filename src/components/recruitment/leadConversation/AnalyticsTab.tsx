
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';

const AnalyticsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise Detalhada</CardTitle>
        <CardDescription>
          Comportamento e interações do lead
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[600px] flex items-center justify-center">
        <div className="text-center">
          <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Análise em desenvolvimento</h3>
          <p className="text-muted-foreground">
            Visualizações detalhadas serão implementadas em breve.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsTab;
