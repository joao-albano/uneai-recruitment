
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface TrialPeriodBannerProps {
  daysRemaining: number;
  isLoading?: boolean;
  errorMessage?: string | null;
  isSuperAdmin?: boolean;
}

const TrialPeriodBanner: React.FC<TrialPeriodBannerProps> = ({ 
  daysRemaining,
  isLoading = false,
  errorMessage = null,
  isSuperAdmin = false
}) => {
  // Don't show the banner for super admins
  if (isSuperAdmin) {
    return null;
  }
  
  if (isLoading) {
    return null;
  }

  if (errorMessage) {
    return (
      <Alert className="mb-6 border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500" />
        <AlertTitle className="font-medium text-amber-800 dark:text-amber-400">
          Não foi possível verificar seu período de avaliação
        </AlertTitle>
        <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-amber-700 dark:text-amber-300">
            Ocorreu um erro ao verificar o status da sua assinatura.
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-amber-300 hover:bg-amber-100 text-amber-800 hover:text-amber-900 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/30"
            asChild
          >
            <Link to="/pricing">
              Ver Planos
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Define alert variant based on days remaining
  const getVariant = () => {
    if (daysRemaining <= 0) return "destructive";
    if (daysRemaining <= 3) return "destructive";
    if (daysRemaining <= 7) return "warning";
    return "default";
  };

  const variant = getVariant();
  
  // Get colors based on variant
  let colors = {
    border: 'border-blue-300',
    bg: 'bg-blue-50',
    darkBg: 'dark:bg-blue-900/20',
    darkBorder: 'dark:border-blue-800',
    text: 'text-blue-600',
    darkText: 'dark:text-blue-500',
    title: 'text-blue-800',
    darkTitle: 'dark:text-blue-400',
    desc: 'text-blue-700',
    darkDesc: 'dark:text-blue-300',
    buttonBorder: 'border-blue-300',
    buttonHoverBg: 'hover:bg-blue-100',
    buttonText: 'text-blue-800',
    buttonHoverText: 'hover:text-blue-900',
    darkButtonBorder: 'dark:border-blue-700',
    darkButtonText: 'dark:text-blue-400',
    darkButtonHoverBg: 'dark:hover:bg-blue-900/30',
  };
  
  if (variant === 'destructive') {
    colors = {
      border: 'border-red-300',
      bg: 'bg-red-50',
      darkBg: 'dark:bg-red-900/20',
      darkBorder: 'dark:border-red-800',
      text: 'text-red-600',
      darkText: 'dark:text-red-500',
      title: 'text-red-800',
      darkTitle: 'dark:text-red-400',
      desc: 'text-red-700',
      darkDesc: 'dark:text-red-300',
      buttonBorder: 'border-red-300',
      buttonHoverBg: 'hover:bg-red-100',
      buttonText: 'text-red-800',
      buttonHoverText: 'hover:text-red-900',
      darkButtonBorder: 'dark:border-red-700',
      darkButtonText: 'dark:text-red-400',
      darkButtonHoverBg: 'dark:hover:bg-red-900/30',
    };
  } else if (variant === 'warning') {
    colors = {
      border: 'border-amber-300',
      bg: 'bg-amber-50',
      darkBg: 'dark:bg-amber-900/20',
      darkBorder: 'dark:border-amber-800',
      text: 'text-amber-600',
      darkText: 'dark:text-amber-500',
      title: 'text-amber-800',
      darkTitle: 'dark:text-amber-400',
      desc: 'text-amber-700',
      darkDesc: 'dark:text-amber-300',
      buttonBorder: 'border-amber-300',
      buttonHoverBg: 'hover:bg-amber-100',
      buttonText: 'text-amber-800',
      buttonHoverText: 'hover:text-amber-900',
      darkButtonBorder: 'dark:border-amber-700',
      darkButtonText: 'dark:text-amber-400',
      darkButtonHoverBg: 'dark:hover:bg-amber-900/30',
    };
  }

  // Get message based on days remaining
  const getMessage = () => {
    if (daysRemaining <= 0) {
      return 'Seu período de avaliação expirou. Escolha um plano para continuar usando o sistema.';
    }
    
    return `Seu período de avaliação gratuita expira em ${daysRemaining} ${daysRemaining === 1 ? 'dia' : 'dias'}.`;
  };

  return (
    <Alert className={`mb-6 ${colors.border} ${colors.bg} ${colors.darkBg} ${colors.darkBorder}`}>
      <Clock className={`h-5 w-5 ${colors.text} ${colors.darkText}`} />
      <AlertTitle className={`font-medium ${colors.title} ${colors.darkTitle}`}>
        {daysRemaining <= 0 ? 'Período de Avaliação Expirado' : 'Período de Avaliação'}
      </AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className={`${colors.desc} ${colors.darkDesc}`}>
          {getMessage()}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          className={`${colors.buttonBorder} ${colors.buttonHoverBg} ${colors.buttonText} ${colors.buttonHoverText} ${colors.darkButtonBorder} ${colors.darkButtonText} ${colors.darkButtonHoverBg}`}
          asChild
        >
          <Link to="/pricing">
            {daysRemaining <= 0 ? 'Assinar Agora' : 'Ver Planos'}
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default TrialPeriodBanner;
