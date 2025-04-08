
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, Users, Calendar, Building, Check } from 'lucide-react';

interface FunnelStage {
  stage: string;
  count: number;
  percentage: number;
  color: string;
  icon: React.ReactNode;
  dropPercentage?: number;
}

interface EnhancedFunnelChartProps {
  data: FunnelStage[];
}

const EnhancedFunnelChart: React.FC<EnhancedFunnelChartProps> = ({ data }) => {
  // Ordenar os dados para garantir que estão na ordem correta
  const sortedData = [...data].sort((a, b) => b.count - a.count);
  
  // Encontrar o maior valor para calcular proporções
  const maxValue = sortedData[0].count;
  
  // Função para calcular a largura de cada etapa do funil
  const calculateWidth = (value: number) => {
    return (value / maxValue * 100).toFixed(0) + '%';
  };

  // Definimos um mapeamento de ícones para cada etapa
  const stageIcons: { [key: string]: React.ReactNode } = {
    'Leads Gerados': <Users className="h-6 w-6" />,
    'Leads Qualificados': <Check className="h-6 w-6" />,
    'Agendamentos': <Calendar className="h-6 w-6" />,
    'Visitas': <Users className="h-6 w-6" />,
    'Matrículas': <Building className="h-6 w-6" />
  };

  return (
    <div className="w-full space-y-2 py-4">
      {sortedData.map((stage, index) => {
        const nextStage = index < sortedData.length - 1 ? sortedData[index + 1] : null;
        const dropoffPercentage = nextStage ? ((stage.count - nextStage.count) / stage.count * 100).toFixed(1) : '0';
        
        return (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: stage.color + '20' }}>
                  {stage.icon || stageIcons[stage.stage] || <Users className="h-6 w-6" style={{ color: stage.color }} />}
                </div>
                <div>
                  <p className="font-medium">{stage.stage}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{stage.count} leads</span>
                    <span className="mx-1">•</span>
                    <span>{stage.percentage}% do total</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                {index < sortedData.length - 1 && (
                  <div className="flex flex-col items-end">
                    <span className="font-medium text-muted-foreground">Perda</span>
                    <span className="text-red-500 font-medium">-{dropoffPercentage}%</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="h-12 w-full bg-gradient-to-r rounded-lg flex items-center justify-center relative overflow-hidden"
                 style={{ 
                   width: calculateWidth(stage.count),
                   backgroundColor: stage.color,
                   minWidth: '200px'
                 }}>
              <span className="text-white font-bold text-lg z-10">{stage.count}</span>
              <div className="absolute inset-0 bg-white/10 bg-opacity-10"></div>
            </div>

            {index < sortedData.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="text-gray-400" />
              </div>
            )}
          </div>
        );
      })}
      
      <div className="pt-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">Conversão total do funil:</p>
              <p>Leads gerados para matrículas: <span className="font-bold">{((sortedData[sortedData.length - 1].count / sortedData[0].count) * 100).toFixed(1)}%</span></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedFunnelChart;
