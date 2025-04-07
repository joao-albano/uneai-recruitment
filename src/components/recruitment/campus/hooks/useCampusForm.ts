
import { useState } from 'react';
import { Campus, Course } from '@/types/recruitment/campus';
import { useCampus } from './useCampus';
import { toast } from '@/hooks/use-toast';
import { CampusFormValues } from '../form/CampusForm';

interface UseCampusFormProps {
  campus?: Campus;
  mode: 'create' | 'edit';
  onClose: () => void;
}

export const useCampusForm = ({ campus, mode, onClose }: UseCampusFormProps) => {
  const { addCampus, updateCampus } = useCampus();
  const [courses, setCourses] = useState<Course[]>(campus?.courses || []);

  const handleCoursesChange = (updatedCourses: Course[]) => {
    setCourses(updatedCourses);
  };

  const handleSubmit = async (values: CampusFormValues) => {
    try {
      if (mode === 'create') {
        await addCampus({
          name: values.name,
          address: values.address,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          phone: values.phone,
          courses: courses
        });
        toast({
          title: "Unidade criada",
          description: "A unidade foi criada com sucesso."
        });
      } else if (mode === 'edit' && campus) {
        await updateCampus(campus.id, {
          ...values,
          courses: courses
        });
        toast({
          title: "Unidade atualizada",
          description: "As informações foram atualizadas com sucesso."
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um erro ao salvar a unidade. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const defaultValues = campus ? {
    name: campus.name,
    address: campus.address,
    city: campus.city,
    state: campus.state,
    zipCode: campus.zipCode,
    phone: campus.phone
  } : undefined;

  return {
    courses,
    handleCoursesChange,
    handleSubmit,
    defaultValues
  };
};
