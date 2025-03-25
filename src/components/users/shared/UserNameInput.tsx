
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UserNameInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const UserNameInput: React.FC<UserNameInputProps> = ({
  value,
  onChange,
  required = true,
  className = "grid grid-cols-4 items-center gap-4"
}) => {
  return (
    <div className={className}>
      <Label htmlFor="name" className="text-right">
        Nome
      </Label>
      <Input
        id="name"
        name="name"
        value={value || ''}
        onChange={onChange}
        className="col-span-3"
        required={required}
      />
    </div>
  );
};

export default UserNameInput;
