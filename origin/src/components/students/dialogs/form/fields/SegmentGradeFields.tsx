
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student, SchoolSegment } from '@/types/data';

interface SegmentGradeFieldsProps {
  student: Partial<Student>;
  onSelectChange: (field: string, value: string) => void;
  onGradeChange: (value: string) => void;
}

const SegmentGradeFields: React.FC<SegmentGradeFieldsProps> = ({
  student,
  onSelectChange,
  onGradeChange
}) => {
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="segment">Segmento</Label>
        <Select 
          value={student.segment} 
          onValueChange={(value) => onSelectChange('segment', value as SchoolSegment)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o segmento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EDUCAÇÃO INFANTIL">EDUCAÇÃO INFANTIL</SelectItem>
            <SelectItem value="ENSINO FUNDAMENTAL I">ENSINO FUNDAMENTAL I</SelectItem>
            <SelectItem value="ENSINO FUNDAMENTAL II">ENSINO FUNDAMENTAL II</SelectItem>
            <SelectItem value="ENSINO MÉDIO">ENSINO MÉDIO</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="grade">Série/Ano</Label>
        <Select 
          value={student.grade?.toString() || '6'} 
          onValueChange={onGradeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a série" />
          </SelectTrigger>
          <SelectContent>
            {student.segment === 'EDUCAÇÃO INFANTIL' ? (
              <>
                <SelectItem value="1">Maternal I</SelectItem>
                <SelectItem value="2">Maternal II</SelectItem>
                <SelectItem value="3">Jardim I</SelectItem>
                <SelectItem value="4">Jardim II</SelectItem>
                <SelectItem value="5">Pré-Escola</SelectItem>
              </>
            ) : student.segment === 'ENSINO FUNDAMENTAL I' ? (
              <>
                <SelectItem value="1">1º Ano</SelectItem>
                <SelectItem value="2">2º Ano</SelectItem>
                <SelectItem value="3">3º Ano</SelectItem>
                <SelectItem value="4">4º Ano</SelectItem>
                <SelectItem value="5">5º Ano</SelectItem>
              </>
            ) : student.segment === 'ENSINO FUNDAMENTAL II' ? (
              <>
                <SelectItem value="6">6º Ano</SelectItem>
                <SelectItem value="7">7º Ano</SelectItem>
                <SelectItem value="8">8º Ano</SelectItem>
                <SelectItem value="9">9º Ano</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="1">1º Ano</SelectItem>
                <SelectItem value="2">2º Ano</SelectItem>
                <SelectItem value="3">3º Ano</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default SegmentGradeFields;
