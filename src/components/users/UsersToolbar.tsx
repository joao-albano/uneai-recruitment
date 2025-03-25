
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search } from "lucide-react";
import { useAuth } from '@/context/auth';
import UserPermissionsHelp from "./UserPermissionsHelp";

interface UsersToolbarProps {
  userCount: number;
  onOpenCreateDialog: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedOrganization: string | null;
  setSelectedOrganization: (orgId: string | null) => void;
  organizations: { id: string; name: string }[];
}

const UsersToolbar: React.FC<UsersToolbarProps> = ({ 
  userCount, 
  onOpenCreateDialog, 
  searchQuery, 
  setSearchQuery,
  selectedOrganization,
  setSelectedOrganization,
  organizations
}) => {
  const { isSuperAdmin } = useAuth();
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleOrganizationChange = (value: string) => {
    setSelectedOrganization(value === "all" ? null : value);
  };
  
  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Usuários</h2>
          <p className="text-sm text-muted-foreground">
            {userCount} usuário(s) cadastrado(s)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <UserPermissionsHelp />
          <Button onClick={onOpenCreateDialog}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Usuário
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        {isSuperAdmin && organizations.length > 0 && (
          <Select 
            value={selectedOrganization || "all"} 
            onValueChange={handleOrganizationChange}
          >
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder="Filtrar por organização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as organizações</SelectItem>
              {organizations.map(org => (
                <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default UsersToolbar;
