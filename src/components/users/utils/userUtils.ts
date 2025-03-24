import { ProductType } from '@/context/ProductContext';

// Função utilitária para obter o nome de exibição do produto
export const getProductDisplayName = (productType: ProductType): string => {
  switch (productType) {
    case 'retention':
      return 'Retenção de Alunos';
    case 'billing':
      return 'Cobrança de Mensalidades';
    case 'recruitment':
      return 'Captação de Alunos';
    default:
      return productType;
  }
};
