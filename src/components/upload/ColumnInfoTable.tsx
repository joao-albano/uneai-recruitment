
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ColumnInfo {
  name: string;
  description: string;
  example: string;
  required?: boolean;
}

interface ColumnInfoTableProps {
  columns: ColumnInfo[];
}

const ColumnInfoTable: React.FC<ColumnInfoTableProps> = ({ columns }) => {
  return (
    <div className="border rounded-md p-4 bg-muted/30 mb-4">
      <h3 className="text-sm font-medium mb-2">Formato da planilha:</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Coluna</TableHead>
            <TableHead className="w-2/4">Descrição</TableHead>
            <TableHead className="w-1/4">Exemplo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {columns.map((column) => (
            <TableRow key={column.name}>
              <TableCell className="font-medium">
                {column.name} {column.required && <span className="text-red-500">*</span>}
              </TableCell>
              <TableCell>{column.description}</TableCell>
              <TableCell className="text-muted-foreground">{column.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-4 text-xs text-muted-foreground">
        <strong>Nota:</strong> Os campos marcados com <span className="text-red-500">*</span> são obrigatórios.
        Os demais campos são opcionais. O sistema gerará automaticamente informações de risco e ações necessárias
        com base nos dados fornecidos.
      </p>
    </div>
  );
};

export default ColumnInfoTable;
