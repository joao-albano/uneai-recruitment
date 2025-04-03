
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProduct } from '@/context/ProductContext';
import { getTemplateFormat, InstitutionType } from '@/utils/validation/templateManager';
import { Badge } from '@/components/ui/badge';
import { KeyRound } from 'lucide-react';

interface ColumnInfoTableProps {
  institutionType: InstitutionType;
}

const ColumnInfoTable: React.FC<ColumnInfoTableProps> = ({ institutionType }) => {
  const { currentProduct } = useProduct();
  
  // Obter as colunas específicas para o produto atual e tipo de instituição
  const columns = getTemplateFormat(currentProduct, institutionType);
  
  return (
    <div className="border rounded-md p-4 bg-muted/30 mb-4">
      <h3 className="text-sm font-medium mb-2">
        Formato da planilha para {currentProduct === 'recruitment' ? 'captação de leads' : 'dados dos alunos'} 
        ({institutionType === 'school' ? 'Educação Básica' : 'Ensino Superior'}):
      </h3>
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
            <TableRow key={column.header}>
              <TableCell className="font-medium flex items-center gap-2">
                {column.header} 
                {column.required && <span className="text-red-500">*</span>}
                {column.isKeyField && <KeyRound className="h-3 w-3 text-amber-500" title="Campo pode ser usado como chave única" />}
              </TableCell>
              <TableCell>
                {column.description}
                {column.isKeyField && (
                  <Badge variant="outline" className="ml-2 text-xs bg-amber-50 text-amber-700 border-amber-200">
                    Chave única
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">{column.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-4 text-xs text-muted-foreground">
        <strong>Nota:</strong> Os campos marcados com <span className="text-red-500">*</span> são obrigatórios.
        Os campos com <KeyRound className="h-3 w-3 text-amber-500 inline mb-0.5" /> podem ser usados como chaves únicas para evitar duplicações.
      </p>
    </div>
  );
};

export default ColumnInfoTable;
