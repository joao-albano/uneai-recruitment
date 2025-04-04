
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Settings, Download } from 'lucide-react';

interface ConversationalAIHeaderProps {
  onOpenFilters: () => void;
  onOpenSettings: () => void;
}

const ConversationalAIHeader: React.FC<ConversationalAIHeaderProps> = ({
  onOpenFilters,
  onOpenSettings
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">IA Conversacional</h1>
        <p className="text-muted-foreground">
          Interação inteligente e humanizada com leads via múltiplos canais
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={onOpenFilters}>
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
        <Button variant="outline" onClick={onOpenSettings}>
          <Settings className="h-4 w-4 mr-2" />
          Configurações
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>
    </div>
  );
};

export default ConversationalAIHeader;
