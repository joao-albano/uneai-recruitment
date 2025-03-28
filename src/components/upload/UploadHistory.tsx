
import React from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, FileSpreadsheet, Trash2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ptBR } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';

const UploadHistory: React.FC = () => {
  const { uploadHistory, clearUploadHistory, addUploadRecord } = useData();

  const generateDemoUploadHistory = () => {
    // Limpar histórico atual
    clearUploadHistory();
    
    // Criar registros de demonstração
    const demoRecords = [
      {
        filename: 'alunos_janeiro_2024.csv',
        uploadDate: new Date(2024, 0, 15, 10, 30), // 15 de Janeiro às 10:30
        recordCount: 145,
        status: 'success' as const,
        newCount: 145,
        updatedCount: 0
      },
      {
        filename: 'alunos_fevereiro_2024.csv',
        uploadDate: new Date(2024, 1, 12, 14, 15), // 12 de Fevereiro às 14:15
        recordCount: 150,
        status: 'success' as const,
        newCount: 15,
        updatedCount: 135
      },
      {
        filename: 'alunos_marco_2024_erro.xlsx',
        uploadDate: new Date(2024, 2, 5, 9, 45), // 5 de Março às 9:45
        recordCount: 0,
        status: 'error' as const,
        errorCount: 3
      },
      {
        filename: 'alunos_marco_2024_corrigido.xlsx',
        uploadDate: new Date(2024, 2, 5, 11, 20), // 5 de Março às 11:20
        recordCount: 152,
        status: 'success' as const,
        newCount: 12,
        updatedCount: 140
      },
      {
        filename: 'turma_especial.csv',
        uploadDate: new Date(2024, 2, 20, 16, 0), // 20 de Março às 16:00
        recordCount: 28,
        status: 'success' as const,
        newCount: 28,
        updatedCount: 0
      },
      {
        filename: 'abril_ensino_medio.csv',
        uploadDate: new Date(2024, 3, 10, 8, 50), // 10 de Abril às 8:50
        recordCount: 87,
        status: 'success' as const,
        newCount: 25, 
        updatedCount: 62
      }
    ];
    
    // Adicionar registros ao histórico
    demoRecords.forEach(record => {
      addUploadRecord(record);
    });
  };

  if (uploadHistory.length === 0) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Histórico de Uploads</CardTitle>
            <CardDescription>
              Nenhum upload foi realizado ainda.
            </CardDescription>
          </div>
          <Button 
            onClick={generateDemoUploadHistory}
            variant="outline" 
            size="sm"
            className="h-8 gap-1"
          >
            <Plus className="h-4 w-4" />
            Gerar dados de demonstração
          </Button>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Histórico de Uploads</CardTitle>
          <CardDescription>
            Histórico dos arquivos processados
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={generateDemoUploadHistory}
            variant="outline" 
            size="sm"
            className="h-8 gap-1"
          >
            <Plus className="h-4 w-4" />
            Gerar dados de demonstração
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearUploadHistory}
            className="h-8 gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Limpar histórico
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Arquivo</TableHead>
              <TableHead>Data de Upload</TableHead>
              <TableHead>Registros</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {uploadHistory.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                  {record.filename}
                </TableCell>
                <TableCell>
                  {format(new Date(record.uploadDate), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                </TableCell>
                <TableCell>{record.recordCount}</TableCell>
                <TableCell>
                  {record.status === 'success' ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex w-fit items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Sucesso
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex w-fit items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Erro ({record.errorCount} falhas)
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {record.status === 'success' && (
                    <span className="text-sm text-muted-foreground">
                      {record.newCount} novos, {record.updatedCount} atualizados
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UploadHistory;
