
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';

const EmptyLeadsState: React.FC = () => {
  return (
    <TableRow>
      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
        Nenhum lead encontrado
      </TableCell>
    </TableRow>
  );
};

export default EmptyLeadsState;
