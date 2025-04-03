
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProduct } from '@/context/ProductContext';
import { getTemplateFormat, InstitutionType } from '@/utils/validation/templateManager';
import { Badge } from '@/components/ui/badge';
import { KeyRound, AlertTriangle } from 'lucide-react';

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
                {column.required && (
                  <span className="text-red-500" title="Campo obrigatório">*</span>
                )}
                {column.isKeyField && institutionType === 'school' && (
                  <KeyRound className="h-3 w-3 text-amber-500" title="Campo chave obrigatório" />
                )}
                {column.isKeyField && institutionType === 'university' && (
                  <KeyRound className="h-3 w-3 text-amber-500" title="Campo pode ser usado como chave única" />
                )}
              </TableCell>
              <TableCell>
                {column.description}
                {column.isKeyField && institutionType === 'school' && (
                  <Badge variant="outline" className="ml-2 text-xs bg-amber-50 text-amber-700 border-amber-200">
                    Chave única obrigatória
                  </Badge>
                )}
                {column.isKeyField && institutionType === 'university' && (
                  <Badge variant="outline" className="ml-2 text-xs bg-amber-50 text-amber-700 border-amber-200">
                    Chave única opcional
                  </Badge>
                )}
                {institutionType === 'university' && column.header === 'email' && (
                  <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-700 border-blue-200">
                    <AlertTriangle className="h-3 w-3 mr-1 inline" />
                    Email ou CPF necessário
                  </Badge>
                )}
                {institutionType === 'university' && column.header === 'cpf' && (
                  <Badge variant="outline" className="ml-2 text-xs bg-blue-50 text-blue-700 border-blue-200">
                    <AlertTriangle className="h-3 w-3 mr-1 inline" />
                    Email ou CPF necessário
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">{column.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
        <p>
          <strong>Nota:</strong> Os campos marcados com <span className="text-red-500">*</span> são obrigatórios.
        </p>
        
        {institutionType === 'school' && (
          <p className="flex items-center gap-1">
            <KeyRound className="h-3 w-3 text-amber-500 inline" />
            <span>O campo RA é obrigatório e será usado como chave única para evitar duplicações.</span>
          </p>
        )}
        
        {institutionType === 'university' && (
          <p className="flex items-center gap-1">
            <KeyRound className="h-3 w-3 text-amber-500 inline" />
            <span>É necessário fornecer pelo menos um dos campos Email ou CPF, que serão usados como chave única.</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ColumnInfoTable;
