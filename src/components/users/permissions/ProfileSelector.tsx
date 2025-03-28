
import React from 'react';
import { Button } from "@/components/ui/button";
import { userProfileDescriptions } from './types';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
      
      {Object.entries(userProfileDescriptions)
        .filter(([profileKey]) => profileKey !== 'superadmin' || isAdmin) // Only show superadmin if user is admin
        .map(([profileKey, profile]) => {
          const Icon = profile.icon;
          
          return (
            <HoverCard key={profileKey} openDelay={300}>
              <HoverCardTrigger asChild>
                <Button 
                  variant={selectedProfile === profileKey ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => onSelectProfile(profileKey)}
                  disabled={isAdmin && selectedProfile === 'superadmin'}
                  className="flex items-center gap-1.5"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {profile.title}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-3 text-sm">
                <p className="font-medium mb-1">{profile.title}</p>
                <p className="text-xs text-muted-foreground">{profile.description}</p>
              </HoverCardContent>
            </HoverCard>
          );
        })}
    </div>
  );
};

export default ProfileSelector;
