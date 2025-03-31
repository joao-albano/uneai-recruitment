
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  exportLeads: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ exportLeads }) => {
  return (
    <Button variant="outline" className="gap-2" onClick={exportLeads}>
      <Download className="h-4 w-4" />
      <span>Exportar</span>
    </Button>
  );
};

export default ExportButton;
