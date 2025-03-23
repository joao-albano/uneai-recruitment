
import React from 'react';
import { useData } from '@/context/DataContext';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './SurveyFormSchema';

interface StudentSelectProps {
  form: UseFormReturn<FormValues>;
}

const StudentSelect: React.FC<StudentSelectProps> = ({ form }) => {
  const { students } = useData();

  const handleStudentSelect = (studentId: string) => {
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
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="studentId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Selecione o aluno</FormLabel>
            <Select
              onValueChange={(value) => handleStudentSelect(value)}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="px-2">
                  <SelectValue placeholder="Selecione um aluno..." />
                </SelectTrigger>
              </FormControl>
              <SelectContent align="start" className="w-full">
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name} - Turma {student.class} - {student.segment}
                  </SelectItem>
                ))}
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
            <FormLabel>Nome do aluno</FormLabel>
            <FormControl>
              <Input {...field} readOnly />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StudentSelect;
