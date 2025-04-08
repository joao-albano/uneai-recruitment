
import React from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { useProduct } from '@/context/ProductContext';

const PageHeader: React.FC = () => {
  const { currentProduct } = useProduct();
  
  const title = currentProduct === 'recruitment' 
    ? 'Upload de Leads' 
    : 'Upload de Dados de Alunos';
  
  const description = currentProduct === 'recruitment'
    ? 'Importe leads em massa a partir de arquivos CSV ou Excel'
    : 'Importe dados de alunos a partir de arquivos CSV ou Excel';
  
  return (
    <div className="flex flex-col space-y-2 mb-6">
      <div className="flex items-center gap-2">
        <FileSpreadsheet className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default PageHeader;
