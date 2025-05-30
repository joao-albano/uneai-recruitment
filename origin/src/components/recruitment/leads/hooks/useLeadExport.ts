
import { useToast } from '@/hooks/use-toast';

export const useLeadExport = () => {
  const { toast } = useToast();
  
  // Export leads to CSV
  const handleExportLeads = (filteredLeads: any[]) => {
    // Simulate export with a toast
    toast({
      title: "Exportação iniciada",
      description: `${filteredLeads.length} leads estão sendo exportados para CSV`
    });
  };

  return { handleExportLeads };
};
