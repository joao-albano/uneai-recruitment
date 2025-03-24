
import React from 'react';
import { Button } from "@/components/ui/button";

interface ProfileSelectorProps {
  selectedProfile: string;
  onSelectProfile: (profile: string) => void;
  isAdmin: boolean;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ 
  selectedProfile, 
  onSelectProfile, 
  isAdmin 
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm font-medium">Aplicar perfil:</span>
      <Button 
        variant={selectedProfile === 'admin' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onSelectProfile('admin')}
        disabled={isAdmin}
      >
        Administrador
      </Button>
      <Button 
        variant={selectedProfile === 'gestor' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onSelectProfile('gestor')}
        disabled={isAdmin}
      >
        Gestor
      </Button>
      <Button 
        variant={selectedProfile === 'coordenador' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onSelectProfile('coordenador')}
        disabled={isAdmin}
      >
        Coordenador
      </Button>
      <Button 
        variant={selectedProfile === 'professor' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onSelectProfile('professor')}
        disabled={isAdmin}
      >
        Professor
      </Button>
      <Button 
        variant={selectedProfile === 'basico' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => onSelectProfile('basico')}
        disabled={isAdmin}
      >
        Básico
      </Button>
    </div>
  );
};

export default ProfileSelector;
