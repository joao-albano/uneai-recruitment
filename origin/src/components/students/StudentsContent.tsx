
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
import StudentDetail from './StudentDetail';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';

const StudentsContent: React.FC = () => {
  const [studentDetailsOpen, setStudentDetailsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [createStudentOpen, setCreateStudentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const { students, addStudent, updateStudent, deleteStudent, generateDemoData, addSchedule } = useData();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (students.length === 0) {
      generateDemoData();
    }
  }, [students.length, generateDemoData]);

  const handleOpenDetails = (student: Student) => {
    setSelectedStudent(student);
    setStudentDetailsOpen(true);
    setActiveTab('details');
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
    setStudentDetailsOpen(false);
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

  const handleScheduleMeeting = (studentId: string, studentName: string) => {
    // Cria uma data para o dia seguinte às 14h
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(14, 0, 0, 0);
    
    // Adiciona o agendamento
    const newSchedule = {
      id: uuidv4(),
      studentId,
      studentName,
      date: tomorrow,
      agentName: 'Coord. Pedagógica',
      status: 'scheduled' as const,
      notes: 'Reunião para acompanhamento do desenvolvimento acadêmico e social'
    };
    
    addSchedule(newSchedule);
    
    toast({
      title: 'Atendimento agendado',
      description: `Um novo atendimento para ${studentName} foi agendado para amanhã às 14h.`,
    });
  };

  const handleSendSurvey = (studentId: string) => {
    toast({
      title: 'Pesquisa enviada',
      description: 'Uma pesquisa foi enviada para o responsável pelo aluno.',
    });
  };

  return (
    <div>
      <StudentsHeader studentCount={students.length} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Lista de Alunos</TabsTrigger>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Alunos</CardTitle>
                <CardDescription>
                  Gerencie a lista de alunos
                </CardDescription>
              </div>
              <Button 
                onClick={() => setCreateStudentOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar Aluno
              </Button>
            </CardHeader>
            <CardContent className="pl-2 pb-4">
              <StudentsList
                students={students}
                onOpenDetails={handleOpenDetails}
                isMobile={isMobile}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details">
          {selectedStudent ? (
            <StudentDetail 
              student={selectedStudent} 
              onScheduleMeeting={handleScheduleMeeting}
              onSendSurvey={handleSendSurvey}
            />
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  Selecione um aluno na lista para visualizar seus detalhes.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <StudentsDetailsDialog
        open={studentDetailsOpen}
        onOpenChange={setStudentDetailsOpen}
        student={selectedStudent}
        onUpdate={handleUpdateStudent}
        onDelete={handleDeleteStudent}
      />

      <CreateStudentDialog
        open={createStudentOpen}
        onOpenChange={setCreateStudentOpen}
        onCreate={handleCreateStudent}
      />
    </div>
  );
};

export default StudentsContent;
