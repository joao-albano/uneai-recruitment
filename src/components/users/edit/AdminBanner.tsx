
import React from 'react';
import { InfoIcon } from 'lucide-react';

interface AdminBannerProps {
  isUneCxAdmin: boolean;
}

const AdminBanner: React.FC<AdminBannerProps> = ({ isUneCxAdmin }) => {
  if (!isUneCxAdmin) return null;
  
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-2">
      <div className="flex items-center gap-2">
        <InfoIcon className="h-4 w-4 text-amber-500" />
        <p className="text-sm text-amber-700 font-medium">Administrador principal do sistema</p>
      </div>
      <p className="text-xs text-amber-600 mt-1">
        Este usuário possui privilégios de administração em todo o sistema UNE CX.
      </p>
    </div>
  );
};

export default AdminBanner;
