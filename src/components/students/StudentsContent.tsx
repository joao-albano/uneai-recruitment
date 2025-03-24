import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import StudentsHeader from './StudentsHeader';
import StudentsTable from './StudentsTable';
import StudentsList from './StudentsList';
import StudentsDetailsDialog from './StudentsDetailsDialog';
import CreateStudentDialog from './dialogs/CreateStudentDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { Student } from '@/types/data';
import { useAuth } from '@/context/auth';

const StudentsContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [studentDetailsOpen, setStudentDetailsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [createStudentOpen, setCreateStudentOpen] = useState(false);
  const { students, addStudent, updateStudent, deleteStudent, generateDemoData } = useData();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (students.length === 0) {
      generateDemoData();
    }
  }, [students.length, generateDemoData]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleOpenDetails = (student: Student) => {
    setSelectedStudent(student);
    setStudentDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setStudentDetailsOpen(false);
    setSelectedStudent(null);
  };

  const handleCreateStudent = (newStudent: Student) => {
    addStudent(newStudent);
    setCreateStudentOpen(false);
    toast({
      title: 'Aluno adicionado',
      description: `${newStudent.name} foi adicionado à lista de alunos.`,
    });
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    updateStudent(updatedStudent);
    handleCloseDetails();
    toast({
      title: 'Aluno atualizado',
      description: `${updatedStudent.name} foi atualizado com sucesso.`,
    });
  };

  const handleDeleteStudent = (studentId: string) => {
    deleteStudent(studentId);
    handleCloseDetails();
    toast({
      title: 'Aluno removido',
      description: 'O aluno foi removido permanentemente.',
    });
  };

  return (
    <div>
      <StudentsHeader studentCount={students.length} />

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Alunos</TabsTrigger>
          {isAdmin && <TabsTrigger value="details">Detalhes</TabsTrigger>}
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Alunos</CardTitle>
              <CardDescription>
                Gerencie a lista de alunos
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2 pb-4">
              <StudentsList
                students={students}
                onOpenDetails={handleOpenDetails}
                isMobile={isMobile}
              />
              <Button onClick={() => setCreateStudentOpen(true)}>
                Adicionar Aluno
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="details">
            {selectedStudent ? (
              <StudentsDetailsDialog
                open={studentDetailsOpen}
                onOpenChange={setStudentDetailsOpen}
                student={selectedStudent}
                onUpdate={handleUpdateStudent}
                onDelete={handleDeleteStudent}
              />
            ) : (
              <Card>
                <CardContent>
                  Selecione um aluno para ver os detalhes
                </CardContent>
              </Card>
            )}
          </TabsContent>
        )}
      </Tabs>

      <CreateStudentDialog
        open={createStudentOpen}
        onOpenChange={setCreateStudentOpen}
        onCreate={handleCreateStudent}
      />
    </div>
  );
};

export default StudentsContent;
