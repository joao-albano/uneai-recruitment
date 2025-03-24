
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UserType } from '../types';
import { ProductSubscription, useProduct } from '@/context/ProductContext';
import { getProductDisplayName } from '../utils/userUtils';

interface UserSubscriptionsProps {
  selectedUser: UserType;
  subscriptions: ProductSubscription[];
  isAdmin: boolean;
  isSuperAdmin: boolean;
}

const UserSubscriptions: React.FC<UserSubscriptionsProps> = ({
  selectedUser,
  subscriptions,
  isAdmin,
  isSuperAdmin
}) => {
  const { organizations } = useProduct();
  
  // Encontrar a organização do usuário
  const userOrg = organizations.find(org => org.id === selectedUser.organizationId);
  
  // Encontrar os produtos ativos para a organização do usuário
  const orgActiveProducts = userOrg?.products?.filter(p => p.active) || [];
  
  if ((!isAdmin && orgActiveProducts.length === 0) && !isSuperAdmin) return null;
  
  return (
    <div className="grid gap-2 pt-3 border-t">
      <Label className="mb-2">Produtos Ativos para a Organização</Label>
      <div className="grid gap-2">
        {orgActiveProducts.map(product => (
          <div key={product.type} className="flex items-center space-x-2">
            <Checkbox 
              id={`product-${product.type}`} 
              checked={product.active} 
              disabled={true} // Usuários não podem mudar os produtos da organização
            />
            <Label 
              htmlFor={`product-${product.type}`}
              className="text-sm font-normal"
            >
              {getProductDisplayName(product.type)}
            </Label>
          </div>
        ))}
        {orgActiveProducts.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Não há produtos ativos para esta organização.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserSubscriptions;
