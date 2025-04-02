
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';

// Dados mock para cursos
const coursesData = [
  { 
    name: 'Ensino Fundamental I', 
    leads: 128, 
    matriculas: 32, 
    conversao: 25.0,
    meta: 40,
    cumprimento: 80.0
  },
  { 
    name: 'Ensino Fundamental II', 
    leads: 95, 
    matriculas: 24, 
    conversao: 25.3,
    meta: 30,
    cumprimento: 80.0
  },
  { 
    name: 'Ensino Médio', 
    leads: 84, 
    matriculas: 18, 
    conversao: 21.4,
    meta: 25,
    cumprimento: 72.0
  },
  { 
    name: 'Educação Infantil', 
    leads: 76, 
    matriculas: 14, 
    conversao: 18.4,
    meta: 20,
    cumprimento: 70.0
  },
  { 
    name: 'Período Integral', 
    leads: 65, 
    matriculas: 12, 
    conversao: 18.5,
    meta: 15,
    cumprimento: 80.0
  },
  { 
    name: 'EJA', 
    leads: 52, 
    matriculas: 8, 
    conversao: 15.4,
    meta: 15,
    cumprimento: 53.3
  },
];

// Dados para gráfico de barras
const chartData = coursesData.map(course => ({
  name: course.name.replace('Ensino ', '').replace('Educação ', ''),
  Leads: course.leads,
  Matrículas: course.matriculas
}));

const CoursesTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leads por Curso</CardTitle>
            <CardDescription>
              Distribuição de leads por curso
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Leads" fill="#8884d8" />
                <Bar dataKey="Matrículas" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Cumprimento de Metas</CardTitle>
            <CardDescription>
              Progresso em relação às metas por curso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {coursesData.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{course.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>{course.matriculas} de {course.meta}</span>
                      {course.cumprimento >= 75 ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress 
                      value={course.cumprimento} 
                      className={`h-2 flex-1 ${
                        course.cumprimento >= 85 ? "bg-green-600" : 
                        course.cumprimento >= 70 ? "bg-amber-600" : 
                        "bg-red-600"
                      }`}
                    />
                    <span className="text-sm font-medium w-12 text-right">
                      {course.cumprimento}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Desempenho por Curso</CardTitle>
            <CardDescription>
              Estatísticas detalhadas de captação por curso
            </CardDescription>
          </div>
          <Badge variant="outline">Última atualização: hoje</Badge>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr className="[&_th]:p-2 [&_th]:text-left [&_th]:font-medium [&_th]:text-muted-foreground">
                  <th>Curso</th>
                  <th className="text-right">Leads</th>
                  <th className="text-right">Matrículas</th>
                  <th className="text-right">Conversão</th>
                  <th className="text-right">Meta</th>
                  <th className="text-right">Progresso</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {coursesData.map((course, index) => (
                  <tr key={index} className={index % 2 === 0 ? "" : "bg-muted/50"}>
                    <td className="p-2 font-medium">{course.name}</td>
                    <td className="p-2 text-right">{course.leads}</td>
                    <td className="p-2 text-right">{course.matriculas}</td>
                    <td className="p-2 text-right">{course.conversao.toFixed(1)}%</td>
                    <td className="p-2 text-right">{course.meta}</td>
                    <td className="p-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className={
                          course.cumprimento >= 85 ? "text-green-600" : 
                          course.cumprimento >= 70 ? "text-amber-600" : 
                          "text-red-600"
                        }>
                          {course.cumprimento.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="bg-muted/20 font-semibold">
                  <td className="p-2">Total</td>
                  <td className="p-2 text-right">500</td>
                  <td className="p-2 text-right">108</td>
                  <td className="p-2 text-right">21.6%</td>
                  <td className="p-2 text-right">145</td>
                  <td className="p-2 text-right">74.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoursesTabContent;
