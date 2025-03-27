
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import UsageStats from './UsageStats';
import RiskDistribution from './RiskDistribution';

const OverviewTabContent: React.FC = () => {
  const { language } = useTheme();
  const { students } = useData();
  
  return (
    <div className="space-y-6">
      <UsageStats />
      <div className="grid gap-6 md:grid-cols-2 mt-6">
        <RiskDistribution />
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>
              {language === 'pt-BR' ? 'Detalhamento por Turma' : 'Class Details'}
            </CardTitle>
            <CardDescription>
              {language === 'pt-BR' 
                ? 'Distribuição de risco por turma' 
                : 'Risk distribution by class'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['9A', '9B', '9C', '9D'].map(className => {
                const classStudents = students.filter(s => s.class === className);
                const highRiskInClass = classStudents.filter(s => s.riskLevel === 'high').length;
                const totalInClass = classStudents.length;
                const riskPercentage = totalInClass > 0 ? (highRiskInClass / totalInClass) * 100 : 0;
                
                return (
                  <div key={className} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${riskPercentage > 30 ? 'bg-red-500' : riskPercentage > 15 ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                      <span className="font-medium">Turma {className}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{totalInClass} alunos</span>
                      <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${riskPercentage > 30 ? 'bg-red-500' : riskPercentage > 15 ? 'bg-amber-500' : 'bg-green-500'}`}
                          style={{ width: `${riskPercentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{riskPercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTabContent;
