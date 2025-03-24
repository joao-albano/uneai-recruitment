
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { UserType } from '../types';
import { ProductSubscription } from '@/context/ProductContext';
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
  const userOrgSubscriptions = subscriptions.filter(
    sub => sub.organizationId === selectedUser.organizationId
  );
  
  if ((!isAdmin && userOrgSubscriptions.length === 0) && !isSuperAdmin) return null;
  
  return (
    <div className="grid gap-2 pt-3 border-t">
      <Label className="mb-2">Produtos Ativos</Label>
      <div className="grid gap-2">
        {userOrgSubscriptions.map(sub => (
          <div key={sub.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`product-${sub.id}`} 
              checked={sub.active} 
              disabled={!isSuperAdmin && selectedUser.organizationId !== selectedUser.organizationId}
              // Na implementação real, isso chamaria uma API para atualizar a assinatura
            />
            <Label 
              htmlFor={`product-${sub.id}`}
              className="text-sm font-normal"
            >
              {getProductDisplayName(sub.productType)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSubscriptions;
