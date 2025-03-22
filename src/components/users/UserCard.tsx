
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, ShieldAlert, Trash, User } from "lucide-react";

type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  initials: string;
};

interface UserCardProps {
  user: UserType;
  onEdit: (user: UserType) => void;
  onDelete: (user: UserType) => void;
  isLastAdmin: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete, isLastAdmin }) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className={user.role === 'admin' ? 'border-2 border-primary' : ''}>
              <AvatarFallback>{user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-semibold">{user.name}</CardTitle>
              <CardDescription className="text-xs">{user.email}</CardDescription>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive" 
                onClick={() => onDelete(user)}
                disabled={user.role === 'admin' && isLastAdmin}
              >
                <Trash className="mr-2 h-4 w-4" />
                Remover
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5">
            {user.role === 'admin' ? (
              <>
                <ShieldAlert className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Administrador</span>
              </>
            ) : (
              <>
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Usuário</span>
              </>
            )}
          </div>
          <Button variant="ghost" size="sm" className="h-7 px-2">
            <ShieldAlert className="h-3.5 w-3.5 mr-1" />
            <span className="text-xs">Permissões</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
