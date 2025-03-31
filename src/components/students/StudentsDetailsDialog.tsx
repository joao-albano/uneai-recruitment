
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Student } from '@/types/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Trash2 } from 'lucide-react';
import StudentDialogForm from './dialogs/form/StudentDialogForm';

interface StudentsDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onUpdate: (student: Student) => void;
  onDelete: (studentId: string) => void;
}

const StudentsDetailsDialog: React.FC<StudentsDetailsDialogProps> = ({
  open,
  onOpenChange,
  student,
  onUpdate,
  onDelete
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableStudent, setEditableStudent] = useState<Student | null>(null);
  
  // Reset state when dialog opens with a new student
  React.useEffect(() => {
    if (student) {
      setEditableStudent(structuredClone(student));
      setIsEditing(false);
    }
  }, [student, open]);

  if (!student) return null;

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir o aluno ${student.name}?`)) {
      onDelete(student.id);
      onOpenChange(false);
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (editableStudent) {
      onUpdate(editableStudent);
      setIsEditing(false);
    }
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setEditableStudent(structuredClone(student));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editableStudent) return;
    
    const { name, value } = e.target;
    setEditableStudent(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleSelectChange = (field: string, value: string) => {
    if (!editableStudent) return;
    
    setEditableStudent(prev => prev ? { ...prev, [field]: value } : null);
  };
  
  const handleGradeChange = (value: string) => {
    if (!editableStudent) return;
    
    setEditableStudent(prev => prev ? { 
      ...prev, 
      grade: parseInt(value, 10) 
    } : null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {student.name}
            <span className={`text-xs px-2 py-1 rounded-full ${
              student.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
              student.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {student.riskLevel === 'high' ? 'Alto Risco' :
               student.riskLevel === 'medium' ? 'Médio Risco' :
               'Baixo Risco'}
            </span>
          </DialogTitle>
          <DialogDescription>
            Turma {student.class} | Matrícula: {student.registrationNumber}
          </DialogDescription>
        </DialogHeader>

        {isEditing ? (
          <div className="py-4">
            <StudentDialogForm 
              student={editableStudent as Student}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
              onGradeChange={handleGradeChange}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="info">
            <TabsList>
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="attendance">Frequência</TabsTrigger>
              <TabsTrigger value="behavior">Comportamento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Segmento</h4>
                  <p>{student.segment}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Série/Ano</h4>
                  <p>{student.grade}º ano</p>
                </div>
                {student.parentName && (
                  <div>
                    <h4 className="text-sm font-medium">Responsável</h4>
                    <p>{student.parentName}</p>
                  </div>
                )}
                {student.parentContact && (
                  <div>
                    <h4 className="text-sm font-medium">Contato</h4>
                    <p>{student.parentContact}</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="attendance" className="py-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Frequência</h4>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${
                      student.attendance >= 90 ? 'bg-green-500' :
                      student.attendance >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${student.attendance}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-sm">{student.attendance}% de presença</p>
              </div>
            </TabsContent>
            
            <TabsContent value="behavior" className="py-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Comportamento</h4>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${
                      student.behavior >= 90 ? 'bg-green-500' :
                      student.behavior >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${student.behavior}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-sm">Pontuação: {student.behavior}/100</p>
              </div>
            </TabsContent>
          </Tabs>
        )}

        <DialogFooter className="flex justify-between items-center">
          <Button 
            variant="destructive" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            Excluir
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleEdit}
          >
            <Pencil size={16} />
            Editar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentsDetailsDialog;
