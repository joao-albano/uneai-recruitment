
import React from 'react';
import { useData } from '@/context/DataContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { AlertCircle, CheckCircle, FileSpreadsheet, Trash2, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ptBR } from 'date-fns/locale';
import { generateDemoUploadHistory } from '@/utils/upload/demoUploadData';

const UploadHistory: React.FC = () => {
  const { uploadHistory, clearUploadHistory, addUploadRecord } = useData();

  const handleGenerateDemoData = () => {
    // Clear current history
    clearUploadHistory();
    
    // Get demo records from utility and add them to the history
    const demoRecords = generateDemoUploadHistory();
    
    // Add each record to the upload history
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
            onClick={handleGenerateDemoData}
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
            onClick={handleGenerateDemoData}
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
