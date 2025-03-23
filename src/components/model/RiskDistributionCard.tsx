
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { StudentData } from '@/types/data';

interface RiskDistributionCardProps {
  students: StudentData[];
}

const RiskDistributionCard: React.FC<RiskDistributionCardProps> = ({ students }) => {
  const highRiskCount = students.filter(s => s.riskLevel === 'high').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'medium').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'low').length;
  const totalStudents = students.length;

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-base font-medium">Distribuição de Risco</CardTitle>
        <CardDescription>
          Classificação dos alunos por nível de risco
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                <span>Alto Risco</span>
              </div>
              <span className="font-medium">{highRiskCount} alunos</span>
            </div>
            <Progress value={totalStudents > 0 ? (highRiskCount / totalStudents) * 100 : 0} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                <span>Médio Risco</span>
              </div>
              <span className="font-medium">{mediumRiskCount} alunos</span>
            </div>
            <Progress value={totalStudents > 0 ? (mediumRiskCount / totalStudents) * 100 : 0} className="h-2 bg-muted" indicatorClassName="bg-orange-500" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                <span>Baixo Risco</span>
              </div>
              <span className="font-medium">{lowRiskCount} alunos</span>
            </div>
            <Progress value={totalStudents > 0 ? (lowRiskCount / totalStudents) * 100 : 0} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskDistributionCard;
