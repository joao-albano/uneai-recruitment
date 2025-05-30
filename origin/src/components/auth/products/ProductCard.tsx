
import React from 'react';
import { FormField, FormItem } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useFormContext } from 'react-hook-form';
import { Product, formatCurrency } from './productData';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { control } = useFormContext();

  return (
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
  );
};

export default ProductCard;
