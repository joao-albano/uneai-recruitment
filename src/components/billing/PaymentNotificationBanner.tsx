
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

interface PaymentNotificationBannerProps {
  dueDate?: Date;
  invoiceId?: string;
}

const PaymentNotificationBanner: React.FC<PaymentNotificationBannerProps> = ({ 
  dueDate = new Date(2024, 5, 30), 
  invoiceId = 'INV-004' 
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  // Format the due date
  const formattedDate = dueDate.toLocaleDateString(
    isPtBR ? 'pt-BR' : 'en-US', 
    { day: '2-digit', month: '2-digit', year: 'numeric' }
  );

  return (
    <Alert className="mb-6 border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
      <Bell className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
      <AlertTitle className="font-medium text-yellow-800 dark:text-yellow-400">
        {isPtBR 
          ? 'Pagamento pendente' 
          : 'Payment pending'}
      </AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-yellow-700 dark:text-yellow-300">
          {isPtBR 
            ? `Você possui uma fatura pendente (${invoiceId}) com vencimento em ${formattedDate}.` 
            : `You have a pending invoice (${invoiceId}) due on ${formattedDate}.`}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-yellow-300 hover:bg-yellow-100 text-yellow-800 hover:text-yellow-900 dark:border-yellow-700 dark:text-yellow-400 dark:hover:bg-yellow-900/30"
          asChild
        >
          <Link to="/user-billing">
            {isPtBR ? 'Ir para Pagamentos' : 'Go to Payments'}
          </Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default PaymentNotificationBanner;
