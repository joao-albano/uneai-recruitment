
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentNotificationProps {
  visible: boolean;
}

const PaymentNotification: React.FC<PaymentNotificationProps> = ({ visible }) => {
  if (!visible) return null;
  
  return (
    <Link to="/user-billing">
      <Button variant="outline" size="sm" className="gap-1 border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800">
        <AlertTriangle className="h-4 w-4" />
        <span>Pagamento Pendente</span>
      </Button>
    </Link>
  );
};

export default PaymentNotification;
