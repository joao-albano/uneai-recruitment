
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { FunnelStage } from '@/types/recruitment';

interface ConversionAnalysisCardProps {
  stages: FunnelStage[];
}

const ConversionAnalysisCard: React.FC<ConversionAnalysisCardProps> = ({ stages }) => {
  // If there are no stages or no stages with leadCount, return a placeholder card
  if (!stages || stages.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-white to-orange-50 border-orange-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-orange-800">Análise de Conversão</CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
            <p>Sem dados de conversão disponíveis.</p>
            <p className="text-sm mt-2">Adicione etapas ao funil para visualizar a análise de conversão.</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Filter out stages with no leadCount to prevent errors
  const validStages = stages.filter(stage => typeof stage.leadCount === 'number');
  
  if (validStages.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-white to-orange-50 border-orange-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium text-orange-800">Análise de Conversão</CardTitle>
        </CardHeader>
        <CardContent className="pt-3">
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
            <p>Dados de conversão incompletos.</p>
            <p className="text-sm mt-2">As etapas do funil não possuem dados de leads suficientes.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Only include top-level stages (not sub-stages) in the chart
  const chartData = validStages
    .filter(stage => !stage.isSubStage)
    .sort((a, b) => a.order - b.order)
    .map(stage => ({
      name: stage.name,
      value: stage.leadCount,
      conversionRate: stage.conversionRate || 0
    }));

  // Calculate conversion decrease between stages
  const conversions = chartData.map((current, index, array) => {
    if (index === 0) return { ...current, decrease: 0 };
    
    const prev = array[index - 1];
    const decrease = prev.value - current.value;
    const decreasePercent = prev.value > 0 ? Math.round((decrease / prev.value) * 100) : 0;
    
    return {
      ...current,
      decrease,
      decreasePercent
    };
  });

  // Custom colors based on conversion rate
  const getBarColor = (conversionRate: number) => {
    if (conversionRate >= 80) return '#22c55e'; // green-500
    if (conversionRate >= 60) return '#facc15'; // yellow-400
    if (conversionRate >= 40) return '#fb923c'; // orange-400
    return '#ef4444'; // red-500
  };

  // Calculate average conversion rate for all transitions
  const calculateOverallConversion = () => {
    if (chartData.length <= 1) return 100;
    
    const firstStageCount = chartData[0].value;
    const lastStageCount = chartData[chartData.length - 1].value;
    
    if (firstStageCount === 0) return 0;
    
    return Math.round((lastStageCount / firstStageCount) * 100);
  };

  const overallConversion = calculateOverallConversion();

  return (
    <Card className="bg-gradient-to-r from-white to-orange-50 border-orange-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-orange-800 flex justify-between items-center">
          <span>Análise de Conversão</span>
          <span className="text-sm font-normal bg-white border border-orange-100 py-1 px-3 rounded-full">
            Conversão Total: <span className={`font-medium ${overallConversion >= 50 ? 'text-green-600' : 'text-orange-600'}`}>{overallConversion}%</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        {chartData.length > 0 ? (
          <>
            <div className="w-full h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => [`${value} leads`, 'Quantidade']}
                    labelFormatter={(name) => `Etapa: ${name}`}
                  />
                  <Bar dataKey="value" fill="#facc15" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getBarColor(entry.conversionRate)} 
                      />
                    ))}
                    <LabelList dataKey="value" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {conversions.slice(1).map((stage, index) => (
                <div key={`conversion-${index}`} className="flex justify-between items-center p-2 bg-white rounded-md border border-orange-100">
                  <div>
                    <span className="text-sm font-medium">{conversions[index].name} → {stage.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({conversions[index].value} → {stage.value} leads)
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className={`text-sm font-medium ${stage.conversionRate >= 70 ? 'text-green-600' : 'text-orange-600'}`}>
                      {stage.conversionRate}%
                    </div>
                    <div className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                      {stage.decrease > 0 ? `-${stage.decrease}` : `+${Math.abs(stage.decrease)}`} leads
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
            <p>Sem dados de conversão disponíveis.</p>
            <p className="text-sm mt-2">Adicione mais de uma etapa ao funil para visualizar a análise de conversão.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConversionAnalysisCard;
