
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TaskBadgeProps {
  label: string;
  variant: 'priority' | 'status';
}

const TaskBadge: React.FC<TaskBadgeProps> = ({ label, variant }) => {
  const getColor = (type: string, value: string) => {
    if (type === 'priority') {
      switch (value.toLowerCase()) {
        case 'alta':
          return 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300';
        case 'média':
          return 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300';
        case 'baixa':
          return 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300';
        default:
          return 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-300';
      }
    }
    
    // Status colors
    switch (value.toLowerCase()) {
      case 'concluída':
        return 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'agendada':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <Badge 
      variant="secondary" 
      className={`${getColor(variant, label)} px-2.5 py-1 text-xs font-medium rounded-full`}
    >
      {label}
    </Badge>
  );
};

export default TaskBadge;
