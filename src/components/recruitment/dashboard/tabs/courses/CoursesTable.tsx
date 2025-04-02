
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CoursesTableProps {
  coursesData: {
    name: string;
    leads: number;
    matriculas: number;
    conversao: number;
    meta: number;
    cumprimento: number;
  }[];
}

const CoursesTable: React.FC<CoursesTableProps> = ({ coursesData }) => {
  // Calculate totals
  const totals = coursesData.reduce(
    (acc, course) => {
      acc.leads += course.leads;
      acc.matriculas += course.matriculas;
      acc.meta += course.meta;
      return acc;
    },
    { leads: 0, matriculas: 0, meta: 0 }
  );
  
  const totalConversao = totals.leads > 0 
    ? ((totals.matriculas / totals.leads) * 100).toFixed(1) 
    : "0.0";
  
  const totalCumprimento = totals.meta > 0 
    ? ((totals.matriculas / totals.meta) * 100).toFixed(1) 
    : "0.0";

  return (
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
                <td className="p-2 text-right">{totals.leads}</td>
                <td className="p-2 text-right">{totals.matriculas}</td>
                <td className="p-2 text-right">{totalConversao}%</td>
                <td className="p-2 text-right">{totals.meta}</td>
                <td className="p-2 text-right">{totalCumprimento}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesTable;
