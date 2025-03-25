
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductType } from '@/context/ProductContext';
import { OrganizationProduct } from '../types';
import { 
  BrainCircuit, 
  Receipt, 
  Users, 
  FileText, 
  BookOpen, 
  Package,
  Check,
  X
} from 'lucide-react';

interface OrganizationProductsViewProps {
  products: OrganizationProduct[];
  showHeader?: boolean;
  compact?: boolean;
}

// Helper to get product details
const getProductDetails = (type: ProductType) => {
  switch (type) {
    case 'retention':
      return {
        name: 'Retenção de Alunos',
        description: 'Sistema para monitoramento e prevenção de evasão escolar com IA',
        icon: BrainCircuit,
        color: 'bg-purple-600 text-white'
      };
    case 'billing':
      return {
        name: 'Cobrança',
        description: 'Gerenciamento de mensalidades e controle financeiro',
        icon: Receipt,
        color: 'bg-green-600 text-white'
      };
    case 'recruitment':
      return {
        name: 'Captação',
        description: 'Processo de captação e funil de vendas',
        icon: Users,
        color: 'bg-blue-600 text-white'
      };
    case 'secretary':
      return {
        name: 'Secretaria',
        description: 'Gestão de documentos e processos administrativos',
        icon: FileText,
        color: 'bg-amber-600 text-white'
      };
    case 'pedagogical':
      return {
        name: 'Pedagógico',
        description: 'Acompanhamento pedagógico e avaliações',
        icon: BookOpen,
        color: 'bg-indigo-600 text-white'
      };
    default:
      return {
        name: type,
        description: 'Produto',
        icon: Package,
        color: 'bg-gray-600 text-white'
      };
  }
};

const OrganizationProductsView: React.FC<OrganizationProductsViewProps> = ({ 
  products, 
  showHeader = true,
  compact = false
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        Nenhum produto configurado
      </div>
    );
  }

  // Fetch product details from our helper function
  const productsWithDetails = products.map(product => {
    const details = getProductDetails(product.type);
    return {
      ...product,
      details
    };
  });

  // Use compact view for use in cards or other smaller UI elements
  if (compact) {
    return (
      <div className="flex flex-wrap gap-1.5">
        {productsWithDetails.map(product => {
          const { details } = product;
          return (
            <Badge 
              key={product.type} 
              variant={product.active ? "default" : "outline"}
              className={`flex items-center gap-1 px-2 ${product.active ? details.color : 'text-gray-500 border-gray-200'}`}
            >
              <details.icon className="h-3 w-3" />
              <span>{details.name}</span>
            </Badge>
          );
        })}
      </div>
    );
  }

  // Full view with cards for each product
  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="flex items-center gap-2 mb-2">
          <Package className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Produtos</h3>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productsWithDetails.map(product => {
          const { details } = product;
          
          return (
            <Card key={product.type} className={`border ${product.active ? 'border-gray-200' : 'border-gray-100 bg-gray-50'}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${product.active ? details.color : 'bg-gray-200 text-gray-500'}`}>
                      <details.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">{details.name}</CardTitle>
                  </div>
                  <div>
                    {product.active ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Ativo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-gray-500 flex items-center gap-1">
                        <X className="h-3 w-3" />
                        Inativo
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{details.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default OrganizationProductsView;
