
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProduct } from '@/context/ProductContext';
import { getTemplateFormat } from '@/utils/validation/templateManager';

interface ColumnInfoTableProps {}

const ColumnInfoTable: React.FC<ColumnInfoTableProps> = () => {
  const { currentProduct } = useProduct();
  
  // Obter as colunas específicas para o produto atual
  const columns = getTemplateFormat(currentProduct);
  
  return (
    <div className="border rounded-md p-4 bg-muted/30 mb-4">
      <h3 className="text-sm font-medium mb-2">
        Formato da planilha para {currentProduct === 'recruitment' ? 'captação de leads' : 'dados dos alunos'}:
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
              <TableCell className="font-medium">
                {column.header} {column.required && <span className="text-red-500">*</span>}
              </TableCell>
              <TableCell>
                {getColumnDescription(column.header, currentProduct)}
              </TableCell>
              <TableCell className="text-muted-foreground">{column.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p className="mt-4 text-xs text-muted-foreground">
        <strong>Nota:</strong> Os campos marcados com <span className="text-red-500">*</span> são obrigatórios.
        {currentProduct === 'recruitment' 
          ? ' Dependendo do tipo de instituição (Escola ou IES), alguns campos podem ser mais relevantes que outros.'
          : ' Os demais campos são opcionais. O sistema gerará automaticamente informações de risco e ações necessárias com base nos dados fornecidos.'}
      </p>
    </div>
  );
};

// Função auxiliar para obter descrições das colunas
const getColumnDescription = (header: string, productType: string): string => {
  const descriptions: Record<string, Record<string, string>> = {
    retention: {
      nome: 'Nome completo do aluno',
      registro: 'Número de matrícula do aluno',
      turma: 'Turma do aluno (ex: 9A, 8B)',
      segmento: 'Segmento escolar (ENSINO MÉDIO, FUNDAMENTAL I, etc.)',
      nota: 'Nota média do aluno (de 0 a 10)',
      frequencia: 'Porcentagem de presença (de 0 a 100)',
      comportamento: 'Comportamento do aluno (de 0 a 10)',
      nome_responsavel: 'Nome do responsável pelo aluno',
      contato_responsavel: 'Telefone do responsável no formato (XX) XXXXX-XXXX'
    },
    recruitment: {
      nome: 'Nome completo do lead',
      email: 'Email para contato',
      telefone: 'Telefone para contato no formato (XX) XXXXX-XXXX',
      canal: 'Canal de origem (ex: Facebook, Instagram, Site)',
      curso: 'Curso de interesse (para IES)',
      serie: 'Série de interesse (para escolas)',
      etapa: 'Etapa atual no funil de captação',
      status: 'Status atual do lead',
      data_contato: 'Data do último contato (formato DD/MM/AAAA)',
      responsavel: 'Pessoa responsável pelo lead',
      filhos: 'Número de filhos (para escolas)',
      observacoes: 'Informações adicionais relevantes'
    }
  };
  
  return descriptions[productType as keyof typeof descriptions]?.[header] || 'Descrição não disponível';
};

export default ColumnInfoTable;
