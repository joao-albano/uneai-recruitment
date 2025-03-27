
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ProductType } from '@/context/ProductContext';
import ProductAssociationDialog from './ProductAssociationDialog';

interface ProductAssociationManagerProps {
  planId: string;
  planName: string;
  associatedProducts: ProductType[];
  onUpdateProducts: (planId: string, products: ProductType[]) => void;
}

const ProductAssociationManager: React.FC<ProductAssociationManagerProps> = ({
  planId,
  planName,
  associatedProducts,
  onUpdateProducts,
}) => {
  const { language } = useTheme();
  const [dialogOpen, setDialogOpen] = useState(false);
  const isPtBR = language === 'pt-BR';

  // Available product options that can be associated with plans
  const availableProducts: Array<{ id: ProductType; name: string; description: string }> = [
    { 
      id: 'retention', 
      name: isPtBR ? 'Retenção' : 'Retention', 
      description: isPtBR ? 'Sistema para gestão e retenção de alunos' : 'Student retention management system' 
    },
    { 
      id: 'sales', 
      name: isPtBR ? 'Vendas' : 'Sales', 
      description: isPtBR ? 'Sistema de vendas e matrículas' : 'Sales and enrollment system' 
    },
    { 
      id: 'scheduling', 
      name: isPtBR ? 'Agendamentos' : 'Scheduling', 
      description: isPtBR ? 'Sistema de agendamentos e reuniões' : 'Scheduling and meeting system' 
    },
    { 
      id: 'recruitment', 
      name: isPtBR ? 'Captação' : 'Recruitment', 
      description: isPtBR ? 'Sistema de captação de alunos' : 'Student recruitment system' 
    },
    { 
      id: 'secretary', 
      name: isPtBR ? 'Secretaria' : 'Secretary', 
      description: isPtBR ? 'Sistema de gestão de secretaria' : 'Secretary management system' 
    },
    { 
      id: 'pedagogical', 
      name: isPtBR ? 'Pedagógico' : 'Pedagogical', 
      description: isPtBR ? 'Sistema de gestão pedagógica' : 'Pedagogical management system' 
    },
  ];

  const getProductDetails = (productId: ProductType) => {
    return availableProducts.find(product => product.id === productId) || {
      id: productId,
      name: productId,
      description: ''
    };
  };

  const handleDialogClose = (selectedProducts?: ProductType[]) => {
    if (selectedProducts) {
      onUpdateProducts(planId, selectedProducts);
    }
    setDialogOpen(false);
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {isPtBR ? 'Produtos associados' : 'Associated Products'}
        </CardTitle>
        <CardDescription>
          {isPtBR 
            ? `Gerencie os produtos disponíveis no plano ${planName}`
            : `Manage products available in the ${planName} plan`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-muted-foreground">
            {isPtBR 
              ? `${associatedProducts.length} produto(s) associado(s)` 
              : `${associatedProducts.length} associated product(s)`}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            {isPtBR ? 'Gerenciar produtos' : 'Manage products'}
          </Button>
        </div>

        <Separator className="my-2" />

        {associatedProducts.length > 0 ? (
          <div className="space-y-2">
            {associatedProducts.map(productId => {
              const product = getProductDetails(productId);
              return (
                <div key={productId} className="flex items-center p-2 border rounded-md">
                  <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            {isPtBR 
              ? 'Nenhum produto associado a este plano' 
              : 'No products associated with this plan'}
          </div>
        )}
      </CardContent>

      <ProductAssociationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleDialogClose}
        availableProducts={availableProducts}
        selectedProducts={associatedProducts}
        planName={planName}
      />
    </Card>
  );
};

export default ProductAssociationManager;
