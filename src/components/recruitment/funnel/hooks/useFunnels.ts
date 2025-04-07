
import { useState, useEffect } from 'react';
import { Funnel } from '@/types/recruitment';
import { useToast } from '@/hooks/use-toast';

// Initial sample data for funnels
const initialFunnels: Funnel[] = [
  {
    id: '1',
    name: 'Funil de Captação Padrão',
    description: 'Processo de captação de alunos para matrícula',
    isActive: true,
    stages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Funil de Vendas Corporativas',
    description: 'Processo de venda para empresas e parcerias',
    isActive: true,
    stages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export function useFunnels() {
  const { toast } = useToast();
  const [funnels, setFunnels] = useState<Funnel[]>(initialFunnels);
  const [selectedFunnel, setSelectedFunnel] = useState<Funnel | null>(null);
  const [createFunnelDialogOpen, setCreateFunnelDialogOpen] = useState(false);

  // Initialize with the first funnel
  useEffect(() => {
    if (funnels.length > 0 && !selectedFunnel) {
      setSelectedFunnel(funnels[0]);
    }
  }, [funnels, selectedFunnel]);

  const handleCreateFunnel = (funnelData: { name: string; description: string }) => {
    const newFunnel: Funnel = {
      id: String(funnels.length + 1),
      name: funnelData.name,
      description: funnelData.description,
      isActive: true,
      stages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setFunnels(prevFunnels => [...prevFunnels, newFunnel]);
    setSelectedFunnel(newFunnel);
    
    toast({
      title: "Funil criado",
      description: `O funil "${funnelData.name}" foi criado com sucesso.`,
    });
    
    setCreateFunnelDialogOpen(false);
  };

  return {
    funnels,
    selectedFunnel,
    setSelectedFunnel,
    createFunnelDialogOpen,
    setCreateFunnelDialogOpen,
    handleCreateFunnel
  };
}
