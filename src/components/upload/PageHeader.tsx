
import React from 'react';
import { useProduct } from '@/context/ProductContext';

const PageHeader: React.FC = () => {
  const { currentProduct } = useProduct();
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">Upload de Dados</h1>
      <p className="text-muted-foreground mt-1">
        {currentProduct === 'recruitment'
          ? 'Faça upload de planilhas com dados de leads e campanhas'
          : 'Faça upload de planilhas com dados dos alunos'}
      </p>
    </div>
  );
};

export default PageHeader;
