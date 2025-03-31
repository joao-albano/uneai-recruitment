
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student, SchoolSegment } from '@/types/data';

interface StudentDialogFormProps {
  student: Partial<Student>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: string, value: string) => void;
  onGradeChange: (value: string) => void;
  onNumberInputChange: (field: string, value: number) => void;
}

const StudentDialogForm: React.FC<StudentDialogFormProps> = ({
  student,
  onInputChange,
  onSelectChange,
  onGradeChange,
  onNumberInputChange
}) => {
  return (
    <div className="grid gap-4 py-4">
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
    </div>
  );
};

export default StudentDialogForm;
