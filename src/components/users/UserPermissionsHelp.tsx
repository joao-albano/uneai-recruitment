
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle, Users, Book, ShieldAlert, Calendar } from "lucide-react";
import { userProfileDescriptions } from './permissions/types';

const UserPermissionsHelp = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          <HelpCircle className="h-4 w-4 mr-1" />
          <span>Perfis de Acesso</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <h3 className="font-medium text-sm">Perfis de Usuário</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Visão geral dos perfis de acesso disponíveis no sistema
          </p>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {Object.entries(userProfileDescriptions).map(([key, profile]) => {
            const Icon = profile.icon;
            return (
              <div key={key} className="p-4 border-b last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-primary" />
                  <h4 className="font-medium text-sm">{profile.title}</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {profile.description}
                </p>
              </div>
            );
          })}
        </div>
        <div className="bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">
            Clique no botão de <b>Permissões</b> em cada cartão de usuário para configurar permissões específicas.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserPermissionsHelp;
