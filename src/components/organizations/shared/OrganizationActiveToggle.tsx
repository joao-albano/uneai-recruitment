
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface OrganizationActiveToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const OrganizationActiveToggle: React.FC<OrganizationActiveToggleProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
  className = "flex items-center justify-between space-y-0.5"
}) => {
  return (
    <div className={className}>
      <div className="space-y-0.5">
        <Label htmlFor="active">Organização Ativa</Label>
        <p className="text-xs text-muted-foreground">
          Organizações inativas não terão acesso ao sistema
        </p>
      </div>
      <Switch 
        id="active"
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
};

export default OrganizationActiveToggle;
