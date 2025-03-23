
import React from 'react';
import { FileText, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FilePreviewProps {
  file: File;
  uploadProgress: number;
  isProcessing: boolean;
  onReset: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  uploadProgress,
  isProcessing,
  onReset,
}) => {
  return (
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
          onClick={onReset}
          className="ml-auto"
          disabled={isProcessing}
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
  );
};

export default FilePreview;
