
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const OperationalVisualizationTable: React.FC = () => {
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Visualização Operacional</CardTitle>
          <CardDescription>
            Leads cadastrados por etapa no funil
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          <span>Exportar CSV</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Etapa</TableHead>
              <TableHead className="text-right w-[100px]">Leads</TableHead>
              <TableHead className="text-right w-[120px]">% do Total</TableHead>
              <TableHead className="text-right w-[200px]">Conversão p/ Próx. Etapa</TableHead>
              <TableHead className="text-right w-[120px]">Tempo Médio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Leads Gerados</TableCell>
              <TableCell className="text-right">539</TableCell>
              <TableCell className="text-right">100%</TableCell>
              <TableCell className="text-right">78.9%</TableCell>
              <TableCell className="text-right">-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Contatos Realizados</TableCell>
              <TableCell className="text-right">425</TableCell>
              <TableCell className="text-right">78.9%</TableCell>
              <TableCell className="text-right">67.1%</TableCell>
              <TableCell className="text-right">2 dias</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Agendamento</TableCell>
              <TableCell className="text-right">285</TableCell>
              <TableCell className="text-right">52.9%</TableCell>
              <TableCell className="text-right">63.9%</TableCell>
              <TableCell className="text-right">5 dias</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Visita</TableCell>
              <TableCell className="text-right">182</TableCell>
              <TableCell className="text-right">33.8%</TableCell>
              <TableCell className="text-right">64.3%</TableCell>
              <TableCell className="text-right">3 dias</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Matrícula</TableCell>
              <TableCell className="text-right">117</TableCell>
              <TableCell className="text-right">21.7%</TableCell>
              <TableCell className="text-right">-</TableCell>
              <TableCell className="text-right">2 dias</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OperationalVisualizationTable;
