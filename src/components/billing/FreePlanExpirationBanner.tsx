
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

interface FreePlanExpirationBannerProps {
  daysRemaining: number;
  isLoading?: boolean;
}

const FreePlanExpirationBanner: React.FC<FreePlanExpirationBannerProps> = ({ 
  daysRemaining,
  isLoading = false
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  if (isLoading) {
    return null;
  }
  
  // Define alert variant based on days remaining
  const getVariant = () => {
    if (daysRemaining <= 3) return "destructive";
    if (daysRemaining <= 7) return "warning";
    return "default";
  };

  // Get message based on days remaining
  const getMessage = () => {
    if (daysRemaining <= 0) {
      return isPtBR 
        ? 'Seu período de avaliação expirou. Escolha um plano para continuar usando o sistema.' 
        : 'Your trial period has expired. Choose a plan to continue using the system.';
    }
    
    return isPtBR 
      ? `Seu período de avaliação gratuita expira em ${daysRemaining} ${daysRemaining === 1 ? 'dia' : 'dias'}.` 
      : `Your free trial expires in ${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'}.`;
  };

  return (
    <Alert className="mb-6 border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-500" />
      <AlertTitle className="font-medium text-blue-800 dark:text-blue-400">
        {isPtBR 
          ? 'Período de Avaliação' 
          : 'Trial Period'}
      </AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-blue-700 dark:text-blue-300">
          {getMessage()}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-blue-300 hover:bg-blue-100 text-blue-800 hover:text-blue-900 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30"
          asChild
        >
          <Link to="/pricing">
            {isPtBR ? 'Ver Planos' : 'View Plans'}
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default FreePlanExpirationBanner;
