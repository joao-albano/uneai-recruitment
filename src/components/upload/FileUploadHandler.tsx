
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { processFile, generateAlertsFromStudents } from './FileProcessor';
import { ValidationError } from '@/utils/validation/types';

interface FileUploadHandlerProps {
  children: (props: {
    file: File | null;
    uploadProgress: number;
    isProcessing: boolean;
    validationErrors: ValidationError[];
    uploadResults: {
      updatedCount?: number;
      newCount?: number;
    } | null;
    handleFileSelect: (file: File) => void;
    handleProcessFile: () => Promise<void>;
    resetUpload: () => void;
  }) => React.ReactNode;
}

const FileUploadHandler: React.FC<FileUploadHandlerProps> = ({ children }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadResults, setUploadResults] = useState<{ updatedCount?: number; newCount?: number; } | null>(null);
  
  const { toast } = useToast();
  const { students, setStudents, addAlert, addUploadRecord } = useData();
  
  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setValidationErrors([]);
    setUploadResults(null);
    if (document.querySelector('input[type="file"]')) {
      (document.querySelector('input[type="file"]') as HTMLInputElement).value = '';
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
    setUploadResults(null);
    
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
      const result = await processFile(file, addUploadRecord, students);
      
      if (result.errors && result.errors.length > 0) {
        setValidationErrors(result.errors);
        
        toast({
          title: 'Validação falhou',
          description: `Encontrados ${result.errors.length} erros. Corrija-os antes de continuar.`,
          variant: 'destructive'
        });
      } else if (result.students && result.students.length > 0) {
        // Set the data in context
        setStudents(result.students);
        
        // Generate alerts for high and medium risk students
        generateAlertsFromStudents(result.students, addAlert);
        
        // Store the merge results
        setUploadResults({
          updatedCount: result.updatedCount || 0,
          newCount: result.newCount || 0
        });
        
        toast({
          title: 'Processamento concluído',
          description: `${result.newCount || 0} novos alunos e ${result.updatedCount || 0} atualizações processadas com sucesso.`,
        });
      }
    } catch (error) {
      console.error('Error in handleProcessFile:', error);
      
      toast({
        title: 'Erro no processamento',
        description: 'Ocorreu um erro ao processar o arquivo.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return children({
    file,
    uploadProgress,
    isProcessing,
    validationErrors,
    uploadResults,
    handleFileSelect,
    handleProcessFile,
    resetUpload
  });
};

export default FileUploadHandler;
