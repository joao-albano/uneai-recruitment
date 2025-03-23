
import React from 'react';
import { StudentData } from '@/types/data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ReferenceLine
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface TrajectoryTabProps {
  student: StudentData;
}

// Dados para simulação da trajetória do aluno
const generateTrajectoryData = (student: StudentData) => {
  // Últimos 6 meses
  const months = ['Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro', 'Janeiro'];
  
  // Começar com valores altos e ir deteriorando (para alunos de risco)
  // Ou começar com valores baixos e ir melhorando (para alunos de baixo risco)
  let riskScores;
  let grades;
  let attendance;
  let behavior;
  
  if (student.riskLevel === 'high') {
    // Para alunos de alto risco, começar bem e deteriorar
    riskScores = [30, 40, 55, 65, 80, 95];
    grades = [8.5, 7.8, 7.0, 6.5, 5.8, student.grade];
    attendance = [95, 92, 88, 85, 80, student.attendance];
    behavior = [5, 4, 4, 3, 3, student.behavior];
  } else if (student.riskLevel === 'medium') {
    // Para alunos de médio risco, alguma inconsistência
    riskScores = [45, 60, 50, 65, 55, 70];
    grades = [7.5, 7.0, 7.2, 6.8, 6.5, student.grade];
    attendance = [90, 85, 88, 82, 80, student.attendance];
    behavior = [4, 4, 3, 4, 3, student.behavior];
  } else {
    // Para alunos de baixo risco, boa estabilidade
    riskScores = [25, 20, 30, 25, 20, 15];
    grades = [8.0, 8.2, 8.0, 8.5, 8.3, student.grade];
    attendance = [92, 94, 93, 95, 94, student.attendance];
    behavior = [4, 5, 4, 5, 4, student.behavior];
  }
  
  // Construir os dados de trajetória
  return months.map((month, index) => ({
    month,
    riskScore: riskScores[index],
    grade: grades[index],
    attendance: attendance[index],
    behavior: behavior[index]
  }));
};

const TrajectoryTab: React.FC<TrajectoryTabProps> = ({ student }) => {
  const trajectoryData = generateTrajectoryData(student);
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Evolução do Risco</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ChartContainer config={{
              riskScore: { theme: { light: "#ef4444", dark: "#ef4444" } },
            }}>
              <LineChart data={trajectoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={({ active, payload }) => 
                  active && payload && payload.length ? <ChartTooltipContent active={active} payload={payload} /> : null
                } />
                <ReferenceLine y={40} stroke="#4ade80" strokeDasharray="3 3" label="Baixo" />
                <ReferenceLine y={70} stroke="#fbbf24" strokeDasharray="3 3" label="Médio" />
                <Line 
                  type="monotone" 
                  dataKey="riskScore" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#ef4444" }}
                  activeDot={{ r: 8 }}
                  name="Nível de Risco"
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Indicadores Acadêmicos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium">Notas</h3>
              <div className="h-[200px] w-full">
                <ChartContainer config={{
                  grade: { theme: { light: "#3b82f6", dark: "#60a5fa" } },
                }}>
                  <LineChart data={trajectoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip content={({ active, payload }) => 
                      active && payload && payload.length ? <ChartTooltipContent active={active} payload={payload} /> : null
                    } />
                    <ReferenceLine y={6} stroke="#ef4444" strokeDasharray="3 3" label="Mínimo" />
                    <Line 
                      type="monotone" 
                      dataKey="grade" 
                      stroke="#3b82f6" 
                      strokeWidth={2} 
                      dot={{ r: 4, fill: "#3b82f6" }}
                      name="Nota"
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Frequência</h3>
              <div className="h-[200px] w-full">
                <ChartContainer config={{
                  attendance: { theme: { light: "#10b981", dark: "#34d399" } },
                }}>
                  <BarChart data={trajectoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={({ active, payload }) => 
                      active && payload && payload.length ? <ChartTooltipContent active={active} payload={payload} /> : null
                    } />
                    <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="3 3" label="Mínimo" />
                    <Bar 
                      dataKey="attendance" 
                      fill="#10b981" 
                      radius={[4, 4, 0, 0]}
                      name="Frequência (%)"
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Comportamento</h3>
              <div className="h-[200px] w-full">
                <ChartContainer config={{
                  behavior: { theme: { light: "#8b5cf6", dark: "#a78bfa" } },
                }}>
                  <BarChart data={trajectoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip content={({ active, payload }) => 
                      active && payload && payload.length ? <ChartTooltipContent active={active} payload={payload} /> : null
                    } />
                    <Bar 
                      dataKey="behavior" 
                      fill="#8b5cf6" 
                      radius={[4, 4, 0, 0]}
                      name="Comportamento (1-5)"
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrajectoryTab;
