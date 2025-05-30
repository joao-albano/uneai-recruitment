
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Student } from '@/types/data';

interface PerformanceFieldsProps {
  student: Partial<Student>;
  onNumberInputChange: (field: string, value: number) => void;
}

const PerformanceFields: React.FC<PerformanceFieldsProps> = ({
  student,
  onNumberInputChange
}) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="attendance">Frequência (%)</Label>
        <Input
          id="attendance"
          name="attendance"
          type="number"
          min="0"
          max="100"
          value={student.attendance || 100}
          onChange={(e) => onNumberInputChange('attendance', Number(e.target.value))}
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="behavior">Comportamento (0-100)</Label>
        <Input
          id="behavior"
          name="behavior"
          type="number"
          min="0"
          max="100"
          value={student.behavior || 100}
          onChange={(e) => onNumberInputChange('behavior', Number(e.target.value))}
          required
        />
      </div>
    </>
  );
};

export default PerformanceFields;
