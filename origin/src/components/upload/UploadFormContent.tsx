
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DragDropArea from './DragDropArea';
import ValidationErrorsDisplay from './ValidationErrorsDisplay';
import ColumnInfoTable from './ColumnInfoTable';
import InstitutionTypeSelector from './InstitutionTypeSelector';
import KeyFieldSelector from './KeyFieldSelector';
import FileUploadHandler from './FileUploadHandler';
import { downloadTemplate } from '@/utils/validation/templateManager';
import type { InstitutionType } from '@/utils/validation/headerTypes';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, InfoIcon, KeyRound, Download } from 'lucide-react';
import { useProduct } from '@/context/ProductContext';

const UploadFormContent: React.FC = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showColumnInfo, setShowColumnInfo] = useState<boolean>(false);
  const [institutionType, setInstitutionType] = useState<InstitutionType>('school');
  const [keyField, setKeyField] = useState<string>('');
  const { currentProduct } = useProduct();

  // For retention product, always set to school type and force RA as key
  useEffect(() => {
    if (currentProduct === 'retention') {
      setInstitutionType('school');
      setKeyField('ra');
    } else if (institutionType === 'university') {
      if (keyField !== 'email' && keyField !== 'cpf') {
        setKeyField('email'); // Default to email for university
      }
    } else if (institutionType === 'school') {
      if (keyField !== 'email_responsavel' && keyField !== 'cpf_responsavel') {
        setKeyField('email_responsavel'); // Default to email_responsavel for school
      }
    }
  }, [institutionType, currentProduct, keyField]);
  
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
    downloadTemplate(
      currentProduct === 'recruitment' ? 'recruitment' : 'retention',
      institutionType
    );
  };
  
  // Determine if we can proceed based on key field selection
  const isKeyFieldValid = () => {
    if (currentProduct === 'retention') {
      return keyField === 'ra'; // RA is always required for retention
    } else if (institutionType === 'school') {
      return keyField === 'email_responsavel' || keyField === 'cpf_responsavel'; // Email or CPF for schools
    } else {
      return keyField === 'email' || keyField === 'cpf'; // Email or CPF for universities
    }
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
              
              {/* Tipo de instituição - apenas exibido para recrutamento */}
              {currentProduct === 'recruitment' && (
                <InstitutionTypeSelector 
                  value={institutionType} 
                  onChange={setInstitutionType} 
                />
              )}
              
              {/* Campo chave - customizado por produto */}
              <KeyFieldSelector 
                institutionType={institutionType}
                value={keyField}
                onChange={setKeyField}
                currentProduct={currentProduct}
              />
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={toggleColumnInfo} 
                  className="text-xs flex items-center gap-1"
                >
                  {showColumnInfo ? 'Ocultar informações' : 'Mostrar informações'}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTemplate}
                  className="text-xs flex items-center gap-1"
                >
                  <Download className="h-3 w-3" />
                  Baixar modelo
                </Button>
              </div>
              
              {showColumnInfo && <ColumnInfoTable 
                institutionType={institutionType} 
                currentProduct={currentProduct}
              />}
              
              <Alert variant="default" className="bg-blue-50 border-blue-200 my-2">
                <InfoIcon className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">
                  {currentProduct === 'recruitment' 
                    ? 'Importação de Leads' 
                    : 'Controle de dados de alunos'}
                </AlertTitle>
                <AlertDescription className="text-blue-700">
                  {currentProduct === 'retention' 
                    ? `Para retenção escolar, o RA (número de matrícula) é obrigatório e será usado como chave única para controle mensal das importações.`
                    : institutionType === 'school' 
                      ? `Para educação básica, ${keyField ? `o campo "${keyField === 'email_responsavel' ? 'Email do responsável' : 'CPF do responsável'}"` : "um campo entre Email do responsável ou CPF do responsável"} será usado como chave única para evitar duplicações.`
                      : `Para ensino superior, ${keyField ? `o campo "${keyField}"` : "um campo entre CPF e Email"} será usado como chave única para evitar duplicações.`}
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
                disabled={!file || uploadProgress < 100 || isProcessing || !isKeyFieldValid()}
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
