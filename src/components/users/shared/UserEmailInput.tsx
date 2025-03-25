
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  return (
    <div className={className}>
      <Label htmlFor="email" className="text-right">
        Email
      </Label>
      <Input
        id="email"
        name="email"
        type="email"
        value={value || ''}
        onChange={onChange}
        className="col-span-3"
        required={required}
      />
    </div>
  );
};

export default UserEmailInput;
