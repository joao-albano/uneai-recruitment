
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Student } from '@/types/data';

interface BasicInfoFieldsProps {
  student: Partial<Student>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  student,
  onInputChange
}) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="name">Nome Completo</Label>
        <Input
          id="name"
          name="name"
          value={student.name || ''}
          onChange={onInputChange}
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="registrationNumber">Número de Matrícula</Label>
        <Input
          id="registrationNumber"
          name="registrationNumber"
          value={student.registrationNumber || ''}
          onChange={onInputChange}
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="class">Turma</Label>
        <Input
          id="class"
          name="class"
          value={student.class || ''}
          onChange={onInputChange}
          required
        />
      </div>
    </>
  );
};

export default BasicInfoFields;
