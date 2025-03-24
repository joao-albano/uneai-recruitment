
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DragDropArea from './DragDropArea';
import ValidationErrorsDisplay from './ValidationErrorsDisplay';
import ColumnInfoTable from './ColumnInfoTable';
import FileUploadHandler from './FileUploadHandler';

const UploadFormContent: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showColumnInfo, setShowColumnInfo] = useState<boolean>(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, handleFileSelect: (file: File) => void) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputChange = (handleFileSelect: (file: File) => void) => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput?.files && fileInput.files.length > 0) {
      handleFileSelect(fileInput.files[0]);
    }
  };
  
  const toggleColumnInfo = () => {
    setShowColumnInfo(!showColumnInfo);
  };
  
  const requiredColumns = [
    { name: 'nome', description: 'Nome completo do aluno', example: 'João Silva', required: true },
    { name: 'registro', description: 'Número de matrícula do aluno', example: '12345', required: true },
    { name: 'turma', description: 'Turma do aluno', example: '9A', required: true },
    { name: 'segmento', description: 'Segmento escolar (ENSINO MÉDIO, FUNDAMENTAL I, etc.)', example: 'ENSINO MÉDIO', required: true },
    { name: 'nota', description: 'Nota média (0-10)', example: '7.5', required: true },
    { name: 'frequencia', description: 'Porcentagem de presença (0-100)', example: '85', required: true },
    { name: 'nome_responsavel', description: 'Nome do responsável', example: 'Maria da Silva' },
    { name: 'contato_responsavel', description: 'Telefone do responsável', example: '(11) 98765-4321' },
  ];
  
  return (
    <Card className="w-full max-w-3xl mx-auto animate-scale-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Upload de Dados</CardTitle>
        <CardDescription>
          Faça upload de planilhas com dados dos alunos (CSV ou Excel)
        </CardDescription>
      </CardHeader>
      
      <FileUploadHandler>
        {({ 
          file, 
          uploadProgress, 
          isProcessing, 
          validationErrors, 
          handleFileSelect, 
          handleProcessFile, 
          resetUpload 
        }) => (
          <>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleColumnInfo} 
                className="mb-2 text-xs"
              >
                {showColumnInfo ? 'Ocultar informações das colunas' : 'Exibir informações das colunas'}
              </Button>
              
              {showColumnInfo && <ColumnInfoTable columns={requiredColumns} />}
              
              <DragDropArea
                file={file}
                uploadProgress={uploadProgress}
                isDragging={isDragging}
                isProcessing={isProcessing}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, handleFileSelect)}
                onFileSelect={() => handleFileInputChange(handleFileSelect)}
                onReset={resetUpload}
              />
              
              <ValidationErrorsDisplay errors={validationErrors} />
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetUpload} disabled={!file || isProcessing}>
                Cancelar
              </Button>
              <Button 
                onClick={handleProcessFile} 
                disabled={!file || uploadProgress < 100 || isProcessing}
              >
                {isProcessing ? 'Processando...' : 'Processar dados'}
              </Button>
            </CardFooter>
          </>
        )}
      </FileUploadHandler>
    </Card>
  );
};

export default UploadFormContent;
