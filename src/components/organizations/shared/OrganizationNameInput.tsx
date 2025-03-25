
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface OrganizationNameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const OrganizationNameInput: React.FC<OrganizationNameInputProps> = ({
  value,
  onChange,
  required = true,
  className = "grid gap-2"
}) => {
  return (
    <div className={className}>
      <Label htmlFor="name">Nome da Organização</Label>
      <Input
        id="name"
        name="name"
        value={value || ''}
        onChange={onChange}
        placeholder="Digite o nome da organização"
        required={required}
      />
    </div>
  );
};

export default OrganizationNameInput;
