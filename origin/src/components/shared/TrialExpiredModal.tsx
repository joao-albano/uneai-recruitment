
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface TrialExpiredModalProps {
  isExpired: boolean;
  isSuperAdmin: boolean;
}

const TrialExpiredModal: React.FC<TrialExpiredModalProps> = ({ 
  isExpired,
  isSuperAdmin
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show the modal if trial is expired and user is not a super admin
    if (isExpired && !isSuperAdmin) {
      setIsOpen(true);
    }
  }, [isExpired, isSuperAdmin]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNavigateToPricing = () => {
    setIsOpen(false);
    navigate('/pricing');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <DialogTitle className="text-center text-xl">Período de teste expirado</DialogTitle>
          <DialogDescription className="text-center">
            Seu período de avaliação gratuita chegou ao fim. Para continuar utilizando todas as funcionalidades, 
            escolha um plano de assinatura.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-2 text-sm text-muted-foreground">
          <p>
            No momento, você pode apenas visualizar os dados já inseridos. Para desbloquear todas as funcionalidades
            novamente, registre uma forma de pagamento.
          </p>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleClose} className="sm:flex-1">
            Continuar Limitado
          </Button>
          <Button onClick={handleNavigateToPricing} className="sm:flex-1">
            Ver Planos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrialExpiredModal;
