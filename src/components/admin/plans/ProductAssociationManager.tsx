
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductType } from '@/context/ProductContext';
import ProductAssociationDialog from './ProductAssociationDialog';
import ProductAssociationHeader from './ProductAssociationHeader';
import ProductList from './ProductList';

// Mock product data
const productsList = [
  { id: 'retention' as ProductType, name: 'Retenção', description: 'Sistema de monitoramento e retenção de alunos' },
  { id: 'sales' as ProductType, name: 'Vendas', description: 'Gestão de vendas e matrículas' },
  { id: 'scheduling' as ProductType, name: 'Agendamento', description: 'Agendamento de aulas e atendimentos' },
  { id: 'recruitment' as ProductType, name: 'Captação', description: 'Ferramentas para captação de novos alunos' },
  { id: 'secretary' as ProductType, name: 'Secretaria', description: 'Gestão da secretaria acadêmica' },
  { id: 'pedagogical' as ProductType, name: 'Pedagógico', description: 'Sistema de gestão pedagógica' },
  { id: 'billing' as ProductType, name: 'Faturamento', description: 'Gestão de mensalidades e faturamento' }
];

interface ProductsAssociationManagerProps {
  planName: string;
  planId: string;
  associatedProducts: ProductType[];
  onProductsChange: (products: ProductType[]) => void;
}

const ProductAssociationManager: React.FC<ProductsAssociationManagerProps> = ({
  planName,
  planId,
  associatedProducts,
  onProductsChange
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to get product details by ID
  const getProductDetails = (productId: ProductType) => {
    return productsList.find(product => product.id === productId) || {
      id: productId,
      name: productId,
      description: ''
    };
  };

  // Handle confirmation from the dialog
  const handleConfirm = (selectedProducts?: ProductType[]) => {
    if (selectedProducts) {
      onProductsChange(selectedProducts);
    }
    setIsDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos Associados</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductAssociationHeader
          associatedProducts={associatedProducts}
          onManageClick={() => setIsDialogOpen(true)}
        />
        
        <ProductList
          associatedProducts={associatedProducts}
          getProductDetails={getProductDetails}
        />
        
        <ProductAssociationDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onConfirm={handleConfirm}
          availableProducts={productsList}
          selectedProducts={associatedProducts}
          planName={planName}
          planId={planId}
        />
      </CardContent>
    </Card>
  );
};

export default ProductAssociationManager;
