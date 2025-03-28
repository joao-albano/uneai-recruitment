
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DragDropArea from './DragDropArea';
import ValidationErrorsDisplay from './ValidationErrorsDisplay';
import ColumnInfoTable from './ColumnInfoTable';
import FileUploadHandler from './FileUploadHandler';
import { downloadTemplate } from '@/utils/validation/templateManager';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, InfoIcon } from 'lucide-react';
import { useProduct } from '@/context/ProductContext';

const UploadFormContent: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showColumnInfo, setShowColumnInfo] = useState<boolean>(false);
  const { currentProduct } = useProduct();
  
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

  const handleDownloadTemplate = () => {
    downloadTemplate(currentProduct);
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto animate-scale-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {currentProduct === 'recruitment' ? 'Upload de Leads' : 'Upload de Dados de Alunos'}
        </CardTitle>
        <CardDescription>
          {currentProduct === 'recruitment' 
            ? 'Faça upload de planilhas com dados de leads e prospectos'
            : 'Faça upload de planilhas com dados dos alunos'}
           (CSV ou Excel)
        </CardDescription>
      </CardHeader>
      
      <FileUploadHandler>
        {({ 
          file, 
          uploadProgress, 
          isProcessing, 
          validationErrors, 
          uploadResults,
          handleFileSelect, 
          handleProcessFile, 
          resetUpload 
        }) => (
          <>
            <CardContent className="space-y-4">
              {uploadResults && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Upload processado com sucesso!</AlertTitle>
                  <AlertDescription className="text-green-700">
                    {currentProduct === 'recruitment'
                      ? `${uploadResults.newCount} novos leads adicionados e ${uploadResults.updatedCount} registros atualizados.`
                      : `${uploadResults.newCount} novos alunos adicionados e ${uploadResults.updatedCount} registros atualizados.`}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleColumnInfo} 
                  className="text-xs"
                >
                  {showColumnInfo ? 'Ocultar informações da planilha' : 'Exibir informações da planilha'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTemplate}
                  className="text-xs"
                >
                  Baixar modelo
                </Button>
              </div>
              
              {showColumnInfo && <ColumnInfoTable />}
              
              <Alert variant="default" className="bg-blue-50 border-blue-200 my-2">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">
                  {currentProduct === 'recruitment' 
                    ? 'Importação de Leads' 
                    : 'Controle mensal de dados'}
                </AlertTitle>
                <AlertDescription className="text-blue-700">
                  {currentProduct === 'recruitment'
                    ? 'Os leads serão mesclados com base no email ou telefone. Leads duplicados serão atualizados com as informações mais recentes.'
                    : 'Os dados são mesclados com base na matrícula (RA) e no mês corrente. Registros do mesmo aluno no mesmo mês serão atualizados, enquanto importações em meses diferentes criarão novos registros.'}
                </AlertDescription>
              </Alert>
              
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
