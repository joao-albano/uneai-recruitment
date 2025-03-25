
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { OrganizationType } from '../types';

interface OrganizationDetailsHeaderProps {
  organization: OrganizationType;
}

const OrganizationDetailsHeader: React.FC<OrganizationDetailsHeaderProps> = ({ 
  organization 
}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/organizations')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
        
        <Button 
          onClick={() => navigate(`/organizations/${organization.id}/edit`)}
        >
          <Edit className="mr-2 h-4 w-4" /> Editar
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <Building className={`h-12 w-12 ${organization.isMainOrg ? 'text-amber-500' : 'text-primary'}`} />
        <div>
          <h1 className="text-2xl font-bold">{organization.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge 
              variant={organization.isActive ? "default" : "secondary"}
              className={organization.isActive 
                ? "bg-green-100 text-green-800 hover:bg-green-100" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
              }
            >
              {organization.isActive ? 'Ativa' : 'Inativa'}
            </Badge>
            
            {organization.isMainOrg && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                Organização Principal
              </Badge>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationDetailsHeader;
