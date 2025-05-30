
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
        ? ['nome', 'canal', 'email_responsavel/cpf_responsavel'] 
        : ['nome', 'email', 'telefone', 'curso', 'canal'])
    : ['nome', 'ra', 'turma', 'segmento']; // For retention

  // Change optional columns based on institution type and product
  const optionalColumns = effectiveProduct === 'recruitment'
    ? (institutionType === 'school'
        ? ['telefone', 'ra', 'nome_responsavel', 'cep', 'serie', 'quantidade_filhos', 'observacoes'] 
        : ['cpf', 'modalidade', 'cep', 'período', 'observacoes'])
    : ['comportamento', 'nota', 'frequencia', 'nome_responsavel', 'contato_responsavel']; // For retention
  
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
    case 'nota':
      return 'Média das notas do aluno (0-10)';
    case 'comportamento':
      return 'Avaliação de comportamento (1-5)';
    case 'responsavel':
      return 'Nome do responsável';
    case 'nome_responsavel':
      return 'Nome do responsável';
    case 'contato_responsavel':
      return 'Telefone do responsável';
    case 'endereco':
      return 'Endereço residencial ou comercial';
    case 'obs':
      return 'Observações adicionais';
    case 'observacoes':
      return 'Observações adicionais';
    case 'canal':
      return 'Canal de origem do lead';
    case 'email_responsavel/cpf_responsavel':
      return 'É necessário fornecer pelo menos um destes campos';
    case 'cep':
      return 'Código de Endereçamento Postal';
    case 'serie':
      return 'Série/ano pretendido';
    case 'quantidade_filhos':
      return 'Número de filhos';
    case 'segmento':
      return 'Segmento escolar (ENSINO MÉDIO, FUNDAMENTAL I, etc.)';
    case 'modalidade':
      return 'Modalidade (Presencial, EAD, Híbrido)';
    case 'período':
      return 'Período de interesse (Matutino, Vespertino, Noturno)';
    default:
      return 'Informação adicional';
  }
}

export default ColumnInfoTable;
