
import React, { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormField, FormItem } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ShoppingCart, 
  Calendar, 
  UserPlus, 
  FileText, 
  BrainCircuit 
} from 'lucide-react';

// All available products
const allProducts = [
  {
    id: 'retention',
    title: 'Retenção',
    description: 'Sistema para gestão e retenção de clientes/alunos',
    price: 199.90,
    icon: <Users className="h-6 w-6 text-white" />,
    bgColor: 'bg-blue-500'
  },
  {
    id: 'sales',
    title: 'Vendas',
    description: 'Plataforma de vendas customizável para qualquer nicho',
    price: 249.90,
    icon: <ShoppingCart className="h-6 w-6 text-white" />,
    bgColor: 'bg-green-500'
  },
  {
    id: 'scheduling',
    title: 'Agendamento',
    description: 'Sistema de agendamentos adaptável para qualquer nicho',
    price: 179.90,
    icon: <Calendar className="h-6 w-6 text-white" />,
    bgColor: 'bg-purple-500'
  },
  {
    id: 'recruitment',
    title: 'Captação',
    description: 'Ferramentas para captação de alunos/clientes',
    price: 219.90,
    icon: <UserPlus className="h-6 w-6 text-white" />,
    bgColor: 'bg-orange-500'
  },
  {
    id: 'secretary',
    title: 'Secretaria',
    description: 'Sistema de gestão acadêmica e administrativa',
    price: 189.90,
    icon: <FileText className="h-6 w-6 text-white" />,
    bgColor: 'bg-amber-500'
  },
  {
    id: 'pedagogical',
    title: 'Pedagógico',
    description: 'Sistema de gestão pedagógica com IA',
    price: 259.90,
    icon: <BrainCircuit className="h-6 w-6 text-white" />,
    bgColor: 'bg-rose-500'
  }
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const ProductSelection = () => {
  const { control, watch } = useFormContext();
  const selectedProductIds = watch('selectedProducts') || [];
  const marketSegment = useWatch({ control, name: 'marketSegment' });
  const customSegment = useWatch({ control, name: 'customSegment' });
  
  // Define products based on market segment
  const segmentProducts = useMemo(() => {
    let productIds: string[] = [];
    
    switch (marketSegment) {
      case 'education':
        productIds = ['retention', 'recruitment', 'secretary', 'pedagogical'];
        break;
      case 'health':
      case 'beauty':
        productIds = ['sales', 'scheduling'];
        break;
      case 'services':
      case 'commerce':
      case 'other':
        productIds = ['sales'];
        break;
      default:
        // If no segment is selected, show all products
        productIds = allProducts.map(p => p.id);
        break;
    }
    
    return allProducts.filter(product => productIds.includes(product.id));
  }, [marketSegment]);
  
  // Calculate total price
  const totalPrice = selectedProductIds.reduce((total, productId) => {
    const product = allProducts.find(p => p.id === productId);
    return total + (product?.price || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Selecione seus produtos</h2>
        <p className="text-muted-foreground">
          Escolha os produtos que deseja utilizar. Você terá 14 dias para testar gratuitamente.
        </p>
        {marketSegment && (
          <p className="mt-2 text-sm font-medium text-blue-600">
            Produtos recomendados para segmento: {marketSegment === 'other' ? customSegment : marketSegment}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {segmentProducts.map((product) => (
          <FormField
            key={product.id}
            control={control}
            name="selectedProducts"
            render={({ field }) => {
              const isSelected = field.value?.includes(product.id);
              return (
                <FormItem className="space-y-0">
                  <Card className={`border-2 transition-all ${isSelected ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className={`w-10 h-10 rounded-md flex items-center justify-center ${product.bgColor}`}>
                          {product.icon}
                        </div>
                        <Badge variant="outline" className="font-medium">
                          {formatCurrency(product.price)}/mês
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">{product.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={product.id}
                          checked={isSelected}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value || [], product.id]);
                            } else {
                              field.onChange(field.value?.filter((value: string) => value !== product.id));
                            }
                          }}
                        />
                        <Label htmlFor={product.id} className="cursor-pointer">
                          Selecionar este produto
                        </Label>
                      </div>
                    </CardFooter>
                  </Card>
                </FormItem>
              );
            }}
          />
        ))}
      </div>

      {selectedProductIds.length > 0 && (
        <Card className="bg-secondary/20 border border-primary/20">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total selecionado:</span>
                <span className="font-bold text-lg">{formatCurrency(totalPrice)}/mês</span>
              </div>
              <p className="text-sm text-muted-foreground">
                A cobrança só ocorrerá após o período de teste de 14 dias.
                Você poderá cancelar a qualquer momento durante o período de teste.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductSelection;
