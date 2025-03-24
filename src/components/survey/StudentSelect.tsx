
import React, { useEffect } from 'react';
import { useStudents } from '@/context/students/StudentsContext';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './SurveyFormSchema';

interface StudentSelectProps {
  form: UseFormReturn<FormValues>;
}

const StudentSelect: React.FC<StudentSelectProps> = ({ form }) => {
  const { students } = useStudents();

  useEffect(() => {
    console.log('Available students in StudentSelect:', students);
  }, [students]);

  const handleStudentSelect = (studentId: string) => {
    console.log('Student selected:', studentId);
    
    if (studentId) {
      const student = students.find(s => s.id === studentId);
      if (student) {
        form.setValue('studentId', student.id);
        form.setValue('studentName', student.name);
        
        if (student.parentName) {
          form.setValue('parentName', student.parentName);
        }
        if (student.parentContact) {
          form.setValue('parentContact', student.parentContact);
        }
      }
    } else {
      form.setValue('studentId', '');
      form.setValue('studentName', '');
      form.setValue('parentName', '');
      form.setValue('parentContact', '');
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="studentId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium mb-2 block">Selecione o aluno</FormLabel>
            <Select
              onValueChange={handleStudentSelect}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="h-12 px-3">
                  <SelectValue placeholder="Selecione um aluno..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent align="start" side="bottom" className="w-full">
                {students && students.length > 0 ? (
                  students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} - Turma {student.class} - {student.segment}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-students" disabled>
                    Nenhum aluno disponível
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="studentName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium mb-2 block">Nome do aluno</FormLabel>
            <FormControl>
              <Input {...field} readOnly className="h-12 px-3" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StudentSelect;
