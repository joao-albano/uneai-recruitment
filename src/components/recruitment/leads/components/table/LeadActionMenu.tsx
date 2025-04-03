
import React, { useCallback, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Edit, History, AlertTriangle, Layers } from 'lucide-react';

interface LeadActionMenuProps {
  leadId: number;
  onViewLead?: (e: React.MouseEvent, leadId: number) => void;
  onEditLead?: (e: React.MouseEvent, leadId: number) => void;
  onChangeStage?: (e: React.MouseEvent, leadId: number) => void;
  onViewHistory?: (e: React.MouseEvent, leadId: number) => void;
  onDeleteLead?: (e: React.MouseEvent, leadId: number) => void;
}

const LeadActionMenu: React.FC<LeadActionMenuProps> = ({
  leadId,
  onViewLead,
  onEditLead,
  onChangeStage,
  onViewHistory,
  onDeleteLead,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
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
    e.preventDefault();
    e.stopPropagation();
    
    if (handler) {
      handler(e, leadId);
    }
    
    // Close dropdown after action
    setIsOpen(false);
  }, [leadId]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          type="button"
          onClick={(e) => {
            handleDropdownClick(e);
            setIsOpen(!isOpen);
          }}
          className="focus:ring-1 focus:ring-primary"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white border z-50 shadow-md"
        onClick={handleDropdownClick}
        onPointerDownOutside={() => setIsOpen(false)}
      >
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {onViewLead && (
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-muted"
            onClick={(e) => handleMenuItemClick(e, onViewLead)}
          >
            <Eye className="h-4 w-4 mr-2" />
            Visualizar Lead
          </DropdownMenuItem>
        )}
        {onEditLead && (
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-muted"
            onClick={(e) => handleMenuItemClick(e, onEditLead)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar Lead
          </DropdownMenuItem>
        )}
        {onChangeStage && (
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-muted"
            onClick={(e) => handleMenuItemClick(e, onChangeStage)}
          >
            <Layers className="h-4 w-4 mr-2" />
            Alterar Etapa
          </DropdownMenuItem>
        )}
        {onViewHistory && (
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-muted"
            onClick={(e) => handleMenuItemClick(e, onViewHistory)}
          >
            <History className="h-4 w-4 mr-2" />
            Ver Histórico
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {onDeleteLead && (
          <DropdownMenuItem 
            className="text-destructive cursor-pointer hover:bg-muted"
            onClick={(e) => handleMenuItemClick(e, onDeleteLead)}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Excluir Lead
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeadActionMenu;
