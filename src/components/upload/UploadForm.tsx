
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { parseCSV, parseExcel } from '@/utils/validation';
import { processStudentData } from '@/utils/riskCalculator';
import { StudentData } from '@/types/data';
import { ValidationError } from '@/utils/validation/types';
import DragDropArea from './DragDropArea';
import ValidationErrorsDisplay from './ValidationErrorsDisplay';
import ColumnInfoTable from './ColumnInfoTable';

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [showColumnInfo, setShowColumnInfo] = useState<boolean>(false);
  const { toast } = useToast();
  const { setStudents, addAlert, addUploadRecord } = useData();
  
  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setValidationErrors([]);
    if (document.querySelector('input[type="file"]')) {
      (document.querySelector('input[type="file"]') as HTMLInputElement).value = '';
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInputChange = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput?.files && fileInput.files.length > 0) {
      handleFileSelect(fileInput.files[0]);
    }
  };
  
  const handleFileSelect = (selectedFile: File) => {
    const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
    
    if (!fileType || !['csv', 'xlsx', 'xls'].includes(fileType)) {
      toast({
        title: 'Formato inválido',
        description: 'Por favor, selecione um arquivo CSV ou Excel.',
        variant: 'destructive'
      });
      return;
    }
    
    setFile(selectedFile);
    setValidationErrors([]);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };
  
  const handleProcessFile = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    
    try {
      // Process the file based on its type
      const fileType = file.name.split('.').pop()?.toLowerCase();
      let result: { data: StudentData[], errors: ValidationError[] };
      
      if (fileType === 'csv') {
        // Process CSV file
        const text = await file.text();
        result = await parseCSV(text);
      } else {
        // Process Excel file
        result = await parseExcel(file);
      }
      
      // Check for validation errors
      if (result.errors.length > 0) {
        setValidationErrors(result.errors);
        
        addUploadRecord({
          filename: file.name,
          uploadDate: new Date(),
          recordCount: 0,
          status: 'error',
          errorCount: result.errors.length
        });
        
        toast({
          title: 'Validação falhou',
          description: `Encontrados ${result.errors.length} erros. Corrija-os antes de continuar.`,
          variant: 'destructive'
        });
        setIsProcessing(false);
        return;
      }
      
      // Process data if valid
      if (result.data.length > 0) {
        // Generate behavior scores randomly for the imported students
        // This simulates the "AI" generating behavior scores
        const dataWithBehavior = result.data.map(student => ({
          ...student,
          behavior: Math.floor(Math.random() * 5) + 1 // Random behavior score between 1 and 5
        }));
        
        // Apply risk calculation algorithm (this will add riskLevel and actionItems)
        const processedStudents = processStudentData(dataWithBehavior);
        
        // Add record to upload history
        addUploadRecord({
          filename: file.name,
          uploadDate: new Date(),
          recordCount: processedStudents.length,
          status: 'success'
        });
        
        // Set the data in context
        setStudents(processedStudents);
        
        // Create alerts for high and medium risk students
        processedStudents
          .filter(student => student.riskLevel === 'high' || student.riskLevel === 'medium')
          .forEach(student => {
            addAlert({
              id: `alert-${Date.now()}-${student.id}`,
              studentId: student.id,
              studentName: student.name,
              studentClass: student.class,
              type: student.riskLevel === 'high' ? 'high-risk' : 'medium-risk',
              message: `${student.name} foi classificado como risco ${student.riskLevel === 'high' ? 'alto' : 'médio'}.`,
              createdAt: new Date(),
              read: false,
              actionTaken: false
            });
          });
        
        toast({
          title: 'Processamento concluído',
          description: `${processedStudents.length} alunos processados com sucesso.`,
        });
        
        // Reset upload form
        resetUpload();
      }
    } catch (error) {
      console.error('Error processing file:', error);
      
      addUploadRecord({
        filename: file.name,
        uploadDate: new Date(),
        recordCount: 0,
        status: 'error',
        errorCount: 1
      });
      
      toast({
        title: 'Erro no processamento',
        description: 'Ocorreu um erro ao processar o arquivo.',
        variant: 'destructive'
      });
    }
    
    setIsProcessing(false);
  };
  
  const toggleColumnInfo = () => {
    setShowColumnInfo(!showColumnInfo);
  };
  
  const requiredColumns = [
    { name: 'nome', description: 'Nome completo do aluno', example: 'João Silva' },
    { name: 'registro', description: 'Número de matrícula do aluno', example: '12345' },
    { name: 'turma', description: 'Turma do aluno', example: '9A' },
    { name: 'segmento', description: 'Segmento escolar', example: 'ENSINO MÉDIO' },
    { name: 'nota', description: 'Nota média (0-10)', example: '7.5' },
    { name: 'frequencia', description: 'Porcentagem de presença (0-100)', example: '85' },
    { name: 'responsavel', description: 'Nome do responsável', example: 'Roberto Silva' },
    { name: 'contato', description: 'Telefone do responsável', example: '(11) 98765-4321' },
  ];
  
  return (
    <Card className="w-full max-w-3xl mx-auto animate-scale-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Upload de Dados</CardTitle>
        <CardDescription>
          Faça upload de planilhas com dados dos alunos (CSV ou Excel)
        </CardDescription>
      </CardHeader>
      
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
          onDrop={handleDrop}
          onFileSelect={handleFileInputChange}
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
    </Card>
  );
};

export default UploadForm;
