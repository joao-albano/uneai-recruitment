
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InstitutionType } from '@/utils/validation/headerTypes';
import { ProductType } from '@/context/product/types';

export interface ColumnInfoTableProps {
  institutionType: InstitutionType;
  currentProduct?: ProductType | 'recruitment' | 'retention';
}

const ColumnInfoTable: React.FC<ColumnInfoTableProps> = ({ 
  institutionType,
  currentProduct = 'retention'
}) => {
  // Ensure we only use 'recruitment' or 'retention' for column determination
  const effectiveProduct = currentProduct === 'recruitment' ? 'recruitment' : 'retention';
  
  // Change required columns based on institution type and product
  const requiredColumns = effectiveProduct === 'recruitment' 
    ? (institutionType === 'school' 
        ? ['nome', 'ra', 'turma', 'telefone'] 
        : ['nome', 'email', 'curso', 'telefone'])
    : ['nome', 'ra', 'turma', 'frequencia', 'notas']; // For retention

  // Change optional columns based on institution type and product
  const optionalColumns = effectiveProduct === 'recruitment'
    ? (institutionType === 'school'
        ? ['email', 'curso', 'responsavel', 'obs'] 
        : ['cpf', 'endereco', 'obs'])
    : ['comportamento', 'responsavel', 'contato_responsavel', 'obs']; // For retention
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Coluna</TableHead>
            <TableHead className="w-1/3">Obrigatório</TableHead>
            <TableHead className="w-1/3">Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requiredColumns.map(column => (
            <TableRow key={column}>
              <TableCell className="font-medium">{column}</TableCell>
              <TableCell>Sim</TableCell>
              <TableCell>{getColumnDescription(column)}</TableCell>
            </TableRow>
          ))}
          {optionalColumns.map(column => (
            <TableRow key={column}>
              <TableCell className="font-medium">{column}</TableCell>
              <TableCell>Não</TableCell>
              <TableCell>{getColumnDescription(column)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

// Helper function to get description for each column
function getColumnDescription(column: string): string {
  switch (column.toLowerCase()) {
    case 'nome':
      return 'Nome completo do aluno/lead';
    case 'ra':
      return 'Registro acadêmico (código de matrícula)';
    case 'email':
      return 'Endereço de e-mail';
    case 'cpf':
      return 'CPF do aluno/lead';
    case 'telefone':
      return 'Telefone de contato';
    case 'turma':
      return 'Turma ou série do aluno';
    case 'curso':
      return 'Curso de interesse';
    case 'frequencia':
      return 'Percentual de frequência às aulas (0-100)';
    case 'notas':
      return 'Média das notas do aluno (0-10)';
    case 'comportamento':
      return 'Avaliação de comportamento (1-5)';
    case 'responsavel':
      return 'Nome do responsável';
    case 'contato_responsavel':
      return 'Telefone do responsável';
    case 'endereco':
      return 'Endereço residencial ou comercial';
    case 'obs':
      return 'Observações adicionais';
    default:
      return 'Informação adicional';
  }
}

export default ColumnInfoTable;
