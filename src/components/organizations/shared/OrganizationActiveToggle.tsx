
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React from "react";

export interface OrganizationActiveToggleProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
}

const OrganizationActiveToggle: React.FC<OrganizationActiveToggleProps> = ({
  isActive,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="active-toggle">Status da Organização</Label>
      <div className="flex items-center gap-2">
        <Switch 
          id="active-toggle"
          checked={isActive}
          onCheckedChange={onChange}
        />
        <Label htmlFor="active-toggle" className="cursor-pointer">
          {isActive ? 'Ativa' : 'Inativa'}
        </Label>
      </div>
    </div>
  );
};

export default OrganizationActiveToggle;
