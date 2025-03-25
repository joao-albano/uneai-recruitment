
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NewUserType } from './types';
import { fetchOrganizations } from './api/userManagementApi';
import { useAuth } from '@/context/auth';
import { useToast } from '@/hooks/use-toast';

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newUser: NewUserType;
  setNewUser: React.Dispatch<React.SetStateAction<NewUserType>>;
  onSubmit: (e: React.FormEvent) => void;
}

const CreateUserDialog: React.FC<CreateUserDialogProps> = ({
  open,
  onOpenChange,
  newUser,
  setNewUser,
  onSubmit
}) => {
  const [organizations, setOrganizations] = useState<Array<{id: string, name: string}>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser, isSuperAdmin } = useAuth();
  const { toast } = useToast();
  
  // Carregar organizações disponíveis
  useEffect(() => {
    const loadOrganizations = async () => {
      if (open) {
        setLoading(true);
        try {
          console.log('Tentando carregar organizações para CreateUserDialog...');
          const orgsData = await fetchOrganizations();
          console.log('Organizações carregadas no CreateUserDialog:', orgsData);
          
          if (Array.isArray(orgsData)) {
            setOrganizations(orgsData);
            
            // Se o usuário não for super admin e tiver uma organização, pré-selecionar
            if (!isSuperAdmin && currentUser?.organizationId && !newUser.organizationId) {
              setNewUser(prev => ({ 
                ...prev, 
                organizationId: currentUser.organizationId || '',
                organizationName: orgsData.find(org => org.id === currentUser.organizationId)?.name || ''
              }));
            }
          } else {
            toast({
              title: "Erro ao carregar organizações",
              description: "Formato de dados inesperado. Tente novamente.",
              variant: "destructive"
            });
            setOrganizations([]);
          }
        } catch (error) {
          console.error('Erro ao carregar organizações:', error);
          toast({
            title: "Erro ao carregar organizações",
            description: "Não foi possível carregar a lista de organizações. Tente novamente.",
            variant: "destructive"
          });
          setOrganizations([]);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadOrganizations();
  }, [open, currentUser, isSuperAdmin, newUser.organizationId, setNewUser, toast]);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };
  
  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setNewUser({ ...newUser, [name]: value });
    
    // Se organizationId mudar, atualizar também organizationName
    if (name === 'organizationId') {
      const selectedOrg = organizations.find(org => org.id === value);
      if (selectedOrg) {
        setNewUser(prev => ({ ...prev, organizationName: selectedOrg.name }));
      }
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo usuário.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                name="name"
                value={newUser.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newUser.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Senha
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={handleChange}
                className="col-span-3"
                required
                autoComplete="new-password"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Perfil
              </Label>
              <Select
                name="role"
                value={newUser.role}
                onValueChange={(value) => handleSelectChange('role', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="organizationId" className="text-right">
                Organização
              </Label>
              <Select
                name="organizationId"
                value={newUser.organizationId}
                onValueChange={(value) => handleSelectChange('organizationId', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={loading ? "Carregando..." : "Selecione uma organização"} />
                </SelectTrigger>
                <SelectContent>
                  {organizations.length > 0 ? (
                    organizations.map(org => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="empty" disabled>
                      {loading ? "Carregando organizações..." : "Nenhuma organização disponível"}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserDialog;
