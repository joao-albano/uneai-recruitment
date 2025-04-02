
import React, { useCallback } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

interface LeadActionMenuProps {
  leadId: number;
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage?: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
}

const LeadActionMenu: React.FC<LeadActionMenuProps> = ({
  leadId,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead,
}) => {
  // Handle dropdown click to prevent event propagation
  const handleDropdownClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Menu item click handler with proper event control
  const handleMenuItemClick = useCallback((
    e: React.MouseEvent, 
    handler?: (e: React.MouseEvent, leadId: number) => void
  ) => {
    // Stop all event propagation
    e.preventDefault();
    e.stopPropagation();
    
    if (handler) {
      // Execute the action after a tiny delay to ensure UI responsiveness
      setTimeout(() => {
        handler(e, leadId);
      }, 10);
    }
  }, [leadId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          type="button"
          onClick={handleDropdownClick}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white z-50"
        onClick={handleDropdownClick}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {onEditLead && (
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={(e) => handleMenuItemClick(e, onEditLead)}
            onSelect={(e) => e.preventDefault()}
          >
            Editar Lead
          </DropdownMenuItem>
        )}
        {onChangeStage && (
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={(e) => handleMenuItemClick(e, onChangeStage)}
            onSelect={(e) => e.preventDefault()}
          >
            Alterar Etapa
          </DropdownMenuItem>
        )}
        {onViewHistory && (
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={(e) => handleMenuItemClick(e, onViewHistory)}
            onSelect={(e) => e.preventDefault()}
          >
            Ver Histórico
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {onDeleteLead && (
          <DropdownMenuItem 
            className="text-destructive cursor-pointer"
            onClick={(e) => handleMenuItemClick(e, onDeleteLead)}
            onSelect={(e) => e.preventDefault()}
          >
            Excluir Lead
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeadActionMenu;
