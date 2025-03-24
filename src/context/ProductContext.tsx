
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Tipos de produtos disponíveis
export type ProductType = 'retention' | 'billing' | 'recruitment';

interface ProductContextType {
  currentProduct: ProductType;
  setCurrentProduct: (product: ProductType) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  // Padrão para o produto de retenção de alunos
  const [currentProduct, setCurrentProduct] = useState<ProductType>('retention');

  return (
    <ProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
