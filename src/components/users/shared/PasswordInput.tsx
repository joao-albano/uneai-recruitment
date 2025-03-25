
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChange,
  required = true,
  className = "grid grid-cols-4 items-center gap-4"
}) => {
  return (
    <div className={className}>
      <Label htmlFor="password" className="text-right">
        Senha
      </Label>
      <Input
        id="password"
        name="password"
        type="password"
        value={value}
        onChange={onChange}
        className="col-span-3"
        required={required}
        autoComplete="new-password"
      />
    </div>
  );
};

export default PasswordInput;
