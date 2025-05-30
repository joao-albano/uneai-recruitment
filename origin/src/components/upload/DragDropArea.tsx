
import React, { useRef } from 'react';
import DropZone from './DropZone';
import FilePreview from './FilePreview';

interface DragDropAreaProps {
  file: File | null;
  uploadProgress: number;
  isDragging: boolean;
  isProcessing: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: () => void;
  onReset: () => void;
}

const DragDropArea: React.FC<DragDropAreaProps> = ({
  file,
  uploadProgress,
  isDragging,
  isProcessing,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  onReset,
}) => {
  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {!file ? (
        <DropZone onFileSelect={onFileSelect} />
      ) : (
        <FilePreview 
          file={file} 
          uploadProgress={uploadProgress} 
          isProcessing={isProcessing}
          onReset={onReset}
        />
      )}
    </div>
  );
};

export default DragDropArea;
