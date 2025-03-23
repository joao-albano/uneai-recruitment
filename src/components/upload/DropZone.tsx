
import React, { useRef } from 'react';
import { Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { downloadTemplate } from '@/utils/validation/templateManager';

interface DropZoneProps {
  onFileSelect: () => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
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
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onFileSelect();
          }
        }}
      />
      <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-1">
        <span>Novo por aqui?</span>
        <Button
          variant="link"
          className="h-auto p-0"
          onClick={() => downloadTemplate()}
        >
          Baixe um modelo <Download className="h-3 w-3 ml-1" />
        </Button>
      </p>
    </div>
  );
};

export default DropZone;
