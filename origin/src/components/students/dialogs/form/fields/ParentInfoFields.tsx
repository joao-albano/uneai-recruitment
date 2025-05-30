
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Student } from '@/types/data';

interface ParentInfoFieldsProps {
  student: Partial<Student>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ParentInfoFields: React.FC<ParentInfoFieldsProps> = ({
  student,
  onInputChange
}) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="parentName">Nome do Responsável</Label>
        <Input
          id="parentName"
          name="parentName"
          value={student.parentName || ''}
          onChange={onInputChange}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="parentContact">Contato do Responsável</Label>
        <Input
          id="parentContact"
          name="parentContact"
          placeholder="(99) 99999-9999"
          value={student.parentContact || ''}
          onChange={onInputChange}
        />
      </div>
    </>
  );
};

export default ParentInfoFields;
