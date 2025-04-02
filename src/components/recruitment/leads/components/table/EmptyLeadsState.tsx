
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';

const EmptyLeadsState: React.FC = () => {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
        <div className="flex flex-col items-center justify-center gap-2">
          <Search className="h-8 w-8 text-muted-foreground/50" />
          <h3 className="font-medium">Nenhum lead encontrado</h3>
          <p className="text-sm text-muted-foreground">
            Tente ajustar seus filtros ou adicionar novos leads
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyLeadsState;
