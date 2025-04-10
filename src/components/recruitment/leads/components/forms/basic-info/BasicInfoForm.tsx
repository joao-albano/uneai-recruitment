
import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../../types/leadForm';
import PersonalInfoCard from './PersonalInfoCard';
import AcademicInfoCard from './AcademicInfoCard';
import InstitutionTypeCard from './InstitutionTypeCard';

// Cursos de educação básica que exigem informações de filhos
const BASIC_EDUCATION_COURSES = [
  'Ensino Fundamental',
  'Ensino Médio',
  'Educação Infantil'
];

interface BasicInfoFormProps {
  form: UseFormReturn<LeadFormValues>;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ form }) => {
  // Detectar tipo de instituição e curso selecionado
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'course') {
        const course = value.course as string;
        const isBasicEducation = BASIC_EDUCATION_COURSES.includes(course);
        
        // Atualizar tipo de instituição
        form.setValue('institutionType', isBasicEducation ? 'school' : 'university');
        
        // Atualizar requiresChildrenInfo
        form.setValue('requiresChildrenInfo', isBasicEducation);
        
        // Se não requer informações de filhos, certificar que há pelo menos um filho vazio
        // para manter a estrutura de dados consistente
        if (!isBasicEducation && (!value.children || value.children.length === 0)) {
          form.setValue('children', []);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Determinar se é educação básica ou superior baseado no curso
  const institutionType = form.watch('institutionType');
  const isBasicEducation = institutionType === 'school';

  return (
    <div className="space-y-4 overflow-y-auto">
      <InstitutionTypeCard form={form} />
      <PersonalInfoCard form={form} isBasicEducation={isBasicEducation} />
      <AcademicInfoCard form={form} isBasicEducation={isBasicEducation} />
    </div>
  );
};

export default BasicInfoForm;
