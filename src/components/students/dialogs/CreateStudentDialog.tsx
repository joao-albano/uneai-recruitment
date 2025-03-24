
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student, SchoolSegment } from '@/types/data';
import { v4 as uuidv4 } from 'uuid';

interface CreateStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (student: Student) => void;
}

const CreateStudentDialog: React.FC<CreateStudentDialogProps> = ({
  open,
  onOpenChange,
  onCreate
}) => {
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    registrationNumber: '',
    class: '',
    segment: 'ENSINO FUNDAMENTAL II' as SchoolSegment,
    grade: 6,
    attendance: 100,
    behavior: 100,
    riskLevel: 'low'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStudent(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setNewStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGradeChange = (value: string) => {
    setNewStudent(prev => ({
      ...prev,
      grade: parseInt(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Criar novo estudante com ID e valores padrão para campos opcionais
    const student: Student = {
      id: uuidv4(),
      name: newStudent.name || '',
      registrationNumber: newStudent.registrationNumber || '',
      class: newStudent.class || '',
      segment: newStudent.segment as SchoolSegment,
      grade: newStudent.grade || 6,
      attendance: newStudent.attendance || 100,
      behavior: newStudent.behavior || 100,
      riskLevel: newStudent.riskLevel as 'low' | 'medium' | 'high',
    };
    
    onCreate(student);
    
    // Resetar o formulário
    setNewStudent({
      name: '',
      registrationNumber: '',
      class: '',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 6,
      attendance: 100,
      behavior: 100,
      riskLevel: 'low'
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Aluno</DialogTitle>
          <DialogDescription>
            Preencha os dados para adicionar um novo aluno ao sistema.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                name="name"
                value={newStudent.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="registrationNumber">Número de Matrícula</Label>
              <Input
                id="registrationNumber"
                name="registrationNumber"
                value={newStudent.registrationNumber || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="class">Turma</Label>
              <Input
                id="class"
                name="class"
                value={newStudent.class || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="segment">Segmento</Label>
              <Select 
                value={newStudent.segment} 
                onValueChange={(value) => handleSelectChange('segment', value as SchoolSegment)}
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
                value={newStudent.grade?.toString() || '6'} 
                onValueChange={handleGradeChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a série" />
                </SelectTrigger>
                <SelectContent>
                  {newStudent.segment === 'EDUCAÇÃO INFANTIL' ? (
                    <>
                      <SelectItem value="1">Maternal I</SelectItem>
                      <SelectItem value="2">Maternal II</SelectItem>
                      <SelectItem value="3">Jardim I</SelectItem>
                      <SelectItem value="4">Jardim II</SelectItem>
                      <SelectItem value="5">Pré-Escola</SelectItem>
                    </>
                  ) : newStudent.segment === 'ENSINO FUNDAMENTAL I' ? (
                    <>
                      <SelectItem value="1">1º Ano</SelectItem>
                      <SelectItem value="2">2º Ano</SelectItem>
                      <SelectItem value="3">3º Ano</SelectItem>
                      <SelectItem value="4">4º Ano</SelectItem>
                      <SelectItem value="5">5º Ano</SelectItem>
                    </>
                  ) : newStudent.segment === 'ENSINO FUNDAMENTAL II' ? (
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
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Adicionar Aluno</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudentDialog;
