
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface AdminBannerProps {
  isUneCxAdmin: boolean;
}

const AdminBanner: React.FC<AdminBannerProps> = ({ isUneCxAdmin }) => {
  if (!isUneCxAdmin) return null;
  
  return (
    <Alert variant="destructive" className="bg-amber-50 border-amber-200">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800 text-sm">
        Atenção: Este usuário é um Super Admin. Alterações em seu perfil podem afetar o acesso ao sistema.
      </AlertDescription>
    </Alert>
  );
};

export default AdminBanner;
