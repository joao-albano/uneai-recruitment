
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { downloadTemplate, InstitutionType } from '@/utils/validation/templateManager';
import { useProduct } from '@/context/ProductContext';

interface ExportButtonProps {
  exportLeads: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ exportLeads }) => {
  const { currentProduct } = useProduct();
  
  // Handle template download by institution type
  const handleDownloadTemplate = (institutionType: InstitutionType) => {
    downloadTemplate(currentProduct, institutionType);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          <span>Exportar</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportLeads}>
          Exportar leads filtrados
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleDownloadTemplate('school')}>
          Baixar modelo para Educação Básica (RA obrigatório)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownloadTemplate('university')}>
          Baixar modelo para Ensino Superior (Email ou CPF)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportButton;
