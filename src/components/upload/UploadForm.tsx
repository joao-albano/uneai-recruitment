
import React, { useState, useRef } from 'react';
import { Upload, FileText, X, AlertTriangle, CheckCircle2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { parseCSV, parseExcel, downloadTemplate, ValidationError } from '@/utils/validations';
import { processStudentData } from '@/utils/riskCalculator';

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { setStudents, addAlert } = useData();
  
  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setValidationErrors([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
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
      let result: { data: any[], errors: ValidationError[] };
      
      if (fileType === 'csv') {
        // Process CSV file
        const text = await file.text();
        result = parseCSV(text);
      } else {
        // Process Excel file
        result = await parseExcel(file);
      }
      
      // Check for validation errors
      if (result.errors.length > 0) {
        setValidationErrors(result.errors);
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
        // Apply risk calculation algorithm
        const processedStudents = processStudentData(result.data);
        
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
        
        // Navigate to dashboard or show success message
        resetUpload();
      }
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: 'Erro no processamento',
        description: 'Ocorreu um erro ao processar o arquivo.',
        variant: 'destructive'
      });
    }
    
    setIsProcessing(false);
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto animate-scale-in">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Upload de Dados</CardTitle>
        <CardDescription>
          Faça upload de planilhas com dados dos alunos (CSV ou Excel)
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!file ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-muted p-4">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className="text-lg font-medium">
                  Arraste e solte sua planilha aqui ou clique para escolher
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Formatos suportados: CSV, Excel (.xlsx, .xls)
                </p>
              </div>
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                Selecionar arquivo
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-1">
                <span>Novo por aqui?</span>
                <Button
                  variant="link"
                  className="h-auto p-0"
                  onClick={() => downloadTemplate()}
                >
                  Baixe um template <Download className="h-3 w-3 ml-1" />
                </Button>
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetUpload}
                  className="ml-auto"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <Progress value={uploadProgress} className="h-2 w-full" />
              
              {uploadProgress >= 100 && (
                <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Arquivo carregado com sucesso</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        {validationErrors.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Erros de validação</AlertTitle>
            <AlertDescription>
              <div className="mt-2 max-h-40 overflow-auto text-sm">
                <ul className="list-disc pl-5 space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index}>
                      Linha {error.row}: {error.message} (coluna: {error.column})
                    </li>
                  ))}
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}
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
