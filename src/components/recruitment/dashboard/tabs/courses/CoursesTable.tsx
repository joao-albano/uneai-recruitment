
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';

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
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Curso</TableHead>
                <TableHead className="text-right">Leads</TableHead>
                <TableHead className="text-right">Matrículas</TableHead>
                <TableHead className="text-right">Conversão</TableHead>
                <TableHead className="text-right">Meta</TableHead>
                <TableHead className="text-right">Progresso</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coursesData.map((course, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "" : "bg-muted/50"}>
                  <TableCell className="font-medium">{course.name}</TableCell>
                  <TableCell className="text-right">{course.leads}</TableCell>
                  <TableCell className="text-right">{course.matriculas}</TableCell>
                  <TableCell className="text-right">{course.conversao.toFixed(1)}%</TableCell>
                  <TableCell className="text-right">{course.meta}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className={
                        course.cumprimento >= 85 ? "text-green-600" : 
                        course.cumprimento >= 70 ? "text-amber-600" : 
                        "text-red-600"
                      }>
                        {course.cumprimento.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/20 font-semibold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">{totals.leads}</TableCell>
                <TableCell className="text-right">{totals.matriculas}</TableCell>
                <TableCell className="text-right">{totalConversao}%</TableCell>
                <TableCell className="text-right">{totals.meta}</TableCell>
                <TableCell className="text-right">{totalCumprimento}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursesTable;
