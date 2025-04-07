
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Funnel, FunnelStage } from '@/types/recruitment';
import { TrendingUp, ArrowRight, ArrowDown, BarChart } from 'lucide-react';

interface ConversionAnalysisCardProps {
  funnel: Funnel | null;
  stages: FunnelStage[];
}

const ConversionAnalysisCard: React.FC<ConversionAnalysisCardProps> = ({
  funnel,
  stages
}) => {
  // Safety check: if no funnel or stages are empty, show placeholder
  if (!funnel || stages.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-white border-blue-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center text-blue-800">
            <BarChart className="h-5 w-5 mr-2 text-blue-500" />
            <span>Análise de Conversão</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white/80 p-4 rounded-md border border-blue-100">
            <p className="text-sm text-center text-muted-foreground">
              Configure seu funil com etapas para visualizar análises de conversão.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Find stages with lowest and highest conversion rates
  const mainStages = stages.filter(stage => !stage.isSubStage);
  
  // If there are less than 2 stages, we can't do a meaningful analysis
  if (mainStages.length < 2) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-white border-blue-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center text-blue-800">
            <BarChart className="h-5 w-5 mr-2 text-blue-500" />
            <span>Análise de Conversão</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white/80 p-4 rounded-md border border-blue-100">
            <p className="text-sm text-center text-muted-foreground">
              Adicione mais etapas ao seu funil para obter análises comparativas de conversão.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Find the lowest and highest conversion rates
  const stagesWithRates = mainStages.filter(stage => typeof stage.conversionRate === 'number');
  
  if (stagesWithRates.length === 0) {
    return (
      <Card className="bg-gradient-to-r from-blue-50 to-white border-blue-100 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center text-blue-800">
            <BarChart className="h-5 w-5 mr-2 text-blue-500" />
            <span>Análise de Conversão</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-white/80 p-4 rounded-md border border-blue-100">
            <p className="text-sm text-center text-muted-foreground">
              Adicione dados de conversão às etapas do funil para visualizar análises.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const lowestConversionStage = stagesWithRates.reduce((prev, current) => 
    (prev.conversionRate || 0) < (current.conversionRate || 0) ? prev : current
  );
  
  const highestConversionStage = stagesWithRates.reduce((prev, current) => 
    (prev.conversionRate || 0) > (current.conversionRate || 0) ? prev : current
  );
  
  // Calculate overall funnel conversion (from first to last stage)
  const firstStage = mainStages[0];
  const lastStage = mainStages[mainStages.length - 1];
  const overallConversion = firstStage.leadCount > 0 
    ? Math.round((lastStage.leadCount / firstStage.leadCount) * 100) 
    : 0;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-white border-blue-100 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium flex items-center text-blue-800">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
          <span>Análise de Conversão</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-md border border-blue-100">
            <div className="flex justify-between items-center mb-1">
              <h3 className="font-medium text-blue-800">Conversão Total do Funil</h3>
              <span className="text-xl font-bold text-blue-600">{overallConversion}%</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {`Da etapa "${firstStage.name}" até "${lastStage.name}"`}
            </p>
            
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${overallConversion}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium text-blue-800">{overallConversion}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-md border border-blue-100">
              <div className="flex items-start">
                <div className="p-1.5 rounded-full bg-red-100 mr-2">
                  <ArrowDown className="h-4 w-4 text-red-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Conversão Mais Baixa</h3>
                  <p className="text-sm font-bold text-red-500">{lowestConversionStage.conversionRate}%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {`Na etapa "${lowestConversionStage.name}"`}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-md border border-blue-100">
              <div className="flex items-start">
                <div className="p-1.5 rounded-full bg-green-100 mr-2">
                  <ArrowRight className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Conversão Mais Alta</h3>
                  <p className="text-sm font-bold text-green-500">{highestConversionStage.conversionRate}%</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {`Na etapa "${highestConversionStage.name}"`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionAnalysisCard;
