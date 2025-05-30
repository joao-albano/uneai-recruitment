
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  return (
    <div className={className}>
      <Label htmlFor="name" className={isMobile ? "" : "text-right"}>
        Nome
      </Label>
      <Input
        id="name"
        name="name"
        value={value || ''}
        onChange={onChange}
        className={isMobile ? "" : "col-span-3"}
        required={required}
      />
    </div>
  );
};

export default UserNameInput;
