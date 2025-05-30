
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const BankTransferDetails: React.FC = () => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  return (
    <div className="p-4 bg-muted rounded-md space-y-2">
      <p className="font-medium">
        {isPtBR ? 'Dados para Transferência' : 'Bank Transfer Details'}
      </p>
      <div className="text-sm">
        <div className="grid grid-cols-2 gap-1">
          <span className="text-muted-foreground">
            {isPtBR ? 'Banco:' : 'Bank:'}
          </span>
          <span>Banco Exemplo</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <span className="text-muted-foreground">
            {isPtBR ? 'Agência:' : 'Branch:'}
          </span>
          <span>1234-5</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <span className="text-muted-foreground">
            {isPtBR ? 'Conta:' : 'Account:'}
          </span>
          <span>12345-6</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <span className="text-muted-foreground">
            {isPtBR ? 'CNPJ:' : 'Tax ID:'}
          </span>
          <span>12.345.678/0001-90</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        {isPtBR 
          ? 'Após realizar a transferência, envie o comprovante para finance@example.com'
          : 'After completing the transfer, please send proof of payment to finance@example.com'}
      </p>
    </div>
  );
};

export default BankTransferDetails;
