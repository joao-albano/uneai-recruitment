
/**
 * Returns the appropriate Tailwind background color class based on the lead status
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Novo':
      return 'bg-green-500';
    case 'Em Andamento':
      return 'bg-blue-500';
    case 'Aguardando':
      return 'bg-amber-500';
    case 'Finalizado':
      return 'bg-purple-500';
    default:
      return 'bg-gray-500';
  }
};
