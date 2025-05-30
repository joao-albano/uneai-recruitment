
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useIsMobile } from '@/hooks/use-mobile';

interface UserEmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
}

const UserEmailInput: React.FC<UserEmailInputProps> = ({
  value,
  onChange,
  required = true,
  className = "grid grid-cols-4 items-center gap-4"
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={className}>
      <Label htmlFor="email" className={isMobile ? "" : "text-right"}>
        Email
      </Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={value || ''}
        onChange={onChange}
        className={isMobile ? "" : "col-span-3"}
        required={required}
      />
    </div>
  );
};

export default UserEmailInput;
