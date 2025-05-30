
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <div className={className}>
      <Label htmlFor="password" className={isMobile ? "" : "text-right"}>
        Senha
      </Label>
      <Input
        id="password"
        name="password"
        type="password"
        value={value}
        onChange={onChange}
        className={isMobile ? "" : "col-span-3"}
        required={required}
        autoComplete="new-password"
      />
    </div>
  );
};

export default PasswordInput;
